import { z } from 'zod'
export enum ETipoEndereco {
  Entrega = 1,
  Cobranca = 2,
  Alternativo = 4,
  Todos = 7,
}

export const ETipoEnderecoStrings: Record<ETipoEndereco, string> = {
  [ETipoEndereco.Entrega]: 'Entrega',
  [ETipoEndereco.Cobranca]: 'Cobrança',
  [ETipoEndereco.Alternativo]: 'Alternativo',
  [ETipoEndereco.Todos]: 'Todos',
}

export const tipoEnderecoSchema = z
  .union([
    z.enum(ETipoEndereco), // aceita os valores numéricos do enum
    z.enum(['Entrega', 'Cobrança', 'Alternativo', 'Todos']), // aceita as strings
  ])
  .transform((value) => {
    // Transforma strings para os valores numéricos correspondentes
    if (typeof value === 'string') {
      const key = Object.keys(ETipoEnderecoStrings).find((key) => ETipoEnderecoStrings[key as unknown as ETipoEndereco] === value)
      return key ? parseInt(key) : value
    }
    return value
  })

export const tipoEnderecoOptions = Object.entries(ETipoEnderecoStrings).map(([key, label]) => ({
  value: Number(key),
  label,
}))
