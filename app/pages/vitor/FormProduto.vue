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

const formAbas = [
  {
    label: 'Dados Gerais',
    icon: 'i-arcticons:debtcalc',
    slot: 'abaGerais'
  },
  {
    label: 'Dados Complementares',
    icon: 'i-arcticons:streetcomplete',
    slot: 'abaComplementares'
  },
  {
    label: 'Observações',
    icon: 'i-oui:ws-observability',
    slot: 'abaObs'
  }
]

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

        <!-- form cabecalho -->
        <div class="flex flex-col gap-14">
          <div class="border border-dashed px-4 w-50 min-h-max content-center text-center">Adicionar Imagem</div>

          <div class="grid grid-cols-6 gap-20 w-full">
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

        <UTabs variant="link" :items="formAbas" class="w-full" :ui="{ content: 'space-y-6' }">
          <template #abaGerais>
            <h2 class="text-2xl">Precificação</h2>
            <div class="grid grid-cols-6 gap-4 w-full">
              <UFormField label="Tabela de Preço" name="tabelaPrecoId">
                <USelectMenu :items="['Tabela Padrão']" default-value="Tabela Padrão" class="w-full" disabled />
              </UFormField>

              <UFormField label="Preço de Custo (R$)" name="precoCusto">
                <UInputNumber v-model="produtoFormData.precoCusto" class="w-full" :increment="false" :decrement="false" />
              </UFormField>

              <UFormField label="Custo Contábil (R$)" name="precoCustoContabil">
                <UInputNumber v-model="produtoFormData.precoCustoContabil" class="w-full" :increment="false" :decrement="false" />
              </UFormField>

              <UFormField label="Custo Médio (R$)" name="precoCustoMedio">
                <UInputNumber v-model="produtoFormData.precoCustoMedio" class="w-full" :increment="false" :decrement="false" />
              </UFormField>

              <UFormField label="Lucro à Vista (%)" name="lucroVistaPercentual">
                <UInputNumber v-model="produtoFormData.lucroVistaPercentual" class="w-full" :increment="false" :decrement="false" />
              </UFormField>

              <UFormField label="Lucro à Prazo (%)" name="lucroPrazoPercentual">
                <UInputNumber v-model="produtoFormData.lucroPrazoPercentual" class="w-full" :increment="false" :decrement="false" />
              </UFormField>

              <UFormField label="Preço à Vista" name="precoVista">
                <UInputNumber v-model="produtoFormData.precoVista" class="w-full" :increment="false" :decrement="false" />
              </UFormField>

              <UFormField label="Preço à Prazo" name="precoPrazo">
                <UInputNumber v-model="produtoFormData.precoPrazo" class="w-full" :increment="false" :decrement="false" />
              </UFormField>
            </div>

            <USeparator />

            <h2 class="text-2xl">Dimensões e Peso</h2>
            <div class="flex gap-8">
              <div class="grid grid-cols-4 gap-4 w-full">
                <UFormField label="Peso Líquido" name="pesoLiquido">
                  <UInputNumber v-model="produtoFormData.pesoLiquido" class="w-full" :increment="false" :decrement="false" />
                </UFormField>

                <UFormField label="Peso Bruto" name="pesoBruto">
                  <UInputNumber v-model="produtoFormData.pesoBruto" class="w-full" :increment="false" :decrement="false" />
                </UFormField>

                <UFormField label="Largura" name="largura">
                  <UInputNumber v-model="produtoFormData.largura" class="w-full" :increment="false" :decrement="false" />
                </UFormField>

                <UFormField label="Altura" name="altura">
                  <UInputNumber v-model="produtoFormData.altura" class="w-full" :increment="false" :decrement="false" />
                </UFormField>

                <UFormField label="Profundidade" name="profundidade">
                  <UInputNumber v-model="produtoFormData.profundidade" class="w-full" :increment="false" :decrement="false" />
                </UFormField>
              </div>

              <div class="border px-4 w-50 min-h-max content-center text-center">Imagem do cubo...</div>
            </div>

            <USeparator />

            <h2 class="text-2xl">Estoque</h2>
            <div class="grid grid-cols-5 gap-4 w-full">
              <UFormField name="controlaEstoque" help="Acompanhamento da movimentação de estoque.">
                <UCheckbox v-model="produtoFormData.controlaEstoque" label="Controlar Estoque" />
              </UFormField>

              <UFormField label="Estoque Atual" name="estoqueAtual" help="Estoque atual do produto no momento do cadastro.">
                <UInputNumber v-model="produtoFormData.estoqueAtual" class="w-full" :increment="false" :decrement="false" />
              </UFormField>

              <UFormField label="Estoque Mínimo" name="estoqueMin" help="Quantidade mínima do produto no estoque.">
                <UInputNumber v-model="produtoFormData.estoqueMin" class="w-full" :increment="false" :decrement="false" />
              </UFormField>

              <UFormField label="Estoque Máximo" name="estoqueMax" help="Quantidade máxima do produto no estoque.">
                <UInputNumber v-model="produtoFormData.estoqueMax" class="w-full" :increment="false" :decrement="false" />
              </UFormField>

              <UFormField label="Localização" name="localizacao" help="Localização física do estoque.">
                <UInput v-model="produtoFormData.localizacao" class="w-full" />
              </UFormField>
            </div>
          </template>

          <template #abaComplementares>
            <div class="grid grid-cols-4 gap-4 w-full">
              <UFormField label="Categoria" name="produtoCategoriaId">
                <USelectMenu v-model="produtoFormData.produtoCategoriaId" :items="['UN', 'KG', 'ML']" class="w-full" />
              </UFormField>

              <UFormField label="Condição" name="condicao">
                <USelectMenu v-model="produtoFormData.condicao" :items="['UN', 'KG', 'ML']" class="w-full" />
              </UFormField>

              <UFormField label="Tipo de Garantia" name="garantiaTipo">
                <USelectMenu v-model="produtoFormData.garantiaTipo" :items="['UN', 'KG', 'ML']" class="w-full" />
              </UFormField>

              <UFormField label="Dias de garantia" name="garantiaDias" help="Deve ser maior que zero caso tenha garantia.">
                <UInputNumber v-model="produtoFormData.garantiaDias" class="w-full" :increment="false" :decrement="false" />
              </UFormField>

              <UFormField label="Fabricante" name="fabricante">
                <UInput v-model="produtoFormData.fabricante" class="w-full" />
              </UFormField>

              <UFormField label="Código do Fabricante" name="codigoFabricante">
                <UInput v-model="produtoFormData.codigoFabricante" class="w-full" />
              </UFormField>
            </div>
          </template>

          <template #abaObs>
            <UFormField label="Observações" name="observacoes">
              <UTextarea v-model="produtoFormData.observacoes" class="w-full" />
            </UFormField>
          </template>
        </UTabs>
      </UForm>
    </template>
  </UDashboardPanel>
</template>
