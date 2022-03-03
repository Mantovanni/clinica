
<?php

/**
 * Description of DAO
 * 
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */


require_once(realpath(dirname(__FILE__)) . "/../../config/Database.class.php");

class EstoquesDAO
{



    // Cada coluna do select tem que ter no Group By - resolver isso depois no banco 
    //lista todos os produtosCusto e quantidades de determinado estoque
    //==============================================================================================================
    //Lista produtos apenas com movimentações em qualquer estoque
    //Listar Estoque com Seus produtos
    static function listarEstoquesProdutos($data) //listarAllProdutosCustoPorEstoque  //listarEstoquePorIdAllProdutosCusto
    {
        // print_r($data);Z

        $dados["data"] = array();

        //Union com lista de produtos sem 
        // $query = "SELECT 
        // produtosCusto_view.id, nome, custo,
        // sum(estoques_has_produtos.quantidade) as quantidade_total
        // FROM produtosCusto_view
        // INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
        // where estoques_has_produtos.estoques_id LIKE '" . $data["estoque"] . "'    
        // GROUP BY produtosCusto_view.id, nome, custo

        // order by id desc;";



        $query = "SELECT 
        produtosCusto_view.*,
        SUM(`estoques_has_produtos`.`quantidade`) AS `estoque_total`
        FROM produtosCusto_view
        INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
        WHERE estoques_has_produtos.estoques_id LIKE '" . $data["estoque"] . "'
        GROUP BY   produtosCusto_view.id  
        
        UNION
                
        SELECT 
        produtos.*,
        0 as custo,
        SUM(`estoques_has_produtos`.`quantidade`) AS `estoque_total`
        FROM produtos
        INNER JOIN estoques_has_produtos ON produtos.id = estoques_has_produtos.produtos_id 
        WHERE estoques_has_produtos.estoques_id LIKE '" . $data["estoque"] . "'    
        AND `produtos`.`id` IN 
            (
            SELECT 
            `produtosCusto_view`.`id` AS `id`
            FROM produtosCusto_view
            INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
             WHERE estoques_has_produtos.estoques_id LIKE '" . $data["estoque"] . "'    
            )
            IS FALSE
        GROUP BY produtos.id
        
        order by id desc;";









        $resultado = Database::connect()->query($query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        while ($linha = $resultado->fetch_array(MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }


        return $dados;
    }



































    // Lista total de produtos em todos os estoques
    //==============================================================================================================
    static function quantidadePorProduto($data) //quantidadeTotalProdutosAllEstoques
    {

        $dados = array();

        // $query = "SELECT
        // produtosCusto_view.custo,
        // produtosCusto_view.unidade,
        // sum(quantidade) as quantidade_total
        // FROM estoques_has_produtos
        // INNER JOIN produtosCusto_view ON estoques_has_produtos.produtos_id = produtosCusto_view.id
        // where produtos_id = " . $data["id"] . " ;";


        $query = "SELECT 
        produtosCusto_view.*,
        SUM(`estoques_has_produtos`.`quantidade`) AS `estoque_total`
        FROM produtosCusto_view
        INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
       
        WHERE produtos_id LIKE '" . $data["id"] . "'
        GROUP BY   produtosCusto_view.id  
        
        UNION
                
        SELECT 
        produtos.*,
        0 as custo,
        SUM(`estoques_has_produtos`.`quantidade`) AS `estoque_total`
        FROM produtos
        INNER JOIN estoques_has_produtos ON produtos.id = estoques_has_produtos.produtos_id 
       
        WHERE produtos_id LIKE '" . $data["id"] . "'    
        AND `produtos`.`id` IN 
            (
            SELECT 
            `produtosCusto_view`.`id` AS `id`
            FROM produtosCusto_view
            INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
           
             WHERE produtos_id LIKE '" . $data["id"] . "'    
            )
            IS FALSE
        GROUP BY produtos.id
        
        order by id desc;";









        $resultado = Database::connect()->query($query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        while ($linha = $resultado->fetch_array(MYSQLI_ASSOC)) {

            $dados = $linha;
        }


        return $dados;
    }




    // Listar produto por id e estoque// Usado na movimentações
    //Lista um produtoCusto de um determinado estoque
    //==============================================================================================================
    static function quantidadePorProdutoEstoque($data) //listarProdutoCustoPorEstoque
    {


        $dados = array();

        // $query = "SELECT
        // produtosCusto_view.custo,
        // produtosCusto_view.unidade,
        // sum(quantidade) as quantidade_total
        // FROM estoques_has_produtos
        // INNER JOIN produtosCusto_view ON estoques_has_produtos.produtos_id = produtosCusto_view.id
        // where produtos_id = " . $data["produto"] . " 
        // AND estoques_id LIKE '" . $data["estoque"] . "' ;";



        $query = "SELECT 
        produtosCusto_view.*,
        SUM(`estoques_has_produtos`.`quantidade`) AS `estoque_total`
        FROM produtosCusto_view
        INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
        WHERE estoques_has_produtos.estoques_id LIKE '" . $data["estoque"] . "'
        AND produtos_id LIKE '" . $data["produto"] . "'
        GROUP BY   produtosCusto_view.id  
        
        UNION
                
        SELECT 
        produtos.*,
        0 as custo,
        SUM(`estoques_has_produtos`.`quantidade`) AS `estoque_total`
        FROM produtos
        INNER JOIN estoques_has_produtos ON produtos.id = estoques_has_produtos.produtos_id 
        WHERE estoques_has_produtos.estoques_id LIKE '" . $data["estoque"] . "'
        AND produtos_id LIKE '" . $data["produto"] . "'    
        AND `produtos`.`id` IN 
            (
            SELECT 
            `produtosCusto_view`.`id` AS `id`
            FROM produtosCusto_view
            INNER JOIN estoques_has_produtos ON produtosCusto_view.id = estoques_has_produtos.produtos_id 
             WHERE estoques_has_produtos.estoques_id LIKE '" . $data["estoque"] . "'
             AND produtos_id LIKE '" . $data["produto"] . "'    
            )
            IS FALSE
        GROUP BY produtos.id
        
        order by id desc;";



        $resultado = Database::connect()->query($query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        while ($linha = $resultado->fetch_array(MYSQLI_ASSOC)) {

            $dados = $linha;
        }

        return $dados;
    }





    //==============================================================================================================
    static function listarEstoqueByProduto($data)
    {

        $dados = array();

        $query = "SELECT * , nome
        FROM estoques_has_produtos
        inner join estoques on estoques.id = estoques_has_produtos.estoques_id
        WHERE produtos_id = '" . $data["id"] . "';";

        $resultado = Database::connect()->query($query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        while ($linha = $resultado->fetch_array(MYSQLI_ASSOC)) {

            $dados[] = $linha;
        }

        return $dados;
    }







    // valorAllEstoques 
    //Valor do estoque somado do custo dos produtos de cada estoque
    //==============================================================================================================
    static function valorAllEstoques()
    {

        $dados = array();

        $query = "SELECT 
        estoques_id,
        sum(custo * quantidade) as custo_total
        FROM produtosCusto_view
        Inner Join estoques_has_produtos ON estoques_has_produtos.produtos_id = produtosCusto_view.id
        group by estoques_id";

        $resultado = Database::connect()->query($query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        while ($linha = $resultado->fetch_array(MYSQLI_ASSOC)) {

            $dados[] = $linha;
        }

        return $dados;
    }
}


?>