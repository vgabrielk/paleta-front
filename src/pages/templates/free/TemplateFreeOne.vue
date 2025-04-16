<template>
  <div class="bg-grey-1 q-pa-xl">
    <div class="row items-center justify-between q-mb-xl">
      <div class="row items-center q-gutter-sm">
        <h6 class="text-2xl font-bold text-center text-primary">
          Paleta<span class="text-accent">.io</span>
        </h6>
      </div>

      <div class="row items-center q-gutter-md">
        <div class="row justify-center q-gutter-sm q-mb-xl">
          <q-btn outline color="primary" label="1. General Info" />
          <q-btn flat color="primary" label="2. Skills & Experience" />
          <q-btn flat color="primary" label="3. Education & Links" />
        </div>
      </div>
    </div>

    <q-card flat bordered class="q-pa-xl q-mb-xl">
      <div class="row items-center q-col-gutter-xl">
        <div class="col-md-8">
          <div class="text-h5">👋 Oi, eu sou {{ data.name }} – {{ data.title }}</div>
          <p class="q-mt-md text-body1">{{ data.description }}</p>
        </div>
        <div class="col-md-3 offset-md-1">
          <q-avatar size="120px">
            <img :src="data.avatar" alt="Avatar" />
          </q-avatar>
        </div>
      </div>
    </q-card>

    <q-card flat bordered class="q-pa-xl q-mb-xl" v-if="data.skills?.length">
      <div class="text-h6 q-mb-md">🧠 Skills</div>
      <div class="row q-col-gutter-md">
        <div v-for="(skill, index) in data.skills" :key="index" class="col-xs-12 col-sm-6 col-md-4">
          <q-card
            flat
            bordered
            hoverable
            class="q-pa-md custom-card"
            :elevation="1"
            :hover-elevation="4"
          >
            <div class="text-subtitle1 text-weight-bold">{{ skill.title }}</div>
            <div class="text-caption q-mt-xs">{{ skill.short_description }}</div>
          </q-card>
        </div>
      </div>
    </q-card>

    <q-card v-if="data.experiences?.length" flat bordered class="q-pa-xl q-mb-xl">
      <div class="text-h6 q-mb-md">💼 Experiência</div>
      <q-timeline color="primary">
        <q-timeline-entry
          v-for="experience in data.experiences"
          :key="experience.role"
          :title="experience.role"
          :subtitle="experience.company"
        >
          <div class="text-caption">{{ experience.period }}</div>
          <p class="q-mt-sm">{{ experience.description }}</p>
        </q-timeline-entry>
      </q-timeline>
    </q-card>

    <q-card v-if="data.education?.length" flat bordered class="q-pa-xl q-mb-xl">
      <div class="text-h6 q-mb-md">🎓 Educação</div>
      <q-list bordered>
        <q-item v-for="edu in data.education" :key="edu.course" class="q-py-sm">
          <q-item-section>
            <div class="text-subtitle1">{{ edu.course }}</div>
            <div class="text-caption text-grey">{{ edu.institution }}</div>
            <div class="text-caption">{{ edu.period }}</div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <div v-if="data.links?.length" class="q-mt-lg row q-gutter-sm justify-center">
      <q-btn
        v-for="(link, index) in data.links"
        :key="index"
        :href="link.url"
        target="_blank"
        type="a"
        flat
        round
        dense
        icon="open_in_new"
        class="text-primary"
      >
        <q-tooltip>{{ link.label }}</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: {
    name: string;
    title: string;
    description: string;
    avatar: string;
    links: {
      label: string;
      url: string;
    }[];
    skills: { title: string; short_description: string }[];
    experiences?: {
      role: string;
      company: string;
      period: string;
      description: string;
    }[];
    education?: {
      course: string;
      institution: string;
      period: string;
    }[];
  };
}>();
</script>

<style>
.custom-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.custom-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
</style>
