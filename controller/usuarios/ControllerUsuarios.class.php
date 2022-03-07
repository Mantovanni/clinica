<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Usuarios
 *
 ** @author Ewerson Mantovani
 */
require_once (realpath(dirname(__FILE__)) . "/UsuariosDAO.class.php");




class ControllerUsuarios {

    public function __construct()
    {
        //Recebe o corpo da mensagem o request payload recebido no modelo JSON      
        $body = json_decode(file_get_contents('php://input'));



        if (!empty($body->metodo)) {
            switch ($body->metodo) {
                case 'buscarUsuarioByLoginSenha':
                    self::buscarUsuarioByLoginSenha($body);
                    break;
               

                default;
                    echo "Metodo com nome errado!";
                    break;
            }
        } else {
            echo "Nenhum metodo encontrado!";
        }
    }





    //buscarUsuarioByLoginSenha
    //==========================================================================================================
    static function  buscarUsuarioByLoginSenha($body)
    {

        //Converte Objeto em Array
        $data = (array)$body->data;

        $consulta = UsuariosDAO::buscarUsuarioByLoginSenha($data);

        echo json_encode($consulta);
    }





}


$ControllerUsuarios = new ControllerUsuarios();
