
<?php

/**
 * Description of DAO
 * 
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */


require_once(realpath(dirname(__FILE__)) . "/../../config/Database.class.php");

class ItensDAO
{







    //==============================================================================================================
    static function listarItensProdutos()//Criar view itensProdutos_view
    {

        $dados["data"] = array();
        $query =
            "SELECT itensCusto_view.*,
            produtosCusto_view.id as produtos_id,
            produtosCusto_view.nome as produtos_nome,
            produtosCusto_view.unidade as produtos_unidade,
            produtosCusto_view.custo as produtos_custo,
            itens_has_produtos.quantidade as produtos_quantidade,
            itens_has_produtos.id as produtos_idhas
            FROM itensCusto_view 
            INNER JOIN itens_has_produtos ON itensCusto_view.id = itens_has_produtos.itens_id           
            INNER JOIN produtosCusto_view ON produtosCusto_view.id = itens_has_produtos.produtos_id
            order by itensCusto_view.id                                                       
            ";


        $resultado = mysqli_query(Database::connect(), $query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);


        while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }


        return $dados;

    }



    //==============================================================================================================
    static function listarItensProdutoById($body)
    { 
            //Converte para array
            $data = (array)$body->data;
    
    
            //Dados que vão retornar para o sistema
            $dados["data"] = array();
    
            $query =
                "SELECT itens.*,
                produtosCusto_view.id as produtos_id,
                produtosCusto_view.nome as produtos_nome,
                produtosCusto_view.unidade as produtos_unidade,
                produtosCusto_view.custo as produtos_custo,
                itens_has_produtos.quantidade as produtos_quantidade,
                itens_has_produtos.id as produtos_idhas
                FROM itens 
                INNER JOIN itens_has_produtos ON itens.id = itens_has_produtos.itens_id           
                INNER JOIN produtosCusto_view ON produtosCusto_view.id = itens_has_produtos.produtos_id
                WHERE itensCusto_view = ". $data["id"] ."
                order by itens.id  ";
    
    
            $resultado = mysqli_query(Database::connect(), $query) or
                die(mysqli_error(Database::connect()) . "\n || Query: " . $query);
    
    
            while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {
    
                $dados["data"][] = $linha;
            }
    
    
            return $dados;
    

    }









}


?>