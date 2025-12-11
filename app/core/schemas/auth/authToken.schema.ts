import { z } from 'zod'

/**
 * @summary Realiza autenticação do usuário com base nas credenciais fornecidas
 */
export type ICriarTokenAcessoRequisicao = z.infer<typeof criarTokenAcessoRequisicao>
export const criarTokenAcessoRequisicao = z
  .object({
    email: z.string().describe('O endereço de e-mail do usuário que está solicitando o token.'),
    senha: z.string().describe('A senha do usuário que está solicitando o token.'),
    tenantId: z.uuid().describe('O identificador do inquilino (tenant) associado ao usuário.'),
    userId: z.uuid().describe('O identificador do usuário.'),
    nome: z.string().describe('O nome do usuário.'),
    administrador: z.boolean().describe('Indica se o usuário é administrador.')
  })
  .describe('Representa uma solicitação para criar um token de acesso.')

export type ICriarTokenAcessoResposta = z.infer<typeof criarTokenDeAcessoResposta>
export const criarTokenDeAcessoResposta = z
  .object({
    tokenDeAcesso: z.string().describe('O token de acesso gerado para autenticação.'),
    tokenDeAtualizacao: z.string().describe('O token de atualização que pode ser usado para obter um novo token de acesso.'),
    dataHoraTokenDeAtualizacao: z.iso.datetime({}).describe('A data e hora de expiração do token de atualização.')
  })
  .describe('Representa a resposta de um token de acesso e atualização.')

/**
 * @summary Realiza autenticação do usuário com base no refresh token.
 */
export type ICriarTokenDeAtualizacaoRequest = z.infer<typeof criarTokenDeAtualizacaoRequest>
export const criarTokenDeAtualizacaoRequest = z
  .object({
    tokenDeAcesso: z.string().describe('O token de acesso que está sendo utilizado.'),
    tokenDeAtualizacao: z.string().describe('O token de atualização que será utilizado para obter um novo token de acesso.'),
    tenantId: z.uuid().optional().describe('O identificador do tenant associado ao usuário.')
  })
  .describe('Representa uma solicitação para criar um token de atualização (refresh token).')
