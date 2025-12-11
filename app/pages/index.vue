<script setup lang="ts">
import { sub } from 'date-fns'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Period, Range } from '~/types'

const { isNotificationsSlideoverOpen } = useDashboard()

const items = [
  [
    {
      label: 'New mail',
      icon: 'i-lucide-send',
      to: '/inbox'
    },
    {
      label: 'New customer',
      icon: 'i-lucide-user-plus',
      to: '/customers'
    }
  ]
] satisfies DropdownMenuItem[][]

const navMenuItems = ref([
  {
    label: 'Vitor',
    to: '/docs/getting-started',
    children: [
      {
        icon: 'i-lucide-search',
        label: 'Pesquisa',
        description: 'Avaliação feita sobre frameworks Nuxt, Nuxt UI e PrimeVue contendo seus pros e contras',
        to: 'vitor/Markdown'
      },
      {
        icon: 'i-streamline-ultimate:task-list-approve-bold',
        label: 'Validação de formulário',
        description: 'Testa integração dos esquemas zod com o formulário do Nuxt UI',
        to: 'vitor/FormTeste'
      },
      {
        icon: 'i-lucide-grid',
        label: 'Grids',
        description: 'Testa a grid do Nuxt UI...',
        to: 'vitor/Grids'
      }
      // {
      //   icon: 'i-lucide-file-box',
      //   label: 'Formulário de produto',
      //   description: 'Recria o formulário de produto usando Nuxt UI',
      //   to: 'vitor/FormProduto'
      // }
    ]
  },
  {
    label: 'Caio',
    to: '/docs/composables',
    children: [
      {
        label: 'defineShortcuts',
        icon: 'i-lucide-file-text',
        description: 'Define shortcuts for your application.',
        to: '/docs/composables/define-shortcuts'
      },
      {
        label: 'useOverlay',
        icon: 'i-lucide-file-text',
        description: 'Display a modal/slideover within your application.',
        to: '/docs/composables/use-overlay'
      },
      {
        label: 'useToast',
        icon: 'i-lucide-file-text',
        description: 'Display a toast within your application.',
        to: '/docs/composables/use-toast'
      }
    ]
  }
])

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})
const period = ref<Period>('daily')
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Home" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UNavigationMenu :items="navMenuItems" class="w-100" />

          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton color="neutral" variant="ghost" square @click="isNotificationsSlideoverOpen = true">
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- NOTE: The `-ms-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
          <HomeDateRangePicker v-model="range" class="-ms-1" />

          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <HomeStats :period="period" :range="range" />
      <HomeChart :period="period" :range="range" />
      <HomeSales :period="period" :range="range" />
    </template>
  </UDashboardPanel>
</template>
