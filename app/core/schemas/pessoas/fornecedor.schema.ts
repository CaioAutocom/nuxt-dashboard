import { z } from 'zod'

export const fornecedorSchema = z
  .object({
    id: z.uuid().describe('Identificação única.').optional(),
    idAlternativo: z.string().describe('Identificação alternativa da pessoa.'),
    pessoaId: z.uuid().nullish().describe('Identificação única da pessoa relacionada a este fornecedor.'),
    categoriaId: z.uuid().describe('Identificação única da categoria a qual esta pessoa pertence.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade a qual esta pessoa pertence.'),
    emailXmlNfe: z.string().describe('E-mail para envio do xml do documento fiscal.'),
    observacao: z.string().describe('Observações gerais.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.'),
  })
  .describe('Carrega suas informações como fornecedor.')

/**
 * @summary Incluir cadastro de PessoaFornecedor.
 */
export const fornecedorIncluirRequest = fornecedorSchema.omit({
  id: true,
})
export type FornecedorIncluirRequestType = z.infer<typeof fornecedorIncluirRequest>
