
<?php

/**
 * Description of DAO
 * 
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */


require_once(realpath(dirname(__FILE__)) . "/../../config/Database.class.php");

class ProdutosDAO
{



    //Lista todos os produtos por grupo com ou sem estoque
    // Listar Produtos e Seu estoque Total
    //==============================================================================================================
    static function listarProdutosPorGrupo($body)
    {

        $data = (array)$body->data;


        $dados["data"] = array();


        //Seleciona produtos com e sem movimentações e custo
        $query = "SELECT 
        produtosCusto_view.*,
        SUM(`estoques_has_produtos`.`quantidade`) AS `estoque_total`
        FROM produtosCusto_view
        INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
        WHERE tipo LIKE '" . $data["grupo"] . "'
       
        GROUP BY   produtosCusto_view.id  
        
        UNION
                
        SELECT 
        produtos.*,
        0 as custo,
        SUM(`estoques_has_produtos`.`quantidade`) AS `estoque_total`
        FROM produtos
        INNER JOIN estoques_has_produtos ON produtos.id = estoques_has_produtos.produtos_id  
        WHERE tipo LIKE '" . $data["grupo"] . "'        
        AND `produtos`.`id` IN 
            (
            SELECT 
            `produtosCusto_view`.`id` AS `id`
            FROM produtosCusto_view
            INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
            WHERE tipo LIKE '" . $data["grupo"] . "'              
            )
            IS FALSE
        GROUP BY produtos.id
        
        UNION

        SELECT
        produtos.*,
        0 as custo,
        0 estoque_total
        FROM produtos
		WHERE tipo LIKE '" . $data["grupo"] . "'
        AND `produtos`.`id` IN 
            (
                SELECT 
                    produtosCusto_view.id
                    FROM produtosCusto_view
                    INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
					WHERE tipo LIKE '" . $data["grupo"] . "'
                    GROUP BY   produtosCusto_view.id  
        
                    UNION
                
                    SELECT 
                    produtos.id
                    FROM produtos
                    INNER JOIN estoques_has_produtos ON produtos.id = estoques_has_produtos.produtos_id   
                    WHERE tipo LIKE '" . $data["grupo"] . "'       
                    AND `produtos`.`id` IN 
                        (

                            SELECT 
                            `produtosCusto_view`.`id` AS `id`
                            FROM produtosCusto_view
                            INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
                            WHERE tipo LIKE '" . $data["grupo"] . "'
                        )
                        IS FALSE
            GROUP BY produtos.id)
            IS FALSE

        order by id desc;";



        $resultado = mysqli_query(Database::connect(), $query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);


        // $dados1 = array();
        while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }


        return $dados;
    }







    











    //Lista de todos os produtos com   com estoque e sem estoque 
    // Listar Produtos e Seu estoque Total
    //==============================================================================================================
    static function listarProdutos() //Adicionar a opção de receber a qual grupo deseja listar
    {

        $dados["data"] = array();

        //Busca duas listas uma com os "produtos com movimentações" e outra com todos os produtos em
        //seguida remove da lista de todos os produtos os que são repetidos da primeira 
        //E trata os produtos repetido a baixo
        // $query =
        //     "   SELECT 
        //     produtosCusto_view.*,
        //     sum(estoques_has_produtos.quantidade) as estoque_total
        //     FROM produtosCusto_view
        //     INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id   
        // 	GROUP BY produtosCusto_view.id           	
        // 	order by id  desc       
        //     ";


        //Seleciona produtos sem movimentações e sem custo
        $query = "SELECT 
        produtosCusto_view.*,
        SUM(`estoques_has_produtos`.`quantidade`) AS `estoque_total`
        FROM produtosCusto_view
        INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
       
        GROUP BY   produtosCusto_view.id  
        
        UNION
                
        SELECT 
        produtos.*,
        0 as custo,
        SUM(`estoques_has_produtos`.`quantidade`) AS `estoque_total`
        FROM produtos
        INNER JOIN estoques_has_produtos ON produtos.id = estoques_has_produtos.produtos_id          
        WHERE `produtos`.`id` IN 
            (
            SELECT 
            `produtosCusto_view`.`id` AS `id`
            FROM produtosCusto_view
            INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id               
            )
            IS FALSE
        GROUP BY produtos.id
        
        UNION

        SELECT
        produtos.*,
        0 as custo,
        0 estoque_total
        FROM produtos

         WHERE `produtos`.`id` IN 
            (
                SELECT 
                    produtosCusto_view.id
                    FROM produtosCusto_view
                    INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
       
                    GROUP BY   produtosCusto_view.id  
        
                    UNION
                
                    SELECT 
                    produtos.id
                    FROM produtos
                    INNER JOIN estoques_has_produtos ON produtos.id = estoques_has_produtos.produtos_id          
                    WHERE `produtos`.`id` IN 
                        (

                            SELECT 
                            `produtosCusto_view`.`id` AS `id`
                            FROM produtosCusto_view
                            INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id               
                        )
                        IS FALSE
            GROUP BY produtos.id)
            IS FALSE

        order by id desc;";



        $resultado = mysqli_query(Database::connect(), $query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);


        // $dados1 = array();
        while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }




        //Remove a linha com mesmo id que vem em seguida------------------
        // $idAtual = 0;

        // $dadosReverso = array_reverse($dados1);
        // foreach ($dadosReverso as $linha) {
        //     if ($idAtual != $linha["id"]) {
        //         $dados["data"][] = $linha;
        //     }
        //     $idAtual = $linha["id"];
        // }





        return $dados;
    }

















    //Lista detalhes de um cafe especifico
    //==============================================================================================================
    static function listarCafeItensById($body)
    {
        //Converte para array
        $data = (array)$body->data;


        //Dados que vão retornar para o sistema
        $dados["data"] = array();

        $query =
            "SELECT cafes.data,
            cafes.id as cafe_id,
            cafes_has_itens.quantidade,
            cafes.hospedes,
            itens.id,
            itens.nome,
            itens.custo,
            itens.unidade
            FROM cafes 
            INNER JOIN cafes_has_itens ON cafes.id = cafes_has_itens.cafes_id           
            INNER JOIN itens ON itens.id = cafes_has_itens.itens_id
            WHERE cafes.id = " . $data["id"] . "
            order by cafes.id";


        $resultado = mysqli_query(Database::connect(), $query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);


        while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }


        return $dados;
    }























    //ISERÇÂO
    //============================================================================================================================
    //============================================================================================================================







    // SALVAR produto e e cria o estoque dele vazio na tabela estoque_has_produtos
    //==============================================================================================================
    static function  criarProduto($body)
    {

        //Converte para array
        $data = (array)$body->data;

        unset($data["id"]);



        $connection = Database::connect();
        //inicia um ponto que a partir daqui se algo der errado em algum ponto no sql  retorna todas as ações.
        mysqli_begin_transaction($connection);


        //Salva o produto no banco---------------------------------------------------------------------------
        $query  = "INSERT INTO produtos";
        // implode keys do $array...
        $query .= " (`" . implode("`, `", array_keys($data)) . "`)";
        // implode values do $array...
        $query .= " VALUES ('" . implode("', '", $data) . "') ";

        mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query1: " . $query);



        //Pega a id do produto criado-----------------------------------------------------------------------
        $data["id"] = mysqli_insert_id(Database::connect());
        // $query = "SET @lastListasId  = LAST_INSERT_ID();"; //pega a id da comanda criada
        // mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query2: " . $query);



        // //Cria o estoque do produtos no estoque Almoxerifado (id 1)
        // //---------------------------------------------------------------------------------------------------      
        // $query  = "INSERT INTO estoques_has_produtos (`estoques_id`, `produtos_id`, `quantidade`) 
        // VALUES ('1', @lastListasId, '0');";

        // mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query3: " . $query);



        mysqli_commit($connection);

        return $data;
    }


    // //Lista todos os produtos por grupo com ou sem estoque
    // //==============================================================================================================
    // static function listarProdutosRouparia()
    // {

    //     $dados["data"] = array();

    //     //Busca duas listas uma com os "produtos com movimentações" e outra com todos os produtos em
    //     //seguida remove da lista de todos os produtos os que são repetidos da primeira 
    //     //E trata os produtos repetido a baixo
    //     // $query =
    //     //     "   SELECT 
    //     //     produtosCusto_view.*,
    //     //     sum(estoques_has_produtos.quantidade) as estoque_total
    //     //     FROM produtosCusto_view
    //     //     INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id   
    //     // 	GROUP BY produtosCusto_view.id           	
    //     // 	order by id  desc       
    //     //     ";


    //     //Seleciona produtos sem movimentações e sem custo
    //     $query = "SELECT 
    //     produtosCusto_view.*,
    //     SUM(`estoques_has_produtos`.`quantidade`) AS `estoque_total`
    //     FROM produtosCusto_view
    //     INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
    //     WHERE tipo = 'rouparia'

    //     GROUP BY   produtosCusto_view.id  

    //     UNION

    //     SELECT 
    //     produtos.*,
    //     0 as custo,
    //     SUM(`estoques_has_produtos`.`quantidade`) AS `estoque_total`
    //     FROM produtos
    //     INNER JOIN estoques_has_produtos ON produtos.id = estoques_has_produtos.produtos_id          
    //     WHERE `produtos`.`id` IN 
    //         (
    //         SELECT 
    //         `produtosCusto_view`.`id` AS `id`
    //         FROM produtosCusto_view
    //         INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id               
    //         )
    //         IS FALSE
    //     GROUP BY produtos.id

    //     UNION

    //     SELECT
    //     produtos.*,
    //     0 as custo,
    //     0 estoque_total
    //     FROM produtos
    // 	WHERE tipo = 'rouparia'
    //      AND `produtos`.`id` IN 
    //         (
    //             SELECT 
    //                 produtosCusto_view.id
    //                 FROM produtosCusto_view
    //                 INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
    // 				WHERE tipo = 'rouparia'
    //                 GROUP BY   produtosCusto_view.id  

    //                 UNION

    //                 SELECT 
    //                 produtos.id
    //                 FROM produtos
    //                 INNER JOIN estoques_has_produtos ON produtos.id = estoques_has_produtos.produtos_id          
    //                 WHERE `produtos`.`id` IN 
    //                     (

    //                         SELECT 
    //                         `produtosCusto_view`.`id` AS `id`
    //                         FROM produtosCusto_view
    //                         INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
    //                          WHERE tipo = 'rouparia'
    //                     )
    //                     IS FALSE
    //         GROUP BY produtos.id)
    //         IS FALSE

    //     order by id desc;";



    //     $resultado = mysqli_query(Database::connect(), $query) or
    //         die(mysqli_error(Database::connect()) . "\n || Query: " . $query);


    //     // $dados1 = array();
    //     while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {

    //         $dados["data"][] = $linha;
    //     }




    //     //Remove a linha com mesmo id que vem em seguida------------------
    //     // $idAtual = 0;

    //     // $dadosReverso = array_reverse($dados1);
    //     // foreach ($dadosReverso as $linha) {
    //     //     if ($idAtual != $linha["id"]) {
    //     //         $dados["data"][] = $linha;
    //     //     }
    //     //     $idAtual = $linha["id"];
    //     // }





    //     return $dados;
    // }
























}


?>