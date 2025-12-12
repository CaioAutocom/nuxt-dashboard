<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

type Unidade = {
  id: string
  sigla: string
  nome: string
  observacoes: string
  ativo: boolean
}

const { data, error, status } = await useFetch<Unidade[]>('/api/unidade/buscarTodos', { method: 'GET' })

const columns: TableColumn<Unidade>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'sigla',
    header: 'Sigla'
  },
  {
    accessorKey: 'nome',
    header: 'Nome'
  },
  {
    accessorKey: 'observacoes',
    header: 'Observações'
  },
  {
    accessorKey: 'ativo',
    header: 'Ativo'
  }
]
</script>

<template>
  <section>
    <h1>Grid Fetch teste</h1>
    <USeparator class="h-10" />

    <p v-if="status === 'error'" class="text-red-500 border p-4 mt-4 mb-10">Erro no fetch (no momento atualição do token precisa ser feita manualmente no arquivo...)</p>

    <UTable :data="data" :columns="columns" :loading="status === 'pending'" class="flex-1 h-80" />
  </section>
</template>
