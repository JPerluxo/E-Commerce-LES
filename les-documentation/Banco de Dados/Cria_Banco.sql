-- CRIA A DATABASE
CREATE DATABASE eCommerce;

-- CRIA AS TABELAS
CREATE TABLE cliente (
    cli_id SERIAL PRIMARY KEY,
    cli_nome VARCHAR(100) NOT NULL,
    cli_genero VARCHAR(15) NOT NULL,
    cli_data_nascimento DATE NOT NULL,
    cli_cpf VARCHAR(12) NOT NULL,
    cli_email VARCHAR(50) NOT NULL,
    cli_senha VARCHAR(50) NOT NULL
);

CREATE TABLE pedidos (
    ped_id SERIAL PRIMARY KEY,
    ped_usu_id INTEGER NOT NULL,
    ped_data DATE NOT NULL,
    cli_id INTEGER,
    CONSTRAINT pedidos_cliente_fk FOREIGN KEY (cli_id) REFERENCES cliente (cli_id)
);

CREATE TABLE bandeirascartao (
    bnd_id SERIAL PRIMARY KEY,
    bnd_nome VARCHAR(50) NOT NULL,
    cli_id INTEGER NOT NULL,
    CONSTRAINT bandeirascartao_cliente_fk FOREIGN KEY (cli_id) REFERENCES cliente (cli_id)
);

CREATE TABLE cartoesdecredito (
    crt_id SERIAL PRIMARY KEY,
    crt_numero VARCHAR(50),
    crt_nome_impresso VARCHAR(50),
    crt_codigo_seguranca VARCHAR(50),
    crt_usu_id VARCHAR(50),
    crt_esta_ativo CHAR(1),
    bnd_id INTEGER NOT NULL,
    CONSTRAINT cartoesdecredito_bandeirascartao_fk FOREIGN KEY (bnd_id) REFERENCES bandeirascartao (bnd_id)
);

CREATE TABLE grupo_precificacao (
    grp_id SERIAL PRIMARY KEY,
    grp_descricao VARCHAR(100) NOT NULL,
    grp_margem_lucro FLOAT NOT NULL
);

-- POPULA A TABELA grupo_precificacao
INSERT INTO grupo_precificacao (grp_descricao, grp_margem_lucro)
VALUES 
    ('Livros de Fantasia', 0.3),
    ('Livros Didáticos', 0.1);

CREATE TABLE livros (
    lvr_id SERIAL PRIMARY KEY,
    lvr_autor VARCHAR(100) NOT NULL,
    lvr_categoria VARCHAR(50) NOT NULL,
    lvr_preco_de_custo FLOAT NOT NULL,
    lvr_ano INTEGER NOT NULL,
    lvr_titulo VARCHAR(100) NOT NULL,
    lvr_editora VARCHAR(100) NOT NULL,
    lvr_edicao VARCHAR(50) NOT NULL,
    lvr_isbn VARCHAR(50) NOT NULL,
    lvr_numero_paginas INTEGER NOT NULL,
    lvr_sinopse VARCHAR(200) NOT NULL,
    lvr_altura FLOAT NOT NULL,
    lvr_largura FLOAT NOT NULL,
    lvr_profundidade FLOAT NOT NULL,
    lvr_cod_barras INTEGER NOT NULL,
    grupo_precificacao_grp_id INTEGER NOT NULL,
    CONSTRAINT livros_grupo_precificacao_fk FOREIGN KEY (grupo_precificacao_grp_id) REFERENCES grupo_precificacao (grp_id)
);

-- POPULA A TABELA livros
INSERT INTO livros (lvr_autor, lvr_categoria, lvr_preco_de_custo, lvr_ano, lvr_titulo, lvr_editora, lvr_edicao, lvr_isbn, lvr_numero_paginas, lvr_sinopse, lvr_altura, lvr_largura, lvr_profundidade, lvr_cod_barras, grupo_precificacao_grp_id)
VALUES 
    ('Antoine de Saint-Exupéry', 'Fantasia', 16.00, 2018, 'O Pequeno Príncipe', 'HarperCollins', '1ª edição', '8595081514', 96, 'Nesta história, um piloto cai com seu avião no deserto do Saara e encontra um pequeno príncipe, que o leva a uma aventura filosófica e poética através de planetas que encerram a solidão humana.', 22.6, 15.0, 0.8, 961452378, 1),
    
    ('J.R.R Tolkien', 'Fantasia', 100.00, 2000, 'O Senhor dos Anéis: Volume Único', 'HarperCollins', '1ª edição', '655511424X', 1280, 'Durante a Segunda Era na Terra-média Sauron forjou o Um Anel em segredo. Após a Batalha da Última Aliança o anel foi tomado de Sauron por Isildur. Perdido por séculos, caiu nas mãos de Bilbo Bolseiro.', 15.5, 6.5, 23.0, 873254916, 1),

    ('David Halliday', 'Física', 200.00, 2023, 'Fundamentos da Física - Mecânica', 'LTC', '12ª edição', 8521637225, 384, 'Eleito o melhor livro introdutório de Física do século XX pela APS Physics. Nova edição com testes, exemplos, revisão e mais de 300 problemas novos, além de conteúdo exclusivo para professores.', 21.0, 1.6, 28.0, 245323687, 2);

CREATE TABLE compras (
    cpr_id SERIAL PRIMARY KEY,
    lvr_id INTEGER NOT NULL,
    cpr_qtde_produtos INTEGER NOT NULL,
    ped_id INTEGER NOT NULL,
    cpr_valor NUMERIC(10, 2) NOT NULL,
    CONSTRAINT compras_livros_fk FOREIGN KEY (lvr_id) REFERENCES livros (lvr_id),
    CONSTRAINT compras_pedidos_fk FOREIGN KEY (ped_id) REFERENCES pedidos (ped_id)
);

CREATE TABLE cupons (
    cpd_id SERIAL PRIMARY KEY,
    cpd_codigo VARCHAR(50) NOT NULL,
    cpd_usu_id INTEGER NOT NULL,
    cpd_utilizado CHAR(1) NOT NULL,
    cpd_tipo VARCHAR(50) NOT NULL,
    cli_id INTEGER NOT NULL,
    CONSTRAINT cupons_cliente_fk FOREIGN KEY (cli_id) REFERENCES cliente (cli_id)
);

CREATE TABLE endereco (
    end_id SERIAL PRIMARY KEY,
    end_tipo_residencia VARCHAR(50) NOT NULL,
    end_tipo_logradouro VARCHAR(50) NOT NULL,
    end_logradouro VARCHAR(50) NOT NULL,
    end_numero VARCHAR(20) NOT NULL,
    end_bairro VARCHAR(50) NOT NULL,
    end_cep CHAR(9),
    end_cidade VARCHAR(50) NOT NULL,
    end_estado CHAR(2) NOT NULL,
    end_pais VARCHAR(50) NOT NULL,
    end_cli_id INTEGER NOT NULL,
    CONSTRAINT endereco_cliente_fk FOREIGN KEY (end_cli_id) REFERENCES cliente (cli_id)
);

CREATE TABLE telefone (
    tel_id SERIAL PRIMARY KEY,
    tel_numero VARCHAR(20),
    tel_tipo VARCHAR(50) NOT NULL,
    tel_ddd VARCHAR(2) NOT NULL,
    tel_cli_id INTEGER NOT NULL,
    CONSTRAINT telefone_cliente_fk FOREIGN KEY (tel_cli_id) REFERENCES cliente (cli_id)
);
