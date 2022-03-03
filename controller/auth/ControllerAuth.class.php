<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Auth
 *
 ** @author Ewerson Mantovani
 */
require_once(realpath(dirname(__FILE__)) . "/AuthDAO.class.php");
require_once(realpath(dirname(__FILE__)) . "../../usuarios/UsuariosDAO.class.php");




class ControllerAuth
{

    public function __construct()
    {
        //Recebe o corpo da mensagem o request payload recebido no modelo JSON      
        $body = json_decode(file_get_contents('php://input'));



        if (!empty($body->metodo)) {
            switch ($body->metodo) {
                case 'autenticarLogin':
                    self::autenticarLogin($body);
                    break;
                case 'verificarSessao':
                    self::verificarSessao($body);
                    break;
                case 'verificarSessaoJs':
                    self::verificarSessaoJs($body);
                    break;
                case 'buscarDadosDaSessao':
                    self::buscarDadosDaSessao($body);
                    break;
                case 'encerrarSessao':
                    self::encerrarSessao($body);
                    break;


                default;
                    echo "Metodo com nome errado!";
                    break;
            }
        } else {
            // echo "Nenhum metodo encontrado!";
        }
    }







    //Verifica se existe o usuario e senha no banco de dados, em seguida inicia uma sessao 
    //com os dados do usuario
    //==========================================================================================================
    static function  autenticarLogin($body)
    {

        //Verifica se existe um usuaria e senha correspondente
        $data = (array)$body->data;
        $consulta = UsuariosDAO::buscarUsuarioByLoginSenha($data);



        //Se rwetornar um algum usuario cria uma sessao
        if (!empty($consulta)) {

            //Cria sessao do usuario ================================================
            session_start();

            $_SESSION["id"] = $consulta["id"];
            $_SESSION["usuario"] = $consulta["usuario"];
            $_SESSION["acesso"] = $consulta["acesso"];
        }


        echo json_encode($consulta);
    }




    //Verifica se existe um usuario logado na sessao
    //Usada diretamente no index.php do app para redirecionar no backend caso nao tenha uma sessao logada
    //==========================================================================================================
    static function verificarSessao()
    {
        session_start();

        // print_r($_SESSION);
        // if (session_status() == PHP_SESSION_NONE) {
        if (empty($_SESSION["usuario"])) {
            header('Location: /cafe/login');
        }
    }

    
    static function verificarSessaoJs()
    {
        session_start();
        if (empty($_SESSION["usuario"])) {
        // if (session_status() == PHP_SESSION_NONE) {
        // if (!isset($_SESSION)){
        // if (session_status() !== PHP_SESSION_ACTIVE) {
      

            echo json_encode("deslogado");
        }else{
            echo json_encode("logado");
        }

    }




    //Se ja tiver uma sessão aberta impede acesso a tela de login
    //==========================================================================================================
    static function verificarSessaoTelaLogin()
    {
        session_start();

        if (!empty($_SESSION["usuario"])) {
            header('Location: /cafe/app');
        }
    }



    //Busca os dados da sessao atual
    //==========================================================================================================
    static function buscarDadosDaSessao()
    {
        session_start();
        echo json_encode($_SESSION);
    }



    //Encerra a sessao atual
    //==========================================================================================================
    static function encerrarSessao()
    {
        session_start();
        // session_set_cookie_params(0);
        echo json_encode(session_destroy());
    }
}




$ControllerAuth = new ControllerAuth();
