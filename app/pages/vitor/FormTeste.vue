<script setup lang="ts">
import * as z from 'zod'
import type { FormErrorEvent, FormSubmitEvent } from '@nuxt/ui'

const activeTab = ref(1)

const tabItems = [
  {
    label: 'sec1',
    icon: 'i-lucide-user',
    slot: 'sec1'
  },
  {
    label: 'sec2',
    icon: 'i-lucide-lock',
    slot: 'sec2'
  }
]
const formRef = ref()
enum GarantiaTipo {
  Fabricante = 'Fabricante',
  Loja = 'Loja',
  SemGarantia = 'SemGarantia'
}

const schema = z
  .object({
    codigoAlternativo: z
      .string('o valor deve ser informado')
      .min(1, 'Código alternativo não pode ser vazio')
      .max(50, 'Código alternativo deve ter no máximo 50 caracteres')
      .regex(/^[a-zA-Z0-9\s]+$/, 'Código alternativo não pode conter caracteres especiais')
      .describe('Código alternativo do Produto.'),

    estoqueMax: z.number('O valor deve ser informado').min(0, 'Estoque máximo deve ser maior ou igual a 0').max(200).describe('Quantidade máxima permitida em estoque deste produto.'),

    estoqueMin: z.number().min(0, 'Estoque mínimo deve ser maior ou igual a 0').max(200).describe('Quantidade mínima permitida em estoque deste produto.'),

    garantiaTipo: z.enum(GarantiaTipo).describe('Enum contendo o tipo de garantia do produto.'),

    garantiaDias: z.number().int('Dias de garantia deve ser um número inteiro').min(0, 'Dias de garantia não pode ser negativo').max(99999).describe('Período em dias da garantia.')
  })
  .refine((data) => data.estoqueMax >= data.estoqueMin, {
    message: 'Estoque máximo deve ser maior que estoque mínimo',
    path: ['estoqueMax']
  })
  .refine(
    (data) => {
      if (data.garantiaTipo === GarantiaTipo.SemGarantia) {
        return data.garantiaDias === 0
      }

      return data.garantiaDias > 0
    },
    {
      message: 'Dias de garantia deve ser 0 se tipo for "SemGarantia" e maior que 0 caso contrário',
      path: ['garantiaDias']
    }
  )

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  codigoAlternativo: undefined,
  estoqueMax: undefined,
  estoqueMin: undefined,
  garantiaTipo: GarantiaTipo.Fabricante,
  garantiaDias: undefined
})

const toast = useToast()

const garantiaTipoDataSource = ref(Object.values(GarantiaTipo))

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Success',
    description: 'The form has been submitted.',
    color: 'success'
  })

  console.log(event)
}

function findParentTabPanel(el: HTMLElement | null) {
  while (el) {
    if (el.hasAttribute('data-slot')) {
      const slot = el.getAttribute('data-slot')
      return slot // e.g. "sec1", "sec2"
    }
    el = el.parentElement
  }
  return null
}

function submitExternally() {
  formRef.value?.submit()
}

async function handleSubmitError(event: FormErrorEvent) {
  if (!event?.errors?.[0]?.id) return

  const el = document.getElementById(event.errors[0].id)
  if (!el) return

  // const slot = findParentTabPanel(el);
  // if (slot) {
  //   activeTab.value = tabItems.findIndex((t) => t.slot === slot);
  // }

  el.scrollIntoView({ block: 'center', behavior: 'instant' })
  setTimeout(() => el.focus(), 300)
}
</script>

<template>
  <UDashboardPanel id="vitorFormTeste">
    <template #header>
      <HeaderVitor />
    </template>

    <template #body>
      <section>
        <h1>Form teste</h1>
        <USeparator class="h-10" />

        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit" @error="handleSubmitError" v-slot="{ errors }" ref="formRef">
          <UTabs :items="tabItems">
            <template #sec1>
              <div class="flex flex-col">
                <UFormField label="codigoAlternativo" required name="codigoAlternativo">
                  <UTooltip :text="errors[0]?.message" v-if="errors">
                    <UInput v-model="state.codigoAlternativo" />
                    {{ errors[0]?.message }}
                  </UTooltip>
                </UFormField>

                <UFormField label="estoque min" name="estoqueMin">
                  <UInputNumber v-model="state.estoqueMin" />
                </UFormField>

                <UFormField label="estoque max" name="estoqueMax">
                  <UInputNumber v-model="state.estoqueMax" />
                </UFormField>
              </div>
            </template>

            <template #sec2>
              <UFormField label="garantia tipo" name="garantiaTipo">
                <USelect v-model="state.garantiaTipo" :items="garantiaTipoDataSource" />
              </UFormField>

              <UFormField label="garantia dias " name="garantiaDias">
                <UInputNumber v-model="state.garantiaDias" :increment="false" :decrement="false" />
              </UFormField>
            </template>
          </UTabs>
        </UForm>
        <UButton type="submit" @click="submitExternally"> Submit </UButton>
      </section>
    </template>
  </UDashboardPanel>
</template>
