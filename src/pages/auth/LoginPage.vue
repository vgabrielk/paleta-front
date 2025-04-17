<template>
  <div class="flex bg-gray-100 items-center justify-center min-h-screen" style="height: 100vh">
    <div
      class="w-full max-w-md bg-white p-8 shadow-2xl rounded-xl q-card--bordered q-pa-lg rounded-borders"
      style="min-width: 20%"
    >
      <h2 class="text-2xl font-bold mb-6 text-center text-primary">
        Portfol<span class="text-accent">.io</span>
      </h2>
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

        <q-btn type="submit" label="Entrar" color="primary" class="full-width" />

        <div class="text-center q-mt-md">
          <q-btn flat label="Criar conta" to="/register" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import api from '../../api/api';
import axios from 'axios';

const $q = useQuasar();
const email = ref('');
const password = ref('');

async function submitLogin() {
  $q.loading.show({
    message: 'Entrando...',
    spinnerColor: 'primary',
  });
  try {
    const { data } = await api.post('/login', {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = '/';
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const responseData = error.response.data;

      if (status === 422 && responseData.error) {
        const messages = Object.values(responseData.error)
          .flat()
          .filter((m): m is string => typeof m === 'string');
        messages.forEach((msg: string) => {
          $q.notify({
            type: 'negative',
            message: msg,
            position: 'top',
          });
        });
      } else if (status === 404 || status === 401) {
        $q.notify({
          type: 'negative',
          message: responseData.error,
          position: 'top',
        });
      } else {
        $q.notify({
          type: 'negative',
          message: 'Ocorreu um erro inesperado. Tente novamente.',
          position: 'top',
        });
      }
    } else {
      $q.notify({
        type: 'negative',
        message: 'Não foi possível conectar ao servidor.',
        position: 'top',
      });
    }
  } finally {
    $q.loading.hide();
  }
}

onMounted(() => {
  localStorage.clear();
});
</script>
