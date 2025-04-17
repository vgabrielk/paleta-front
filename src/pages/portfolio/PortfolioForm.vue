<template>
  <page-component>
    <q-card flat bordered class="bg-grey-1 q-pa-md" style="max-height: 85vh; overflow-y: auto">
      <q-tabs
        v-model="activeTab"
        class="text-primary"
        align="left"
        active-color="accent"
        indicator-color="accent"
      >
        <q-tab name="main" label="Informações principais" />
        <q-tab name="experience" label="Experiências" />
        <q-tab name="education" label="Educação" />
        <q-tab name="skills" label="Habilidades" />
      </q-tabs>

      <q-separator class="q-my-md" />

      <q-tab-panels v-model="activeTab" animated ref="formRef" @submit.prevent="handleSubmit">
        <q-tab-panel name="main">
          <q-form class="q-gutter-md">
            <q-card-section>
              <div class="row q-col-gutter-md">
                <q-input
                  v-model="form.data.name"
                  label="Nome"
                  outlined
                  dense
                  class="col-12 col-md-6"
                />
                <q-input
                  v-model="form.data.title"
                  label="Título profissional"
                  outlined
                  dense
                  class="col-12 col-md-6"
                />
              </div>
              <q-input
                v-model="form.data.description"
                label="Bio"
                type="textarea"
                outlined
                dense
                autogrow
                class="q-mt-md"
              />
              <q-input
                v-model="form.data.avatar"
                label="URL da imagem/avatar"
                outlined
                dense
                class="q-mt-md"
              />
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="text-subtitle2 q-mb-sm">Redes Sociais</div>
              <div
                v-for="(link, index) in form.data.links"
                :key="index"
                class="row items-center q-col-gutter-sm q-mb-sm"
              >
                <q-input v-model="link.label" label="Nome" outlined dense class="col" />
                <q-input v-model="link.url" label="URL" outlined dense class="col" />
                <q-btn icon="delete" flat round dense color="negative" @click="removeLink(index)" />
              </div>
              <q-btn
                flat
                icon="add"
                label="Adicionar link"
                color="primary"
                @click="addLink"
                class="q-mt-sm"
              />
            </q-card-section>
          </q-form>
        </q-tab-panel>

        <!-- Aba: Experiências -->
        <q-tab-panel name="experience">
          <q-card-section>
            <div class="text-subtitle2 q-mb-md">Experiências</div>

            <div
              v-for="(exp, index) in form.data.experiences"
              :key="'exp-' + index"
              class="q-pa-sm q-mb-md bg-white rounded-borders shadow-1"
            >
              <div class="row q-col-gutter-md">
                <q-input v-model="exp.role" label="Cargo" outlined dense class="col-12 col-md-6" />
                <q-input
                  v-model="exp.company"
                  label="Empresa"
                  outlined
                  dense
                  class="col-12 col-md-6"
                />
              </div>
              <q-input v-model="exp.period" label="Período" outlined dense class="q-mt-sm" />
              <q-input
                v-model="exp.description"
                label="Descrição"
                type="textarea"
                autogrow
                outlined
                dense
                class="q-mt-sm"
              />
              <div class="q-mt-sm">
                <q-btn
                  icon="delete"
                  color="negative"
                  flat
                  round
                  dense
                  @click="removeExperience(index)"
                />
              </div>
            </div>

            <q-btn
              flat
              icon="add"
              label="Adicionar experiência"
              color="primary"
              @click="addExperience"
            />
          </q-card-section>
        </q-tab-panel>

        <!-- Aba: Educação -->
        <q-tab-panel name="education">
          <q-card-section>
            <div class="text-subtitle2 q-mb-md">Educação</div>

            <div
              v-for="(edu, index) in form.data.education"
              :key="'edu-' + index"
              class="q-pa-sm q-mb-md bg-white rounded-borders shadow-1"
            >
              <div class="row q-col-gutter-md">
                <q-input
                  v-model="edu.course"
                  label="Curso"
                  outlined
                  dense
                  class="col-12 col-md-6"
                />
                <q-input
                  v-model="edu.institution"
                  label="Instituição"
                  outlined
                  dense
                  class="col-12 col-md-6"
                />
              </div>
              <q-input v-model="edu.period" label="Período" outlined dense class="q-mt-sm" />
              <div class="q-mt-sm">
                <q-btn
                  icon="delete"
                  color="negative"
                  flat
                  round
                  dense
                  @click="removeEducation(index)"
                />
              </div>
            </div>

            <q-btn
              flat
              icon="add"
              label="Adicionar formação"
              color="primary"
              @click="addEducation"
            />
          </q-card-section>
        </q-tab-panel>
        <!-- Habilidades -->
        <q-tab-panel name="skills">
          <q-card-section>
            <div class="text-subtitle2 q-mb-md">Habilidades</div>

            <div
              v-for="(skill, index) in form.data.skills"
              :key="'skill-' + index"
              class="q-pa-sm q-mb-md bg-white rounded-borders shadow-1"
            >
              <div class="row q-col-gutter-md">
                <q-input
                  v-model="skill.title"
                  label="Título(Ex: Laravel, PHP)"
                  outlined
                  dense
                  class="col-12 col-md-6"
                />
                <q-input
                  v-model="skill.short_description"
                  label="Descrição curta"
                  outlined
                  dense
                  class="col-12 col-md-6"
                />
              </div>
              <div class="q-mt-sm">
                <q-btn
                  icon="delete"
                  color="negative"
                  flat
                  round
                  dense
                  @click="removeSkill(index)"
                />
              </div>
            </div>

            <q-btn
              flat
              icon="add"
              label="Adicionar experiência"
              color="primary"
              @click="addSkill"
            />
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>

      <q-separator class="q-my-md" />

      <q-card-actions align="right">
        <q-btn label="Salvar" color="primary" @click="handleSubmit" />
      </q-card-actions>
    </q-card>
  </page-component>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from 'src/api/api';
import { Notify, useQuasar } from 'quasar';
import PageComponent from 'src/components/page/page-component.vue';
import type { AxiosError } from 'axios';

const route = useRoute();
const router = useRouter();
const activeTab = ref('main');
const portfolioId = route.params.id as string | undefined;
const $q = useQuasar();

const form = reactive({
  id: 0,
  data: {
    name: '',
    title: '',
    description: '',
    avatar: '',
    links: [{ label: '', url: '' }],
    experiences: [
      { role: '', company: '', period: '', description: '', portfolio_id: null as number | null },
    ],
    education: [{ course: '', institution: '', period: '', portfolio_id: null as number | null }],
    skills: [{ title: '', short_description: '', portfolio_id: null as number | null }],
  },
});
const loadPortfolio = async () => {
  try {
    const { data } = await api.get(`/portfolio/${portfolioId}`);
    Object.assign(form, {
      id: data.id,
      template_id: data.template_id ?? null,
    });
    Object.assign(form.data, {
      name: data.data?.name || '',
      title: data.data?.title || '',
      description: data.data?.description || '',
      avatar: data.data?.avatar || '',
      links: data.data?.links?.length ? data.data.links : [{ label: '', url: '' }],
      experiences: data.data?.experiences?.length
        ? data.data.experiences
        : [{ role: '', company: '', period: '', description: '', portfolio_id: null }],
      education: data.data?.education?.length
        ? data.data.education
        : [{ course: '', institution: '', period: '', portfolio_id: null }],
      skills: data.data?.skills?.length
        ? data.data.skills
        : [{ title: '', short_description: '', portfolio_id: null }],
    });
  } catch (error) {
    console.error('Erro ao carregar portfólio:', error);
    Notify.create({ message: 'Erro ao carregar portfólio', color: 'negative' });
  }
};

onMounted(async () => {
  if (portfolioId) {
    $q.loading.show({
      spinnerColor: 'white',
    });
    try {
      await loadPortfolio();
    } catch (error) {
      console.error('Erro ao carregar portfólio:', error);
    } finally {
      $q.loading.hide();
    }
  }
});

const handleSubmit = async () => {
  try {
    if (form.id) {
      const payload = {
        id: form.id,
        template_type: route.query.type || 'free',
        data: {
          name: form.data.name,
          title: form.data.title,
          description: form.data.description,
          avatar: form.data.avatar,
          links: form.data.links,
          experiences: form.data.experiences,
          education: form.data.education,
          skills: form.data.skills,
        },
      };
      await api.put(`/portfolio/${form.id}`, payload);
      Notify.create({
        message: 'Portfólio atualizado com sucesso!',
        color: 'positive',
        icon: 'check_circle',
      });
    } else {
      const payload = {
        id: form.id,
        template_type: route.query.type,
        data: {
          name: form.data.name,
          title: form.data.title,
          description: form.data.description,
          avatar: form.data.avatar,
          links: form.data.links,
          experiences: form.data.experiences,
          education: form.data.education,
          skills: form.data.skills,
        },
      };
      await api.post('/portfolio', payload);
      Notify.create({
        message: 'Portfólio criado com sucesso!',
        color: 'positive',
        icon: 'check_circle',
      });
    }
    await router.push({ name: 'my-portfolios' });
  } catch (error) {
    const err = error as AxiosError<Record<string, string[]>>;
    if (err.response?.data?.errors) {
      Object.values(err.response.data.errors).forEach((messages: string) => {
        if (Array.isArray(messages)) {
          messages.forEach((msg: string) => {
            Notify.create({
              message: msg,
              color: 'negative',
              icon: 'error',
            });
          });
        }
      });
    }
  }
};

const addLink = () => form.data.links.push({ label: '', url: '' });
const removeLink = (index: number) => form.data.links.splice(index, 1);

const addExperience = () =>
  form.data.experiences.push({
    role: '',
    company: '',
    period: '',
    description: '',
    portfolio_id: form.id,
  });

const removeExperience = (index: number) => form.data.experiences.splice(index, 1);

const addEducation = () =>
  form.data.education.push({
    course: '',
    institution: '',
    period: '',
    portfolio_id: form.id,
  });
const removeEducation = (index: number) => form.data.education.splice(index, 1);

const addSkill = () =>
  form.data.skills.push({
    title: '',
    short_description: '',
    portfolio_id: form.id,
  });
const removeSkill = (index: number) => form.data.skills.splice(index, 1);
</script>
