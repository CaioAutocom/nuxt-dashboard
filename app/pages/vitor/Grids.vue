<script setup lang="ts"></script>

<template>
  <UDashboardPanel id="vitorGrids">
    <template #header>
      <HeaderVitor />
    </template>

    <template #body>
      <GridFetchTeste />
      <USeparator class="h-32" color="primary" />
      <GridTeste />
    </template>
  </UDashboardPanel>
</template>
