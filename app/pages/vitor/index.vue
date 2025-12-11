<script setup lang="ts"></script>

<template>
  <UDashboardPanel id="vitorFormTeste">
    <template #body>
      <UPageSection
        id="testes"
        title="Testes feitos"
        :features="[
          {
            icon: 'i-lucide-search',
            title: 'Pesquisa',
            description: 'Avaliação feita sobre frameworks Nuxt, Nuxt UI e PrimeVue contendo seus pros e contras',
            to: 'Markdown'
          },
          {
            icon: 'i-streamline-ultimate:task-list-approve-bold',
            title: 'Validação de formulário',
            description: 'Testa integração dos esquemas zod com o formulário do Nuxt UI',
            to: 'FormTeste'
          },
          {
            icon: 'i-lucide-grid',
            title: 'Grids',
            description: 'Testa a grid do Nuxt UI...',
            to: 'Grids'
          },
          {
            icon: 'i-lucide-file-box',
            title: 'Formulário de produto',
            description: 'Recria o formulário de produto usando Nuxt UI',
            to: 'FormProduto'
          }
        ]"
      />
    </template>
  </UDashboardPanel>
</template>
