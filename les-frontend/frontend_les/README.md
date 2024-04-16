# **E-Commerce LES**

Este projeto consiste em um E-commerce de livros desenvolvido para a disciplina de Laboratório de Engenharia de Software da FATEC de Mogi das Cruzes. O sistema foi criado para facilitar a compra e venda de livros online. Com funcionalidades como cadastro e desativação de livros, registro de clientes com requisitos de senha segura e criptografada, gestão de vendas online e controle de carrinho de compras, nosso objetivo é oferecer uma plataforma eficaz para transações comerciais online, satisfazendo tanto os leitores quanto os administradores do sistema.

### **Execução**

- #### dependências:
  - executar o comando na raiz do projeto:
  ```bash
  npm install
  ```

- #### dev:
  - renomear o arquivo "[.env.example](./.env.example)" para ".env.local" e preencher as variáveis de ambiente necessárias com os valores apropriados.
  - executar o comando na raiz do projeto:
  ```bash
  npm start
  ```

  ### **Estrutura**

```
│
└───src
│   │
│   └───concepts
│   │    │
│   │    └───concept_name
│   │        │
│   │        └───components
│   │        │   │
│   │        │   └─atoms
│   │        │   │
│   │        │   └─molecules
│   │        │   │
│   │        │   └─organisms
│   │        │   │
│   │        │   └─templates
│   │        │
│   │        └─hooks
│   │
│   └───apis (server apis)
│   │
│   └───images
│
└───public
    │
    └───icons
```

<details>
<summary>detalhes sobre a estrutura de pastas</summary>
<br>

# **Estrutura de pastas**

Detalhes sobre a estrutura de pastas adotada para o projeto.

### **Components**

A pasta "components" vai ser responsável por organizar os componentes usando a metodologia de [Atomic design](https://atomicdesign.bradfrost.com/chapter-2/), essa metodologia estrutura os componentes por sua responsabilidade.

- ## atoms

  Representa a estrutura mais básica de componentes, não possuem regras de negócio e seu uso deve ser genérico.

- ## molecules

  Representa um grupo de átomos ou moléculas, seu uso pode ser menos genérico e pode apresentar regras de negócio e executar consultas à informações externas como hooks e contexts.

- ## organisms
  Representa a estrutura mais mais complexa de componentes, geralmente um conjunto de moléculas. O organismo representa o conjunto de componentes que têm como objetivo definir toda a estrutura de uma funcionalidade.

### **Hooks**

Na pasta "hooks" ficarão as chamadas da regra de negócio, sendo elas lógica da aplicação ou chamadas a apis externas.

### **Concepts**

Dentro da pasta "concepts", alinhada à abordagem do Domain-Driven Design (DDD), cada subpasta representa um domínio específico da aplicação. O DDD é uma metodologia que foca em representar o domínio do problema através do código, e neste contexto, cada "concept" representa um domínio ou subdomínio específico, sendo uma parte isolada da lógica de negócio.

Por exemplo, se há a necessidade de um grupo de componentes que será utilizado exclusivamente dentro de um contexto de "cadastro de livro", pode-se criar uma pasta dentro de "concepts" com o nome "cadastro-livro". Dessa forma, além da organização por componentes, a estrutura também reflete a organização por domínio de regra de negócio ou funcionalidade.

Esses componentes serão utilizados apenas dentro do contexto dessa funcionalidade e não serão de uso genérico para toda a aplicação. Cada "concept" terá seu grupo de componentes, organizados usando atomic design, seus "hooks", tudo que for pertinente apenas a esse domínio ou funcionalidade específica.

### **Apis**

Essa pasta vai ter a configuração das urls de comunicação externa, as urls de apis de terceiro.

### **Public**

Podemos usar a pasta "public" para guardar arquivos que vamos utilizar dentro da aplicação, como ícones ou imagens.

### **Boas práticas**

- ### Convenções de nomenclatura

  Para trazer mais clareza e semântica para o código podemos adotar um padrão para nomenclatura.

  - camelCase: para variáveis, propriedades e nomes de funções:
    - ex: useState, useMemo e useRouter são hooks, hooks são funções e portanto obedecem seguem essa regra de nomenclatura.
  - PascalCase: para componentes e definição de tipos.
    - ex: O nome de um componente como Title, ou a definição de um tipo como Props ou TitleType vão seguir esse padrão, um caso mais específico por exemplo é um contexto do react, onde o contexto é uma função, mas seu provider segue esse padrão por ser um componente do react como QueryClientProvider.
  - snake-case: para arquivos de documentação, configuração, nome de pastas e páginas.
    - ex: next-env.d.ts segue esse padrão, também usamos essa forma para nomes de arquivos de páginas poorque o padrão para urls é snake case e o arquivo de página reflete na url.
  - CONSTANTES: os nomes das constantes são escritos em letras maiúsculas com palavras separadas por sublinhados (underscores).
    - ex: STATUS_CODES, METHODS.
</details>