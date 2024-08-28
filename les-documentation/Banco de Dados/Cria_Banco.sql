-- CRIA A DATABASE
CREATE DATABASE eCommerce;

-- Conectar na Database eCommerce

DO $$
    DECLARE id_grupo_precificacao_livro_capa_dura int;
    DECLARE id_grupo_precificacao_livro_brochura int;
    DECLARE id_categoria_livro_fantasia int;
    DECLARE id_categoria_livro_didatico int;
    DECLARE id_categoria_livro_aventura int;
    DECLARE id_categoria_livro_ciencia int;
    DECLARE id_categoria_livro_drama int;
    DECLARE id_categoria_livro_historia int;
    DECLARE id_categoria_livro_fisica int;
    DECLARE id_categoria_livro_misterio int;
    DECLARE id_categoria_livro_ficcao_cientifica int;
    DECLARE id_categoria_livro_filosofia int;
    DECLARE id_livro_O_Pequeno_Principe int;
    DECLARE id_livro_O_Senhor_dos_Aneis int;
    DECLARE id_livro_Fundamentos_da_Fisica int;
    DECLARE id_livro_A_Game_of_Thrones int;
    DECLARE id_livro_Sapiens int;
    DECLARE id_livro_Uma_Breve_Historia_do_Tempo int;
    DECLARE id_livro_Harry_Potter int;
    DECLARE id_livro_O_Codigo_Da_Vinci int;
    DECLARE id_livro_Assassinato_no_Expresso_Oriente int;
    DECLARE id_livro_Androides_Sonham_com_Ovelhas_Eletricas int;

    BEGIN
        -- CRIA AS TABELAS
        CREATE TABLE public.clientes (
            cli_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            cli_nome VARCHAR(100) NOT NULL,
            cli_genero VARCHAR(15) NOT NULL,
            cli_data_nascimento DATE NOT NULL,
            cli_cpf VARCHAR(12) NOT NULL,
            cli_status BOOLEAN NOT NULL,
            cli_senha VARCHAR(50) NOT NULL
        );

        CREATE TABLE public.bandeiras_cartao (
            bnd_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            bnd_nome VARCHAR(50) NOT NULL
        );

        -- POPULA A TABELA bandeiras_cartao
        INSERT INTO bandeiras_cartao (bnd_nome)
        VALUES
            ('Visa'),
            ('Mastercard'),
            ('Elo'),
            ('American Express');

        CREATE TABLE public.cartoes_de_credito (
            crt_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            crt_numero VARCHAR(50) NOT NULL,
            crt_nome_impresso VARCHAR(50) NOT NULL,
            crt_codigo_seguranca VARCHAR(50) NOT NULL,
            crt_esta_ativo CHAR(1) NOT NULL,
            crt_bnd_id INTEGER NOT NULL,
            crt_cli_id INTEGER NOT NULL,
            CONSTRAINT cartoesdecredito_bandeirascartao_fk FOREIGN KEY (crt_bnd_id) REFERENCES bandeiras_cartao (bnd_id),
            CONSTRAINT cartoesdecredito_cliente_fk FOREIGN KEY (crt_cli_id) REFERENCES clientes (cli_id)
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
        VALUES ('Livros de capa dura', 0.3)
            RETURNING grp_id INTO id_grupo_precificacao_livro_capa_dura;

        INSERT INTO grupos_precificacao (grp_descricao, grp_margem_lucro)
        VALUES ('Livros brochura', 0.1)
            RETURNING grp_id INTO id_grupo_precificacao_livro_brochura;

        -- POPULA A TABELA categorias
        INSERT INTO categorias (cat_descricao)
        VALUES ('Livros de Fantasia')
            RETURNING cat_id INTO id_categoria_livro_fantasia;

        INSERT INTO categorias (cat_descricao)
        VALUES ('Livros Didáticos')
            RETURNING cat_id INTO id_categoria_livro_didatico;

        INSERT INTO categorias (cat_descricao)
        VALUES ('Livros de Aventura')
            RETURNING cat_id INTO id_categoria_livro_aventura;
        
        INSERT INTO categorias (cat_descricao)
        VALUES ('Livros de Ciência')
            RETURNING cat_id INTO id_categoria_livro_ciencia;
        
        INSERT INTO categorias (cat_descricao)
        VALUES ('Livros de Drama')
            RETURNING cat_id INTO id_categoria_livro_drama;
        
        INSERT INTO categorias (cat_descricao)
        VALUES ('Livros de História')
            RETURNING cat_id INTO id_categoria_livro_historia;
        
        INSERT INTO categorias (cat_descricao)
        VALUES ('Livros de Física')
            RETURNING cat_id INTO id_categoria_livro_fisica;
        
        INSERT INTO categorias (cat_descricao)
        VALUES ('Livros de Mistério')
            RETURNING cat_id INTO id_categoria_livro_misterio;
        
        INSERT INTO categorias (cat_descricao)
        VALUES ('Livros de Ficção Científica')
            RETURNING cat_id INTO id_categoria_livro_ficcao_cientifica;
        
        INSERT INTO categorias (cat_descricao)
        VALUES ('Livros de Filosofia')
            RETURNING cat_id INTO id_categoria_livro_filosofia;

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
            lvr_grp_id INTEGER NOT NULL,
            CONSTRAINT livros_grupo_precificacao_fk FOREIGN KEY (lvr_grp_id) REFERENCES grupos_precificacao (grp_id)
        );

        CREATE TABLE public.livros_categorias (
            lvr_id INTEGER NOT NULL,
            cat_id INTEGER NOT NULL,
            PRIMARY KEY (lvr_id, cat_id),
            FOREIGN KEY (lvr_id) REFERENCES livros (lvr_id),
            FOREIGN KEY (cat_id) REFERENCES categorias (cat_id)
        );

        -- POPULA A TABELA livros
        INSERT INTO livros (lvr_autor, lvr_preco_de_custo, lvr_ano, lvr_titulo, lvr_editora, lvr_edicao, lvr_isbn, lvr_numero_paginas, lvr_sinopse, lvr_altura, lvr_largura, lvr_profundidade, lvr_cod_barras, lvr_grp_id)
        VALUES ('Antoine de Saint-Exupéry', 16.00, 2018, 'O Pequeno Príncipe', 'HarperCollins', '1ª edição', '8595081514', 96, 'Nesta história, um piloto cai com seu avião no deserto do Saara e encontra um pequeno príncipe, que o leva a uma aventura filosófica e poética através de planetas que encerram a solidão humana.', 22.6, 15.0, 0.8, 961452378, id_grupo_precificacao_livro_capa_dura)
            RETURNING lvr_id INTO id_livro_O_Pequeno_Principe;
            
        INSERT INTO livros (lvr_autor, lvr_preco_de_custo, lvr_ano, lvr_titulo, lvr_editora, lvr_edicao, lvr_isbn, lvr_numero_paginas, lvr_sinopse, lvr_altura, lvr_largura, lvr_profundidade, lvr_cod_barras, lvr_grp_id)
        VALUES ('J.R.R Tolkien', 100.00, 2000, 'O Senhor dos Anéis: Volume Único', 'HarperCollins', '1ª edição', '655511424X', 1280, 'Durante a Segunda Era na Terra-média Sauron forjou o Um Anel em segredo. Após a Batalha da Última Aliança o anel foi tomado de Sauron por Isildur. Perdido por séculos, caiu nas mãos de Bilbo Bolseiro.', 15.5, 6.5, 23.0, 873254916, id_grupo_precificacao_livro_capa_dura)
            RETURNING lvr_id INTO id_livro_O_Senhor_dos_Aneis;

        INSERT INTO livros (lvr_autor, lvr_preco_de_custo, lvr_ano, lvr_titulo, lvr_editora, lvr_edicao, lvr_isbn, lvr_numero_paginas, lvr_sinopse, lvr_altura, lvr_largura, lvr_profundidade, lvr_cod_barras, lvr_grp_id)
        VALUES ('David Halliday', 200.00, 2023, 'Fundamentos da Física - Mecânica', 'LTC', '12ª edição', 8521637225, 384, 'Eleito o melhor livro introdutório de Física do século XX pela APS Physics. Nova edição com testes, exemplos, revisão e mais de 300 problemas novos, além de conteúdo exclusivo para professores.', 21.0, 1.6, 28.0, 245323687, id_grupo_precificacao_livro_brochura)
            RETURNING lvr_id INTO id_livro_Fundamentos_da_Fisica;

        INSERT INTO livros (lvr_autor, lvr_preco_de_custo, lvr_ano, lvr_titulo, lvr_editora, lvr_edicao, lvr_isbn, lvr_numero_paginas, lvr_sinopse, lvr_altura, lvr_largura, lvr_profundidade, lvr_cod_barras, lvr_grp_id)
        VALUES ('George R. R. Martin', 45.00, 1996, 'A Game of Thrones', 'Bantam Books', '1st Edition', '0553573403', 694, 'A Game of Thrones é o primeiro livro da série de fantasia épica A Song of Ice and Fire, que se passa em Westeros e Essos e narra as violentas lutas pelo Trono de Ferro.', 23.0, 15.5, 5.0, 978055357, id_grupo_precificacao_livro_capa_dura)
            RETURNING lvr_id INTO id_livro_A_Game_of_Thrones;
            
        INSERT INTO livros (lvr_autor, lvr_preco_de_custo, lvr_ano, lvr_titulo, lvr_editora, lvr_edicao, lvr_isbn, lvr_numero_paginas, lvr_sinopse, lvr_altura, lvr_largura, lvr_profundidade, lvr_cod_barras, lvr_grp_id)
        VALUES ('Yuval Noah Harari', 38.90, 2014, 'Sapiens: Uma Breve História da Humanidade', 'L&PM Editores', '1ª edição', '852543218X', 464, 'Sapiens aborda a história da humanidade, desde os primórdios até os dias atuais, explorando como o Homo sapiens se tornou a espécie dominante do planeta.', 21.0, 13.5, 3.0, 978852543, id_grupo_precificacao_livro_brochura)
            RETURNING lvr_id INTO id_livro_Sapiens;
        
        INSERT INTO livros (lvr_autor, lvr_preco_de_custo, lvr_ano, lvr_titulo, lvr_editora, lvr_edicao, lvr_isbn, lvr_numero_paginas, lvr_sinopse, lvr_altura, lvr_largura, lvr_profundidade, lvr_cod_barras, lvr_grp_id)
        VALUES ('Stephen Hawking', 55.00, 1988, 'Uma Breve História do Tempo', 'Intrínseca', '1ª edição', '8535902777', 256, 'Uma Breve História do Tempo é uma obra que discute questões de cosmologia e física teórica, apresentando conceitos complexos de forma acessível ao público leigo.', 22.8, 16.0, 2.0, 978853771, id_grupo_precificacao_livro_brochura)
            RETURNING lvr_id INTO id_livro_Uma_Breve_Historia_do_Tempo;
                    
        INSERT INTO livros (lvr_autor, lvr_preco_de_custo, lvr_ano, lvr_titulo, lvr_editora, lvr_edicao, lvr_isbn, lvr_numero_paginas, lvr_sinopse, lvr_altura, lvr_largura, lvr_profundidade, lvr_cod_barras, lvr_grp_id)
        VALUES ('J.K. Rowling', 34.99, 2007, 'Harry Potter e as Relíquias da Morte', 'Bloomsbury Publishing', '1ª edição', '0545139708', 759, 'O sétimo e último livro da série Harry Potter, que narra a batalha final entre Harry Potter e Lord Voldemort, encerrando a saga do jovem bruxo.', 20.0, 13.5, 4.0, 978054700, id_grupo_precificacao_livro_capa_dura)
            RETURNING lvr_id INTO id_livro_Harry_Potter;
                    
        INSERT INTO livros (lvr_autor, lvr_preco_de_custo, lvr_ano, lvr_titulo, lvr_editora, lvr_edicao, lvr_isbn, lvr_numero_paginas, lvr_sinopse, lvr_altura, lvr_largura, lvr_profundidade, lvr_cod_barras, lvr_grp_id)
        VALUES ('Dan Brown', 29.90, 2003, 'O Código Da Vinci', 'Arqueiro', '1ª edição', '8599296713', 464, 'O Código Da Vinci é um thriller que mistura arte, religião, simbologia e história, enquanto o professor Robert Langdon investiga um assassinato no Louvre e descobre uma conspiração.', 22.5, 15.5, 3.0, 978296713, id_grupo_precificacao_livro_capa_dura)
            RETURNING lvr_id INTO id_livro_O_Codigo_Da_Vinci;
        
        INSERT INTO livros (lvr_autor, lvr_preco_de_custo, lvr_ano, lvr_titulo, lvr_editora, lvr_edicao, lvr_isbn, lvr_numero_paginas, lvr_sinopse, lvr_altura, lvr_largura, lvr_profundidade, lvr_cod_barras, lvr_grp_id)
        VALUES ('Agatha Christie', 25.00, 1934, 'Assassinato no Expresso Oriente', 'L&PM Pocket', '1ª edição', '8525422702', 256, 'Um dos mais famosos romances policiais de Agatha Christie, onde o detetive Hercule Poirot investiga um assassinato ocorrido a bordo do luxuoso Expresso do Oriente.', 18.0, 11.0, 2.0, 725422707, id_grupo_precificacao_livro_capa_dura)
            RETURNING lvr_id INTO id_livro_Assassinato_no_Expresso_Oriente;
        
        INSERT INTO livros (lvr_autor, lvr_preco_de_custo, lvr_ano, lvr_titulo, lvr_editora, lvr_edicao, lvr_isbn, lvr_numero_paginas, lvr_sinopse, lvr_altura, lvr_largura, lvr_profundidade, lvr_cod_barras, lvr_grp_id)
        VALUES ('Philip K. Dick', 28.50, 1968, 'Androides Sonham com Ovelhas Elétricas?', 'Aleph', '1ª edição', '8576571593', 256, 'A obra que inspirou o filme Blade Runner, é um clássico da ficção científica que questiona a natureza da realidade e da humanidade em um mundo pós-apocalíptico.', 21.5, 14.0, 2.5, 978571593, id_grupo_precificacao_livro_brochura)
            RETURNING lvr_id INTO id_livro_Androides_Sonham_com_Ovelhas_Eletricas;

        -- POPULA A TABELA livros_categorias
        INSERT INTO livros_categorias (lvr_id, cat_id)
        VALUES
            (id_livro_O_Pequeno_Principe, id_categoria_livro_fantasia),
            
            (id_livro_O_Senhor_dos_Aneis, id_categoria_livro_fantasia),
            (id_livro_O_Senhor_dos_Aneis, id_categoria_livro_aventura),

            (id_livro_Fundamentos_da_Fisica, id_categoria_livro_didatico),
            (id_livro_Fundamentos_da_Fisica, id_categoria_livro_ciencia),

            (id_livro_A_Game_of_Thrones, id_categoria_livro_drama),

            (id_livro_Sapiens, id_categoria_livro_didatico),
            (id_livro_Sapiens, id_categoria_livro_historia),

            (id_livro_Uma_Breve_Historia_do_Tempo, id_categoria_livro_didatico),
            (id_livro_Uma_Breve_Historia_do_Tempo, id_categoria_livro_fisica),

            (id_livro_Harry_Potter, id_categoria_livro_fantasia),
            (id_livro_Harry_Potter, id_categoria_livro_aventura),

            (id_livro_O_Codigo_Da_Vinci, id_categoria_livro_fantasia),
            (id_livro_O_Codigo_Da_Vinci, id_categoria_livro_misterio),

            (id_livro_Assassinato_no_Expresso_Oriente, id_categoria_livro_fantasia),

            (id_livro_Androides_Sonham_com_Ovelhas_Eletricas, id_categoria_livro_ficcao_cientifica),
            (id_livro_Androides_Sonham_com_Ovelhas_Eletricas, id_categoria_livro_filosofia);

        CREATE TABLE public.status_compras (
            stc_id INTEGER PRIMARY KEY,
            stc_descricao VARCHAR(100) NOT NULL
        );

        -- POPULA A TABELA status_compras
        INSERT INTO status_compras (stc_id, stc_descricao)
        VALUES
            (1, 'No carrinho'),
            (2, 'Em processamento'),
            (3, 'Cancelada'),
            (4, 'Finalizada');

        CREATE TABLE public.cupons (
            cpd_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            cpd_codigo VARCHAR(50) NOT NULL,
            cpd_valor NUMERIC(10, 2) NOT NULL,
            cpd_utilizado CHAR(1) NOT NULL,
            cpd_tipo VARCHAR(50) NOT NULL,
            cpd_cli_id INTEGER NOT NULL,
            CONSTRAINT cupons_cliente_fk FOREIGN KEY (cpd_cli_id) REFERENCES clientes (cli_id)
        );

        CREATE TABLE public.enderecos (
            end_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            end_entrega CHAR(1) NOT NULL,
            end_cobranca CHAR(1) NOT NULL,
            end_tipo_logradouro VARCHAR(50) NOT NULL,
            end_logradouro VARCHAR(50) NOT NULL,
            end_numero VARCHAR(20) NOT NULL,
            end_bairro VARCHAR(50) NOT NULL,
            end_cep CHAR(9) NOT NULL,
            end_cidade VARCHAR(50) NOT NULL,
            end_estado CHAR(2) NOT NULL,
            end_pais VARCHAR(50) NOT NULL,
            end_cli_id INTEGER NOT NULL,
            CONSTRAINT endereco_cliente_fk FOREIGN KEY (end_cli_id) REFERENCES clientes (cli_id)
        );

        CREATE TABLE public.compras (
            cpr_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            cpr_lvr_id INTEGER NOT NULL,
            cpr_qtde_produtos INTEGER NOT NULL,
            cpr_data DATE,
            cpr_stc_id INTEGER NOT NULL,
            cpr_valor NUMERIC(10, 2) NOT NULL,
            cpr_cli_id INTEGER NOT NULL,
            cpr_end_entrega INTEGER,
            cpr_end_cobranca INTEGER,
            CONSTRAINT compras_livros_fk FOREIGN KEY (cpr_lvr_id) REFERENCES livros (lvr_id),
            CONSTRAINT compras_status_fk FOREIGN KEY (cpr_stc_id) REFERENCES status_compras (stc_id),
            CONSTRAINT compras_cliente_fk FOREIGN KEY (cpr_cli_id) REFERENCES clientes (cli_id),
            CONSTRAINT compras_endereco_entrega_fk FOREIGN KEY (cpr_end_entrega) REFERENCES enderecos (end_id),
            CONSTRAINT compras_endereco_cobranca_fk FOREIGN KEY (cpr_end_cobranca) REFERENCES enderecos (end_id)
        );

        CREATE TABLE public.meios_pagamento (
            mpg_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            mpg_cpr_id INTEGER NOT NULL,
            mpg_crt_id INTEGER,
            mpg_cpd_id INTEGER,
            CONSTRAINT meios_pagamento_compras_fk FOREIGN KEY (mpg_cpr_id) REFERENCES compras (cpr_id),
            CONSTRAINT meios_pagamento_cartoes_de_credito_fk FOREIGN KEY (mpg_crt_id) REFERENCES cartoes_de_credito (crt_id),
            CONSTRAINT meios_pagamento_cupons_fk FOREIGN KEY (mpg_cpd_id) REFERENCES cupons (cpd_id)
        );

        CREATE TABLE public.telefones (
            tel_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            tel_numero VARCHAR(20) NOT NULL,
            tel_tipo VARCHAR(50) NOT NULL,
            tel_ddd VARCHAR(2) NOT NULL,
            tel_cli_id INTEGER NOT NULL,
            CONSTRAINT telefone_cliente_fk FOREIGN KEY (tel_cli_id) REFERENCES clientes (cli_id)
        );
    END $$;
