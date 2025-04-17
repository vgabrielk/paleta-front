<template>
  <page-component>
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6">Templates disponíveis</div>
    </div>

    <q-card v-if="templates?.length" flat bordered class="q-pa-md">
      <q-list separator>
        <q-item
          :disable="template.disabled"
          v-for="template in templates"
          :key="template.id"
          clickable
          style="height: 120px"
          class="q-pa-md rounded-borders"
          @click="
            () =>
              !template.disabled
                ? viewTemplate(template)
                : Notify.create({
                    message: 'Assine o premium para ter acesso a esse e outros templates',
                    color: 'negative',
                    icon: 'error',
                  })
          "
        >
          <q-item-section>
            <q-item-label class="text-h6">{{ template?.name }}</q-item-label>
            <q-item-label caption class="text-uppercase">{{ template?.type }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              class="text-white bg-secondary"
              @click.stop="
                () =>
                  !template.disabled
                    ? selectTemplate(template)
                    : Notify.create({
                        message: 'Assine o premium para ter acesso a esse e outros templates',
                        color: 'negative',
                        icon: 'error',
                      })
              "
              >Usar esse template</q-btn
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <div v-else class="text-subtitle2 text-grey text-center q-mt-xl">
      Nenhum template encontrado.
    </div>
  </page-component>
</template>

<script lang="ts" setup>
interface Template {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  type?: string;
}
import { useRouter } from 'vue-router';
import PageComponent from '../../components/page/page-component.vue';
import { templates } from '.';
import { Notify } from 'quasar';

const router = useRouter();

const viewTemplate = (template: Template) => {
  void router.push({
    name: 'template-preview',
    params: {
      id: template.id,
    },
  });
};

const selectTemplate = (template: Template) => {
  void router.push({
    name: 'portfolio-create',
    query: {
      type: template.type,
    },
  });
};
</script>
