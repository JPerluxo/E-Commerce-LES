-- CRIA A DATABASE
CREATE DATABASE eCommerce;

-- Conectar na Database eCommerce

DO $$
    DECLARE id_grupo_precificacao_livro_fantasia int;
    DECLARE id_grupo_precificacao_livro_didatico int;
    DECLARE id_categoria_livro_fantasia int;
    DECLARE id_categoria_livro_didatico int;

    BEGIN
        -- CRIA AS TABELAS
        CREATE TABLE public.clientes (
            cli_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            cli_nome VARCHAR(100) NOT NULL,
            cli_genero VARCHAR(15) NOT NULL,
            cli_data_nascimento DATE NOT NULL,
            cli_cpf VARCHAR(12) NOT NULL,
            cli_email VARCHAR(50) NOT NULL,
            cli_senha VARCHAR(50) NOT NULL
        );

        CREATE TABLE public.pedidos (
            ped_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            ped_usu_id INTEGER NOT NULL,
            ped_data DATE NOT NULL,
            cli_id INTEGER,
            CONSTRAINT pedidos_cliente_fk FOREIGN KEY (cli_id) REFERENCES clientes (cli_id)
        );

        CREATE TABLE public.bandeirascartao (
            bnd_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            bnd_nome VARCHAR(50) NOT NULL,
            cli_id INTEGER NOT NULL,
            CONSTRAINT bandeirascartao_cliente_fk FOREIGN KEY (cli_id) REFERENCES clientes (cli_id)
        );

        CREATE TABLE public.cartoesdecredito (
            crt_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            crt_numero VARCHAR(50),
            crt_nome_impresso VARCHAR(50),
            crt_codigo_seguranca VARCHAR(50),
            crt_usu_id VARCHAR(50),
            crt_esta_ativo CHAR(1),
            bnd_id INTEGER NOT NULL,
            CONSTRAINT cartoesdecredito_bandeirascartao_fk FOREIGN KEY (bnd_id) REFERENCES bandeirascartao (bnd_id)
        );

        CREATE TABLE public.grupos_precificacao (
            grp_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            grp_descricao VARCHAR(100) NOT NULL,
            grp_margem_lucro FLOAT NOT NULL
        );

        CREATE TABLE public.categorias (
            cat_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            cat_descricao VARCHAR(100) NOT NULL
        );

        -- POPULA A TABELA grupos_precificacao
        INSERT INTO grupos_precificacao (grp_descricao, grp_margem_lucro)
        VALUES ('Livros de Fantasia', 0.3)
            RETURNING grp_id INTO id_grupo_precificacao_livro_fantasia;

        INSERT INTO grupos_precificacao (grp_descricao, grp_margem_lucro)
        VALUES ('Livros Didáticos', 0.1)
            RETURNING grp_id INTO id_grupo_precificacao_livro_didatico;

        -- POPULA A TABELA categorias
        INSERT INTO categorias (cat_descricao)
        VALUES ('Livros de Fantasia')
            RETURNING cat_id INTO id_categoria_livro_fantasia;

        INSERT INTO categorias (cat_descricao)
        VALUES ('Livros Didáticos')
            RETURNING cat_id INTO id_categoria_livro_didatico;

        CREATE TABLE public.livros (
            lvr_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            lvr_autor VARCHAR(100) NOT NULL,
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
            categoria_cat_id INTEGER NOT NULL,
            CONSTRAINT livros_grupo_precificacao_fk FOREIGN KEY (grupo_precificacao_grp_id) REFERENCES grupos_precificacao (grp_id),
            CONSTRAINT livros_categoria_fk FOREIGN KEY (categoria_cat_id) REFERENCES categorias (cat_id)
        );

        -- POPULA A TABELA livros
        INSERT INTO livros (lvr_autor, categoria_cat_id, lvr_preco_de_custo, lvr_ano, lvr_titulo, lvr_editora, lvr_edicao, lvr_isbn, lvr_numero_paginas, lvr_sinopse, lvr_altura, lvr_largura, lvr_profundidade, lvr_cod_barras, grupo_precificacao_grp_id)
        VALUES 
            ('Antoine de Saint-Exupéry', id_categoria_livro_fantasia, 16.00, 2018, 'O Pequeno Príncipe', 'HarperCollins', '1ª edição', '8595081514', 96, 'Nesta história, um piloto cai com seu avião no deserto do Saara e encontra um pequeno príncipe, que o leva a uma aventura filosófica e poética através de planetas que encerram a solidão humana.', 22.6, 15.0, 0.8, 961452378, id_grupo_precificacao_livro_fantasia),
            
            ('J.R.R Tolkien', id_categoria_livro_fantasia, 100.00, 2000, 'O Senhor dos Anéis: Volume Único', 'HarperCollins', '1ª edição', '655511424X', 1280, 'Durante a Segunda Era na Terra-média Sauron forjou o Um Anel em segredo. Após a Batalha da Última Aliança o anel foi tomado de Sauron por Isildur. Perdido por séculos, caiu nas mãos de Bilbo Bolseiro.', 15.5, 6.5, 23.0, 873254916, id_grupo_precificacao_livro_fantasia),

            ('David Halliday', id_categoria_livro_didatico, 200.00, 2023, 'Fundamentos da Física - Mecânica', 'LTC', '12ª edição', 8521637225, 384, 'Eleito o melhor livro introdutório de Física do século XX pela APS Physics. Nova edição com testes, exemplos, revisão e mais de 300 problemas novos, além de conteúdo exclusivo para professores.', 21.0, 1.6, 28.0, 245323687, id_grupo_precificacao_livro_didatico),

            ('George R. R. Martin', id_categoria_livro_fantasia, 45.00, 1996, 'A Game of Thrones', 'Bantam Books', '1st Edition', '0553573403', 694, 'A Game of Thrones é o primeiro livro da série de fantasia épica A Song of Ice and Fire, que se passa em Westeros e Essos e narra as violentas lutas pelo Trono de Ferro.', 23.0, 15.5, 5.0, 978055357, id_grupo_precificacao_livro_fantasia),
            
            ('Yuval Noah Harari', id_categoria_livro_didatico, 38.90, 2014, 'Sapiens: Uma Breve História da Humanidade', 'L&PM Editores', '1ª edição', '852543218X', 464, 'Sapiens aborda a história da humanidade, desde os primórdios até os dias atuais, explorando como o Homo sapiens se tornou a espécie dominante do planeta.', 21.0, 13.5, 3.0, 978852543, id_grupo_precificacao_livro_didatico),
        
            ('Stephen Hawking', id_categoria_livro_didatico, 55.00, 1988, 'Uma Breve História do Tempo', 'Intrínseca', '1ª edição', '8535902777', 256, 'Uma Breve História do Tempo é uma obra que discute questões de cosmologia e física teórica, apresentando conceitos complexos de forma acessível ao público leigo.', 22.8, 16.0, 2.0, 978853771, id_grupo_precificacao_livro_didatico),
                    
            ('J.K. Rowling', id_categoria_livro_fantasia, 34.99, 2007, 'Harry Potter e as Relíquias da Morte', 'Bloomsbury Publishing', '1ª edição', '0545139708', 759, 'O sétimo e último livro da série Harry Potter, que narra a batalha final entre Harry Potter e Lord Voldemort, encerrando a saga do jovem bruxo.', 20.0, 13.5, 4.0, 978054700, id_grupo_precificacao_livro_fantasia),
                    
            ('Dan Brown', id_categoria_livro_fantasia, 29.90, 2003, 'O Código Da Vinci', 'Arqueiro', '1ª edição', '8599296713', 464, 'O Código Da Vinci é um thriller que mistura arte, religião, simbologia e história, enquanto o professor Robert Langdon investiga um assassinato no Louvre e descobre uma conspiração.', 22.5, 15.5, 3.0, 978296713, id_grupo_precificacao_livro_fantasia),
        
            ('Agatha Christie', id_categoria_livro_fantasia, 25.00, 1934, 'Assassinato no Expresso Oriente', 'L&PM Pocket', '1ª edição', '8525422702', 256, 'Um dos mais famosos romances policiais de Agatha Christie, onde o detetive Hercule Poirot investiga um assassinato ocorrido a bordo do luxuoso Expresso do Oriente.', 18.0, 11.0, 2.0, 725422707, id_grupo_precificacao_livro_fantasia),
        
            ('Philip K. Dick', id_categoria_livro_didatico, 28.50, 1968, 'Androides Sonham com Ovelhas Elétricas?', 'Aleph', '1ª edição', '8576571593', 256, 'A obra que inspirou o filme Blade Runner, é um clássico da ficção científica que questiona a natureza da realidade e da humanidade em um mundo pós-apocalíptico.', 21.5, 14.0, 2.5, 978571593, id_grupo_precificacao_livro_didatico);

        CREATE TABLE public.compras (
            cpr_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            lvr_id INTEGER NOT NULL,
            cpr_qtde_produtos INTEGER NOT NULL,
            ped_id INTEGER NOT NULL,
            cpr_valor NUMERIC(10, 2) NOT NULL,
            CONSTRAINT compras_livros_fk FOREIGN KEY (lvr_id) REFERENCES livros (lvr_id),
            CONSTRAINT compras_pedidos_fk FOREIGN KEY (ped_id) REFERENCES pedidos (ped_id)
        );

        CREATE TABLE public.cupons (
            cpd_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            cpd_codigo VARCHAR(50) NOT NULL,
            cpd_usu_id INTEGER NOT NULL,
            cpd_utilizado CHAR(1) NOT NULL,
            cpd_tipo VARCHAR(50) NOT NULL,
            cli_id INTEGER NOT NULL,
            CONSTRAINT cupons_cliente_fk FOREIGN KEY (cli_id) REFERENCES clientes (cli_id)
        );

        CREATE TABLE public.enderecos (
            end_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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
            CONSTRAINT endereco_cliente_fk FOREIGN KEY (end_cli_id) REFERENCES clientes (cli_id)
        );

        CREATE TABLE public.telefones (
            tel_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            tel_numero VARCHAR(20),
            tel_tipo VARCHAR(50) NOT NULL,
            tel_ddd VARCHAR(2) NOT NULL,
            tel_cli_id INTEGER NOT NULL,
            CONSTRAINT telefone_cliente_fk FOREIGN KEY (tel_cli_id) REFERENCES clientes (cli_id)
        );
    END $$;
