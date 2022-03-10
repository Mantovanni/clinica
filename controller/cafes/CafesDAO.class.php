
<?php

/**
 * Description of DAO
 * 
 * @author Ewerson Mantovani <ewerson.mantovani@gmail.com>
 * 
 */


require_once(realpath(dirname(__FILE__)) . "/../../config/Database.class.php");

class CafesDAO
{







    //Lista de todos os cafes
    //==============================================================================================================
    static function listarAllCafeItens()
    {

        //Uso um inner join para saber quantos itens tem no cafe, olhando o tamnho de array com ids repetidas do cafe
        $dados["data"] = array();
        $query =
            "SELECT cafes.*,
			cafes.id,
            cafes.data,
            cafes.hospedes,            
            count(cafes.id) as quantidade_itens,
            sum(cafes_has_itens.custo * cafes_has_itens.quantidade) as custo
            FROM cafes 
            INNER JOIN cafes_has_itens ON cafes.id = cafes_has_itens.cafes_id           
            group by cafes.id 
            order by cafes.id 
            ";
            
             // DESC";


        $resultado = mysqli_query(Database::connect(), $query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);


        while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }


        return $dados;
    }





    //Lista detalhes de um cafe especifico
    //==============================================================================================================
    static function listarCafeItensById($body)
    {
        //Converte para array
        $data = (array)$body->data;


        //Dados que vão retornar para o sistema
        $dados["data"] = array();

        $query =
            "SELECT 
            cafes.id as cafe_id,
            cafes.data,
            cafes.hospedes,
            cafes_has_itens.quantidade,
            cafes_has_itens.custo,            
            itens.id,
            itens.nome,           
            itens.unidade
            FROM cafes 
            INNER JOIN cafes_has_itens ON cafes.id = cafes_has_itens.cafes_id           
            INNER JOIN itens ON itens.id = cafes_has_itens.itens_id
            WHERE cafes.id = " . $data["id"] . "
            order by cafes.id";


        $resultado = mysqli_query(Database::connect(), $query) or
            die(mysqli_error(Database::connect()) . "\n || Query: " . $query);


        while ($linha = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {

            $dados["data"][] = $linha;
        }


        return $dados;
    }





























    // SALVAR CAfe, Atualizar estoque de cada item, e salvar movimentações de cada item
    //===========================================================================================================
    // Salva um item no banco e em sequencia itens em outra tabela relacionada 
    static function  salvarCafe($body)
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
        //Passa a id do usuario logado na sessao atual
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




        //MOVIMENTAÇÔES
        // 1 AS estoques_id, / Producao       
        // 2 AS estoques_id, / Almoxerifado       
        //=============================================================================================
        //Busca no padrao da tabela movimentações para inserir
        //Busca todas as quantidades de todos os produtos ultilizados no cafe e lança 
        //suas respectivas movimentações
        $query = "INSERT INTO movimentacoes (produtos_id, cafes_id, estoques_id, usuarios_id, data, operacao, origem, tipo, quantidade, valor)
            SELECT 			
                produtos.id AS produtos_id,
                cafesCusto_view.id AS cafes_id,
                1 AS estoques_id,
                 " . $_SESSION["id"] . " AS usuarios_id,
                CURDATE() AS data,
                'Café' AS operacao,
                '' AS origem,
                'Saida' AS tipo,
                SUM(`itens_has_produtos`.`quantidade` * `cafes_has_itens`.`quantidade`) AS quantidade,
                0 AS valor		        
            FROM
                `cafesCusto_view`
                JOIN `cafes_has_itens` ON `cafesCusto_view`.`id` = `cafes_has_itens`.`cafes_id`
                JOIN `itens` ON `itens`.`id` = `cafes_has_itens`.`itens_id`
                JOIN `itens_has_produtos` ON `itens`.`id` = `itens_has_produtos`.`itens_id`
                JOIN `produtos` ON `produtos`.`id` = `itens_has_produtos`.`produtos_id`
            WHERE
                (`cafesCusto_view`.`id` = " . $data["item"]->id . ")
            GROUP BY `produtos`.`id`";


        mysqli_query($connection, $query) or die(mysqli_error($connection) . "\n || Query4: " . $query);






        mysqli_commit($connection);

        return $data;
    }
}


?>