<?php

/**
 * Description of ControllerItens
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */
require_once(realpath(dirname(__FILE__)) . "/ApartamentosDAO.class.php");



class ControllerApartamentos
{
    public function __construct()
    {
        //Recebe o corpo da mensagem o request payload recebido no modelo JSON      
        $body = json_decode(file_get_contents('php://input'));



        if (!empty($body->metodo)) {
            switch ($body->metodo) {
                case 'listarEstoque':
                    self::listarEstoque($body);
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
    // static function  listarEstoque($body)
    // {

    //     $consulta = ApartamentosDAO::listarEstoque($body);

    //     echo json_encode($consulta);
    // }



    






}

$ControllerApartamentos = new ControllerApartamentos();
