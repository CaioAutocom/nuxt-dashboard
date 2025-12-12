import { z } from 'zod'

export const vendedorSchema = z.object({
  id: z.uuid(),
  idAlternativo: z.string().describe('Identificação alternativa.'),
  pessoaId: z.uuid().describe('Identificação única de pessoa a qual este vendedor está relacionado.'),
  categoriaId: z.uuid().describe('Identificação única da categoria a qual esta pessoa pertence.'),
  ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade a qual esta pessoa pertence.'),
  observacao: z.string().describe('Observações gerais.'),
  ativo: z.boolean().describe('Define se o cadastro está ativo.')
})

export type Vendedor = z.infer<typeof vendedorSchema>

/**
 * @summary Resposta de buscar um Vendedor pelo ID da Pessoa.
 */
export type GetVendedorPorIdPessoaResponse = z.infer<typeof vendedorSchema>

/**
 * @summary Incluir um novo cadastro de PessoaVendedor.
 */
export const incluirVendedorRequestSchema = vendedorSchema
  .omit({
    id: true
  })
  .describe('Usado na feature de inclusão de PessoaVendedor.')

export type PessoaVendedorAtualizarRequest = z.infer<typeof pessoaVendedorAtualizarRequest>
/**
 * @summary Atualizar um cadastro de PessoaVendedor.
 */
export const pessoaVendedorAtualizarRequest = z
  .object({
    idAlternativo: z.string().describe('Identificação alternativa.'),
    pessoaId: z.uuid().describe('Identificação única de pessoa a qual este vendedor está relacionado.'),
    categoriaId: z.uuid().describe('Identificação única da categoria a qual esta pessoa pertence.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade a qual esta pessoa pertence.'),
    observacao: z.string().describe('Observações gerais.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.')
  })
  .describe('Usado na feature de inclusão de PessoaVendedor.')

/**
 * @summary Excluir um cadastro de PessoaVendedor.
 */
export const pessoaVendedorExcluirEndpointParams = z.object({
  pessoaId: z.uuid().describe('Identificação única da Pessoa quem o vendedor se refere.')
})

/**
 * @summary Buscar uma PessoaVendedor pelo ID da Pessoa a qual esse vendedor se refere.
 */
export const pessoaVendedorBuscarPorIdEndpointParams = z.object({
  pessoaId: z.uuid().describe('Identificação única da Pessoa a qual esse vendedor se refere.')
})

export const pessoaVendedorBuscarPorIdEndpointResponse = z
  .object({
    id: z.uuid().describe('Identificação única.'),
    idAlternativo: z.string().describe('Identificação alternativa.'),
    pessoaId: z.uuid().describe('Identificação única de pessoa a qual este vendedor está relacionado.'),
    categoriaId: z.uuid().describe('Identificação única da categoria a qual esta pessoa pertence.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade a qual esta pessoa pertence.'),
    observacao: z.string().describe('Observações gerais.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.')
  })
  .describe('Resposta de PessoaVendedor.')

export type PessoaVendedorBuscarPorIdResponseType = z.infer<typeof pessoaVendedorBuscarPorIdEndpointResponse>
/**
 * @summary Buscar uma PessoaVendedor pelo seu IdAlternativo.
 */
export const pessoaVendedorBuscarPorIdAlternativoEndpointParams = z.object({
  idAlternativo: z.string().describe('Identificação alternativa de PessoaVendedor.')
})

export const pessoaVendedorBuscarPorIdAlternativoEndpointResponse = z
  .object({
    id: z.uuid().describe('Identificação única.'),
    idAlternativo: z.string().describe('Identificação alternativa.'),
    pessoaId: z.uuid().describe('Identificação única de pessoa a qual este vendedor está relacionado.'),
    categoriaId: z.uuid().describe('Identificação única da categoria a qual esta pessoa pertence.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade a qual esta pessoa pertence.'),
    observacao: z.string().describe('Observações gerais.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.')
  })
  .describe('Resposta de PessoaVendedor.')

/**
 * @summary Utilizado na requisição de inclusão de PessoaVendedor.
 */
export const incluirVendedorSchema = vendedorSchema.omit({
  id: true
})
/**
 * @summary Utilizado na requisição de inclusão de PessoaVendedor.
 */
export type IncluirVendedorRequest = z.infer<typeof incluirVendedorSchema>
