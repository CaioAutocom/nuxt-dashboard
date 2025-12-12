import { z } from 'zod'
import { tipoEnderecoSchema } from '~/core/utils/tipoEnderecoTypes'
import { usarEmSchema } from '~/core/utils/usarEmTypes'

export type Endereco = z.infer<typeof enderecoSchema>
export const enderecoSchema = z.object({
  id: z.uuid().optional().describe('Identificação única.'),
  pessoaId: z.uuid().describe('Identificação única da pessoa a qual os contatos se referem.'),
  tipoEndereco: tipoEnderecoSchema.prefault('Todos'),
  cep: z.string().describe('CEP.'),
  uf: z.string().describe('UF'),
  cidade: z.string().max(100, 'Limite de 100 caracteres excedido.').describe('Cidade.'),
  complemento: z.string().max(100, 'Limite de 100 caracteres excedido.').describe('Complemento do endereço.'),
  numero: z.string().max(15, 'Limite de 15 caracteres excedido.').describe('Número do imóvel.'),
  logradouro: z.string().max(100, 'Limite de 100 caracteres excedido.').describe('Logradouro.'),
  bairro: z.string().max(70, 'Limite de 70 caracteres excedido.').describe('Bairro.'),
  usarEm: usarEmSchema.prefault('Todas'),
  ativo: z.boolean().describe('Define se o cadastro está ativo.')
})

/**
 * @summary Inclui um novo endereço de uma pessoa.
 */
export const incluirEnderecoRequisicaoSchema = enderecoSchema.describe('Usado na feature de inclusão de endereço de pessoa.')
/** Tipo referente ao schema de inclusão de endereço */
export type IncluirEnderecoRequisicao = z.infer<typeof incluirEnderecoRequisicaoSchema>

/** Tipo referente ao schema de atualização de endereço */
export type EnderecoAtualizarRequisicao = z.infer<typeof enderecoSchema>

/**
 * @summary Exclui um endereço de uma pessoa.
 */
export const pessoaEnderecoExcluirEndpointParams = z.object({
  id: z.uuid().describe('Identificador do endereço da pessoa.')
})

/**
 * @summary Busca um endereço de uma pessoa pelo ID.
 */
export const pessoaEnderecoBuscarPorIdEndpointParams = z.object({
  id: z.uuid().describe('Identificador do endereço da pessoa.')
})

/** Tipo referente ao schema de busca de endereço por id */
export type EnderecoBuscarPorIdResponse = z.infer<typeof enderecoSchema>

/**
 * @summary Busca os endereços de uma pessoa pelo ID da pessoa.
 */
export const pessoaEnderecoBuscarPorPessoaIdEndpointParams = z.object({
  pessoaId: z.uuid().describe('Identificador da pessoa à qual o endereço se refere.')
})

/**
 * @summary Item de resposta da busca dos endereços de uma pessoa pelo ID da pessoa.
 */
export const pessoaEnderecoBuscarPorPessoaIdEndpointResponseItem = enderecoSchema
  .extend({
    id: z.uuid().describe('Identificação única.')
  })
  .describe('Resposta de PessoaEndereco.')
/** Tipo referente ao schema de busca de endereços por pessoa id */
export type PessoaEnderecoBuscarPorPessoaIdEndpointResponseItem = z.infer<typeof pessoaEnderecoBuscarPorPessoaIdEndpointResponseItem>

/**
 * @summary Resposta da busca dos endereços de uma pessoa pelo ID da pessoa.
 */
export const pessoaEnderecoBuscarPorPessoaIdEndpointResponse = z.array(pessoaEnderecoBuscarPorPessoaIdEndpointResponseItem)
/** Tipo referente ao schema de busca de endereços por pessoa id */
export type PessoaEnderecoBuscarPorPessoaIdEndpointResponse = z.infer<typeof pessoaEnderecoBuscarPorPessoaIdEndpointResponse>

/**
 * @summary Resposta da API de consulta de CEP do Brasil.
 */
export const enderecoApiBrasilSchema = z.object({
  cep: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  service: z.string(),
  state: z.string().length(2),
  street: z.string()
})
/**  Tipo referente à resposta da API de consulta de CEP do Brasil.*/
export type IEnderecoApiBrasilResponse = z.infer<typeof enderecoApiBrasilSchema>
