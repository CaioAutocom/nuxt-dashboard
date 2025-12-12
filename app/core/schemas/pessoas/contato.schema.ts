import { z } from 'zod'
import { usarEmSchema } from '~/core/utils/usarEmTypes'

const contatoSchema = z.object({
  pessoaId: z.uuid().nullish().describe('Identificação única da pessoa.'),
  nome: z.string().max(100, 'Limite de 100 caracteres excedido.').describe('Nome do contato'),
  telefone1: z.string().max(15, 'Limite de 15 caracteres excedido.').describe('Telefone 1 do contato.'),
  telefone2: z.string().max(15, 'Limite de 15 caracteres excedido.').describe('Telefone 2 do contato.'),
  email: z.string().max(100, 'Limite de 100 caracteres excedido.').describe('Email do contato'),
  mesAniversario: z.number().describe('Mês de aniversário do contato.'),
  diaAniversario: z.number().describe('Dia de aniversário do contato.'),
  departamento: z
    .string()
    .max(50, 'Limite de 50 caracteres excedido.')
    .describe('Departamento a qual o contato pertence dentro do cliente especificado em contatos_cliente.\r\nExemplo: Desenvolvimento, compras, almoxarifado, etc.'),
  usarEm: usarEmSchema.prefault('Todas').describe('Define onde irá ser usado este contato.'),
  ativo: z.boolean().describe('Define se o cadastro está ativo.')
})

/**
 * Este schema é usado como base para os contatos de pessoas, incluindo informações adicionais para controle interno.
 */
export const contatoBaseZod = contatoSchema.extend({
  id: z.uuid().optional().describe('Identificação única.'),
  dataAniversario: z.date().describe('Data de aniversário do contato, de controle interno do sistema para preenchimento do dia de aniversário e mês de aniversário.'),
  objetoEmEdicao: z.boolean().describe('Uso interno para decidir se o contato deve sofrer o refetch ou não.').optional()
})
/** Tipo referente ao objeto base de contato */
export type IContato = z.infer<typeof contatoBaseZod>

/**
 * @summary Incluir um novo contato para uma pessoa.
 */
export const pessoaContatoIncluirRequisicao = contatoSchema.describe('Usado na feature de inclusão de contato de pessoa.')
/** Tipo referente ao objeto de inclusão de contato */
export type IPessoaContatoIncluirRequisicao = z.infer<typeof pessoaContatoIncluirRequisicao>

/**
 * @summary Resposta do endpoint de inclusão de contato de pessoa.
 */
export const pessoaContatoIncluirEndpointResponse = z.uuid()
/** Tipo referente à resposta de inclusão de contato */
export type IPessoaContatoIncluirEndpointResponse = z.infer<typeof pessoaContatoIncluirEndpointResponse>

/**
 * @summary Atualizar um contato de uma pessoa.
 */
export const pessoaContatoAtualizarEndpointBody = contatoSchema
  .extend({
    id: z.uuid().describe('Identificação única.')
  })
  .describe('Usado na feature de atualização de contato de pessoa.')
/** Tipo referente ao objeto de atualização de contato */
export type IPessoaContatoAtualizarRequisicao = z.infer<typeof pessoaContatoAtualizarEndpointBody>

/**
 * @summary Excluir um contato de pessoa.
 */
export const pessoaContatoExcluirEndpointParams = z.object({
  id: z.uuid().describe('Identificador único.')
})

/**
 * @summary Buscar um PessoaContato por id.
 */
export const pessoaContatoBuscarPorIdEndpointParams = z.object({
  id: z.uuid().describe('Identificador único do contato.')
})

/**
 * @summary Resposta da busca de um PessoaContato por id.
 */
export const pessoaContatoBuscarPorIdEndpointResponse = contatoSchema
  .extend({
    id: z.uuid().describe('Identificação única.')
  })
  .describe('Resposta de PessoaContato.')
/** Tipo referente ao objeto de resposta de busca de contato por id*/
export type IPessoaContatoBuscarPorIdResponse = z.infer<typeof pessoaContatoBuscarPorIdEndpointResponse>

// TODO sei qq isso aqui faz não, depois adiciona a doc kkkkk
export const pessoaContatoBuscarPorIdPessoaResponse = contatoSchema.extend({
  id: z.uuid().describe('Identificação única.')
})
// TODO adicionar aqui doc aqui tb
export type IPessoaContatoBuscarPorIdPessoaResponse = z.infer<typeof pessoaContatoBuscarPorIdPessoaResponse>
