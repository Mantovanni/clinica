<?php

/**
 * Description of Controller
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */
require_once(realpath(dirname(__FILE__)) . "/MovimentacoesDAO.class.php");



class ControllerMovimentacoes
{
    public function __construct()
    {
        //Recebe o corpo da mensagem o request payload recebido no modelo JSON      
        $body = json_decode(file_get_contents('php://input'));



        if (!empty($body->metodo)) {
            switch ($body->metodo) {
                // case 'lancarCompra':
                //     self::lancarCompra($body);
                    // break;
                case 'movimentarEstoque':
                    self::movimentarEstoque($body);
                    break;
                case 'transferirMultiplos':
                    self::transferirMultiplos($body);
                    break;
                case 'listarMovimentacoesPorEstoque':
                    self::listarMovimentacoesPorEstoque($body);
                    break;
                case 'listarMovimentacoes':
                    self::listarMovimentacoes($body);
                    break;
                case 'listarMovimentacoesPorProduto':
                    self::listarMovimentacoesPorProduto($body);
                    break;
                case 'listarMovimentacoesPorProdutoEstoque':
                    self::listarMovimentacoesPorProdutoEstoque($body);
                    break;



                default;
                    echo "Metodo com nome errado!";
                    break;
            }
        } else {
            echo "Nenhum metodo encontrado!";
        }
    }




    // Buscar itens no banco
    // ==========================================================================================================
    // static function  lancarCompra($body)
    // {
    //     //Converte Objeto em Array
    //     $data = (array)$body->data;

    //     $consulta = MovimentacoesDAO::lancarCompra($data);

    //     echo json_encode($consulta);
    // }


    // Buscar itens no banco
    // ==========================================================================================================
    static function  movimentarEstoque($body)
    {

       
        $consulta = MovimentacoesDAO::movimentarEstoque($body);

        echo json_encode($consulta);
    }
    // Buscar itens no banco
    // ==========================================================================================================
    static function  transferirMultiplos($body)
    {

       
        $consulta = MovimentacoesDAO::transferirMultiplos($body);

        echo json_encode($consulta);
    }



    // listarMovimentacao
    // ==========================================================================================================
    static function  listarMovimentacoes()
    {
      

        $consulta = MovimentacoesDAO::listarMovimentacoes();

        echo json_encode($consulta);
    }


    // listarMovimentacao
    // ==========================================================================================================
    static function  listarMovimentacoesPorEstoque($body)
    {
      
        $consulta = MovimentacoesDAO::listarMovimentacoesPorEstoque($body);

        echo json_encode($consulta);
    }

    // listarMovimentacao
    // ==========================================================================================================
    static function  listarMovimentacoesPorProduto($body)
    {
        //Converte Objeto em Array
        $id = $body->data;

        $consulta = MovimentacoesDAO::listarMovimentacoesPorProduto($id);

        echo json_encode($consulta);
    }


    // listarMovimentacoesPorProdutoEstoque
    // ==========================================================================================================
    static function  listarMovimentacoesPorProdutoEstoque($body)
    {
        //Converte Objeto em Array
        $data = (array)$body->data;

        $consulta = MovimentacoesDAO::listarMovimentacoesPorProdutoEstoque($data);

        echo json_encode($consulta);
    }
}

$ControllerMovimentacoes = new ControllerMovimentacoes();
