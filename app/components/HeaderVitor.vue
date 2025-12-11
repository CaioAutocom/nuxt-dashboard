<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/vitor">Nuxt + Nuxt UI Testes</NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />

      <UButton to="/vitor" icon="i-material-symbols:home-outline-rounded" aria-label="Home" color="neutral" variant="ghost" label="Voltar ao index" />
    </template>
  </UHeader>
</template>
