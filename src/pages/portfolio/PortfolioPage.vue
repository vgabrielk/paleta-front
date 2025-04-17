<template>
  <page-component>
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6">Meus Portfólios</div>
      <q-btn label="Novo Portfólio" color="primary" icon="add" @click="goToCreate" />
    </div>

    <q-card v-if="portfolios.length" flat bordered class="q-pa-md">
      <q-list separator>
        <q-item
          v-for="portfolio in portfolios"
          :key="portfolio.id"
          clickable
          style="height: 120px"
          class="q-pa-md rounded-borders"
          @click="() => editPortfolio(portfolio.id)"
        >
          <q-item-section>
            <q-item-label class="text-h6">{{ portfolio?.data?.name }}</q-item-label>
            <q-item-label caption>{{ portfolio?.data?.title }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              class="text-white bg-primary"
              @click.stop="
                () =>
                  portfolio?.data?.site_status != 'published'
                    ? showDialog(portfolio)
                    : router.push({
                        name: 'portfolio-published',
                        params: { portfolioUrl: portfolio?.data?.site_url },
                      })
              "
            >
              <div v-if="portfolio?.data?.site_status === 'published'">
                <q-icon name="check_circle" size="sm" class="q-mr-xs" />
                Visualizar site
              </div>
              <div v-else>
                <q-icon name="send" size="sm" class="q-mr-xs" />
                Publicar
              </div>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <div v-else class="text-subtitle2 text-grey text-center q-mt-xl">
      Nenhum portfólio encontrado.
    </div>
  </page-component>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from 'src/api/api';
import { useRouter } from 'vue-router';
import { Notify, useQuasar } from 'quasar';
import PageComponent from 'src/components/page/page-component.vue';
import type { AxiosError } from 'axios';

interface Portfolio {
  id: number;
  data: {
    name: string;
    title: string;
    site_url: string;
    site_status?: string;
  };
}

const portfolios = ref<Portfolio[]>([]);
const router = useRouter();
const loading = ref(false);
const $q = useQuasar();
const portfolioUrl = ref('');

const showDialog = (portfolio: Portfolio) => {
  $q.dialog({
    title: 'Publicar Portfólio',
    message: 'Digite a URL do site, ex: meu-portfolio',
    prompt: {
      model: '',
      type: 'text',
      isValid: (val) => val.length > 0,
    },
    cancel: true,
    persistent: true,
  }).onOk((url) => {
    portfolioUrl.value = url;
    void handlePublish(portfolio);
  });
};

const handlePublish = async (portfolio: Portfolio) => {
  try {
    loading.value = true;
    $q.loading.show({ message: 'Publicando...', spinnerColor: 'white' });

    portfolio.data.site_url = portfolioUrl.value;
    const response = await api.post(`/portfolio/${portfolio.id}/publish`, {
      data: portfolio.data,
    });

    Notify.create({
      message: 'Portfólio publicado com sucesso!',
      color: 'positive',
      icon: 'check_circle',
    });
    await fetchPortfolios();

    console.log('Portfólio publicado:', response.data);
  } catch (error) {
    const err = error as AxiosError<Record<string, string[]>>;
    if (err.response?.data?.errors) {
      Object.values(err.response.data.errors).forEach((messages: string) => {
        if (Array.isArray(messages)) {
          messages.forEach((msg: string) => {
            $q.notify({
              message: msg,
              color: 'negative',
              icon: 'error',
            });
          });
        }
      });
    }
  } finally {
    $q.loading.hide();
  }
};

const fetchPortfolios = async () => {
  $q.loading.show({
    spinnerColor: 'white',
  });
  try {
    const response = await api.get(`/portfolio`);
    portfolios.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar portfólios:', error);
    Notify.create({
      message: 'Erro ao carregar os portfólios.',
      color: 'negative',
      icon: 'error',
    });
  } finally {
    $q.loading.hide();
  }
};

const goToCreate = () => {
  void router.push({
    name: 'portfolio-create',
    query: {
      type: 'free',
    },
  });
};

const editPortfolio = (id: number) => {
  void router.push({ name: 'portfolio-edit', params: { id } });
};

// const deletePortfolio = async (id: number, index: number) => {
//   $q.dialog({
//     title: 'Confirmação',
//     message: 'Deseja realmente excluir este portfólio?',
//     cancel: true,
//     persistent: true,
//   }).onOk(async () => {
//     try {
//       await api.delete(`/portfolio/${id}`);
//       portfolios.value.splice(index, 1);
//       Notify.create({
//         message: 'Portfólio excluído com sucesso!',
//         color: 'positive',
//         icon: 'check_circle',
//       });
//     } catch (error) {
//       console.error('Erro ao excluir portfólio:', error);
//       Notify.create({
//         message: 'Erro ao excluir portfólio.',
//         color: 'negative',
//         icon: 'error',
//       });
//     }
//   });
// };

onMounted(async () => {
  await fetchPortfolios();
});
</script>
