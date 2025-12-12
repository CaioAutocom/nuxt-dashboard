import {
  pessoaBuscarTodasSimplificadoRequestSchema,
  pessoaBuscarTodosSimplificadoPaginadoResponseSchema,
  type PessoaBuscarTodosSimplificadoRequestType,
  type PessoaBuscarTodosSimplificadoPaginadoResponseType
} from '~/core/schemas/pessoas/pessoa.schema'

export default defineEventHandler(async (event): Promise<PessoaBuscarTodosSimplificadoPaginadoResponseType> => {
  try {
    const query = getQuery(event)
    const session = await getUserSession(event)
    const apiToken = (session.secure as any)?.apiToken as string
    // const requestResolved: PessoaBuscarTodosSimplificadoRequestType = pessoaBuscarTodasSimplificadoRequestSchema.parse(query)

    const respostaApi = await $fetch<PessoaBuscarTodosSimplificadoPaginadoResponseType>('https://app.esistem.com.br/api/v1/pessoa/buscar-todos-simplificado', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiToken}`
      },
      params: query
    })

    // const responseResolved = pessoaBuscarTodosSimplificadoPaginadoResponseSchema.parse(respostaApi)

    return respostaApi
  } catch (error) {
    console.error('[buscar-todos-simplificado]', error)
    throw error
  }
})
