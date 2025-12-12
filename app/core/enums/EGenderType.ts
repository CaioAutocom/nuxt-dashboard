import { EGenero } from '@/core/enums/EGenero'
import { z } from 'zod'

export const generoZod = z.enum(EGenero)
export const GenderType = [
  { value: generoZod.enum.Masculino, label: 'Masculino' },
  { value: generoZod.enum.Feminino, label: 'Feminino' },
  { value: generoZod.enum.Outro, label: 'Outro' },
  { value: generoZod.enum.NaoInformado, label: 'Não Informado' },
]

// Cria um type à partir de um objeto
export type GenderType = (typeof GenderType)[keyof typeof GenderType]

// Helper para mostrar todas as opções
export const getGenderTypeOptions = () => Object.values(GenderType)
