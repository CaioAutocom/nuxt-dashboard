export const PersonType = {
  FISICA: {
    label: 'Física',
    value: 0,
  },
  JURIDICA: {
    label: 'Jurídica',
    value: 1,
  },
} as const

// Cria um type a partir do objeto
export type PersonType = (typeof PersonType)[keyof typeof PersonType]

// Helper para pegar todas as opções
export const getPersonTypeOptions = () => Object.values(PersonType)

// Helper para pegar pelo value
export const getPersonTypeByValue = (value: number) => {
  return Object.values(PersonType).find((type) => type.value === value)
}
