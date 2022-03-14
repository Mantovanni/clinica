
<?php

/**
 * Description of DAO
 * 
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */


require_once(realpath(dirname(__FILE__)) . "/../../config/Database.class.php");

class MovimentacoesDAO
{



    // LISTAR 
    //==============================================================================================================

    static function listarMovimentacoes() //fazer VIWER
    {



        $dados["data"] = array();

        $query = "SELECT 
            data, origem, tipo, quantidade, movimentacoes.valor, 
            unidade, nome, estoque
            FROM movimentacoes
            INNER JOIN produtos ON produtos.id = movimentacoes.produtos_id   
            order by movimentacoes.id desc;";

        $resultado = Database::connect()->query($query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        while ($linha = $resultado->fetch_array(MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }


        return $dados;
    }













    // listarMovimentacoesPorEstoque
    //Recebe a id do estoque
    //=============================================================================================================
    static function listarMovimentacoesPorEstoque($body) //fazer VIWER
    {

        //converte em array
        $data = (array)$body->data;


        $dados["data"] = array();

        $query = "SELECT
        movimentacoes.id,
        data, 
        origem, 
        movimentacoes.tipo, 
        quantidade,
        movimentacoes.valor, 
        unidade,
        operacao,
        cafes_id,
        estoques.nome as estoques_nome,
        estoques.id as estoques_id
        FROM movimentacoes 
        INNER JOIN produtos ON produtos.id = movimentacoes.produtos_id
        INNER JOIN estoques ON estoques.id = movimentacoes.estoques_id
        WHERE  estoques.id LIKE " . $data["estoque"] . " order by movimentacoes.id ;";

        $resultado = Database::connect()->query($query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        while ($linha = $resultado->fetch_array(MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }


        return $dados;
    }








    // listarMovimentacoesPorProduto 
    //=============================================================================================================
    static function listarMovimentacoesPorProduto($data) //fazer VIWER
    {

        $dados["data"] = array();

        $query = "SELECT
        data, 
        origem, 
        movimentacoes.tipo, 
        quantidade,
        movimentacoes.valor, 
        unidade,
        operacao,
        cafes_id,
        estoques.nome as estoques_nome,
        estoques.id as estoques_id
        FROM movimentacoes 
        INNER JOIN produtos ON produtos.id = movimentacoes.produtos_id
        INNER JOIN estoques ON estoques.id = movimentacoes.estoques_id
        WHERE  produtos_id LIKE " . $data . " order by movimentacoes.id ;";

        $resultado = Database::connect()->query($query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        while ($linha = $resultado->fetch_array(MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }


        return $dados;
    }















    // listarMovimentacoesPorProdutoEstoque 
    //==============================================================================================================
    //Pega o a unidade na tabela produtos e o nome do estoque na tabela estoque
    static function listarMovimentacoesPorProdutoEstoque($data)
    {

        $dados["data"] = array();

        $query = "SELECT *,
        movimentacoes.id as id,
        movimentacoes.tipo as tipo,
        estoques.nome as estoques_nome,
        usuario
        FROM movimentacoes
        INNER JOIN produtos ON produtos.id = movimentacoes.produtos_id
        INNER JOIN estoques ON estoques.id = movimentacoes.estoques_id
        INNER JOIN usuarios ON usuarios.id = movimentacoes.usuarios_id
        where produtos_id LIKE " . $data["produto"] . "
        AND movimentacoes.estoques_id LIKE  '" . $data["estoque"] . "'
        order by movimentacoes.id asc;";

        $resultado = Database::connect()->query($query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        while ($linha = $resultado->fetch_array(MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }


        return $dados;
    }














    //Inserções
    //========================================================================================================================================================
    //========================================================================================================================================================




    // Lanca compra, cria estoque do produto caso nao exista ainda, ou atualiza
    //==============================================================================================================
    static function  movimentarEstoque($body)
    {


        //Converte Objeto em Array
        $data = (array)$body->data;

        //Passa a id do usuario logado atualmente na sessao
        session_start();
        $data["usuarios_id"] = $_SESSION["id"];

        //Dados que vão retornar para ser inserido na tabela
        $dataResponse = array();




        //Pega as ids dos estoques
        $estoqueDestino = $data["destino"];
        $estoqueOrigem = $data["origem"];

        //Evitar erro no implode-----
        unset($data["origem"]); //Remove
        unset($data["destino"]); //Remove





        //função ultilizada abaixo-------------------------
        function movimentar($data, $connection)
        {

            //Verifica se o estoque do produto ja existe para criar um caso não exista e em seguida atualizar 
            //PASSAR ISSO PRA PROCEDURE NO BANCO DE DADOS
            //======================================================================================
            $query  = "SELECT * FROM estoques_has_produtos 
        WHERE estoques_id = " . $data["estoques_id"] . "
        AND produtos_id = " . $data["produtos_id"] . ";";

            //Busca um estoque de um produto espesifico no banco
            $resultado = mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query1: " . $query);


            //Verifica o numero de linhas da que a query Select retornou
            // ----------------------------------------------------------------------------
            if (mysqli_num_rows($resultado) < 1) {
                $query = "INSERT INTO estoques_has_produtos (estoques_id, produtos_id, quantidade) 
            VALUES (" . $data["estoques_id"] . ", " . $data["produtos_id"] . ", 0)";
                mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query2: " . $query);
            }



            //Salvar registro na tabela de movimentação 
            //=======================================================================================

            //Remove a propriedade id para nao ser usado na rotina abaixo
            unset($data["id"]);

            $query  = "INSERT INTO movimentacoes";
            // implode keys do $array...
            $query .= " (`" . implode("`, `", array_keys($data)) . "`)";
            // implode values do $array...
            $query .= " VALUES ('" . implode("', '", $data) . "') ";


            mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query3: " . $query);

            //Passa a id do registro criado
            $data["id"] = mysqli_insert_id(Database::connect());
        }




        //initi=============================================================
        $connection = Database::connect();
        //inicia um ponto que a partir daqui se algo der errado em algum ponto no sql  retorna todas as ações.
        mysqli_begin_transaction($connection);

        //Se for uma operação de movimentação do tipo transferecnia,  então armazena duas movimentações
        //uma do tipo saida no Estoque de Origem e uma do tipo Entrada no esoque de Destino 
        if ($data["operacao"] == "Transferencia") {

            $dataResponse[1] = $data;
            $dataResponse[1]["estoques_id"] = $estoqueOrigem;
            $dataResponse[1]["tipo"] = "Saida";

            //Salva a Saida-----------------------
            $data["estoques_id"] = $estoqueOrigem;
            $data["tipo"] = "Saida";

            movimentar($data, $connection);
            //-------------------------------------------------------------



            //Valores para js inserir na tabel-----------
            $dataResponse[0] = $data;
            $dataResponse[0]["estoques_id"] = $estoqueDestino;
            $dataResponse[0]["tipo"] = "Entrada";

            //Salva a Entrada --------------------
            $data["estoques_id"] = $estoqueDestino;
            $data["tipo"] = "Entrada";

            movimentar($data, $connection);
        } else {

            $dataResponse[0] = $data;
            $dataResponse[0]["estoques_id"] = $estoqueDestino;

            $data["estoques_id"] = $estoqueDestino;
            movimentar($data, $connection);
        }

        mysqli_commit($connection);




        // $data["error"] = mysqli_error($connection);


        return $dataResponse;
    }

























    // Lanca compra, cria estoque do produto caso nao exista ainda, ou atualiza

    //Realiza duas movimentações uma de entrada e outra de saida cada uma em seu respectivo estoque 
    // ==============================================================================================================
    static function  transferirMultiplos($body)
    {

        // print_r($body);
        //Converte Objeto em Array
        $data = (array)$body->data;


        //Converte o objeto em array
        // $item = (array)$data["item"]; //itens
        $itensRelacionais = $data["itensRelacionais"];




        //Cria e formata um array com todas as movimentações
        //=======================================================================================
        session_start();

        $cont = 0;
        $movimentacaoes = array();
        foreach ($itensRelacionais as $key => $itensRelacional) {

            // Origem
            //------------------------------------------------------------------
            $movimentacaoes[$cont] = (array)$itensRelacional;

            $movimentacaoes[$cont]["estoques_id"] = $data["origem"];
            $movimentacaoes[$cont]["tipo"] = "Saida";
            $movimentacaoes[$cont]["usuarios_id"] =  $_SESSION["id"];
            $movimentacaoes[$cont]["operacao"] =  "Transferencia";
            $movimentacaoes[$cont]["data"] =  date("Y-m-d");


            $cont++;


            //Destino
            //=----------------------------------------------------------------
            $movimentacaoes[$cont] = (array)$itensRelacional;

            $movimentacaoes[$cont]["estoques_id"] = $data["destino"];
            $movimentacaoes[$cont]["tipo"] = "Entrada";
            $movimentacaoes[$cont]["usuarios_id"] =  $_SESSION["id"];
            $movimentacaoes[$cont]["operacao"] =  "Transferencia";
            $movimentacaoes[$cont]["data"] =  date("Y-m-d");
            // $movimentacaoes[$cont]["data"] =  date("Y-m-d G:i:s");

            $cont++;
        }





        // ============================================================================================
        $connection = Database::connect();
        //inicia um ponto que a partir daqui se algo der errado em algum ponto no sql  retorna todas as ações.
        mysqli_begin_transaction($connection);



        //Salva cada movimentação
        // ============================================================================================
        foreach ($movimentacaoes as $key => $movimentacao) {


            //Verifica se o estoque do produto ja existe para criar um caso não exista e em seguida atualizar 
            //PASAR ISSO PRA PROCEDURE NO BANCO DE DADOS
            //======================================================================================
            $query  = "SELECT * FROM estoques_has_produtos 
        WHERE estoques_id = " . $movimentacao["estoques_id"] . "
        AND produtos_id = " . $movimentacao["produtos_id"] . ";";

            //Busca um estoque de um produto espesifico no banco
            $resultado = mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query1: " . $query);


            //Verifica o numero de linhas da que a query Select retornou
            // ----------------------------------------------------------------------------
            if (mysqli_num_rows($resultado) < 1) {
                $query = "INSERT INTO estoques_has_produtos (estoques_id, produtos_id, quantidade) 
            VALUES (" . $movimentacao["estoques_id"] . ", " . $movimentacao["produtos_id"] . ", 0)";
                mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query2: " . $query);
            }



            //Salvar registro na tabela de movimentação 
            //=======================================================================================

            //Remove a propriedade id para nao ser usado na rotina abaixo
            unset($movimentacao["id"]);

            $query  = "INSERT INTO movimentacoes";
            // implode keys do $array...
            $query .= " (`" . implode("`, `", array_keys($movimentacao)) . "`)";
            // implode values do $array...
            $query .= " VALUES ('" . implode("', '", $movimentacao) . "') ";


            mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query3: " . $query);

            //Passa a id do registro criado
            $movimentacaoes[$key]["id"] = mysqli_insert_id(Database::connect());
        }



        mysqli_commit($connection);


        //===========================================================
        $response = [];
        $response["erro"] = "";
        $response["data"] = $movimentacaoes;


        return $response;
    }































    //Realiza duas movimentações uma de entrada e outra de saida cada uma em seu respectivo estoque 
    // ==============================================================================================================
    static function  inserirMovimentacao($body)
    {

        // print_r($body);
        //Converte Objeto em Array
        $data = (array)$body->data;


        //Converte o objeto em array
        // $item = (array)$data["item"]; //itens
        $itensRelacionais = $data["itensRelacionais"];




        //Cria e formata um array com todas as movimentações
        //=======================================================================================
        session_start();

        $cont = 0;
        $movimentacaoes = array();
        foreach ($itensRelacionais as $key => $itensRelacional) {

            // Origem
            //------------------------------------------------------------------
            $movimentacaoes[$cont] = (array)$itensRelacional;

            $movimentacaoes[$cont]["estoques_id"] = $data["origem"];
            $movimentacaoes[$cont]["tipo"] = "Saida";
            $movimentacaoes[$cont]["usuarios_id"] =  $_SESSION["id"];
            $movimentacaoes[$cont]["operacao"] =  "Transferencia";
            $movimentacaoes[$cont]["data"] =  date("Y-m-d");


            $cont++;


            //Destino
            //=----------------------------------------------------------------
            $movimentacaoes[$cont] = (array)$itensRelacional;

            $movimentacaoes[$cont]["estoques_id"] = $data["destino"];
            $movimentacaoes[$cont]["tipo"] = "Entrada";
            $movimentacaoes[$cont]["usuarios_id"] =  $_SESSION["id"];
            $movimentacaoes[$cont]["operacao"] =  "Transferencia";
            $movimentacaoes[$cont]["data"] =  date("Y-m-d");
            // $movimentacaoes[$cont]["data"] =  date("Y-m-d G:i:s");

            $cont++;
        }





        // ============================================================================================
        $connection = Database::connect();
        //inicia um ponto que a partir daqui se algo der errado em algum ponto no sql  retorna todas as ações.
        mysqli_begin_transaction($connection);



        //Salva cada movimentação
        // ============================================================================================
        foreach ($movimentacaoes as $key => $movimentacao) {


            //Verifica se o estoque do produto ja existe para criar um caso não exista e em seguida atualizar 
            //PASAR ISSO PRA PROCEDURE NO BANCO DE DADOS
            //======================================================================================
            $query  = "SELECT * FROM estoques_has_produtos 
        WHERE estoques_id = " . $movimentacao["estoques_id"] . "
        AND produtos_id = " . $movimentacao["produtos_id"] . ";";

            //Busca um estoque de um produto espesifico no banco
            $resultado = mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query1: " . $query);


            //Verifica o numero de linhas da que a query Select retornou
            // ----------------------------------------------------------------------------
            if (mysqli_num_rows($resultado) < 1) {
                $query = "INSERT INTO estoques_has_produtos (estoques_id, produtos_id, quantidade) 
            VALUES (" . $movimentacao["estoques_id"] . ", " . $movimentacao["produtos_id"] . ", 0)";
                mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query2: " . $query);
            }



            //Salvar registro na tabela de movimentação 
            //=======================================================================================

            //Remove a propriedade id para nao ser usado na rotina abaixo
            unset($movimentacao["id"]);

            $query  = "INSERT INTO movimentacoes";
            // implode keys do $array...
            $query .= " (`" . implode("`, `", array_keys($movimentacao)) . "`)";
            // implode values do $array...
            $query .= " VALUES ('" . implode("', '", $movimentacao) . "') ";


            mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query3: " . $query);

            //Passa a id do registro criado
            $movimentacaoes[$key]["id"] = mysqli_insert_id(Database::connect());
        }



        mysqli_commit($connection);


        //===========================================================
        $response = [];
        $response["erro"] = "";
        $response["data"] = $movimentacaoes;


        return $response;
    }
}


?>