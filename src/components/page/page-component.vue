<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md bg-grey-2">
        <slot></slot>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
defineProps({
  children: Array,
});
</script>
