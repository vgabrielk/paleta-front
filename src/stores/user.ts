import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';
import api from 'src/api/api';
export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
  }),

  actions: {
    login() {
      this.isAuthenticated = true;
    },
    async logout() {
      this.isAuthenticated = false;
      const $q = useQuasar();

      try {
        await api.post('/logout');
        window.location.href = '/';
      } catch (e) {
        console.error('Erro ao fazer logout na API', e);
      }

      localStorage.removeItem('token');
      this.isAuthenticated = false;

      $q.notify({
        type: 'positive',
        message: 'Você saiu com sucesso!',
      });
    },
  },
});
