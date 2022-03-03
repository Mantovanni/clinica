<?php

/**
 * Description of ControllerItens
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */
require_once(realpath(dirname(__FILE__)) . "/ItensDAO.class.php");



class ControllerItens
{
    public function __construct()
    {
        //Recebe o corpo da mensagem o request payload recebido no modelo JSON      
        $body = json_decode(file_get_contents('php://input'));



        if (!empty($body->metodo)) {
            switch ($body->metodo) {
                case 'listarItensProdutos':
                    self::listarItensProdutos($body);
                    break;
              


                default;
                    echo "Metodo com nome errado!";
                    break;
            }
        } else {
            echo "Nenhum metodo encontrado!";
        }
    }




    //Buscar itens no banco
    //==========================================================================================================
    static function  listarItensProdutos()
    {

        $consulta = ItensDAO::listarItensProdutos();

        echo json_encode($consulta);
    }




    






}

$ControllerItens = new ControllerItens();
