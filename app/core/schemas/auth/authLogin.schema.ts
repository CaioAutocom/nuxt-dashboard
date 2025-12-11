import { z } from 'zod'

// Schema para Pessoa
const PessoaLoginSchema = z.object({
  id: z.uuid(),
  pessoaTipo: z.enum(['fisica', 'juridica']),
  cpfOuCNPJ: z.string(),
  nome: z.string(),
  apelidoFantasia: z.string(),
  idAlternativo: z.string(),
  ativo: z.boolean(),
})

// Schema para Tenant
const TenantSchema = z.object({
  id: z.uuid(),
  tenantGrupoId: z.uuid(),
  nome: z.string(),
  schema: z.string(),
  ativo: z.boolean(),
})

// Schema principal do Usuário
const UsuarioLoginResponseSchema = z.object({
  id: z.uuid(),
  nome: z.string(),
  email: z.email(),
  ativo: z.boolean(),
  administrador: z.boolean(),
  pessoa: PessoaLoginSchema,
  tenants: z.array(TenantSchema),
})

const UsuarioLoginRequestSchema = z.object({
  email: z.string(),
  senha: z.string(),
})

const ApiErrorSchema = z.object({
  type: z.string().nullable(),
  title: z.string().nullable(),
  status: z.number().nullable(),
  detail: z.string().nullable(),
  instance: z.string().nullable(),
})

type ApiError = z.infer<typeof ApiErrorSchema>

// Tipos TypeScript inferidos
type PessoaLogin = z.infer<typeof PessoaLoginSchema>
type Tenant = z.infer<typeof TenantSchema>
type UsuarioLoginResponse = z.infer<typeof UsuarioLoginResponseSchema>
type UsuarioLoginRequest = z.infer<typeof UsuarioLoginRequestSchema>

export { UsuarioLoginResponseSchema, PessoaLoginSchema, TenantSchema, UsuarioLoginRequestSchema, ApiErrorSchema }
export type { UsuarioLoginResponse, PessoaLogin, Tenant, UsuarioLoginRequest, ApiError }
