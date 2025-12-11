<script setup lang="ts">
import type { Tenant, UsuarioLoginResponse } from '~/core/schemas/auth/authLogin.schema'
import type { TreeItemSelectEvent } from 'reka-ui'
import type { TreeItem } from '@nuxt/ui'

definePageMeta({
  layout: false
})

const router = useRouter()
const toast = useToast()

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

function onSelect(e: TreeItemSelectEvent<TreeItem>) {
  if (e.detail.originalEvent.type === 'click') {
    e.preventDefault()
  }
}

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
    await navigateTo('/')
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
      </form>
    </UCard>

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
