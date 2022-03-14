<?php

/**
 * Description of ControllerItens
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */
require_once(realpath(dirname(__FILE__)) . "/ProdutosDAO.class.php");



class ControllerProdutos
{
    public function __construct()
    {
        //Recebe o corpo da mensagem o request payload recebido no modelo JSON      
        $body = json_decode(file_get_contents('php://input'));



        if (!empty($body->metodo)) {
            switch ($body->metodo) {
                case 'listarProdutos':
                    self::listarProdutos($body);
                    break;
                case 'criarProduto':
                    self::criarProduto($body);
                    break;
                case 'listarProdutosRouparia':
                    self::listarProdutosRouparia($body);
                    break;
                case 'listarProdutosPorGrupo':
                    self::listarProdutosPorGrupo($body);
                    break;


                default;
                    echo "Método com nome errado!";
                    break;
            }
        } else {
            echo "Nenhum método encontrado!";
        }
    }




    //Buscar itens no banco
    //==========================================================================================================
    static function  listarProdutos()
    {

        $consulta = ProdutosDAO::listarProdutos();

        echo json_encode($consulta);
    }



    //Buscar itens no banco
    //==========================================================================================================
    static function  criarProduto($body)
    {

        $consulta = ProdutosDAO::criarProduto($body);

        echo json_encode($consulta);
    }

    //Buscar itens no banco
    //==========================================================================================================
    static function  listarProdutosRouparia($body)
    {

        $consulta = ProdutosDAO::listarProdutosRouparia($body);

        echo json_encode($consulta);
    }


    
    //Buscar itens no banco
    //==========================================================================================================
    static function  listarProdutosPorGrupo($body)
    {

        $consulta = ProdutosDAO::listarProdutosPorGrupo($body);

        echo json_encode($consulta);
    }



    






}

$ControllerProdutos = new ControllerProdutos();
