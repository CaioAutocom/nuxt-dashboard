<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

enum CondicaoProduto {
  Novo = 'Novo',
  Usado = 'Usado',
  Recondicionado = 'Recondicionado'
}

enum GarantiaTipo {
  Fabricante = 'Fabricante',
  Loja = 'Loja',
  SemGarantia = 'SemGarantia'
}

enum TipoProduto {
  Simples = 'Simples',
  Kit = 'Kit',
  Variacoes = 'Variacoes',
  MateriaPrima = 'MateriaPrima'
}

type ProdutoFormData = {
  descricao?: string
  codigoGtinEan?: string
  codigoAlternativo: string
  codigoNcm: string
  codigoCest: string
  unidadeId: string
  tipoProduto: TipoProduto
  ativo: boolean

  tabelaPrecoId: string
  precoCusto?: number
  precoCustoContabil?: number
  precoCustoMedio?: number
  lucroVistaPercentual?: number
  lucroPrazoPercentual?: number
  precoVista?: number
  precoPrazo?: number

  pesoLiquido?: number
  pesoBruto?: number
  largura?: number
  altura?: number
  profundidade?: number

  controlaEstoque: boolean
  estoqueAtual?: number
  estoqueMin?: number
  estoqueMax?: number
  localizacao?: string

  produtoCategoriaId: string
  condicao: CondicaoProduto
  garantiaTipo: GarantiaTipo
  garantiaDias: number
  fabricante?: string
  codigoFabricante: string

  observacoes?: string
}

const produtoFormData: ProdutoFormData = reactive({
  descricao: '',
  codigoGtinEan: '',
  codigoAlternativo: '',
  codigoNcm: '',
  codigoCest: '',
  unidadeId: '',
  tipoProduto: TipoProduto.Simples,
  ativo: true,

  tabelaPrecoId: '',
  precoCusto: 0,
  precoCustoContabil: 0,
  precoCustoMedio: 0,
  lucroVistaPercentual: 0,
  lucroPrazoPercentual: 0,
  precoVista: 0,
  precoPrazo: 0,

  pesoLiquido: 0,
  pesoBruto: 0,
  largura: 0,
  altura: 0,
  profundidade: 0,

  controlaEstoque: true,
  estoqueAtual: 0,
  estoqueMin: 0,
  estoqueMax: 0,
  localizacao: '',

  produtoCategoriaId: '',
  condicao: CondicaoProduto.Novo,
  garantiaTipo: GarantiaTipo.Fabricante,
  garantiaDias: 0,
  fabricante: '',
  codigoFabricante: '',

  observacoes: ''
})

type ProdutoFormDataSchema = z.output<typeof produtoFormData>

const tipoProduto = ref([
  {
    label: 'Simples',
    value: 'Simples'
  },

  {
    label: 'Kit',
    value: 'Kit'
  },
  {
    label: 'Matéria Prima',
    value: 'MateriaPrima'
  },
  {
    label: 'Variações',
    value: 'Variacoes'
  }
])

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<ProdutoFormDataSchema>) {
  toast.add({
    title: 'Success',
    description: 'The form has been submitted.',
    color: 'success'
  })

  console.log(event.data)
}
</script>

<template>
  <UDashboardPanel id="vitorFormTeste">
    <template #header>
      <HeaderVitor />
    </template>

    <template #body>
      <UForm :schema="produtoFormData" :state="produtoFormData" class="space-y-4">
        <!-- cabecalho -->
        <UFormField label="Descrição" name="descricao">
          <UInput v-model="produtoFormData.descricao" />
        </UFormField>

        <UFormField label="Código de Barras" name="codigoGtinEan">
          <UInput v-model="produtoFormData.codigoGtinEan" />
        </UFormField>
        <UFormField label="Código de Barras" name="codigoGtinEan">
          <UInput v-model="produtoFormData.codigoAlternativo" />
        </UFormField>

        <UFormField label="Código de Barras" name="codigoGtinEan">
          <UInput v-model="produtoFormData.codigoNcm" />
        </UFormField>

        <UFormField label="Código de Barras" name="codigoGtinEan">
          <UInput v-model="produtoFormData.codigoCest" />
        </UFormField>

        <UFormField label="Tipo" name="unidadeId">
          <USelectMenu v-model="produtoFormData.unidadeId" :items="['UN', 'KG', 'ML']" class="w-48" />
        </UFormField>

        <UFormField label="Tipo" name="tipoProduto">
          <USelect v-model="produtoFormData.tipoProduto" :items="tipoProduto" class="w-48" />
        </UFormField>

        <!-- dados gerais -->
        <!-- dados complementares -->
        <!-- observacoes -->

        <UButton type="submit"> Submit </UButton>
      </UForm>
    </template>
  </UDashboardPanel>
</template>
