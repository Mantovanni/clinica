<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Profissionais
 *
 ** @author Ewerson Mantovani
 */
require_once (realpath(dirname(__FILE__)) . "/ProfissionaisDAO.class.php");




class ControllerProfissionais {

    public function __construct()
    {
        //Recebe o corpo da mensagem o request payload recebido no modelo JSON      
        $body = json_decode(file_get_contents('php://input'));



        if (!empty($body->metodo)) {
            switch ($body->metodo) {
                        

                default;
                    echo "Metodo com nome errado!";
                    break;
            }
        } else {
            echo "Nenhum metodo encontrado!";
        }
    }






    // FUNÇÕES ESPECÍFICAS DA CLASSE
    //====================================================================================================
    //====================================================================================================



 



}


$ControllerProfissionais = new ControllerProfissionais();
