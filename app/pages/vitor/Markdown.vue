<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>

<template>
  <UDashboardPanel id="vitorMarkdown">
    <template #header>
      <HeaderVitor />
    </template>

    <template #body>
      <ContentRenderer v-if="home" :value="home" />
      <div v-else>Markdown não encontrado...</div>
    </template>
  </UDashboardPanel>
</template>
