<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Atendimentos
 *
 ** @author Ewerson Mantovani
 */
require_once (realpath(dirname(__FILE__)) . "/AtendimentosDAO.class.php");




class ControllerAtendimentos {

    public function __construct()
    {
        //Recebe o corpo da mensagem o request payload recebido no modelo JSON      
        $body = json_decode(file_get_contents('php://input'));



        if (!empty($body->metodo)) {
            switch ($body->metodo) {
                        

                default;
                    echo "Método com nome errado!";
                    break;
            }
        } else {
            echo "Nenhum método encontrado!";
        }
    }






    // FUNÇÕES ESPECIFICAS DA CLASSE
    //====================================================================================================
    //====================================================================================================

 // SALVAR
    //==============================================================================================================
    static function  salvar($data, $tabela)
    {

        unset($data["id"]);

        $query  = "INSERT INTO $tabela";
        // implode keys do $array...
        $query .= " (`" . implode("`, `", array_keys($data)) . "`)";
        // implode values do $array...
        $query .= " VALUES ('" . implode("', '", $data) . "') ";


        if (mysqli_query(Database::connect(), $query)) {
            //retorna a id criada nessa conexao junto com todos os outro valores
            $data["id"] = mysqli_insert_id(Database::connect());
            return $data;
        } else {
            echo "Erro - " . mysqli_error(Database::connect()) . "\n ||  QUERY: $query";
            // return false;
        }
    }

 



}


$ControllerAtendimentos = new ControllerAtendimentos();
