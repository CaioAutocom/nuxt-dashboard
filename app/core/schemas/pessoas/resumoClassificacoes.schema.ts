import { z } from 'zod'

export const pessoaResumoClassificacoesRespostaSchema = z.object({
  clientes: z.int().describe('Número total de Clientes'),
  fornecedores: z.int().describe('Número total de Fornecedores'),
  transportadores: z.int().describe('Número total de Transportadores'),
  funcionarios: z.int().describe('Número total de Funcionários'),
  vendedores: z.int().describe('Número total de Vendedores'),
  fabricantes: z.int().describe('Número total de Fabricantes'),
  representantes: z.int().describe('Número total de Representantes'),
  totalPessoas: z.int().describe('Número total de Pessoas'),
})

export type PessoaResumoClassificacoesResposta = z.infer<typeof pessoaResumoClassificacoesRespostaSchema>
