import { z } from 'zod'
import { contatoBaseZod as contatoSchema } from '@/modules/person/validations/contato.zod'
import { enderecoSchema } from '@/modules/person/validations/endereco.zod'
import { EPersonClassification } from '@/core/enums/EPersonClassification'
import { fornecedorSchema } from '@/modules/person/validations/fornecedor.zod'
import { transportadoraSchema } from '@/modules/person/validations/transportadora.zod'
import { EFisJur, EFisJurDescription } from '@/core/enums/EFisJur'
import { EGenero } from '@/core/enums/EGenero'
import { vendedorSchema } from '@/modules/person/validations/vendedor.zod'

// ainda não utilizado
export enum EClassificacaoPessoa {
  Cliente = 1,
  Fornecedor = 2,
  Transportadora = 4,
  Funcionario = 8,
  Vendedor = 16,
  Fabricante = 32,
  Representante = 64,
}

export const ClassificacaoPessoaResposta = ['Cliente', 'Fornecedor', 'Transportadora', 'Funcionario', 'Vendedor', 'Fabricante', 'Representante'] as const

export const estadoCivil = ['Solteiro', 'Casado', 'Divorciado', 'NaoInformado'] as const

export const estadoCivilZod = z.enum(estadoCivil)

export const pessoaSchema = z
  .object({
    id: z.uuid().describe('Identificação única.'),
    idAlternativo: z.string().describe('Identificação única.'),
    tenantId: z.string().describe('Identificador de tenant.'),
    classificacao: z.array(z.enum(ClassificacaoPessoaResposta)).describe('Classificações da pessoa'),
    fisJur: z.union([z.enum(EFisJur), z.enum(EFisJurDescription)]).describe('Define se é pessoa física ou jurídica'),
    docCpfCnpj: z.string().describe('Define o documento principal da pessoa.'),
    nome: z.string().max(150, 'Limite de 150 caracteres excedido.').describe('Nome da pessoa.'),
    apelidoFantasia: z.string().max(150, 'Limite de 150 caracteres excedido.').describe('Apelido da pessoa.'),
    docIdentidade: z.string().max(11, 'Limite de 11 caracteres excedido.').describe('Documento de identidade da pessoa.'),
    docIdentidadeEmissor: z.string().max(20, 'Limite de 20 caracteres excedido.').describe('Emissor do documento de identidade.'),
    docInscricaoEstadual: z.string().max(20, 'Limite de 20 caracteres excedido.').describe('Documento de inscrição estadual para pessoa.'),
    docInscricaoMunicipal: z.string().max(20, 'Limite de 20 caracteres excedido.').describe('Documento de inscrição municipal.'),
    docInscricaoProdutorRural: z.string().max(20, 'Limite de 20 caracteres excedido.').describe('Indica o número da inscrição de produtor rural para a pessoa.'),
    docInscSuframa: z.string().max(9, 'Limite de 9 caracteres excedido.').describe('Código suframa da pessoa.\r\nReferente a zona franca de Manaus.'),
    nascimentoFundacao: z.iso.datetime({}).prefault(new Date().toISOString()).describe('Data de nascimento/fundação da pessoa.'),
    estadoCivil: z.enum(estadoCivil).describe('Estado civil da pessoa.\r\nEnum irá indicar o estado civil.\r\nSolteiro = 0\r\nCasado = 1\r\nDivorciado = 2\r\nNaoInformado = -1'),
    nomeConjuge: z.string().max(150, 'Limite de 150 caracteres excedido.').describe('Nome do conjuge.'),
    nomePai: z.string().max(150, 'Limite de 150 caracteres excedido.').describe('Nome do pai.'),
    nomeMae: z.string().max(150, 'Limite de 150 caracteres excedido.').describe('Nome da mãe'),
    genero: z.enum(EGenero).describe('Gênero da pessoa, de acordo com a tabela.\r\nNaoInformado = -1.\r\nMasculino = 1.\r\nFeminino = 2.\r\nDefault -1.'),
    site: z.string().max(150, 'Limite de 150 caracteres excedido.').describe('Endereço do site.'),
    ativo: z.boolean().prefault(true).describe('Define se a pessoa está com o cadastro ativo.'),
    cliente: z
      .object({
        id: z.uuid().describe('Identificação única.').nullish(),
        idAlternativo: z.string().describe('Identificação alternativa.'),
        pessoaId: z.uuid().nullish().describe('Identificação única da pessoa.'),
        categoriaId: z.uuid().prefault('00000000-0000-0000-0000-000000000000').describe('Identificação única da categoria da pessoa.'),
        ramoAtividadeId: z.uuid().prefault('00000000-0000-0000-0000-000000000000').describe('Identificação única do ramo de atividade da pessoa.'),
        emailCopiaPedido: z.string().describe('E-mail para ser enviado cópia do pedido.'),
        emailXmlNfe: z.string().describe('E-mail para envio do xml do documento fiscal.'),
        observacao: z.string().describe('Observações gerais para o cliente.'),
        destacaIrNotaFiscal: z.boolean().describe('Define se será destacado imposto de renda na nota fiscal para o cliente.'),
        aliqIrNotaFiscal: z.number().describe('Define aliquota a ser utilizada para imposto de renda na emissão de nota fiscal se estiver definido\r\npara impressão.'),
        ativo: z.boolean().describe('Define se o cadastro está ativo.'),
      })
      .describe('Resposta de PessoaCliente')
      .nullish()
      .describe('Carrega suas informações como cliente.'),
    contatos: z.array(contatoSchema).nullish().describe('Lista de contatos da pessoa.'),
    enderecos: z.array(enderecoSchema).nullish().describe('Lista de endereços da pessoa.'),
    fornecedor: fornecedorSchema.nullish().describe('Carrega suas informações como fornecedor.'),
    transportador: transportadoraSchema.nullish().describe('Carrega suas informações como transportador.'),
    vendedor: vendedorSchema.nullish().describe('Carrega suas informações como vendedor.'),
  })
  .describe('Resposta de Pessoa.')
export type Pessoa = z.infer<typeof pessoaSchema>

/**
 * @summary Manipula a requisição de inclusão de pessoa
 */

export const pessoaIncluirEndpointBody = z
  .object({
    tenantId: z.uuid().describe('Identificador de tenant.'),
    classificacao: z
      .string()
      .describe(
        'Armazena a somatória das classificações conforme a tabela de classificação.\r\nValor máximo 127, onde a pessoa pertence a todas classificaçoes.\r\nTABELA:\r\nCliente = 1 // 0001,\r\nFornecedor = 2 // 0010,\r\nTransportadora = 4 // 0100,\r\nFuncionario = 8 // 1000,\r\nVendedor = 16 // 10000,\r\nFabricante = 32 // 100000,\r\nRepresentante = 64 // 1000000',
      ),
    fisJur: z.enum(EFisJur).describe('Define se é pessoa física ou jurídica'),
    docCpfCnpj: z.string().describe('Define o documento principal da pessoa.'),
    nome: z.string().describe('Nome da pessoa.'),
    apelidoFantasia: z.string().describe('Apelido da pessoa.'),
    docIdentidade: z.string().describe('Documento de identidade da pessoa.'),
    docIdentidadeEmissor: z.string().describe('Emissor do documento de identidade da pessoa.'),
    docInscricaoMunicipal: z.string().describe('Documento de inscrição municipal da pessoa.'),
    docInscricaoProdutorRural: z.string().describe('Indica o número da inscr~ição de produtor rural para a pessoa.'),
    docInscSuframa: z.string().describe('Código suframa da pessoa.\r\nReferente a zona franca de Manaus.'),
    nascimentoFundacao: z.iso.datetime({}).describe('Data de nascimento/fundação da pessoa.'),
    estadoCivil: z.enum(estadoCivil).describe('Estado civil da pessoa.\r\nSolteiro = 0,\r\nCasado = 1,\r\nDivorciado = 2,\r\nNaoInformado = -1'),
    nomeConjuge: z.string().describe('Nome do conjuge.'),
    nomePai: z.string().describe('Nome do pai.'),
    nomeMae: z.string().describe('Nome da mãe.'),
    genero: z.enum(EGenero).describe('Genero da pessoa, de acordo com a tabela:\r\nNaoInformado = -1,\r\nMasculino = 1,\r\nFeminino = 2'),
    site: z.string().describe('Endereço do site.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.'),
    docInscricaoEstadual: z.string().describe('Documento de inscrição estadual da pessoa.'),
  })
  .describe('Usado na feature de inclusão de pessoa.')

export const pessoaRespostaZod = z
  .object({
    id: z.uuid().describe('Identificação única.'),
    idAlternativo: z.string().describe('Identificação única.'),
    tenantId: z.string().describe('Identificador de tenant.'),
    classificacao: z.array(z.enum(EPersonClassification)).describe('Armazena a somátoria das classificações conforme a tabela de classificação.'),
    fisJur: z.enum(EFisJurDescription).describe('Define é pessoa física ou jurídica'),
    docCpfCnpj: z.string().describe('Define o documento principal da pessoa.'),
    nome: z.string().describe('Nome da pessoa.'),
    apelidoFantasia: z.string().describe('Apelido da pessoa.'),
    docIdentidade: z.string().describe('Documento de identidade da pessoa.'),
    docIdentidadeEmissor: z.string().describe('Emissor do documento de identidade.'),
    docInscricaoEstadual: z.string().describe('Documento de inscrição estadual para pessoa.'),
    docInscricaoMunicipal: z.string().describe('Documento de inscrição municipal.'),
    docInscricaoProdutorRural: z.string().describe('Indica o número da inscrição de produtor rural para a pessoa.'),
    docInscSuframa: z.string().describe('Código suframa da pessoa.\r\nReferente a zona franca de Manaus.'),
    nascimentoFundacao: z.iso.datetime({}).describe('Data de nascimento/fundação da pessoa.'),
    estadoCivil: z.enum(estadoCivil).describe('Estado civil da pessoa.\r\nEnum irá indicar o estado civil.\r\nSolteiro = 0\r\nCasado = 1\r\nDivorciado = 2\r\nNaoInformado = -1'),
    nomeConjuge: z.string().describe('Nome do conjuge.'),
    nomePai: z.string().describe('Nome do pai.'),
    nomeMae: z.string().describe('Nome da mãe'),
    genero: z.enum(EGenero).describe('Gênero da pessoa, de acordo com a tabela.\r\nNaoInformado = -1.\r\nMasculino = 1.\r\nFeminino = 2.\r\nDefault -1.'),
    site: z.string().describe('Endereço do site.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.'),
  })
  .describe('Resposta de Pessoa.')

export type PessoaRespostaZod = z.infer<typeof pessoaRespostaZod>

export type PessoaAtualizarRequisicaoZod = z.infer<typeof pessoaAtualizarRequisicao>
/**
 * @summary Manipula a requisição de atualização de pessoa
 */
export const pessoaAtualizarRequisicao = z
  .object({
    id: z.uuid().describe('Identificação única.'),
    classificacao: z
      .string()
      .describe(
        'Armazena a somatória das classificações conforme a tabela de classificação.\r\nValor máximo 127, onde a pessoa pertence a todas classificaçoes.\r\nTABELA: Pessoa = 0 // 0000,\r\nCliente = 1 // 0001,\r\nFornecedor = 2 // 0010,\r\nTransportadora = 4 // 0100,\r\nFuncionario = 8 // 1000,\r\nVendedor = 16 // 10000,\r\nFabricante = 32 // 100000,\r\nRepresentante = 64 // 1000000',
      ),
    fisJur: z.enum(['Fisica', 'Juridica']).describe('Define o tipo da pessoa.\r\nFísica = 0,\r\nJurídica = 1'),
    nome: z.string().describe('Nome da pessoa.'),
    apelidoFantasia: z.string().describe('Apelido da pessoa.'),
    docIdentidade: z.string().describe('Documento de identidade da pessoa.'),
    docIdentidadeEmissor: z.string().describe('Emissor do documento de identidade da pessoa.'),
    docInscricaoMunicipal: z.string().describe('Documento de inscrição municipal da pessoa.'),
    docInscricaoProdutorRural: z.string().describe('Indica o número da inscr~ição de produtor rural para a pessoa.'),
    docInscSuframa: z.string().describe('Código suframa da pessoa.\r\nReferente a zona franca de Manaus.'),
    nascimentoFundacao: z.iso.datetime({}).describe('Data de nascimento/fundação da pessoa.'),
    estadoCivil: z.enum(estadoCivil).describe('Estado civil da pessoa.\r\nSolteiro = 0,\r\nCasado = 1,\r\nDivorciado = 2,\r\nNaoInformado = -1'),
    nomeConjuge: z.string().describe('Nome do conjuge.'),
    nomePai: z.string().describe('Nome do pai.'),
    nomeMae: z.string().describe('Nome da mãe.'),
    genero: z.enum(EGenero).describe('Genero da pessoa, de acordo com a tabela:\r\nNaoInformado = -1,\r\nMasculino = 1,\r\nFeminino = 2'),
    site: z.string().describe('Endereço do site.'),
    ativo: z.boolean().describe('Define se o cadastro está ativo.'),
    docInscricaoEstadual: z.string().describe('Documento de inscrição estadual da pessoa.'),
  })
  .describe('Usado na feature de atualização de pessoa.')

export type PessoaBuscarTodosSimplificadoRequestType = z.infer<typeof pessoaBuscarTodasSimplificadoRequestSchema>
export const pessoaBuscarTodasSimplificadoRequestSchema = z.object({
  TermoDeBusca: z.string().optional(),
  ColunaDeOrdenacao: z.string().optional(),
  FiltroClassificacao: z.string().optional(),
  FiltroFisicaOuJuridica: z.enum(EFisJurDescription).optional(),
  OrdemReversa: z.boolean().optional(),
  PessoasAtivas: z.boolean().optional(),
  SensivelMaiusculaMinuscula: z.boolean().optional(),
  NumeroDaPagina: z.int().optional(),
  TamanhoDaPagina: z.int().optional(),
})

export type PessoaSimplificadaResposta = z.infer<typeof pessoaSimplificadaRespostaSchema>
export const pessoaSimplificadaRespostaSchema = z.object({
  id: z.uuid().describe('Identificador único de pessoa.'),
  idAlternativo: z.string().describe('Identificador alternativo de pessoa.'),
  classificacaoPessoa: z.array(z.string()).describe('Define as classificações da pessoa.'),
  fisJur: z.string().describe('Define se a pessoa é física ou jurídica.'),
  docCpfCnpj: z.string().describe('Documento de CPF ou CNPJ da pessoa.'),
  nome: z.string().describe('Nome da pessoa.'),
  apelidoFantasia: z.string().describe('Apelido ou Nome Fantasia de pessoa.'),
  docIdentidade: z.string().describe('Documento de identidade de pessoa.'),
  ativo: z.boolean().describe('Define se está cadastro está ativo.'),
})

export const pessoaBuscarTodosSimplificadoPaginadoResponseSchema = z.object({
  items: z.array(pessoaSimplificadaRespostaSchema),

  pageIndex: z.int(),
  pageSize: z.int(),
  totalItems: z.int(),

  totalPages: z.int().readonly(),
  hasPrevious: z.boolean().readonly(),
  hasNext: z.boolean().readonly(),
})

export type PessoaBuscarTodosSimplificadoPaginadoResponseType = z.infer<typeof pessoaBuscarTodosSimplificadoPaginadoResponseSchema>
