<?php

/**
 * Description of DAO
 *
 ** @author Ewerson Mantovani - ewerson.mantovani@gmail.com
 */

require_once(realpath(dirname(__FILE__)) . "/../../config/Database.class.php");




class PagamentosDAO {


    // FUNÇÕES ESPECÍFICAS DA CLASSE
    //====================================================================================================
    //====================================================================================================


    // Busca no banco todos os dados daquele atendimentos nas tabelas relacionadas
    //===========================================================================================================
    static function listarFaturamentoDetalhado()
    {

        // $data = (array)$body->data;

        //Evita dar erro quando não tem valores na tabela
        $dataToSend["data"] = array(); 

        $query =
            "SELECT 
            pagamentos.id,
            pagamentos.status,
            pagamentos.atendimentos_id,
            pacientes.nome,
            atendimentos.abertura
            FROM pagamentos
            INNER JOIN atendimentos ON atendimentos.id = pagamentos.atendimentos_id
            INNER JOIN pacientes ON pacientes.id = atendimentos.pacientes_id;                                              
            ";


        $resultado = mysqli_query(Database::connect(), $query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);



        while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {

            $dataToSend["data"][] = $linha;
        }






        return $dataToSend;
    }



}

?>