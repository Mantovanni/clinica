
<?php

/**
 * Description of DAO
 * 
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */


require_once(realpath(dirname(__FILE__)) . "/../../config/Database.class.php");

class ApartamentosDAO
{




   
    //==============================================================================================================
    static function listarEstoque($body)//Adicionar a opção de receber a qual grupo deseja listar
    {

        $data = (array)$body->data;

        $dados["data"] = array();

        $query = "SELECT * estoques 
        WHERE apartamentos.id = " . $data['apartamento'] . "
        ;";
       


        $resultado = mysqli_query(Database::connect(), $query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);


        // $dados1 = array();
        while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }




        return $dados;
    }










}


?>