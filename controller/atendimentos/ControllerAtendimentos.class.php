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
                case 'salvar':
                    self::salvar($body);
                    break;
                
                
        
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




    //Salvar no banco
    //==========================================================================================================
    static function  salvar($body)
    {

        //Converte Objeto em Array
        $data = (array)$body->data;

        $consulta = GeralDAO::salvar($data, $body->tabela);

        echo json_encode($consulta);
    }



}


$ControllerAtendimentos = new ControllerAtendimentos();
