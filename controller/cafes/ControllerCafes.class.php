<?php

/**
 * Description of ControllerItens
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */
require_once(realpath(dirname(__FILE__)) . "/CafesDAO.class.php");



class ControllerItens
{
    public function __construct()
    {
        //Recebe o corpo da mensagem o request payload recebido no modelo JSON      
        $body = json_decode(file_get_contents('php://input'));



        if (!empty($body->metodo)) {
            switch ($body->metodo) {
                case 'listarAllCafeItens':
                    self::listarAllCafeItens($body);
                    break;
                case 'listarCafeItensById':
                    self::listarCafeItensById($body);
                    break;
                case 'salvarCafe':
                    self::salvarCafe($body);
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
    static function  listarAllCafeItens()
    {

        $consulta = CafesDAO::listarAllCafeItens();

        echo json_encode($consulta);
    }



    //Buscar itens no banco
    //==========================================================================================================
    static function  listarCafeItensById($body)
    {

        $consulta = CafesDAO::listarCafeItensById($body);

        echo json_encode($consulta);
    }



    //salvarCafe
    //==========================================================================================================
    static function  salvarCafe($body)
    {

        $consulta = CafesDAO::salvarCafe($body);

        echo json_encode($consulta);
    }




    






}

$ControllerItens = new ControllerItens();
