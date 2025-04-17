<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';
import { uid } from 'quasar';

// Catálogo de componentes disponíveis
const componentsList = ref([
  { id: 6, name: 'Header', type: 'header', icon: 'image' },
  { id: 1, name: 'Hero Banner', type: 'hero', icon: 'image' },
  { id: 2, name: 'Sobre Mim', type: 'about', icon: 'person' },
  { id: 3, name: 'Projetos', type: 'projects', icon: 'work' },
  { id: 4, name: 'Galeria de Imagens', type: 'gallery', icon: 'photo' },
  { id: 5, name: 'Contato', type: 'contact', icon: 'mail' },
]);

// Layout atual do usuário
const userLayout = ref([]);

interface Portfolio {
  id: number;
  name: string;
  type: string;
  data: {
    title: string;
    description: string;
    images: string[];
    email: string;
  };
}

// Clona o componente ao arrastar
function cloneComponent(item: Portfolio) {
  return {
    ...item,
    uid: uid(),
    data: {
      title: item.name,
      description: '',
      images: [],
      email: '',
    },
  };
}

// Remove um componente do layout
function removeComponent(index: number) {
  userLayout.value.splice(index, 1);
}
</script>

<template>
  <div class="q-pa-md row q-col-gutter-md">
    <!-- Painel de Componentes -->
    <div class="col-3">
      <h6 class="text-bold text-center q-mb-md">Componentes disponíveis</h6>
      <draggable
        :list="componentsList"
        :group="{ name: 'portfolio', pull: 'clone', put: false }"
        item-key="id"
        :clone="cloneComponent"
      >
        <template #item="{ element }">
          <q-card
            class="q-pa-sm q-my-sm bg-light-blue-2 cursor-pointer shadow-2"
            :style="{ borderRadius: '16px', transition: 'transform 0.2s ease' }"
          >
            <div class="row items-center">
              <q-icon :name="element.icon" class="q-mr-sm" size="md" />
              <div class="text-body2">{{ element.name }}</div>
            </div>
          </q-card>
        </template>
      </draggable>
    </div>

    <!-- Montagem do Layout -->
    <div class="col-9">
      <h6 class="text-bold text-center q-mb-md">Montagem do Portfólio</h6>
      <draggable
        v-model="userLayout"
        :group="{ name: 'portfolio', pull: true, put: true }"
        item-key="uid"
        class="q-card--bordered"
        style="height: 100vh; overflow-y: auto"
      >
        <template #item="{ element, index }">
          <q-card
            class="q-pa-md q-my-sm bg-grey-3 shadow-2 q-mb-md"
            :style="{ borderRadius: '16px' }"
          >
            <div class="q-row items-center justify-between">
              <div class="text-subtitle2 text-weight-bold">{{ element.name }}</div>
              <q-btn
                flat
                dense
                round
                icon="delete_forever"
                color="negative"
                @click="removeComponent(index)"
              />
            </div>

            <!-- Renderiza conteúdo com base no tipo -->
            <div class="q-mt-md">
              <component :is="renderComponent(element)" :element="element" />
            </div>
          </q-card>
        </template>
      </draggable>
    </div>
  </div>
</template>

<!-- Componentes mockados -->
<script lang="ts">
import { defineComponent } from 'vue';

const HeaderComponent = defineComponent({
  props: ['element'],
  template: `
   <q-header elevated>
        <q-toolbar class="glossy">
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>Quasar Framework</q-toolbar-title>

          <q-btn flat round dense icon="whatshot" />
        </q-toolbar>
      </q-header>
  `,
});
// Componente Hero
const HeroComponent = defineComponent({
  props: ['element'],
  template: `
    <div class="q-pa-md" style="background-color: #2196F3; color: white; border-radius: 12px;">
      <q-input filled v-model="element.data.title" label="Título" class="q-mb-sm" style="background-color: white;" />
      <q-input filled type="textarea" v-model="element.data.description" label="Descrição" autogrow />
    </div>
  `,
});

// Componente About
const AboutComponent = defineComponent({
  props: ['element'],
  template: `
    <div class="q-pa-md" style="background-color: #FFC107; color: white; border-radius: 12px;">
      <q-input filled v-model="element.data.description" label="Texto sobre você" type="textarea" autogrow />
    </div>
  `,
});

// Componente Projetos
const ProjectsComponent = defineComponent({
  props: ['element'],
  template: `
    <div class="q-pa-md" style="background-color: #4CAF50; color: white; border-radius: 12px;">
      <q-input filled v-model="element.data.title" label="Seção de Projetos" />
      <q-banner class="q-mt-sm bg-grey-4 text-white">⚠️ Lista de projetos seria dinâmica (mock)</q-banner>
    </div>
  `,
});

// Componente Galeria
const GalleryComponent = defineComponent({
  props: ['element'],
  template: `
    <div class="q-pa-md" style="background-color: #9C27B0; color: white; border-radius: 12px;">
      <q-input filled v-model="element.data.title" label="Título da Galeria" />
      <q-banner class="q-mt-sm bg-grey-4 text-white">📸 Galeria de imagens mockada aqui</q-banner>
    </div>
  `,
});

// Componente Contato
const ContactComponent = defineComponent({
  props: ['element'],
  template: `
    <div class="q-pa-md" style="background-color: #F44336; color: white; border-radius: 12px;">
      <q-input filled v-model="element.data.email" label="Seu e-mail de contato" />
      <q-banner class="q-mt-sm bg-grey-4 text-white">💌 Formulário de contato simulado</q-banner>
    </div>
  `,
});

interface Element {
  type: string;
  template: string;
}
function renderComponent(element: Element) {
  switch (element.type) {
    case 'hero':
      return HeroComponent;
    case 'about':
      return AboutComponent;
    case 'projects':
      return ProjectsComponent;
    case 'gallery':
      return GalleryComponent;
    case 'contact':
      return ContactComponent;
    case 'header':
      return HeaderComponent;
    default:
      return defineComponent({ template: '<div>Componente desconhecido</div>' });
  }
}
</script>
