import { z } from 'zod'
import { UsuarioLoginResponseSchema } from '~/core/schemas/auth/authLogin.schema'

const bodySchema = z.object({
  email: z.email(),
  senha: z.string().min(8)
})



export default defineEventHandler(async (event) => {
  const { email, senha } = await readValidatedBody(event, bodySchema.parse)
  console.log('Recebido no prelogin:', { email, senha })
  // Chama sua API real
  const response = await $fetch('https://app.esistem.com.br/api/v1/usuarios/login', {
    method: 'POST',
    body: {
      email,
      senha
    }
  })

  console.log('Resposta da API externa:', response)
  // Valida com zod seu retorno
  // const usuario = UsuarioLoginResponseSchema.parse(response)

  return response
})
