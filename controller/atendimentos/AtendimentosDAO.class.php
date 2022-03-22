<?php

/**
 * Description of DAO
 *
 ** @author Ewerson Mantovani - ewerson.mantovani@gmail.com
 */

require_once(realpath(dirname(__FILE__)) . "/../../config/Database.class.php");




class AtendimentosDAO
{


    // FUNÇÕES ESPECÍFICAS DA CLASSE
    //=================================================================================================================
    //=================================================================================================================





    // SALVAR
    //==============================================================================================================
    //==============================================================================================================
    static function  salvarAtendimento($body)
    {

        $data = (array)$body->data;


        //Remove o elemento do array pela KEY // para esse campo não ser usado no 'implode'
        unset($data["id"]);

        // print_r($_SESSION["id"]);


        //Passa a id do usuário logado na sessão atual
        session_start();
        $data["usuarios_id"] = $_SESSION["id"];

        $query  = "INSERT INTO atendimentos";
        // implode keys do $array...
        $query .= " (`" . implode("`, `", array_keys($data)) . "`)";
        // implode values do $array...
        $query .= " VALUES ('" . implode("', '", $data) . "') ";


        if (mysqli_query(Database::connect(), $query)) {
            //mysqli_insert_id - retorna a id criada nessa conexão junto com todos os outro valores
            $data["id"] = mysqli_insert_id(Database::connect());

            // Retorna os valores que foram recebidos e inseridos na tabela juntamente da Id criada no banco.
            return $data;
        } else {
            echo "Erro - " . mysqli_error(Database::connect()) . "\n ||  QUERY: $query";
            // return false;
        }
    }















    // SALVAR na tabela atendimentos, na tabela de relacionada com pacientes
    //===========================================================================================================
    // Salva um item no banco e em sequencia itens em outra tabela relacionada 
    static function  salvarAtendimento1($body)
    {
        // print_r($body);

        $data = (array)$body->data;

        //Converte o objeto em array
        $item = (array)$data["item"]; //itens
        $itensRelacionais = $item["itemRelacional"];

        //remove essa key do array
        unset($item["id"]);
        unset($item["itemRelacional"]);


        session_start();
        //Passa a id do usuário logado na sessão atual
        $item["usuarios_id"] = $_SESSION["id"];

        //==============================================================================================
        $query = "";
        //Query do item principal a ser salvo no banco---------------------------------
        $query  = "INSERT INTO cafes";
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

        $data["item"]->id = mysqli_insert_id(Database::connect()); //pega a id da comanda criada
        $query = "SET @lastListasId = LAST_INSERT_ID();"; //pega a id da comanda criada
        mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query2: " . $query);



        //Coloca o valor na proprieda itemRelacional novamente
        $item["itemRelacional"] =  $itensRelacionais;




        //============================================================================================
        // Salvar itens relacionais ao item principal ------------------------------------------------

        $campoForeignKey = "cafes_id";
        $itensRelacionais = (array)$item["itemRelacional"];

        //   print_r($itensRelacionais);

        foreach ($itensRelacionais as $key => $itemRelacional) {

            $query  = "INSERT INTO cafes_has_itens";
            $query .= " (`$campoForeignKey`,`" . implode("`, `", array_keys((array)$itemRelacional)) . "`)";
            $query .= " VALUES (@lastListasId,'" . implode("', '", (array)$itemRelacional) . "') ";
            mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query3: " . $query);

            //Retorna a id de cada registro criado
            $itensRelacionais[$key]->id = mysqli_insert_id($connection);
        }




        //MOVIMENTAÇÕES
        // 1 AS estoques_id, / Producao       
        // 2 AS estoques_id, / Almoxerifado       
        //=============================================================================================
        //Busca no padrão da tabela movimentações para inserir
        //Busca todas as quantidades de todos os produtos utilizados no cafe e lança 
        //suas respectivas movimentações
        // $query = "INSERT INTO movimentacoes (produtos_id, cafes_id, estoques_id, usuarios_id, data, operacao, origem, tipo, quantidade, valor)
        //     SELECT 			
        //         produtos.id AS produtos_id,
        //         cafesCusto_view.id AS cafes_id,
        //         1 AS estoques_id,
        //          " . $_SESSION["id"] . " AS usuarios_id,
        //         CURDATE() AS data,
        //         'Café' AS operacao,
        //         '' AS origem,
        //         'Saida' AS tipo,
        //         SUM(`itens_has_produtos`.`quantidade` * `cafes_has_itens`.`quantidade`) AS quantidade,
        //         0 AS valor		        
        //     FROM
        //         `cafesCusto_view`
        //         JOIN `cafes_has_itens` ON `cafesCusto_view`.`id` = `cafes_has_itens`.`cafes_id`
        //         JOIN `itens` ON `itens`.`id` = `cafes_has_itens`.`itens_id`
        //         JOIN `itens_has_produtos` ON `itens`.`id` = `itens_has_produtos`.`itens_id`
        //         JOIN `produtos` ON `produtos`.`id` = `itens_has_produtos`.`produtos_id`
        //     WHERE
        //         (`cafesCusto_view`.`id` = " . $data["item"]->id . ")
        //     GROUP BY `produtos`.`id`";


        // mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query4: " . $query);






        mysqli_commit($connection);

        return $data;
    }






    // Busca no banco todos os dados daquele atendimentos nas tabelas relacionadas
    //===========================================================================================================
    static function carregarDadosCompletosAtendimentoById($body)
    {

        $data = (array)$body->data;

        $dataToSend["data"] = array();//Nao esta sendo usado, quando uma consulta nao retorna nada pra nao dar erro

        $query =
            "SELECT 
                atendimentos.*,
                pacientes.nome,
                pacientes.data_nascimento,
                pacientes.sexo
            FROM 
                atendimentos
            INNER JOIN 
                pacientes
            ON atendimentos.pacientes_id = pacientes.id
            WHERE atendimentos.id = " . $data["id"] . ";                                                 
            ";


        $resultado = mysqli_query(Database::connect(), $query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);



        while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {

            $dataToSend["data"]["atendimento"] = $linha;
        }





        // lista de procedimentos
        //=================================================================================================

        //Caso não aja procedimentos, passa um vazio para evitar erro nas funções do JS
        $dataToSend["data"]["procedimentos"] = array();

        $query =
            "SELECT 
                atendimentos_has_procedimentos.*,
                procedimentos.nome
            
            FROM 
                atendimentos
            INNER JOIN atendimentos_has_procedimentos ON atendimentos.id = atendimentos_has_procedimentos.atendimentos_id
            INNER JOIN procedimentos ON procedimentos.id = atendimentos_has_procedimentos.procedimentos_id                        
            WHERE atendimentos.id = " . $data["id"] . ";                                                 
            ";


        $resultado = mysqli_query(Database::connect(), $query) or
            die(mysqli_error(Database::connect()) . "\n || Query2: " . $query);



        while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {

            $dataToSend["data"]["procedimentos"][] = $linha;
        }






        return $dataToSend;
    }






















     // Lista dados atendimentos com pacientes
    //===========================================================================================================
    static function listarAtendimentosClientes()
    {

        // $data = (array)$body->data;

        $dataToSend["data"] = array();//Nao esta sendo usado, quando uma consulta nao retorna nada pra nao dar erro

        $query =
            "SELECT 
                atendimentos.*,
                pacientes.nome,
                pacientes.data_nascimento,
                pacientes.sexo
            FROM 
                atendimentos
            INNER JOIN 
                pacientes
            ON atendimentos.pacientes_id = pacientes.id;                                                 
            ";


        $resultado = mysqli_query(Database::connect(), $query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);



        while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {

            $dataToSend["data"][] = $linha;
        }





        return $dataToSend;
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

        //Passa a id para ser utilizada no WHERE e em seguida remove do array para não  ir para Query
        $id = $item["id"];
        $itensRelacionais = $item["itemRelacional"];

        //Remove o elemento pela KEY
        unset($item["id"]);
        unset($item["itemRelacional"]);


        //Formata o array nesse modelo (nome` = 'Joao) e depois da um implode
        foreach ($item as $key => $value) {
            $arrayFormatado[] = $key . "` = '" . $value;
        }

        $query  = "UPDATE $tabela SET";

        // implode keys of $array...
        $query .= " `" . implode("',`", $arrayFormatado) . "'";

        // implode values of $array...
        $query .= " WHERE (`id` = " . $id  . "  ); ";


        //Coloca o valor na propriedade id novamente, para retornar na função
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
