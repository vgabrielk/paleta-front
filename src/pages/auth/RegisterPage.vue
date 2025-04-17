<template>
  <div class="flex min-h-screen bg-gray-100 items-center justify-center" style="height: 100vh">
    <div
      class="w-full max-w-md bg-white p-8 shadow-2xl rounded-xl q-card--bordered q-pa-lg rounded-borders"
      style="min-width: 20%"
    >
      <h2 class="text-2xl font-bold mb-6 text-center text-primary">
        Portfol<span class="text-accent">.io</span>
      </h2>
      <q-form @submit.prevent="submitRegister" class="space-y-4">
        <q-input v-model="name" label="Nome completo" outlined dense required class="q-mb-md" />
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

        <q-btn type="submit" label="Cadastrar" color="primary" class="full-width q-mt-md" />

        <div class="text-center q-mt-md">
          <q-btn flat label="Já tem conta? Entrar" to="/login" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import type { AxiosError } from 'axios';

import api from '../../api/api';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const $q = useQuasar();

async function submitRegister() {
  $q.loading.show({
    message: 'Criando conta...',
    spinnerColor: 'primary',
    spinnerSize: 50,
  });
  try {
    const { data } = await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    await router.push('/login');
    $q.notify({
      message: 'Conta criada com sucesso!',
      color: 'positive',
      icon: 'check_circle',
    });
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
}
</script>
