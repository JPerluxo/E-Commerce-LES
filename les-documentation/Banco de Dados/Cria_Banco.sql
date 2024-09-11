-- CRIA A DATABASE
CREATE DATABASE eCommerce;

-- Conectar na Database eCommerce

DO $$
    DECLARE id_grupo_precificacao_bebida_importada int;
    DECLARE id_grupo_precificacao_bebida_nacional int;
    DECLARE id_categoria_prata int;
    DECLARE id_categoria_ouro int;
    DECLARE id_categoria_premium int;
    DECLARE id_categoria_vinhos int;
    DECLARE id_categoria_cervejas int;
    DECLARE id_categoria_destilados int;
    DECLARE id_bebida_chateau_margaux int;
    DECLARE id_bebida_penfolds_grange int;
    DECLARE id_bebida_casa_valduga_gran_reserva int;
    DECLARE id_bebida_miolo_lote_43 int;
    DECLARE id_bebida_heineken int;
    DECLARE id_bebida_skol int;
    DECLARE id_bebida_ypioca int;
    DECLARE id_bebida_johnnie_walker_black_label int;
    DECLARE id_bebida_smirnoff int;
    DECLARE id_bebida_chandon_reserve_brut int;
    DECLARE id_bebida_jack_daniels_tennessee_whiskey int;
    DECLARE id_bebida_absolut_vodka int;
    DECLARE id_bebida_patron_silver_tequila int;
    DECLARE id_bebida_bacardi_carta_blanca int;
    DECLARE id_bebida_corona_extra int;
    DECLARE id_bebida_guinness_draught int;

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
            crt_data_vencimento DATE NOT NULL,
            crt_esta_ativo BOOLEAN NOT NULL,
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
        VALUES ('Bebidas importadas', 0.3)
            RETURNING grp_id INTO id_grupo_precificacao_bebida_importada;

        INSERT INTO grupos_precificacao (grp_descricao, grp_margem_lucro)
        VALUES ('Bebidas nacionais', 0.1)
            RETURNING grp_id INTO id_grupo_precificacao_bebida_nacional;

        -- POPULA A TABELA categorias
        INSERT INTO categorias (cat_descricao)
        VALUES ('Prata')
            RETURNING cat_id INTO id_categoria_prata;

        INSERT INTO categorias (cat_descricao)
        VALUES ('Ouro')
            RETURNING cat_id INTO id_categoria_ouro;

        INSERT INTO categorias (cat_descricao)
        VALUES ('Premium')
            RETURNING cat_id INTO id_categoria_premium;

        INSERT INTO categorias (cat_descricao)
        VALUES ('Vinhos')
            RETURNING cat_id INTO id_categoria_vinhos;

        INSERT INTO categorias (cat_descricao)
        VALUES ('Cervejas')
            RETURNING cat_id INTO id_categoria_cervejas;

        INSERT INTO categorias (cat_descricao)
        VALUES ('Destilados')
            RETURNING cat_id INTO id_categoria_destilados;

        CREATE TABLE public.bebidas (
            bds_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            bds_rotulo VARCHAR(100) NOT NULL,
            bds_preco_de_custo FLOAT NOT NULL,
            bds_ano INTEGER NOT NULL,
            bds_fabricante VARCHAR(100) NOT NULL,
            bds_pais VARCHAR(100) NOT NULL,
            bds_cod_barras VARCHAR(100) NOT NULL,
            bds_teor_alcoolico FLOAT NOT NULL,
            bds_volume FLOAT NOT NULL,
            bds_grp_id INTEGER NOT NULL,
            CONSTRAINT bebidas_grupo_precificacao_fk FOREIGN KEY (bds_grp_id) REFERENCES grupos_precificacao (grp_id)
        );

        CREATE TABLE public.bebidas_categorias (
            bds_id INTEGER NOT NULL,
            cat_id INTEGER NOT NULL,
            PRIMARY KEY (bds_id, cat_id),
            FOREIGN KEY (bds_id) REFERENCES bebidas (bds_id),
            FOREIGN KEY (cat_id) REFERENCES categorias (cat_id)
        );

        -- POPULA A TABELA bebidas
        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Château Margaux', 1500.00, 2015, 'Château Margaux', 'France', 123456789012, 13.5, 0.75, 1)
            RETURNING bds_id INTO id_bebida_chateau_margaux;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Penfolds Grange', 850.00, 2016, 'Penfolds', 'Australia', 123456789014, 14.5, 0.75, 1)
            RETURNING bds_id INTO id_bebida_penfolds_grange;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Casa Valduga Gran Reserva', 200.00, 2018, 'Casa Valduga', 'Brazil', 123456789013, 13.0, 0.75, 2)
            RETURNING bds_id INTO id_bebida_casa_valduga_gran_reserva;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Miolo Lote 43', 120.00, 2019, 'Miolo', 'Brazil', 123456789015, 12.5, 0.75, 2)
            RETURNING bds_id INTO id_bebida_miolo_lote_43;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Heineken', 3.00, 2023, 'Heineken N.V.', 'Netherlands', 123456789018, 5.0, 0.33, 1)
            RETURNING bds_id INTO id_bebida_heineken;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Skol', 2.50, 2023, 'Ambev', 'Brazil', 123456789019, 4.7, 0.33, 2)
            RETURNING bds_id INTO id_bebida_skol;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Ypióca', 20.00, 2023, 'Ypióca', 'Brazil', 123456789020, 39.0, 0.7, 2)
            RETURNING bds_id INTO id_bebida_ypioca;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Johnnie Walker Black Label', 150.00, 2023, 'Diageo', 'Scotland', 123456789021, 40.0, 0.7, 1)
            RETURNING bds_id INTO id_bebida_johnnie_walker_black_label;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Smirnoff', 25.00, 2023, 'Diageo', 'Russia', 123456789022, 37.5, 0.7, 1)
            RETURNING bds_id INTO id_bebida_smirnoff;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Chandon Réserve Brut', 85.00, 2022, 'Chandon', 'Brazil', 123456789023, 12.0, 0.75, 2)
            RETURNING bds_id INTO id_bebida_chandon_reserve_brut;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Jack Daniels Tennessee Whiskey', 130.00, 2023, 'Brown-Forman', 'USA', 123456789024, 40.0, 0.7, 1)
            RETURNING bds_id INTO id_bebida_jack_daniels_tennessee_whiskey;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Absolut Vodka', 90.00, 2023, 'Pernod Ricard', 'Sweden', 123456789025, 40.0, 0.7, 1)
            RETURNING bds_id INTO id_bebida_absolut_vodka;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Patrón Silver Tequila', 250.00, 2023, 'Patrón Spirits', 'Mexico', 123456789026, 40.0, 0.75, 1)
            RETURNING bds_id INTO id_bebida_patron_silver_tequila;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Bacardi Carta Blanca', 50.00, 2023, 'Bacardi', 'Puerto Rico', 123456789027, 37.5, 0.7, 1)
            RETURNING bds_id INTO id_bebida_bacardi_carta_blanca;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Corona Extra', 4.50, 2023, 'Grupo Modelo', 'Mexico', 123456789028, 4.5, 0.33, 1)
            RETURNING bds_id INTO id_bebida_corona_extra;

        INSERT INTO bebidas (bds_rotulo, bds_preco_de_custo, bds_ano, bds_fabricante, bds_pais, bds_cod_barras, bds_teor_alcoolico, bds_volume, bds_grp_id)
        VALUES ('Guinness Draught', 6.00, 2023, 'Diageo', 'Ireland', 123456789029, 4.2, 0.44, 1)
            RETURNING bds_id INTO id_bebida_guinness_draught;
            
        

        -- POPULA A TABELA bebidas_categorias
        INSERT INTO bebidas_categorias (bds_id, cat_id)
        VALUES
            (id_bebida_chateau_margaux, id_categoria_vinhos),
            (id_bebida_chateau_margaux, id_categoria_premium),

            (id_bebida_penfolds_grange, id_categoria_vinhos),
            (id_bebida_penfolds_grange, id_categoria_premium),

            (id_bebida_casa_valduga_gran_reserva, id_categoria_vinhos),
            (id_bebida_casa_valduga_gran_reserva, id_categoria_premium),

            (id_bebida_miolo_lote_43, id_categoria_vinhos),

            (id_bebida_heineken, id_categoria_cervejas),

            (id_bebida_skol, id_categoria_cervejas),

            (id_bebida_ypioca, id_categoria_destilados),
            (id_bebida_ypioca, id_categoria_ouro),
            (id_bebida_ypioca, id_categoria_prata),

            (id_bebida_johnnie_walker_black_label, id_categoria_destilados),

            (id_bebida_smirnoff, id_categoria_destilados),

            (id_bebida_chandon_reserve_brut, id_categoria_vinhos),

            (id_bebida_jack_daniels_tennessee_whiskey, id_categoria_destilados),

            (id_bebida_absolut_vodka, id_categoria_destilados),

            (id_bebida_patron_silver_tequila, id_categoria_destilados),
            (id_bebida_patron_silver_tequila, id_categoria_prata),

            (id_bebida_bacardi_carta_blanca, id_categoria_destilados),

            (id_bebida_corona_extra, id_categoria_cervejas),

            (id_bebida_guinness_draught, id_categoria_cervejas);

        CREATE TABLE public.status_compras (
            stc_id INTEGER PRIMARY KEY,
            stc_descricao VARCHAR(100) NOT NULL
        );

        -- POPULA A TABELA status_compras
        INSERT INTO status_compras (stc_id, stc_descricao)
        VALUES
            (1, 'NO CARRINHO'),
            (2, 'PAGAMENTO REALIZADO'),
            (3, 'PAGAMENTO REJEITADO'),
            (4, 'EM TRANSPORTE'),
            (5, 'ENTREGUE');

        CREATE TABLE public.cupons (
            cpd_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            cpd_codigo VARCHAR(50) NOT NULL,
            cpd_valor NUMERIC(10, 2) NOT NULL,
            cpd_utilizado BOOLEAN NOT NULL,
            cpd_tipo VARCHAR(50) NOT NULL,
            cpd_cli_id INTEGER NOT NULL,
            CONSTRAINT cupons_cliente_fk FOREIGN KEY (cpd_cli_id) REFERENCES clientes (cli_id)
        );

        CREATE TABLE public.enderecos (
            end_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            end_entrega BOOLEAN NOT NULL,
            end_cobranca BOOLEAN NOT NULL,
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
            cpr_bds_id INTEGER NOT NULL,
            cpr_qtde_produtos INTEGER NOT NULL,
            cpr_data DATE,
            cpr_stc_id INTEGER NOT NULL,
            cpr_valor NUMERIC(10, 2) NOT NULL,
            cpr_cli_id INTEGER NOT NULL,
            cpr_end_entrega INTEGER,
            cpr_end_cobranca INTEGER,
            CONSTRAINT compras_bebidas_fk FOREIGN KEY (cpr_bds_id) REFERENCES bebidas (bds_id),
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
