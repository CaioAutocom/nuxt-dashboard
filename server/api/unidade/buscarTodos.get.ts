type Unidade = {
  id: string
  sigla: string
  nome: string
  observacoes: string
  ativo: boolean
}

export default defineEventHandler(async (event): Promise<Unidade[]> => {
  try {
    const query = getQuery(event)
    const session = await getUserSession(event)
    const apiToken = (session.secure as any)?.apiToken as string
    // const requestResolved: PessoaBuscarTodosSimplificadoRequestType = pessoaBuscarTodasSimplificadoRequestSchema.parse(query)

    const respostaApi = await $fetch<Unidade[]>('https://vpsh-01.esistem.com.br/api/v1/produto-unidade/buscar-todos', {
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
