export enum EFisJur {
  Fisica = 0,
  Juridica = 1,
}

export enum EFisJurDescription {
  Fisica = 'Fisica',
  Juridica = 'Juridica',
}

// Converte EFisJurDescription para EFisJur
export function PessoaFisJurToPessoaFisJurEnum(pessoaRespostaFisJur: EFisJurDescription): EFisJur {
  switch (pessoaRespostaFisJur) {
    case EFisJurDescription.Fisica:
      return EFisJur.Fisica
    case EFisJurDescription.Juridica:
      return EFisJur.Juridica
    default:
      throw Error('Tipo de pessoa inválido')
  }
}

// Converte EFisJur para EFisJurDescription
export function PessoaFisJurEnumToPessoaFisJurDescription(pessoaRespostaFisJur: EFisJur): EFisJurDescription {
  switch (pessoaRespostaFisJur) {
    case EFisJur.Fisica:
      return EFisJurDescription.Fisica
    case EFisJur.Juridica:
      return EFisJurDescription.Juridica
    default:
      throw Error('Tipo de pessoa inválido')
  }
}

// Converte EFisJur para string acentuada
export function PessoaFisJurToString(pessoaRespostaFisJur: EFisJur): string {
  switch (pessoaRespostaFisJur) {
    case EFisJur.Fisica:
      return 'Física'
    case EFisJur.Juridica:
      return 'Jurídica'
    default:
      throw Error('Tipo de pessoa inválido')
  }
}
