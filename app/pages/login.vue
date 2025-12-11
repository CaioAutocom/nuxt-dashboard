<script setup lang="ts">
import type { Tenant, UsuarioLoginResponse } from '~/core/schemas/auth/authLogin.schema'
import type { TreeItemSelectEvent, TreeItem } from 'reka-ui'

const router = useRouter()
const toast = useToast()

const data = ref([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  }
])

// Dados do formulário
const credentials = reactive({
  email: '',
  senha: ''
})

// Tenants recebidos no prelogin
const tenants = ref<Tenant[]>([])
const selectedTenant = ref<{ value: string; label: string } | undefined>(undefined)

// Dados do usuário recebidos no prelogin
const dadosUsuario = ref<{ id: string; nome: string; administrador: boolean } | null>(null)

// Controle de estado
const etapa = ref<'login' | 'tenant'>('login')
const loading = ref(false)

const items: TreeItem[] = [
  {
    label: 'app',
    defaultExpanded: true,
    children: [
      {
        label: 'composables',
        children: [{ label: 'useAuth.ts' }, { label: 'useUser.ts' }]
      },
      {
        label: 'components',
        defaultExpanded: true,
        children: [{ label: 'Card.vue' }, { label: 'Button.vue' }]
      }
    ]
  },
  { label: 'app.vue' },
  { label: 'nuxt.config.ts' }
]

const value = ref<typeof items>([])

function onSelect(e: TreeItemSelectEvent<TreeItem>) {
  if (e.detail.originalEvent.type === 'click') {
    e.preventDefault()
  }
}

// 1️⃣ PRELOGIN → valida credenciais e retorna tenants
async function prelogin() {
  loading.value = true
  try {
    const resposta = await $fetch<UsuarioLoginResponse>('/api/auth/prelogin', {
      method: 'POST',
      body: {
        email: credentials.email,
        senha: credentials.senha
      }
    })

    // Armazenar dados do usuário em memória
    dadosUsuario.value = {
      id: resposta.id,
      nome: resposta.nome,
      administrador: resposta.administrador
    }
    tenants.value = resposta.tenants
    etapa.value = 'tenant'

    toast.add({
      title: 'Credenciais validadas',
      description: 'Selecione um tenant para continuar'
    })
  } catch (err: any) {
    toast.add({
      title: 'Erro na autenticação',
      description: err?.data?.message || 'Credenciais inválidas'
    })
  } finally {
    loading.value = false
  }
}

// 2️⃣ LOGIN FINAL → gera token e cria sessão HttpOnly
async function loginFinal() {
  if (!selectedTenant.value) {
    toast.add({
      title: 'Tenant não selecionado',
      description: 'Por favor, selecione um tenant'
    })
    return
  }

  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: credentials.email,
        senha: credentials.senha,
        tenantId: selectedTenant.value.value,
        userId: dadosUsuario.value!.id,
        nome: dadosUsuario.value!.nome,
        administrador: dadosUsuario.value!.administrador
      }
    }).then(() => fetchUserSession())

    toast.add({
      title: 'Login realizado com sucesso',
      description: 'Redirecionando...'
    })

    // Redireciona para o dashboard
    router.push('/')
  } catch (err: any) {
    toast.add({
      title: 'Erro ao autenticar',
      description: err?.data?.message || 'Erro ao autenticar tenant'
    })
  } finally {
    loading.value = false
  }
}

// Opções para o select de tenants
const tenantsOptions = computed(() => tenants.value.map((t) => ({ value: t.id, label: t.nome })))
const { fetch: fetchUserSession } = useUserSession()
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
    <!-- 💠 Etapa 1: Login com email e senha -->
    <UCard v-if="etapa === 'login'" class="w-full max-w-sm sm:max-w-md">
      <template #header>
        <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <UIcon name="i-lucide-lock-keyhole" class="w-5 h-5 sm:w-6 sm:h-6" />
          <h2 class="text-lg sm:text-xl font-semibold text-center sm:text-left">Acessar Sistema</h2>
        </div>
      </template>

      <form @submit.prevent="prelogin" class="space-y-4 sm:space-y-5">
        <div class="space-y-2">
          <ULabel for="email" required class="text-sm sm:text-base">Email</ULabel>
          <UInput id="email" class="w-full" v-model="credentials.email" type="email" placeholder="seu@email.com" icon="i-lucide-mail" size="md" :disabled="loading" />
        </div>

        <div class="space-y-2">
          <ULabel for="senha" required class="text-sm sm:text-base">Senha</ULabel>
          <UInput id="senha" class="w-full" v-model="credentials.senha" type="password" placeholder="••••••••" icon="i-lucide-key" size="md" :disabled="loading" />
        </div>

        <UButton type="submit" block size="md" class="sm:size-lg" :loading="loading" :disabled="loading || !credentials.email || !credentials.senha">
          {{ loading ? 'Validando...' : 'Continuar' }}
        </UButton>

        <!-- Componentes de exemplo: tree e grid -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
          <!-- tree -->
          <UCollapsible class="flex flex-col gap-2 w-full sm:w-48">
            <UButton label="Categoria superior" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block size="sm" />

            <template #content>
              <UTree v-model="value" :as="{ link: 'div' }" :items="items" @select="onSelect">
                <template #item-leading="{ selected, indeterminate, handleSelect }">
                  <UCheckbox :model-value="indeterminate ? 'indeterminate' : selected" tabindex="-1" @change="handleSelect" @click.stop />
                </template>
              </UTree>
            </template>
          </UCollapsible>

          <!-- grid -->
          <UCollapsible class="flex flex-col gap-2 w-full sm:w-48">
            <UButton label="Grid" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" block size="sm" />

            <template #content>
              <div class="overflow-x-auto">
                <UTable :data="data" class="flex-1" />
              </div>
            </template>
          </UCollapsible>
        </div>
      </form>

      <div class="mt-4">
        <UPopover>
          <UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" size="sm" />

          <template #content>
            <UTree v-model="value" :as="{ link: 'div' }" :items="items" @select="onSelect">
              <template #item-leading="{ selected, indeterminate, handleSelect }">
                <UCheckbox :model-value="indeterminate ? 'indeterminate' : selected" tabindex="-1" @change="handleSelect" @click.stop />
              </template>
            </UTree>
          </template>
        </UPopover>
      </div>
    </UCard>

    <!-- 💠 Etapa 2: Seleção de Tenant -->
    <UCard v-else-if="etapa === 'tenant'" class="w-full max-w-sm sm:max-w-md">
      <template #header>
        <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <UIcon name="i-lucide-building-2" class="w-5 h-5 sm:w-6 sm:h-6" />
          <h2 class="text-lg sm:text-xl font-semibold text-center sm:text-left">Selecione o Tenant</h2>
        </div>
      </template>

      <form @submit.prevent="loginFinal" class="space-y-4 sm:space-y-5">
        <div class="space-y-2">
          <ULabel for="tenant" required class="text-sm sm:text-base">Tenant</ULabel>
          <USelectMenu
            class="w-full h-full"
            v-model="selectedTenant"
            :items="tenantsOptions"
            placeholder="Escolha um tenant..."
            size="md"
            :disabled="loading"
            value-attribute="value"
            option-attribute="label"
          />
        </div>

        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <UButton type="submit" block size="md" class="sm:size-lg" :loading="loading" :disabled="loading || !selectedTenant">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </UButton>

          <UButton type="button" variant="ghost" block size="md" class="sm:size-lg" :disabled="loading" @click="etapa = 'login'"> Voltar </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>
