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
      <UForm :state="produtoFormData" class="space-y-4 2xl:px-50 lg:px-10">
        <p class="text-red-500 border p-4 mb-4">Ainda em construção...</p>

        <!-- cabecalho -->
        <div class="flex gap-8" v-if="false">
          <div class="border border-dashed px-4 w-50 min-h-max content-center text-center">Adicionar Imagem</div>

          <div class="grid grid-cols-6 gap-4 w-full">
            <UFormField label="Descrição" name="descricao" class="col-span-4">
              <UInput v-model="produtoFormData.descricao" class="w-full" />
            </UFormField>

            <UFormField label="Código de Barras" name="codigoGtinEan" class="col-span-2">
              <UInput v-model="produtoFormData.codigoGtinEan" class="w-full" />
            </UFormField>

            <UFormField label="Código Alternativo" name="codigoAlternativo" class="col-span-2">
              <UInput v-model="produtoFormData.codigoAlternativo" class="w-full" />
            </UFormField>

            <UFormField label="NCM" name="codigoNcm">
              <UInput v-model="produtoFormData.codigoNcm" class="w-full" />
            </UFormField>

            <UFormField label="CEST" name="codigoCest">
              <UInput v-model="produtoFormData.codigoCest" class="w-full" />
            </UFormField>

            <UFormField label="Unidade" name="unidadeId">
              <USelectMenu v-model="produtoFormData.unidadeId" :items="['UN', 'KG', 'ML']" class="w-full" />
            </UFormField>

            <UFormField label="Tipo" name="tipoProduto">
              <USelect v-model="produtoFormData.tipoProduto" :items="tipoProduto" class="w-full" />
            </UFormField>
          </div>
        </div>

        <!-- tab dados gerais -->
        <h1>Precificação</h1>

        <div class="grid grid-cols-6 gap-4 w-full">
          <UFormField label="Tabela de Preço" name="tabelaPrecoId">
            <USelectMenu :items="['Tabela Padrão']" default-value="Tabela Padrão" class="w-full" disabled />
          </UFormField>

          <UFormField label="Preço de Custo (R$)" name="precoCusto">
            <UInput v-model="produtoFormData.precoCusto" class="w-full" />
          </UFormField>

          <UFormField label="Custo Contábil (R$)" name="precoCustoContabil">
            <UInput v-model="produtoFormData.precoCustoContabil" class="w-full" />
          </UFormField>

          <UFormField label="Custo Médio (R$)" name="precoCustoMedio">
            <UInput v-model="produtoFormData.precoCustoMedio" class="w-full" />
          </UFormField>

          <UFormField label="Lucro à Vista (%)" name="lucroVistaPercentual">
            <UInput v-model="produtoFormData.lucroVistaPercentual" class="w-full" />
          </UFormField>

          <UFormField label="Lucro à Prazo (%)" name="lucroPrazoPercentual">
            <UInput v-model="produtoFormData.lucroPrazoPercentual" class="w-full" />
          </UFormField>

          <UFormField label="Preço à Vista" name="precoVista">
            <UInput v-model="produtoFormData.precoVista" class="w-full" />
          </UFormField>

          <UFormField label="Preço à Prazo" name="precoPrazo">
            <UInput v-model="produtoFormData.precoPrazo" class="w-full" />
          </UFormField>
        </div>

        <!-- dados complementares -->

        <!-- observacoes -->

        <UButton type="submit"> Submit </UButton>
      </UForm>
    </template>
  </UDashboardPanel>
</template>
