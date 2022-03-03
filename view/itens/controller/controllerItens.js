import b from '../../../biblioteca/js/biblioteca.js';



let contador = 0;
const dataFormValues = [];
//Lista usado para o autocomplete
let listaProdutosAsync = [];

//Elements DOM
//----------------------------------------------------------



const formAdicionar = document.querySelector('#form-modal');//Formulario Adicionar
const inpCusto = formAdicionar.querySelector(`#custo`)











////===================================================================================================================================
export function listarItensProdutos(functionResponse) { //mudar para arquivo controllerItens.js

    b.fetchPost("../controller/itens/ControllerItens.class.php", { metodo: "listarItensProdutos" }, response => {

        functionResponse(response);
    });

}











//=======================================================================================================
//Busca lista de prosutos no banco para o auto complete
// export function buscarListaDeProdutos() {
//     b.crud.listar("produtos", response => { //async

//         listaProdutosAsync = response["data"];

//         preencherRelacional();
//     })
// }




////===================================================================================================================================
export function adicionarProduto(listaProdutosAsync) {


    console.log(contador);
    const elTbodyItensProduto = document.querySelector('#itens-produtos_tbody');


    //Criar  linha produto
    // ------------------------------------------------------------------------
    elTbodyItensProduto.insertAdjacentHTML("beforeend",
        `
<tr id="linha-produto-${contador}">
    <td class="esconder">
         <input class="input-default" type="text" name="produto-id"
         autocomplete="off" id="produto-id-${contador}" data-type="ignore">
    </td>
    <td class="produto-nome" >
            <div class="autoComplete_wrapper">
                <input class="input-default" type="text" name="produto-nome"
                autocomplete="off" id="produto-nome-${contador}" list="produto-lista" data-type="ignore" required >
            </td>
    </td>
    <td class="produto-quantidade">
        <input class="input-default"  id="produto-quantidade-${contador}"  name="produto-quantidade"
         placeHolder="0"  inputmode="numeric"  autocomplete="off"  data-type="ignore" required>
    </td>
    <td class="produto-valor">
        <input class="input-default" id="produto-valor-${contador}" name="produto-valor" 
        data-type="ignore" placeHolder="R$ 0,00" disabled>
    </td>
    <td class="produto-total">
        <input class="input-default" name="produto-total"
         disabled id="produto-total-${contador}" data-group="produto-total-input" data-type="ignore" placeHolder="R$ 0,00">
    </td>
    <td class="produto-acoes">
      <button id="produto-excluir-${contador}" type="button">X</button>
    </td>
</tr>
`);






    //Adiciona autoComplete no campo nome do produto criado
    // ----------------------------------------------------------------------------------------
    const linhaCriada = document.querySelector(`#linha-produto-${contador}`);

    const inpProdutoId = linhaCriada.querySelector(`#produto-id-${contador}`)
    const inpProdutoNome = linhaCriada.querySelector(`#produto-nome-${contador}`)
    const inpProdutoValor = linhaCriada.querySelector(`#produto-valor-${contador}`)
    const inpProdutoQuantidade = linhaCriada.querySelector(`#produto-quantidade-${contador}`)
    const inpProdutoTotal = linhaCriada.querySelector(`#produto-total-${contador}`)

    const btnExcluirLinha = linhaCriada.querySelector(`#produto-excluir-${contador}`)





    //Mascara
    //-----------------------------------------
    b.maskMoeda(inpProdutoQuantidade);





    // let valorEncontrado = false;

    //Se nao encontrar nenhum valor e sair do campo , limpa ele
    //------------------------------------------------------------------------------------------
    inpProdutoNome.addEventListener('focusout', resetarInvalido);
    inpProdutoNome.addEventListener('focus', resetarInvalido);
    function resetarInvalido(e) {
        inpProdutoNome.value = "";
    }





    //Passa a id do input, o array de dados e uma callbackFunction
    //para interagir com o os dados item selecionado
    //Ações realizadas apos selecinar um item da lista
    b.autoComplete.ativar(`#produto-nome-${contador}`, listaProdutosAsync, dataSelecionado => {
        // valorEncontrado =true;
        // console.log(listaProdutosAsync);
        const itemSelecionado = dataSelecionado.selection.value;

        //Auto Preenche os campos quando seleciona um item na lista
        inpProdutoId.value = itemSelecionado.id;
        inpProdutoValor.value = b.paraMoedaReal(itemSelecionado.valor);
        inpProdutoQuantidade.value = "1,00";

        //Apos auto preencher, calcula os totais 
        calcularTotais();

    });

    // Evento Calcula valor total de um produto da linha 
    //-------------------------------//----------------------------------------------------------
    inpProdutoQuantidade.addEventListener('keyup', calcularTotais);



    //------------------------------------------------------------------------------------------
    function calcularTotais() {

        //Pega todos os campos total do produto
        const inpTotalProdutoAll = document.querySelectorAll('[data-group="produto-total-input"]');


        //Soma o valor total do produto na linha
        inpProdutoTotal.value = b.paraMoedaReal(b.paraFloat(inpProdutoQuantidade.value) * b.paraFloat(inpProdutoValor.value));

        // Soma todos os valores totais dos produtos para informar o custo do item
        inpCusto.value = Array.from(inpTotalProdutoAll).reduce((total, element) => {
            return b.paraMoedaReal(b.paraFloat(total) + b.paraFloat(element.value));
        }, 0);
    }




    //BOTAO EXCLUIR
    //------------------------------------------------------------------------------------------
    btnExcluirLinha.addEventListener('click', function (e) {
        const linha = e.target.parentNode.parentNode

        //Impede de remover a ultima linha
        if (elTbodyItensProduto.rows.length > 1) {
            elTbodyItensProduto.deleteRow(linha.rowIndex - 1);
        }

    });




    //Linhas de produtos
    contador++
}




//valor que vai para o controller e volta para o preencher quando é uma linha editada
//-------------------------------------------------------------------------------------------
//Extrai os valores das linhas de produtos e insere no array global  
export function extractValuesRelacional(formValues) {//tabela Has
    //form é um objeto 
    const elTbodyItensProduto = document.querySelector('#itens-produtos_tbody');

    //Receber a primeira parte do formulario, com os dados dos comapos item
    const formValuesAll = {};

    formValuesAll.item = formValues;

    formValuesAll.item.itemRelacional = [];
    //Varre a tabela de linha de inputs com os dados do produto e adiciona os valores
    //no array global data.itemRelacional
    Array.from(elTbodyItensProduto.children).forEach(element => {


        formValuesAll.item.itemRelacional.push({
            //Campo produto_id invisivel 
            produtos_id: element.childNodes[1].childNodes[1].value,
            //Campo quantidade produto
            quantidade: b.paraFloat(element.childNodes[5].childNodes[1].value),

        });

        dataFormValues.push({
            //Valores na global dataFormValues para passar pra funçao lineInTable
            //Campo nome produto
            nome: element.childNodes[3].childNodes[1].childNodes[1].value,
            //Campo valor produto
            valor: element.childNodes[7].childNodes[1].value
        });
    });

    return formValuesAll
}












