import { z } from 'zod'

export type PessoaClienteAtualizarRequisicao = z.infer<typeof pessoaClienteAtualizarRequisicao>
/**
 * Atualiza um registro de PessoaCliente
 */
export const pessoaClienteAtualizarRequisicao = z
  .object({
    id: z.uuid().describe('Identificação única.'),
    idAlternativo: z.string().describe('Identificação alternativa.'),
    pessoaId: z.uuid().describe('Identificação única da pessoa.'),
    categoriaId: z.uuid().describe('Identificação única da categoria da pessoa.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade da pessoa.'),
    emailCopiaPedido: z.string().describe('E-mail para ser enviado cópia do pedido.'),
    emailXmlNfe: z.string().describe('E-mail para envio do xml do documento fiscal.'),
    observacao: z.string().describe('Observações gerais para o cliente.'),
    aliqIrNotaFiscal: z.number().describe('Define aliquota a ser utilizada para imposto de renda na emissão de nota fiscal se estiver definido\r\npara impressão.'),
    destacaIrNotaFiscal: z.boolean().describe('Define se será destacado imposto de renda na nota fiscal para o cliente.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.'),
  })
  .describe('Usado na feature de atualização de Pessoa Cliente.')

/**
 * Exclui um registro de PessoaCliente
 */
export const pessoaClienteExcluirEndpointParams = z.object({
  pessoaId: z.uuid().describe('Identificador único de Pessoa relativo ao Cliente a ser removido'),
})

export type PessoaClienteIncluirRequisicao = z.infer<typeof pessoaClienteIncluirRequisicao>
/**
 * Inclui um registro de PessoaCliente
 */
export const pessoaClienteIncluirRequisicao = z
  .object({
    idAlternativo: z.string().describe('Identificação alternativa.'),
    pessoaId: z.uuid().describe('Identificação única da pessoa.'),
    categoriaId: z.uuid().describe('Identificação única da categoria da pessoa.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade da pessoa.'),
    emailCopiaPedido: z.string().describe('E-mail para ser enviado cópia do pedido.'),
    emailXmlNfe: z.string().describe('E-mail para envio do xml do documento fiscal.'),
    observacao: z.string().describe('Observações gerais para o cliente.'),
    aliqIrNotaFiscal: z.number().describe('Define aliquota a ser utilizada para imposto de renda na emissão de nota fiscal se estiver definido\r\npara impressão.'),
    destacaIrNotaFiscal: z.boolean().describe('Define se será destacado imposto de renda na nota fiscal para o cliente.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.'),
  })
  .describe('Usado na feature de inclusão de Pessoa Cliente.')

export const pessoaClienteIncluirEndpointResponse = z.uuid()

/**
 * Busca um Cliente pelo Id Alternativo
 */
export const pessoaClienteBuscarPorIdAlternativoEndpointParams = z.object({
  idAlternativo: z.string().describe('Id Alternativo relativo ao Cliente a ser buscado.'),
})

export const pessoaClienteBuscarPorIdAlternativoEndpointResponse = z
  .object({
    id: z.uuid().describe('Identificação única.'),
    idAlternativo: z.string().describe('Identificação alternativa.'),
    pessoaId: z.uuid().describe('Identificação única da pessoa.'),
    categoriaId: z.uuid().describe('Identificação única da categoria da pessoa.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade da pessoa.'),
    emailCopiaPedido: z.string().describe('E-mail para ser enviado cópia do pedido.'),
    emailXmlNfe: z.string().describe('E-mail para envio do xml do documento fiscal.'),
    observacao: z.string().describe('Observações gerais para o cliente.'),
    destacaIrNotaFiscal: z.boolean().describe('Define se será destacado imposto de renda na nota fiscal para o cliente.'),
    aliqIrNotaFiscal: z.number().describe('Define aliquota a ser utilizada para imposto de renda na emissão de nota fiscal se estiver definido\r\npara impressão.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.'),
  })
  .describe('Resposta de PessoaCliente')

/**
 * @summary Resposta de busca de Cliente pelo ID Pessoa.
 */
export const getClienteBuscarPorIdPessoaResponseSchema = z
  .object({
    id: z.uuid().describe('Identificação única.'),
    idAlternativo: z.string().describe('Identificação alternativa.'),
    pessoaId: z.uuid().describe('Identificação única da pessoa.'),
    categoriaId: z.uuid().describe('Identificação única da categoria da pessoa.'),
    ramoAtividadeId: z.uuid().describe('Identificação única do ramo de atividade da pessoa.'),
    emailCopiaPedido: z.string().describe('E-mail para ser enviado cópia do pedido.'),
    emailXmlNfe: z.string().describe('E-mail para envio do xml do documento fiscal.'),
    observacao: z.string().describe('Observações gerais para o cliente.'),
    destacaIrNotaFiscal: z.boolean().describe('Define se será destacado imposto de renda na nota fiscal para o cliente.'),
    aliqIrNotaFiscal: z.number().describe('Define aliquota a ser utilizada para imposto de renda na emissão de nota fiscal se estiver definido\r\npara impressão.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.'),
  })
  .describe('Resposta de PessoaCliente')
export type GetClienteBuscarPorIdPessoaResponse = z.infer<typeof getClienteBuscarPorIdPessoaResponseSchema>
