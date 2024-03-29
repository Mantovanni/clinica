<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Atendimentos
 *
 ** @author Ewerson Mantovani - ewerson.mantovani@gmail.com
 */
require_once(realpath(dirname(__FILE__)) . "/AtendimentosDAO.class.php");




class ControllerAtendimentos
{

    public function __construct()
    {
        //Recebe o corpo da mensagem o request payload recebido no modelo JSON      
        $body = json_decode(file_get_contents('php://input'));

        // print_r($body);

        if (!empty($body->metodo)) {
            switch ($body->metodo) {

                case 'salvarAtendimento':
                    self::salvarAtendimento($body);
                    break;


                case 'carregarDadosCompletosAtendimentoById':
                    self::carregarDadosCompletosAtendimentoById($body);
                    break;

                case 'listarAtendimentosProcedimentosTrasacoesById':
                    self::listarAtendimentosProcedimentosTrasacoesById($body);
                    break;


                case 'listarAtendimentosClientes':
                    self::listarAtendimentosClientes();
                    break;

                case 'listarAtendimentosConcluidos':
                    self::listarAtendimentosConcluidos();
                    break;

                case 'confirmarPagamento':
                    self::confirmarPagamento($body);
                    break;




                default;
                    echo "Nenhum método com esse nome encontrado.";
                    break;
            }
        } else {
            echo "Campo método vazio.";
        }
    }




    // FUNÇÕES ESPECIFICAS DA CLASSE
    //====================================================================================================
    //====================================================================================================




    //Salvar no banco
    //==========================================================================================================
    static function  salvarAtendimento($body)
    {


        $consulta = AtendimentosDAO::salvarAtendimento($body);

        echo json_encode($consulta);
    }



    //Buscar dados completo do atendimento
    //==========================================================================================================
    static function  carregarDadosCompletosAtendimentoById($body)
    {

        $consulta = AtendimentosDAO::carregarDadosCompletosAtendimentoById($body);

        echo json_encode($consulta);
    }

       //Buscar dados completo do atendimento
    //==========================================================================================================
    static function  listarAtendimentosProcedimentosTrasacoesById($body)
    {

        $consulta = AtendimentosDAO::listarAtendimentosProcedimentosTrasacoesById($body);

        echo json_encode($consulta);
    }


    //Buscar dados completo do atendimento
    //==========================================================================================================
    static function  listarAtendimentosClientes()
    {

        $consulta = AtendimentosDAO::listarAtendimentosClientes();

        echo json_encode($consulta);
    }

    //Buscar dados completo do atendimento
    //==========================================================================================================
    static function  listarAtendimentosConcluidos()
    {

        $consulta = AtendimentosDAO::listarAtendimentosConcluidos();

        echo json_encode($consulta);
    }

    //Buscar dados completo do atendimento
    //==========================================================================================================
    static function  confirmarPagamento($body)
    {

        $consulta = AtendimentosDAO::confirmarPagamento($body);

        echo json_encode($consulta);
    }
}


$ControllerAtendimentos = new ControllerAtendimentos();
