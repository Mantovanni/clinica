<?php


$item = [
    'nome'  =>  "queijo",
    'custo'     =>  20.55,
    'quantidade'   =>  55,
    'categoria' =>  "Doce",
    'subcategoria'  =>  "Bolo",
    'descricao'  =>  "asdsadasdadsasd"
];




// $aa = "UPDATE itens SET `nome` = 'piesq', `custo` = '95.57', `quantidade` = '54.1' WHERE (`id` = 208)";

// $key = array_search('queijo', $item);
// if($key !== false){
   
// }

unset($item["nome"]);
foreach($item as $key => $value) {

    $itens[] = $key . "` = '" . $value;

}


 $sql  = "UPDATE itens SET";

 // implode keys of $array...
 $sql .= " `" . implode("',` ", $itens) . "'";

 // implode values of $array...
 $sql .= " WHERE (`id` = 200  ) ";



 print_r($sql . "<br>" );
//  print_r($aa);
 // execute query...
//  $result = mysql_query($sql) or die(mysql_error());


// print_r(array_keys($itens));
// print_r($itens["complementos"]);

