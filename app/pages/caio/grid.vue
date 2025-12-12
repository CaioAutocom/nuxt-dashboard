<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { NavigationMenuItem, TableColumn, TableRow } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { useClipboard } from '@vueuse/core'
import type { PessoaBuscarTodosSimplificadoPaginadoResponseType, PessoaBuscarTodosSimplificadoRequestType } from '~/core/schemas/pessoas/pessoa.schema'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()
const { copy } = useClipboard()

export interface Pessoa {
  id: string
  idAlternativo: string
  nome: string
  apelidoFantasia: string
  fisJur: 'Fisica' | 'Juridica'
  docCpfCnpj: string
  docIdentidade: string
  ativo: boolean
}
const columns: TableColumn<Pessoa>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-start w-1' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'start'
            },
            items: getRowItems(row),
            'aria-label': 'Actions dropdown'
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown'
            })
        )
      )
    }
  },
  {
    accessorKey: 'idAlternativo',
    header: 'Cód. Alternativo'
    // cell: ({ row }) => {
    //   return new Date(row.getValue('date')).toLocaleString('en-US', {
    //     day: 'numeric',
    //     month: 'short',
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     hour12: false
    //   })
    // }
  },
  {
    accessorKey: 'nome',
    header: 'Nome'
    // cell: ({ row }) => {
    //   const color = {
    //     paid: 'success' as const,
    //     failed: 'error' as const,
    //     refunded: 'neutral' as const
    //   }[row.getValue('status') as string]

    //   return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
    // }
  },
  {
    accessorKey: 'apelidoFantasia',
    header: 'Apelido/Fantasia'
  },
  {
    accessorKey: 'fisJur',
    header: 'Fis/Jur'
  },
  {
    accessorKey: 'docCpfCnpj',
    header: 'CPF/CNPJ'
  },
  {
    accessorKey: 'docIdentidade',
    header: 'Identidade'
  },
  {
    accessorKey: 'ativo',
    header: 'Ativo',
    cell: ({ row }) => {
      const ativo = row.getValue('ativo') as boolean
      const color = ativo ? 'success' : 'error'
      const label = ativo ? 'Ativo' : 'Inativo'
      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => label)
    }
  }
]

const anchor = ref({ x: 0, y: 0 })

const open = ref(false)
const selectedRow = ref<TableRow<Pessoa> | null>(null)

function onHover(_e: Event, row: TableRow<Pessoa> | null) {
  selectedRow.value = row

  open.value = !!row
}

function getRowItems(row: Row<Pessoa>) {
  return [
    {
      type: 'label',
      label: 'Actions'
    },
    {
      label: 'Copy payment ID',
      onSelect() {
        copy(row.original.id)

        toast.add({
          title: 'Payment ID copied to clipboard!',
          color: 'success',
          icon: 'i-lucide-circle-check'
        })
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'View customer'
    },
    {
      label: 'View payment details'
    }
  ]
}

const links = [
  [
    {
      label: 'Pessoas',
      icon: 'i-lucide-user',
      to: '/settings',
      exact: true
    },
    {
      label: 'Clientes',
      icon: 'i-lucide-users',
      to: '/settings/members'
    },
    {
      label: 'Fornecedores',
      icon: 'i-lucide-bell',
      to: '/settings/notifications'
    },
    {
      label: 'Vendedores',
      icon: 'i-lucide-shield',
      to: '/settings/security'
    }
  ]
] satisfies NavigationMenuItem[][]

const params: PessoaBuscarTodosSimplificadoRequestType = {
  NumeroDaPagina: 1,
  TamanhoDaPagina: 20
}

const { data, error } = await useFetch<PessoaBuscarTodosSimplificadoPaginadoResponseType>('/api/pessoas/buscarTodosSimplificado', {
  method: 'GET',
  params
})

if (error.value) {
  toast.add({
    title: 'Falha ao carregar pessoas',
    description: error.value?.message ?? 'Tente novamente mais tarde.',
    color: 'error',
    icon: 'i-lucide-triangle-alert'
  })
}
</script>

<template>
  <UDashboardPanel id="grid" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <UDashboardNavbar title="Grid">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <!-- NOTE: The `-mx-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
        <UNavigationMenu :items="links" highlight class="-mx-1 flex-1" />
      </UDashboardToolbar>
    </template>

    <template #body>
      <UTable
        :data="data?.items ?? []"
        :columns="columns"
        class="flex-1"
        @pointermove="
          (ev: PointerEvent) => {
            anchor.x = ev.clientX
            anchor.y = ev.clientY
          }
        "
        @hover="onHover"
      />
    </template>
  </UDashboardPanel>
</template>
