<?php

/**
 * Description of Controller
 *
 ** @author Ewerson Mantovani - ewerson.mantovani@gmail.com
 */
require_once (realpath(dirname(__FILE__)) . "/PagamentosDAO.class.php");




class ControllerPagamentos {

    public function __construct()
    {
        //Recebe o corpo da mensagem o request payload recebido no modelo JSON      
        $body = json_decode(file_get_contents('php://input'));



        if (!empty($body->metodo)) {
            switch ($body->metodo) {
              
                
                case 'listarFaturamentoDetalhado':
                    self::listarFaturamentoDetalhado();
                    break;
               
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

    //Listar Faturamento
    //==========================================================================================================
    static function  listarFaturamentoDetalhado()
    {


        $consulta = PagamentosDAO::listarFaturamentoDetalhado();

        echo json_encode($consulta);
    }




}


$ControllerPagamentos = new ControllerPagamentos();
