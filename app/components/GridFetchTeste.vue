<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

type User = {
  id: string;
  sigla: string;
  nome: string;
  observacoes: string;
  ativo: boolean;
};

const { data, status } = await useFetch<User[]>(
  "https://vpsh-01.esistem.com.br/api/v1/produto-unidade/buscar-todos",
  {
    key: "table-users",
    lazy: true,
    onRequest({ options }) {
      // import.meta.env.TOKEN
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcEFkZHJlc3MiOiIxNzkuMTA2LjE1Mi4xIiwibmFtZWlkIjoiMDE5NmQ0ZDYtYTY5My03MDMyLTg4NzgtMWRmODc1N2Q4Y2IyIiwidW5pcXVlX25hbWUiOiJUZXN0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZnVsbE5hbWUiOiJOL0EiLCJwaG9uZSI6Ik4vQSIsInRlbmFudF9hZG1pbiI6ImZhbHNlIiwidGVuYW50X2dyb3VwX2lkIjoiMDE5NmQ0ZDYtYTZiOS03NmVkLWI2MjUtMDkzYWNjM2RlOWNkIiwidGVuYW50X2lkIjoiMDE5NmQ0ZDYtYTZjNC03MGRhLWI2NmEtNzAxMzlmYTI0NzZjIiwidGVuYW50X3Njb3BlIjoiTi9BIiwianRpIjoiMDE5YjBkNTgtZWRlYi03NjYzLWJjMDQtMzg0M2Y3MTdmNWUzIiwibmJmIjoxNzY1NDU1NDkwLCJleHAiOjE3NjU0NTYzOTAsImlhdCI6MTc2NTQ1NTQ5MCwiaXNzIjoiZXNzZW5jaWFsIiwiYXVkIjoiZXNzZW5jaWFsIn0.eqdpuZ3df1I6TwRXkUmxZxV3JTwSMbupM1w7C4qV6ng";

      if (!options.headers) options.headers = new Headers();
      options.headers.set("Authorization", `Bearer ${token}`);
    },
  },
);

const columns: TableColumn<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "sigla",
    header: "Sigla",
  },
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "observacoes",
    header: "Observações",
  },
  {
    accessorKey: "ativo",
    header: "Ativo",
  },
];
</script>

<template>
  <section>
    <h1>Grid Fetch teste</h1>
    <USeparator class="h-10" />

    <p v-if="status === 'error'" class="text-red-500 border p-4 mt-4 mb-10">
      Erro no fetch (no momento atualição do token precisa ser feita manualmente
      no arquivo...)
    </p>

    <UTable
      :data="data"
      :columns="columns"
      :loading="status === 'pending'"
      class="flex-1 h-80"
    />
  </section>
</template>
