// src/validations/pessoaValidations.ts
import { z } from 'zod'
import { EClassificacaoPessoa, pessoaIncluirEndpointBody } from './pessoa.schema'

// Schema estendido]
export const pessoaIncluirEndpointBodyExtended = pessoaIncluirEndpointBody.extend({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome não pode exceder 100 caracteres').nonempty('Nome é obrigatório'),
  classificacao: z.enum(EClassificacaoPessoa)
  // .regex(/^[a-zA-Z0-9 ]*$/, 'Não são permitidos caracteres especiais'),
  // idade: z.number().min(18, 'Deve ter pelo menos 18 anos').max(120, 'Idade inválida'),
  //demais regras
})
