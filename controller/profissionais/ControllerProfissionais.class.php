<?php

/**
 * Description of Controller
 *
 ** @author Ewerson Mantovani - ewerson.mantovani@gmail.com
 */
require_once (realpath(dirname(__FILE__)) . "/PacientesDAO.class.php");




class ControllerProfissionais {

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



    // FUNÇÕES ESPECÍFICAS DA CLASSE
    //====================================================================================================
    //====================================================================================================






}


$ControllerPacientes = new ControllerPacientes();
