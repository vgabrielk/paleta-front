<template>
  <div class="flex min-h-screen bg-gray-100 items-center justify-center">
    <div class="w-full max-w-md bg-white p-8 shadow-2xl rounded-xl">
      <h1 class="text-2xl font-bold mb-6 text-center text-primary">
        Paleta<span class="text-accent">.io</span>
      </h1>
      <q-form @submit.prevent="submitLogin" class="space-y-4">
        <q-input
          v-model="email"
          label="E-mail"
          type="email"
          outlined
          dense
          required
          class="q-mb-md"
        />
        <q-input
          v-model="password"
          label="Senha"
          type="password"
          outlined
          dense
          required
          class="q-mb-md"
        />

        <q-btn type="submit" label="Entrar" color="primary" class="full-width q-mt-md" />

        <div class="text-center q-mt-md">
          <q-btn flat label="Criar conta" to="/register" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '../../api/api';

const email = ref('');
const password = ref('');

async function submitLogin() {
  try {
    const { data } = await api.post('/login', {
      email: email.value,
      password: password.value,
    });

    console.log(data.token);

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    window.location.href = '/';
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  localStorage.clear();
});
</script>
