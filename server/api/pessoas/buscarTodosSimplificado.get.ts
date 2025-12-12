import {
  pessoaBuscarTodasSimplificadoRequestSchema,
  pessoaBuscarTodosSimplificadoPaginadoResponseSchema,
  type PessoaBuscarTodosSimplificadoRequestType,
  type PessoaBuscarTodosSimplificadoPaginadoResponseType
} from '~/core/schemas/pessoas/pessoa.schema'

export default defineEventHandler(async (event): Promise<PessoaBuscarTodosSimplificadoPaginadoResponseType> => {
  try {
    const query = getQuery(event)

    const requestResolved: PessoaBuscarTodosSimplificadoRequestType = pessoaBuscarTodasSimplificadoRequestSchema.parse(query)

    const respostaApi = await $fetch<PessoaBuscarTodosSimplificadoPaginadoResponseType>('https://app.esistem.com.br/api/v1/pessoa/buscar-todos-simplificado', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${event.context.secure?.apiToken}`
      },
      params: requestResolved
    })

    const responseResolved = pessoaBuscarTodosSimplificadoPaginadoResponseSchema.parse(respostaApi)

    return responseResolved
  } catch (error) {
    console.error('[buscar-todos-simplificado]', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao buscar pessoas'
    })
  }
})
