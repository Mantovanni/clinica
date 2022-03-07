<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Pacientes
 *
 ** @author Ewerson Mantovani
 */
require_once (realpath(dirname(__FILE__)) . "/PacientesDAO.class.php");




class ControllerPacientes {

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






    // FUNÇÔES ESPESSIFICAS DA CLASSE
    //====================================================================================================
    //====================================================================================================



 



}


$ControllerPacientes = new ControllerPacientes();
