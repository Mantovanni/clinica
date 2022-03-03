import b from '../../../biblioteca/js/biblioteca.js';
// import autoComplete from '../../../biblioteca/js/modulo/submodulo/autocomplete/autoComplete.js';



export function init(valueInit) {
    //Variaveis
    //=====================================================================================================
    //GLOBAIS
    //----------------------------------------------------------------------------
    let contador = 0;
    const data = {};
    let listaProdutosAsync = [];


    //Elements DOM
    //----------------------------------------------------------------------------
    const tbodyItens = document.querySelector('#tbody-central');//Tabela Central
    // const elNome = document.querySelector("#produto-nome");


    //Botoes
    //--------------------------------------
    const btnAdicionarItemProduto = document.querySelector('#btn-adicionar-item-produto');//Formulario Adicionar


    //Formulario
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-adicionar');//Formulario Adicionar

    const elTbodyItensProduto = document.querySelector('#itens-produtos_tbody');

    // const elNomeProduto = document.querySelector("#nome-produto");





    //MASCARAS
    //======================================================================================================
    // Aplica mascaras no form
    b.form.mask(formAdicionar);






    //Init==================================================================================================
    buscarListaDeProdutos();
    adicionarProduto(); // Todo item tem pelo menos um produto







    //Eventos
    //======================================================================================================
    //BTN - Salvar----------------------------------------------------------------
    formAdicionar.addEventListener('submit', function (e) {
        e.preventDefault();

        //Pega o FORM que é o target do evento submit
        const itemForm = e.target;

        if (validarForm()) {

            extractValuesRelacional(b.form.extractValues(itemForm));

            //Response contem o elemento salvo junto de sua ID criada no banco
            b.crud.salvarRelacional(data, "itens", "itens_has_produtos", responseItemSalvo => {//async

                b.modal.fechar();

                responseItemSalvo.item.total = responseItemSalvo.item.custo * responseItemSalvo.item.quantidade;
                //informa a TBody, 
                b.render.lineInTable(tbodyItens, responseItemSalvo.item, "itens");
            });
        }
    });




    //---------------------------------------------------
    // elNome.addEventListener('keyup', function (e) {
    //   console.log("a");

    // });


    //BTN - btnAdicionarItemProduto---------------------------------------------------
    btnAdicionarItemProduto.addEventListener('click', function (e) {
        e.preventDefault();

        adicionarProduto();
    });











    //Funções
    //======================================================================================================
    function validarForm(form) {
        let validate = true;

        //    Codigos aqui

        return validate;
    }



    //------------------------------------------------------------------------------------
    function buscarListaDeProdutos() {
        b.crud.listar("produtos", response => { //async

            listaProdutosAsync = response["data"];

        })
    }


    //-------------------------------------------------------------------------------------------
    function adicionarProduto() {

        const inpCusto = formAdicionar.querySelector(`#custo`)


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
             placeHolder="0"  data-type="ignore" required>
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
        // ---------------------------------------------------------------------------
        const linhaCriada = document.querySelector(`#linha-produto-${contador}`);

        const inpProdutoId = linhaCriada.querySelector(`#produto-id-${contador}`)
        const inpProdutoNome = linhaCriada.querySelector(`#produto-nome-${contador}`)
        const inpProdutoValor = linhaCriada.querySelector(`#produto-valor-${contador}`)
        const inpProdutoQuantidade = linhaCriada.querySelector(`#produto-quantidade-${contador}`)
        const inpProdutoTotal = linhaCriada.querySelector(`#produto-total-${contador}`)



        

        // let valorEncontrado = false;

        //Se nao encontrar nenhum valor e sair do campo , limpa ele
        inpProdutoNome.addEventListener('focusout', resetarInvalido);
        inpProdutoNome.addEventListener('focus', resetarInvalido);
        function resetarInvalido(e) {
            inpProdutoNome.value = "";
        }

     



        //Passa a id do input, o array de dados e uma callbackFunction
        //para interagir com o os dados item selecionado
        b.autoComplete.ativar(`#produto-nome-${contador}`, listaProdutosAsync, dataSelecionado => {
            // valorEncontrado =true;

            const itemSelecionado = dataSelecionado.selection.value;

            //Auto Preenche os campos quando seleciona um item na lista
            inpProdutoId.value = itemSelecionado.id;
            inpProdutoValor.value = b.paraMoeda(itemSelecionado.custo);
            inpProdutoQuantidade.value = 1;

            //Apos auto preencher, calcula os totais 
            calcularTotais();

        });

        // Evento Calcula valor total de um produto da linha ---------------------
        inpProdutoQuantidade.addEventListener('keyup', calcularTotais);


        function calcularTotais() {

            //Pega todos os campos total do produto
            const inpTotalProdutoAll = document.querySelectorAll('[data-group="produto-total-input"]');

            //Soma o valor total do produto na linha
            inpProdutoTotal.value = b.paraMoeda(inpProdutoQuantidade.value * b.paraFloat(inpProdutoValor.value));

            // Soma todos os valores totais dos produtos para informar o custo do item
            inpCusto.value = Array.from(inpTotalProdutoAll).reduce((total, element) => {
                return b.paraMoeda(b.paraFloat(total) + b.paraFloat(element.value));
            }, 0);
        }


        //Linhas de produtos
        contador++
    }



    //----------------------------------------------------------------------------------
    //Extrai os valores das linhas de produtos e insere no array global  
    function extractValuesRelacional(formValues) {
        //form é um objeto 
        // console.log(formValues);

        data.itemRelacional = [];

        data.item = formValues;
        Array.from(elTbodyItensProduto.children).forEach(element => {

            // console.log(element.getElementsByTagName("td"));

            data.itemRelacional.push({
                //Campo id produto invisivel 
                produtos_id: element.childNodes[1].childNodes[1].value,
                //Campo quantidade produto
                quantidade: element.childNodes[5].childNodes[1].value
            });
        });

        // console.log(data);
    }





    // src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"]








}


