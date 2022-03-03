<?php

/**
 * Description of ControllerItens
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */
require_once(realpath(dirname(__FILE__)) . "/GeralDAO.class.php");



class ControllerGeral
{
    public function __construct()
    {
        //Recebe o corpo da mensagem o request payload recebido no modelo JSON      
        $body = json_decode(file_get_contents('php://input'));



        if (!empty($body->metodo)) {
            switch ($body->metodo) {
                case 'salvar':
                    self::salvar($body);
                    break;
                case 'deletar':
                    self::deletar($body);
                    break;
                case 'listar':
                    self::listar($body);
                    break;
                case 'listarById':
                    self::listarById($body);
                    break;
                case 'listarByKey':
                    self::listarByKey($body);
                    break;
                case 'listarLast':
                    self::listarLast($body);
                    break;
                case 'editar':
                    self::editar($body);
                    break;
                case 'salvarRelacional':
                    self::salvarRelacional($body);
                    break;
                case 'editarRelacional':
                    self::editarRelacional($body);
                    break;
                    // case 'listarRelacional':
                    //     self::listarRelacional($body);
                    //     break;



                default;
                    echo "Metodo com nome errado!";
                    break;
            }
        } else {
            echo "Nenhum metodo encontrado!";
        }
    }




    //Salvar no banco
    //==========================================================================================================
    static function  salvar($body)
    {

        //Converte Objeto em Array
        $data = (array)$body->data;

        $consulta = GeralDAO::salvar($data, $body->tabela);

        echo json_encode($consulta);
    }


    //Editar no banco
    //==========================================================================================================
    static function  editar($body)
    {

        //Converte Objeto em Array
        $data = (array)$body->data;

        $consulta = GeralDAO::editar($data, $body->tabela);

        echo json_encode($consulta);
    }



    //DELETAR
    //==========================================================================================================
    static function  deletar($body)
    {

        // if (empty($_SESSION["usuario"])) {
        // }
        // $consulta = new;
        session_start();

        //So realiza a ação se o acesso for do tipo admin
        if ($_SESSION["acesso"] == "admin") {

            //Converte Objeto em Array
            $data = (array)$body->data;

            $consulta = GeralDAO::deletar($data, $body->tabela);

            echo json_encode($consulta);
        } else {
            $consulta["permissao"] = "negada";

            echo json_encode($consulta);
        }
    }


    //Listar itens no banco
    //==========================================================================================================
    static function  listar($body)
    {

        $consulta = GeralDAO::listar($body->tabela);

        echo json_encode($consulta);
    }

    //listarBydId itens no banco
    //==========================================================================================================
    static function  listarById($body)
    {

        // print_r($body->id);

        $consulta = GeralDAO::listarById($body->id, $body->tabela);

        echo json_encode($consulta);
    }

    //listarBydId itens no banco
    //==========================================================================================================
    static function  listarByKey($body)
    {

        // print_r($body->id);

        // print_r($body);

        $consulta = GeralDAO::listarByKey($body->key, $body->keyValor,  $body->tabela);

        echo json_encode($consulta);
    }
    //listarBydId itens no banco
    //==========================================================================================================
    static function  listarLast($body)
    {

        $consulta = GeralDAO::listarLast($body->tabela);

        echo json_encode($consulta);
  
    }










    // =======================================================================================================================
    // =======================================================================================================================







    //Salvar na tabela e os iten na sua tabela relacional
    //==========================================================================================================
    static function  salvarRelacional($body)
    {

        //Converte Objeto em Array
        $data = (array)$body->data;

        $consulta = GeralDAO::salvarRelacional($data, $body->tabela, $body->tabelaRelacional);

        echo json_encode($consulta);
    }

    //Editar na tabela e os iten na sua tabela relacional
    //==========================================================================================================
    static function  editarRelacional($body)
    {

        //Converte Objeto em Array
        $data = (array)$body->data;

        $consulta = GeralDAO::editarRelacional($data, $body->tabela, $body->tabelaRelacional);

        echo json_encode($consulta);
    }


    //Listar o itens e seus itens relacionais no banco
    //==========================================================================================================
    // static function  listarRelacional($body)
    // {

    //     //Converte Objeto em Array
    //     // $data = (array)$body->data;

    //     $consulta = GeralDAO::listarRelacional($body->tabela, $body->tabelaRelacional);

    //     echo json_encode($consulta);
    // }









}

$ControllerGeral = new ControllerGeral();
