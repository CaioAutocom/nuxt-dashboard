import { estadoCivilZod } from '@/modules/person/validations/pessoa.zod'

export const MaritalStatus = [
  { value: estadoCivilZod.enum.Solteiro, label: 'Solteiro' },
  { value: estadoCivilZod.enum.Casado, label: 'Casado' },
  { value: estadoCivilZod.enum.Divorciado, label: 'Divorciado' },
  { value: estadoCivilZod.enum.NaoInformado, label: 'Não Informado' },
]

// Cria um type à partir de um objeto
export type MaritalStatus = (typeof MaritalStatus)[keyof typeof MaritalStatus]

// Helper para mostrar todas as opçoes
export const getMaritalStatusOptions = () => Object.values(MaritalStatus)
