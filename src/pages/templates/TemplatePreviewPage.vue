<template>
  <q-page class="bg-grey-2 q-pa-md">
    <q-card flat bordered class="q-pa-md" v-if="templateData && !loading">
      <component v-if="selectedTemplate" :is="selectedTemplate.component" :data="templateData" />
    </q-card>
    <q-btn
      disabled
      label="Usar este template"
      color="primary"
      class="q-mt-lg"
      @click="useTemplate"
    />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { templates } from '.';
import api from '../../api/api';

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  course: string;
  institution: string;
  period: string;
}

interface PortfolioData {
  name: string;
  title: string;
  description: string;
  avatar: string;
  links: { label: string; url: string }[];
  skills: { title: string; short_description: string }[];
  experiences?: Experience[];
  educations?: Education[];
  template_id?: number;
}

const route = useRoute();
const router = useRouter();
const loading = ref(true);

const placeholderData = {
  name: 'Lucas Andrade',
  title: 'Desenvolvedor Full Stack',
  description:
    'Sou apaixonado por tecnologia, com foco em soluções web modernas e interfaces intuitivas. Tenho experiência em Vue.js, Laravel, e outras ferramentas bacanas.',
  avatar: 'https://i.pravatar.cc/150?img=12',
  links: [
    { label: 'GitHub', url: 'https://github.com/lucasandrade' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/lucasandrade' },
    { label: 'Portfólio', url: 'https://lucasandrade.dev' },
  ],
  skills: [
    { title: 'Vue.js', short_description: 'Criação de SPAs reativas e performáticas.' },
    { title: 'Laravel', short_description: 'APIs robustas e seguras com Laravel.' },
    { title: 'UX/UI', short_description: 'Interfaces que combinam beleza com usabilidade.' },
    { title: 'DevOps', short_description: 'Docker, CI/CD e deploys automatizados.' },
    { title: 'TypeScript', short_description: 'Código mais seguro e escalável.' },
    { title: 'Banco de Dados', short_description: 'PostgreSQL, MySQL e MongoDB.' },
  ],
  experiences: [
    {
      role: 'Desenvolvedor Fullstack',
      company: 'TechSolutions',
      period: 'Atual',
      description:
        'Atuação em projetos de larga escala com Vue 3, Quasar Framework e integração com APIs RESTful.',
    },
    {
      role: 'Desenvolvedor Frontend',
      company: 'TechNova',
      period: 'Jan 2022 – Mar 2023',
      description:
        'Atuação em projetos de larga escala com Vue 3, Quasar Framework e integração com APIs RESTful.',
    },
    {
      role: 'Estagiário Full Stack',
      company: 'InovaCode',
      period: 'Jul 2020 – Dez 2021',
      description:
        'Desenvolvimento de sistemas internos utilizando Laravel no backend e Vue.js no frontend.',
    },
  ],
  education: [
    {
      course: 'Sistemas de Informação',
      institution: 'Universidade Federal de Tecnologia',
      period: '2018 – 2022',
    },
    {
      course: 'Curso de Especialização em Vue.js',
      institution: 'Alura',
      period: '2021',
    },
  ],
};

const templateData = ref<PortfolioData | null>(null);

const getPreviewData = async () => {
  try {
    const { data } = await api.get(`/portfolio/${route.params.portfolioId as string}`);
    templateData.value = data.data;
  } catch (error) {
    templateData.value = placeholderData;
    console.error('Erro ao buscar os dados do portfólio:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await getPreviewData();
});

const selectedTemplate = computed(() => {
  return templates.find((t) => t.id === route.params.id) || templates[0];
});

const useTemplate = () => {
  if (selectedTemplate.value) {
    localStorage.setItem('selected_template', selectedTemplate.value.id);
  }

  void router.push({ name: 'editor' });
};
</script>
