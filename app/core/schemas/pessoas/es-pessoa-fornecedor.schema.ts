import { z } from 'zod'
import type { fornecedorIncluirRequest } from './fornecedor.schema'

export type PessoaFornecedorAtualizarRequisicao = z.infer<typeof pessoaFornecedorAtualizarRequisicao>
/**
 * @summary Atualizar um cadastro de PessaoFornecedor.
 */
export const pessoaFornecedorAtualizarRequisicao = z
  .object({
    idAlternativo: z.string().describe('Identificação alternativa da pessoa.'),
    pessoaId: z.uuid().describe('Identificação única da pessoa relacionada a este fornecedor.'),
    categoriaId: z.uuid().describe('Identificação única da categoria a qual esta pessoa pertence.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade a qual esta pessoa pertence.'),
    emailXmlNfe: z.string().describe('E-mail para envio do xml do documento fiscal.'),
    observacao: z.string().describe('Observações gerais.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.')
  })
  .describe('Usado na feature de atualização de Pessoa Fornecedor.')
  .describe('Usado na feature de atualização de Pessoa Fornecedor.')

/**
 * @summary Excluir um cadastro de PessaoFornecedor.
 */
export const pessoaFornecedorExcluirEndpointParams = z.object({
  pessoaId: z.uuid().describe('Identificação única da Pessoa a qual o fornecedor se refere.')
})

/**
 * @summary Buscar um PessoaFornecedor pelo seu ID alternativo.
 */
export const pessoaFornecedorBuscarPorIdAlternativoEndpointParams = z.object({
  idAlternativo: z.string().describe('Identificação alternativa de PessoaFornecedor.')
})

export const pessoaFornecedorBuscarPorIdResponse = z
  .object({
    id: z.uuid().describe('Identificação única.'),
    idAlternativo: z.string().describe('Identificação alternativa da pessoa.'),
    pessoaId: z.uuid().describe('Identificação única da pessoa relacionada a este fornecedor.'),
    categoriaId: z.uuid().describe('Identificação única da categoria a qual esta pessoa pertence.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade a qual esta pessoa pertence.'),
    emailXmlNfe: z.string().describe('E-mail para envio do xml do documento fiscal.'),
    observacao: z.string().describe('Observações gerais.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.')
  })
  .describe('Resposta de PessoaFornecedor.')

export type PessoaFornecedorBuscarPorIdResponseType = z.infer<typeof pessoaFornecedorBuscarPorIdResponse>

/**
 * @summary Resposta de PessoaFornecedorBuscarPorId.
 */
export const pessoaFornecedorBuscarPorIdEndpointResponse = z
  .object({
    id: z.uuid().describe('Identificação única.'),
    idAlternativo: z.string().describe('Identificação alternativa da pessoa.'),
    pessoaId: z.uuid().describe('Identificação única da pessoa relacionada a este fornecedor.'),
    categoriaId: z.uuid().describe('Identificação única da categoria a qual esta pessoa pertence.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade a qual esta pessoa pertence.'),
    emailXmlNfe: z.string().describe('E-mail para envio do xml do documento fiscal.'),
    observacao: z.string().describe('Observações gerais.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.')
  })
  .describe('Resposta de PessoaFornecedor.')
export type PessoaFornecedorBuscarPorIdEndpointResponse = z.infer<typeof pessoaFornecedorBuscarPorIdEndpointResponse>
export type PessoaFornecedorIncluirRequisicao = z.infer<typeof fornecedorIncluirRequest>
