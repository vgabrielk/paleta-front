<template>
  <div class="min-h-screen bg-white font-sans text-gray-800">
    <header
      class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-50"
    >
      <div
        class="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div class="flex items-center gap-4">
          <img :src="data.avatar" alt="Avatar" class="w-14 h-14 rounded-full shadow-md" />
          <div>
            <h1 class="text-2xl font-bold">{{ data.name }}</h1>
            <p class="text-sm opacity-80">{{ data.title }}</p>
          </div>
        </div>
        <nav class="flex flex-wrap gap-3">
          <a
            v-for="link in data.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            class="bg-white text-indigo-600 text-sm font-medium px-4 py-2 rounded-full shadow hover:bg-indigo-100 transition"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>
    </header>

    <section class="text-center py-20 px-6 bg-gray-50">
      <h2 class="text-4xl font-extrabold mb-4">✨ Portfólio Premium</h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        {{ data.description }}
      </p>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <h3 class="text-2xl font-semibold text-center mb-12">💡 Minhas habilidades</h3>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div
            v-for="skill in data.skills"
            :key="skill.title"
            class="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h4 class="font-bold text-indigo-700 mb-1">{{ skill.title }}</h4>
            <p class="text-sm text-gray-600">{{ skill.short_description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6">
        <h3 class="text-2xl font-semibold text-center mb-12">🚀 Experiências profissionais</h3>
        <div class="space-y-8">
          <div
            v-for="exp in data.experiences"
            :key="exp.role"
            class="bg-white p-6 rounded-2xl shadow border-l-4 border-indigo-600"
          >
            <div class="flex justify-between items-start mb-2">
              <div>
                <h4 class="text-lg font-bold text-gray-900">{{ exp.role }}</h4>
                <p class="text-sm text-indigo-700">{{ exp.company }}</p>
              </div>
              <span class="text-sm text-gray-500">{{ exp.period }}</span>
            </div>
            <p class="text-gray-600 text-sm">{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <h3 class="text-2xl font-semibold text-center mb-12">🎓 Educação</h3>
        <div class="grid sm:grid-cols-2 gap-8">
          <div
            v-for="edu in data.education"
            :key="edu.course"
            class="p-6 bg-indigo-600 text-white rounded-2xl shadow-lg hover:brightness-110 transition"
          >
            <h4 class="text-lg font-bold">{{ edu.course }}</h4>
            <p class="text-sm">{{ edu.institution }}</p>
            <p class="text-xs opacity-80 mt-1">{{ edu.period }}</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-gray-100 py-6 text-center text-sm text-gray-500">
      &copy; {{ new Date().getFullYear() }} {{ data.name }}. Todos os direitos reservados.
    </footer>
  </div>
</template>

<script setup lang="ts">
const data = defineProps<{
  name: string;
  title: string;
  description: string;
  avatar: string;
  links: { label: string; url: string }[];
  skills: { title: string; short_description: string }[];
  experiences: { role: string; company: string; period: string; description: string }[];
  education: { course: string; institution: string; period: string }[];
}>();
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
