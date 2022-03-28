
<?php

/**
 * Description of DAO
 * 
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */


require_once(realpath(dirname(__FILE__)) . "/../../config/Database.class.php");

class GeralDAO
{

    // SALVAR
    //==============================================================================================================
    static function  salvar($data, $tabela)
    {

        unset($data["id"]);

        $query  = "INSERT INTO $tabela";
        // implode keys do $array...
        $query .= " (`" . implode("`, `", array_keys($data)) . "`)";
        // implode values do $array...
        $query .= " VALUES ('" . implode("', '", $data) . "') ";


        if (mysqli_query(Database::connect(), $query)) {
            //retorna a id criada nessa conexao junto com todos os outro valores
            $data["id"] = mysqli_insert_id(Database::connect());
            return $data;
        } else {
            echo "Erro - " . mysqli_error(Database::connect()) . "\n ||  QUERY: $query";
            // return false;
        }
    }








    //    UPDATE INTO itens (``) VALUES ('182', 'pastar', '7681', '73.3', '', '', '') WHERE (`id` = ' 182 ');

    //    UPDATE `cafe`.`itens` SET `nome` = 'piesq', `custo` = '95.57', `quantidade` = '54.1' WHERE (`id` = 208);

    // Editar
    //==============================================================================================================
    static function  editar($data, $tabela)
    {

        //Guarda o valor da id para ser utilizada no WHERE em seguida
        $id = $data["id"];
        //Remove o elemento do array pela KEY // para esse campo não ser usado no 'implode'
        unset($data["id"]);

        //Formata um array nesse modelo (nome` = 'Joao) e depois usar na função implode
        foreach ($data as $key => $value) {
            $arrayFormatado[] = $key . "` = '" . $value;
        }



        $query  = "UPDATE $tabela SET";
        // implode keys of $array...
        $query .= " `" . implode("',`", $arrayFormatado) . "'";
        // implode values of $array...
        $query .= " WHERE (`id` = " . $id . "  ) ";




        //Coloca o valor na proprieda id novamente, apra retornar na função
        $data["id"] = $id;

        if (mysqli_query(Database::connect(), $query)) {


            //Retorna os valores do item editado
            return $data;
        } else {
            echo "Erro - " . mysqli_error(Database::connect()) . "\n ||  QUERY: $query";
            // return false;
        }
    }










    //Deletar
    //==============================================================================================================
    static function  deletar($data, $tabela)
    {

        $query = "DELETE FROM $tabela 
        WHERE (
            id = '" . $data["id"] . "')";



        if (mysqli_query(Database::connect(), $query)) {
            //retorna a id criada nessa conexao junto com todos os outro valores
            // $data["id"] = mysqli_insert_id(Database::connect());
            return $data;
        } else {
            echo "Erro - " . mysqli_error(Database::connect()) . "\n ||  QUERY: $query";
            // return false;
        }
    }









    // LISTAR por ID
    //==============================================================================================================

    static function listarById($id, $tabela) //fazer VIEWER
    {

        $dados["data"] = array();

        $query = "SELECT * FROM $tabela 
        WHERE  id = $id;";

        $resultado = Database::connect()->query($query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        while ($linha = $resultado->fetch_array(MYSQLI_ASSOC)) {

            $dados["data"] = $linha;
        }


        return $dados;
    }



    // LISTAR por ID
    //==============================================================================================================

    static function listarByKey($key, $keyValor, $tabela) //fazer VIWER
    {


        $dados["data"] = array();

        $query = "SELECT * FROM $tabela 
        WHERE  $key LIKE  '" . $keyValor . "';";

        $resultado = Database::connect()->query($query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        while ($linha = $resultado->fetch_array(MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }


        return $dados;
    }







    // LISTAR Last
    //==============================================================================================================

    static function listarLast($tabela) //fazer VIWER
    {


        $dados = array();

        $query = "SELECT * FROM $tabela
        ORDER BY id DESC LIMIT 1;";

        $resultado = Database::connect()->query($query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        while ($linha = $resultado->fetch_array(MYSQLI_ASSOC)) {

            $dados = $linha;
        }


        return $dados;
    }








    // LISTAR
    //==============================================================================================================
    // Procedural = style
    //=========================================================================
    static function listar($tabela) //fazer VIWER
    {

        $dados["data"] = array();

        $query = "SELECT * FROM $tabela;";


        $resultado = mysqli_query(Database::connect(), $query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        // print_r(mysqli_fetch_all($resultado));
        // print_r(mysqli_fetch_object($resultado));
        // print_r(mysqli_fetch_field($resultado));
        // print_r(mysqli_fetch_field_direct($resultado, 3));
        // print_r(mysqli_fetch_row($resultado));
        // print_r(mysqli_fetch_fields($resultado));
        // print_r(mysqli_fetch_lengths($resultado));
        // print_r(mysqli_fetch_array($resultado));



        while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }
        return $dados;
    }

    // Orientada a Objetos - style
    //=============================================================================
    static function listar2($tabela) //fazer VIWER
    {

        $dados["data"] = array();

        $query = "SELECT * FROM $tabela;";

        $resultado = Database::connect()->query($query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);

        while ($linha = $resultado->fetch_array(MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }


        return $dados;
    }
















































    //RELACIONAL
    //==============================================================================================================
    //==============================================================================================================



    // SALVAR Relacional
    //===========================================================================================================
    // Salva um item no banco e em sequencia itens em outra tabela relacionada 
    static function  salvarRelacional($data, $tabela, $tabelaRelacional)
    {

        $query = "";

        //Converte o objeto em array
        $item = (array)$data["item"]; //itens
        $itensRelacionais = $item["itemRelacional"];

        //remove essa key do array
        unset($item["id"]);
        unset($item["itemRelacional"]);

        //Query do item principal a ser salvo no banco---------------------------------
        $query  = "INSERT INTO $tabela";
        // implode keys do $array...
        $query .= " (`" . implode("`, `", array_keys($item)) . "`)";
        // implode values do $array...
        $query .= " VALUES ('" . implode("', '", $item) . "') ";



        //Abre e Referencia a conexão
        $connection = Database::connect();
        //inicia um ponto que a partir daqui se algo der errado em algum ponto no sql  retorna todas as ações.
        mysqli_begin_transaction($connection);


        //Salva primeiro item no Banco de Dados
        mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query1: " . $query);
        // Pega a id criada(auto increment) do item salvo no banco
        // mysqli_insert_id(Database::connect());

        $data["item"]->id = mysqli_insert_id(Database::connect());
        $query = "SET @lastListasId  = LAST_INSERT_ID();"; //pega a id da comanda criada
        mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query2: " . $query);



        //Coloca o valor na proprieda itemRelacional novamente
        $item["itemRelacional"] =  $itensRelacionais;





        // Salvar itens relacionais ao item principal ------------------------------------------------

        $campoForeignKey = $tabela . "_id";
        $itensRelacionais = (array)$item["itemRelacional"];

        //   print_r($itensRelacionais);

        foreach ($itensRelacionais as $key => $itemRelacional) {

            $query  = "INSERT INTO $tabelaRelacional";
            $query .= " (`$campoForeignKey`,`" . implode("`, `", array_keys((array)$itemRelacional)) . "`)";
            $query .= " VALUES (@lastListasId,'" . implode("', '", (array)$itemRelacional) . "') ";
            mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query3: " . $query);

            //Retorna a id de cada registro criado
            $itensRelacionais[$key]->id = mysqli_insert_id($connection);
        }


        mysqli_commit($connection);


        return $data;
    }











    // EDITAR Relacional
    //==============================================================================================================
    // Salva um item no banco e em sequencia itens em outra tabela relacionada 
    static function  editarRelacional($data, $tabela, $tabelaRelacional)
    {

        //Abre e Referencia a conexão
        $connection = Database::connect();
        //inicia um ponto que a partir daqui se algo der errado em algum ponto no sql  retorna todas as ações.
        mysqli_begin_transaction($connection);





        //Atualiza a tabela principal
        //------------------------------------------------------------------------------------------------------------
        //Converte o objeto em array
        $item = (array)$data["item"]; //item é uma linha de uma tabela 

        //Passa a id para ser ultilizada no WHERE e em seguida remove do array para não  ir para Query
        $id = $item["id"];
        $itensRelacionais = $item["itemRelacional"];

        //Remove o elemento pela KEY
        unset($item["id"]);
        unset($item["itemRelacional"]);


        //Formata o array nesse modelo (nome` = 'Joao) e depois da um implde
        foreach ($item as $key => $value) {
            $arrayFormatado[] = $key . "` = '" . $value;
        }

        $query  = "UPDATE $tabela SET";

        // implode keys of $array...
        $query .= " `" . implode("',`", $arrayFormatado) . "'";

        // implode values of $array...
        $query .= " WHERE (`id` = " . $id  . "  ); ";


        //Coloca o valor na proprieda id novamente, apra retornar na função
        $item["id"] = $id;
        $item["itemRelacional"] =  $itensRelacionais;

        mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query1: " . $query);
        // -------------------------------------------------------------------------------------------------------------






        //Remove todos itens da tabela relacional que se relaciona como item
        // -------------------------------------------------------------------------------------------------------------
        $query = "DELETE FROM $tabelaRelacional 
        WHERE (" . $tabela . "_id = '" . $id . "');";
        mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query2: " . $query);
        // -------------------------------------------------------------------------------------------------------------



        // Recria os itens relacionais 
        // -------------------------------------------------------------------------------------------------------------

        // Unknown column '' in 'field list' || Query3: INSERT INTO atendimentos_has_procedimentos (`atendimentos_id`,``) VALUES (60,'');



        //o campo foreign Key que faz relação com a tabela principal não e passado , deve ser criado agora
        $campoTabelaForeignKey = $tabela . "_id";

        $itensRelacionais = (array)$item["itemRelacional"];


        // $idItensRelacionais =  $itensRelacionais["id"];
        // unset($itensRelacionais["id"]);



        //   print_r($itensRelacionais);

        foreach ($itensRelacionais as $key => $itemRelacional) {

            $query = "INSERT INTO $tabelaRelacional";
            $query .= " (`$campoTabelaForeignKey`,`" . implode("`, `", array_keys((array)$itemRelacional)) . "`)";
            $query .= " VALUES ($id,'" . implode("', '", (array)$itemRelacional) . "');";

            //Retorna a id de cada registro criado
            // $data["item"]->itemRelacional[$key]->id = mysqli_insert_id($connection);
            // $data["item"]->itemRelacional[$key]->id = $itensRelacionais["id"];
            mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query3: " . $query);
        }
        // -------------------------------------------------------------------------------------------------------------



        mysqli_commit($connection);
        // mysqli_multi_query($connection, $query) or die($connection . "\n || Multi Querys: " . $query);



        $data["body"]["query"] = $query;
        $data["body"]["error"] = $connection;
        return $data;
    }







}

?>