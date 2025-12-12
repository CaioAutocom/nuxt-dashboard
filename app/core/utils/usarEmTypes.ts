import { z } from 'zod'

export enum EUsarEm {
  Nenhum = 0,
  Cliente = 1,
  Fornecedor = 2,
  Vendedor = 4,
  Representante = 8,
  Transportadora = 16,
  Fabricante = 32,
  Funcionario = 64,
  Contador = 128,
  Usuario = 265,
  Operadora = 512,
  Todas = 1023
}

export const EUsarEmStrings: Record<EUsarEm, string> = {
  [EUsarEm.Nenhum]: 'Nenhum',
  [EUsarEm.Cliente]: 'Cliente',
  [EUsarEm.Fornecedor]: 'Fornecedor',
  [EUsarEm.Vendedor]: 'Vendedor',
  [EUsarEm.Representante]: 'Representante',
  [EUsarEm.Transportadora]: 'Transportadora',
  [EUsarEm.Fabricante]: 'Fabricante',
  [EUsarEm.Funcionario]: 'Funcionário',
  [EUsarEm.Contador]: 'Contador',
  [EUsarEm.Usuario]: 'Usuário',
  [EUsarEm.Operadora]: 'Operadora',
  [EUsarEm.Todas]: 'Todas'
}
// Normalização simples
const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

const labelToValue: Record<string, number> = Object.entries(EUsarEmStrings).reduce((acc: Record<string, number>, [k, v]) => {
  acc[normalize(v)] = Number(k)
  return acc
}, {})

const validLabels = Object.keys(labelToValue)

const isValidBitmask = (n: number) => {
  const allBits = Object.keys(EUsarEmStrings).reduce((acc, k) => acc | Number(k), 0)
  return (n & ~allBits) === 0
}

// Schema simplificado
export const usarEmSchema = z.union([
  z.string().superRefine((val, ctx) => {
    if (!validLabels.includes(normalize(val))) {
      ctx.addIssue({ code: 'custom', message: `Valor inválido: ${val}` })
    }
  }),
  z.array(z.string()).superRefine((arr, ctx) => {
    const invalids = arr.map(normalize).filter((s) => !validLabels.includes(s))
    if (invalids.length) ctx.addIssue({ code: 'custom', message: `Inválido(s): ${invalids.join(', ')}` })
  }),
  z.number().refine(isValidBitmask, {
    error: 'Número inválido: contém bits não permitidos.'
  }),
  z.undefined()
])

export type UsarEmType = z.infer<typeof usarEmSchema>

//auxiliares

export const usarEmOptions = Object.entries(EUsarEmStrings).map(([key, label]) => ({
  value: Number(key),
  label
}))

export const usarEmOptionsFiltered = usarEmOptions.filter((item) => ['Cliente', 'Fornecedor', 'Vendedor', 'Transportadora'].includes(item.label))
