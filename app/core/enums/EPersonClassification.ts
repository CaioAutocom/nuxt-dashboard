export enum EPersonClassification {
  Cliente = 'Cliente',
  Fornecedor = 'Fornecedor',
  Transportadora = 'Transportadora',
  Vendedor = 'Vendedor',
  // Verificar se serão ativados futuramente
  // OpCartao = 'Op. Cartão',
  // PSPPix = 'PSP Pix',
  // Fabricante = 'Fabricante',
  // Funcionario = 'Funcionário',
  // Contador = 'Contador',
  // Usuario = 'Usuário',
  // Representante = 'Representante',
}

// Crie uma lista com os valores do enum
export const personClassificationOptions = Object.values(EPersonClassification)

// Transforma o enum em um array de objetos com ID e Name
export const personClassificationOptionsObject = Object.values(EPersonClassification).map(
  (value, index) => ({
    Id: index++,
    Name: value,
  }),
)
