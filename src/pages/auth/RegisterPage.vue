<template>
  <div class="flex min-h-screen bg-gray-100 items-center justify-center">
    <div class="w-full max-w-md bg-white p-8 shadow-2xl rounded-xl">
      <h1 class="text-2xl font-bold mb-6 text-center text-primary">
        Paleta<span class="text-accent">.io</span>
      </h1>

      <q-form @submit.prevent="submitRegister" class="space-y-4">
        <q-input v-model="name" label="Nome completo" outlined dense required />
        <q-input v-model="email" label="E-mail" type="email" outlined dense required />
        <q-input v-model="password" label="Senha" type="password" outlined dense required />

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
import api from '../../api/api';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');

async function submitRegister() {
  try {
    const { data } = await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    await router.push('/login');
  } catch (error) {
    console.error(error);
  }
}
</script>
