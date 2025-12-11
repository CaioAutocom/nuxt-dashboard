# Nuxt (framework)

## Prós

- Obriga utilizar a estrutura de pastas do framework, o que deixa o sistema organizado
- Auto importa componentes (atualmente corrigimos muitos imports manualmente para adequar a uma sintaxe especifica)
- Possui fetch nativo, elimina biblioteca axios
- Amplamente utilizado
- Possui muitos complementos

## Contras

- Adiciona complexidade, pode ser necessário um curso para aprender todas suas features e a forma correta de utilizar
- É um framework para fullstack, muitas features não serão utilizadas
- Foco em ssr

# Nuxt UI (ui/componentes)

## Prós

### Formulário

Permite utilizar os esquemas do zod para validação de um formulario de forma simples, o que torna fácil atualizar as regras de validação de um form e centraliza as regras da api em apenas um local (atualmente é exportar as regras em um objeto extra e realizar alguns ajustes manuais, já que não conseguimos utilizar o refine do zod com o DxForm)

Exmplo de form sendo validade com Nuxt UI:

```vue
<UForm
  :schema="produtoSchema"
  :state="camposFormState"
  class="space-y-4"
  @submit="onSubmit"
>
  <UFormField label="estoque min" name="estoqueMin">
    <UInputNumber v-model="camposFormState.estoqueMin" />
  </UFormField>
</UForm>
```

```ts
const produtoSchema = z
  .object({
    // ...

    estoqueMin: z
      .number()
      .min(0, "Estoque mínimo deve ser maior ou igual a 0")
      .max(200)
      .describe("Quantidade mínima permitida em estoque deste produto."),

    // estoqueMax: ...
  })
  .refine((data) => data.estoqueMax >= data.estoqueMin, {
    message: "Estoque máximo deve ser maior ou igual a estoque mínimo",
    path: ["estoqueMax"],
  });

const camposFormState = reactive<Partial<Schema>>({
  estoqueMin: undefined,
  estoqueMax: undefined,
});
```

### Customização

Nuxt UI utiliza tailwind por padrão, o que facilita customizar e alinhar elementos (em alguns casos no devextreme, os componentes tem prioridade na renderização, e o css aplicado manualmente não funciona sem manobras)

### Outros

- Tem toast nativo completo, elimina biblioteca Vue-Toastification
- Tem modal nativo, elimina modal feito manualmente
- Possui componente Tree, quer permite customização fácil que atende uma necessidade atual do sistema (TreeSelect)
- Totalmente tipado (integração total com Typescript)
- Permite abrir select box com barra de espaço (DevExtreme não abre com atalho por padrao)
- Fácil utilizar icones adicionais

## Contras

- Data Grid não possui agrupamento nativo
- Máscara de campos numericos incompleta/fraca
- Só faz sentido utilizar Nuxt UI com o framework Nuxt

# PrimeVue (ui/componentes)

## Prós

- Possui componete [TreeSelect](https://primevue.org/treeselect/#basic), que atualmente é feito manualmente
- Máscara de campos numéricos fácil de usar
- Possui modal nativo
- Possui grande quantidade de componentes
- Uma das bibliotecas mais utilizadas
- Não é necessario utilizar o framework Nuxt
- Formulário possui código simples / facil de ler

## Contras

- É necessario codigo adicional para integração de esquemas zod ao formulário
- Grid não possui agrupamento nativo
- Toast nativo imcompleto/fraco
- Não é tão facil configurar/instalar como Nuxt UI
- Docs menos claras que Nuxt UI
