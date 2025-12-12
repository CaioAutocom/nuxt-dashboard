import { z } from 'zod'
/**
 * @summary Esquema principal de Transportadora.
 */
export const transportadoraSchema = z
  .object({
    id: z.uuid().describe('Identificação única.').optional(),
    idAlternativo: z.string().describe('Identificação alternativa.'),
    pessoaId: z.uuid().nullish().describe('Identificação única da pessoa a qual esse transportador se refere.'),
    categoriaId: z.uuid().describe('Identificação única da categoria a qual esta pessoa pertence.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade a qual esta pessoa pertence.'),
    emailXmlNfe: z.string().describe('E-mail para envio do xml do documento fiscal.'),
    observacao: z.string().describe('Observações gerais.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.'),
  })
  .describe('Resposta de PessoaTransportador.')

export type Transportadora = z.infer<typeof transportadoraSchema>

export type PessoaTransportadorAtualizarRequisicao = z.infer<typeof pessoaTransportadorAtualizarRequisicao>
/**
 * @summary Atualiza um registro de PessoaTransportador
 */
export const pessoaTransportadorAtualizarRequisicao = z
  .object({
    id: z.uuid().describe('Identificação única.'),
    idAlternativo: z.string().describe('Identificação alternativa.'),
    pessoaId: z.uuid().describe('Identificação única da pessoa a qual esse transportador se refere.'),
    categoriaId: z.uuid().describe('Identificação única da categoria a qual esta pessoa pertence.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade a qual esta pessoa pertence.'),
    emailXmlNfe: z.string().describe('E-mail para envio do xml do documento fiscal.'),
    observacao: z.string().describe('Observações gerais.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.'),
  })
  .describe('Usado na feature de atualização de Pessoa Transportador.')
  .describe('Usado na feature de atualização de Pessoa Transportador.')

/**
 * @summary Excluir um registro de Transportador
 */
export const pessoaTransportadorExcluirEndpointParams = z.object({
  pessoaId: z.uuid().describe('Id d Pessoa associada ao Transportador a ser excluído.'),
})

/**
 * @summary Inclui um novo cadastro de PessoaTransportador
 */
export const incluirTransportadoraRequestSchema = transportadoraSchema
  .omit({
    id: true,
  })
  .describe('Usado na feature de inclusão de Pessoa Transportador.')
export type IncluirTransportadoraRequestSchema = z.infer<typeof incluirTransportadoraRequestSchema>

export const pessoaTransportadorIncluirEndpointResponse = z.uuid()

/**
 * @summary Busca um registro de PessoaTransportador pelo IdAlternativo
 */
export const pessoaTransportadorBuscarPorIdAlternativoEndpointParams = z.object({
  idAlternativo: z.string().describe('Id Alternativo da PessoaTransportador'),
})

export const pessoaTransportadorBuscarPorIdAlternativoEndpointResponse = z
  .object({
    id: z.uuid().describe('Identificação única.'),
    idAlternativo: z.string().describe('Identificação alternativa.'),
    pessoaId: z.uuid().describe('Identificação única da pessoa a qual esse transportador se refere.'),
    categoriaId: z.uuid().describe('Identificação única da categoria a qual esta pessoa pertence.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade a qual esta pessoa pertence.'),
    emailXmlNfe: z.string().describe('E-mail para envio do xml do documento fiscal.'),
    observacao: z.string().describe('Observações gerais.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.'),
  })
  .describe('Resposta de PessoaTransportador.')

/**
 * @summary Busca uma Transportador pelo Id referente a Pessoa
 */
export const pessoaTransportadorBuscarPorIdEndpointParams = z.object({
  pessoaId: z.uuid().describe('pessoaId de uma Pessoa associada ao Transportador.'),
})

export const pessoaTransportadorBuscarPorIdEndpointResponse = z
  .object({
    id: z.uuid().describe('Identificação única.'),
    idAlternativo: z.string().describe('Identificação alternativa.'),
    pessoaId: z.uuid().describe('Identificação única da pessoa a qual esse transportador se refere.'),
    categoriaId: z.uuid().describe('Identificação única da categoria a qual esta pessoa pertence.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade a qual esta pessoa pertence.'),
    emailXmlNfe: z.string().describe('E-mail para envio do xml do documento fiscal.'),
    observacao: z.string().describe('Observações gerais.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.'),
  })
  .describe('Resposta de PessoaTransportador.')

export type PessoaTransportadorBuscarPorIdEndpointResponseType = z.infer<typeof pessoaTransportadorBuscarPorIdEndpointResponse>
/**
 * @summary Resposta do get de busca de Transportadora pelo ID Pessoa.
 */
export type GetTransportadoraPorIdPessoaResponse = z.infer<typeof transportadoraSchema>
