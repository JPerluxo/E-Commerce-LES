# **E-Commerce LES**

Este projeto consiste em um E-commerce de bebidas alcoólicas desenvolvido para a disciplina de Laboratório de Engenharia de Software da FATEC de Mogi das Cruzes. O sistema foi criado para facilitar a compra e venda de bebidas alcoólicas online. Com funcionalidades como cadastro e desativação de bebidas alcoólicas, registro de clientes com requisitos de senha segura e criptografada, gestão de vendas online e controle de carrinho de compras, nosso objetivo é oferecer uma plataforma eficaz para transações comerciais online, satisfazendo tanto os consumidores quanto os administradores do sistema.

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
    │
    └───controllers
    │
    └───services
    │
    └───daos
    │
    └───strategies
    │
    └───models
    │
    └───config
```

<details>
<summary>detalhes sobre a estrutura de pastas</summary>
<br>

# **Estrutura de pastas**

Detalhes sobre a estrutura de pastas adotada para o projeto.

### **Controllers**

 Contém os controladores da aplicação que lidam com as requisições e respostas, gerenciando a lógica de processamento, validação e manipulação dos dados.

### **Services**

 Responsável pela implementação das regras de negócio e pela coordenação das interações entre os controladores e os DAOs.

### **DAOs**

 Data Access Objects (DAOs) são responsáveis pela comunicação direta com o banco de dados, incluindo operações como consultas e atualizações.

### **Strategies**

 Implementa padrões de projeto e estratégias específicas, como autenticação e autorização, além de outras lógicas complexas que não se encaixam em controllers ou services.

### **Models**

 Define as estruturas de dados e entidades do sistema, representando as tabelas e relacionamentos no banco de dados.

### **Config**

 Contém arquivos de configuração e variáveis de ambiente essenciais para o funcionamento do projeto, como configurações de banco de dados e parâmetros de ambiente.


### **Boas práticas**

- ### Convenções de nomenclatura

  Para trazer mais clareza e semântica para o código podemos adotar um padrão para nomenclatura.

  - camelCase: Usado para variáveis, propriedades e nomes de funções.
    - ex. getUserData, processData.
  - PascalCase: Aplicado a classes, interfaces e outras definições de tipo.
    - ex. UserService, UserModel.
  - snake_case: Utilizado para arquivos de documentação, arquivos de configuração, nomes de pastas e rotas de endpoints.
    - ex. config_env.js, user_routes.js.
  - CONSTANTES: Constantes são escritas em letras maiúsculas com palavras separadas por underscores.
    - ex. STATUS_CODES, DATABASE_CONFIG.
</details>