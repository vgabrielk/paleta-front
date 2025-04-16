<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-primary flex justify-between">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-btn
          flat
          dense
          icon="logout"
          label="Sair"
          @click="() => userStore.logout()"
          class="q-ml-sm"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <logo-component />
      <q-separator style="transform: translateY(-6px)" />
      <q-list>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import LogoComponent from 'src/components/logo/logo-component.vue';
import { useUserStore } from 'src/stores/user';
const userStore = useUserStore();

const linksList: EssentialLinkProps[] = [
  {
    title: 'Templates',
    caption: 'Ver templates disponíveis',
    icon: 'school',
    path: '/templates',
  },
  {
    title: 'Meus portfólios',
    caption: 'Editar portfólios',
    icon: 'person',
    path: '/portfolio',
  },
  {
    title: 'Sair',
    icon: 'logout',
    path: '/logout',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
