<?php

/**
 * Description of Controller
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */
require_once(realpath(dirname(__FILE__)) . "/EstoquesDAO.class.php");



class ControllerEstoques
{
    public function __construct()
    {
        //Recebe o corpo da mensagem o request payload recebido no modelo JSON      
        $body = json_decode(file_get_contents('php://input'));



        if (!empty($body->metodo)) {
            switch ($body->metodo) {
                case 'listarEstoquesProdutos':
                    self::listarEstoquesProdutos($body);
                    break;
                case 'quantidadePorProduto':
                    self::quantidadePorProduto($body);
                    break;
                case 'quantidadePorProdutoEstoque':
                    self::quantidadePorProdutoEstoque($body);
                    break;
                case 'valorAllEstoques':
                    self::valorAllEstoques($body);
                    break;
                case 'listarEstoqueByProduto':
                    self::listarEstoqueByProduto($body);
                    break;




                default;
                    echo "Metodo com nome errado!";
                    break;
            }
        } else {
            echo "Nenhum metodo encontrado!";
        }
    }





    // listarMovimentacao
    // ==========================================================================================================
    static function  listarEstoquesProdutos($body)
    {
        $data = (array)$body->data;

        $consulta = EstoquesDAO::listarEstoquesProdutos($data);

        echo json_encode($consulta);
    }


    // listarMovimentacao
    // ==========================================================================================================
    static function  quantidadePorProduto($body)
    {

        //Converte Objeto em Array
        $data = (array)$body->data;

        $consulta = EstoquesDAO::quantidadePorProduto($data);

        echo json_encode($consulta);
    }


    // listarMovimentacao
    // ==========================================================================================================
    static function  quantidadePorProdutoEstoque($body)
    {
        //Converte Objeto em Array
        $data = (array)$body->data;

        $consulta = EstoquesDAO::quantidadePorProdutoEstoque($data);

        echo json_encode($consulta);
    }

    // valorAllEstoques
    // ==========================================================================================================
    static function  valorAllEstoques()
    {


        $consulta = EstoquesDAO::valorAllEstoques();

        echo json_encode($consulta);
    }


    // valorAllEstoques
    // ==========================================================================================================
    static function  listarEstoqueByProduto($body)
    {

        //Converte Objeto em Array
        $data = (array)$body->data;

        $consulta = EstoquesDAO::listarEstoqueByProduto($data);

        echo json_encode($consulta);
    }
}

$ControllerEstoques = new ControllerEstoques();
