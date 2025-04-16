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
                  Notify.create({
                    message: 'Feature de publicação em desenvolvimento!',
                    color: 'negative',
                    icon: 'error',
                  })
              "
              >Publicar</q-btn
            >
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
import { Notify } from 'quasar';
import PageComponent from 'src/components/page/page-component.vue';

interface Portfolio {
  id: number;
  data: {
    name: string;
    title: string;
  };
}

const portfolios = ref<Portfolio[]>([]);
const router = useRouter();

const fetchPortfolios = async () => {
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
//   Dialog.create({
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
