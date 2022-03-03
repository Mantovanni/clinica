import b from '../../../../biblioteca/js/biblioteca.js';
// import * as controller from '../controller/controllerCafe.js';





export function init(dataProdutoInit) {
    //Variaveis
    //=====================================================================================================
    //=====================================================================================================
    //GLOBAIS
    //----------------------------------------------------------
    let listaItensAsync = [];
    // const dataFormValues = [];
    let contador = 0;
    let quantidadeItens = 0;


    //Elements DOM
    //----------------------------------------------------------
    const btnAdicionarCafeItem = document.querySelector('#btn-adicionar-cafe-item');//
    const elTbodyCafeItens = document.querySelector('#cafe-itens_tbody');//Tbodym

    const elDataCafe = document.querySelector('#data-cafe');//H!
    const inpHospedes = document.querySelector('#hospedes');//H!



    //Cards-------------------------------------------------------
    const cardCustoTotal = document.querySelector('#cards-custo_total-valor')
    const cardsVariedadeItens = document.querySelector('#cards-quantidade-valor')
    const cardsHospedes = document.querySelector('#cards-hospedes-valor')
    const cardsCleintesCusto = document.querySelector('#cards-hospedes_custo-valor')





    //Formulario
    //--------------------------------------
    const formCafe = document.querySelector('#form-cafe');//

    //MASCARAS
    //=================================================================================================














    //Init
    //======================================================================================================
    //======================================================================================================
    buscarListaDeItens();
    inserirDataCafe();












    //Eventos
    //======================================================================================================
    //======================================================================================================

    //BTN - btnAdicionarCafeItem---------------------------------------------------
    //Adicina mais umalinha de Item no Café da manhã
    btnAdicionarCafeItem.addEventListener('click', function (e) {
        e.preventDefault();

        adicionarItem();
    });


    //BTN - Salvar----------------------------------------------------------------
    formCafe.addEventListener('submit', function (e) {
        e.preventDefault();

        //Pega o FORM que é o target do evento submit
        const form = e.target;
        // adicionarCafe(e.target);



        if (validarForm(form)) {


            const formValuesAll = extractValuesRelacional(b.form.extractValues(form));


            formValuesAll.item.data = b.formatDataUserforISO(elDataCafe.textContent);

            console.log(formValuesAll);
            // formValuesAll.item.usuario_id =  XX;


            //Response contem o elemento salvo junto de sua ID criada no banco
            b.crud.custom("salvarCafe", "cafes", formValuesAll, responseItemSalvo => {//async

                //Redireciona para tela de café
                b.inserirHash("cafe/cafes");

            }, true);
        }
    });

    //Input Hospedes---------------------------------------------------------------
    inpHospedes.addEventListener('input', function (e) {
        e.preventDefault();

        cardsHospedes.textContent = inpHospedes.value.toString().padStart(2, '0');
        calcularCustoPorCliente();
    });



























    //Funções
    //======================================================================================================
    //======================================================================================================
    function validarForm(form) {
        let validate = true;

        //    Codigos aqui

        return validate;
    }


    //+==========================================================================================
    function calcularCustoPorCliente() {
        // let  hospedesValor = b.paraFloat(inpHospedes.value)

        //Se o campo de hospedes estiver vazio, calcula como 0
        if (inpHospedes.value == "") {

            cardsCleintesCusto.textContent = "R$ 0,00";
        } else {

            cardsCleintesCusto.textContent = b.paraMoedaReal(b.paraFloat(cardCustoTotal.textContent) / b.paraFloat(inpHospedes.value));
        }


        //
    }





    //+==========================================================================================
    //Para o AutoComplete
    function buscarListaDeItens() {
        b.crud.listar("itensCusto_view", response => { //async

            listaItensAsync = response["data"];

            // Adiciona o primeiro campo de item todo cafe tem pelo menos um item
            adicionarItem();

        })
    }


    //+==========================================================================================
    function adicionarItem() {



        const inpCusto = formCafe.querySelector(`#custo`)


        //Criar  linha produto
        // -------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------
        elTbodyCafeItens.insertAdjacentHTML("beforeend",
            `
    <tr id="linha-item-${contador}">
        <td class="esconder">
             <input  type="text" name="item-id"
             autocomplete="off" id="item-id-${contador}" data-type="ignore">
        </td>
        <td class="item-nome w-50" >
                <div class="autoComplete_wrapper">
                    <input  type="text" name="item-nome"
                    autocomplete="off" id="item-nome-${contador}" list="item-lista" data-type="ignore" required >
                </td>
        </td>
        <td class="item-quantidade w-10">
            <input   id="item-quantidade-${contador}"  name="item-quantidade"
             placeHolder="0"   data-type="ignore" inputmode="numeric" required>
        </td>
        <td class="item-custo w-15">
            <input  id="item-custo-${contador}" name="item-custo" 
            data-type="ignore" placeHolder="R$ 0,00" disabled>
        </td>
        <td class="item-total w-15">
            <input  name="item-total"
             disabled id="item-total-${contador}" data-group="item-total-input" data-type="ignore" placeHolder="R$ 0,00">
        </td>
        <td class="item-acoes">
          <button class="btn-excluir-linha" id="item-excluir-${contador}" type="button">${b.ico.lixeira}</button>
        </td>
    </tr>
    `);






        //Busca os elementos na linha criada
        // ----------------------------------------------------------------------------------------
        const linhaCriada = document.querySelector(`#linha-item-${contador}`);

        const inpItemId = linhaCriada.querySelector(`#item-id-${contador}`)
        const inpItemNome = linhaCriada.querySelector(`#item-nome-${contador}`)
        const inpItemCusto = linhaCriada.querySelector(`#item-custo-${contador}`)
        const inpItemQuantidade = linhaCriada.querySelector(`#item-quantidade-${contador}`)
        const inpItemTotal = linhaCriada.querySelector(`#item-total-${contador}`)

        const btnExcluirLinha = linhaCriada.querySelector(`#item-excluir-${contador}`)



        //Mascara
        //-----------------------------------------
        b.maskMoeda(inpItemQuantidade);







        //Auto Complete
        //-------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------
        // let CustoEncontrado = false;

        //Se nao encontrar nenhum Custo e sair do campo , limpa ele
        //------------------------------------------------------------------------
        inpItemNome.addEventListener('focusout', resetarInvalido);
        inpItemNome.addEventListener('focus', resetarInvalido);
        function resetarInvalido(e) {
            inpItemNome.value = "";
        }


        //Passa a id do input, o array de dados e uma callbackFunction
        //para interagir com o os dados item selecionado
        //Ações realizadas apos selecinar um item da lista
        b.autoComplete.ativar(`#item-nome-${contador}`, listaItensAsync, dataSelecionado => {

            //Pega os dados no array do objeto selecionado
            const itemSelecionado = dataSelecionado.selection.value;

            //Auto Preenche os campos quando seleciona um item na lista
            inpItemId.value = itemSelecionado.id;
            inpItemCusto.value = b.paraMoedaReal(itemSelecionado.custo);
            inpItemQuantidade.value = "1,00";

            //Apos auto preencher, calcula os totais 
            calcularTotais();


            // Seleciona o proximo input automaticamante apos escolher um item
            dataSelecionado.event.path[3].nextElementSibling.firstElementChild.select();

        });



        // Evento Calcula Custo total de um Item da linha 
        //-------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------
        inpItemQuantidade.addEventListener('keyup', calcularTotais);


        //---------------------------------------------------------------
        function calcularTotais() {

            //Pega todos os campos total do Item
            const inpTotalItemAll = document.querySelectorAll('[data-group="item-total-input"]');


            //Soma o Custo total do Item na linha
            inpItemTotal.value = b.paraMoedaReal(b.paraFloat(inpItemQuantidade.value) * b.paraFloat(inpItemCusto.value));

            // Soma todos os Custoes totais dos Items para informar o custo do item
            cardCustoTotal.textContent = Array.from(inpTotalItemAll).reduce((total, element) => {
                return b.paraMoedaReal(b.paraFloat(total) + b.paraFloat(element.value));
            }, 0);

            calcularCustoPorCliente();
        }




        //BOTAO EXCLUIR
        //------------------------------------------------------------------------------------------
        btnExcluirLinha.addEventListener('click', function (e) {
            const linha = e.target.parentNode.parentNode

            //Impede de remover a ultima linha
            if (elTbodyCafeItens.rows.length > 1) {
                elTbodyCafeItens.deleteRow(linha.rowIndex - 1);

                //Remove 1 item a mais no card quantidade de itens
                quantidadeItens--
                cardsVariedadeItens.textContent = quantidadeItens.toString().padStart(2, '0');
            }

        });



        //Adiciona 1 item a mais no card quantidade de itens
        quantidadeItens++
        cardsVariedadeItens.textContent = quantidadeItens.toString().padStart(2, '0');

        //Linhas de Items
        contador++














        // const inpAutoComplete = document.querySelectorAll('.autoComplete_wrapper');
        // const btnHamburguer = document.querySelector('.hamburguer');
        // // console.log(inpAutoComplete);

        // btnHamburguer.addEventListener('click', ev => {

        //     inpAutoComplete.forEach(element => {
        //         element.classList.toggle("position-initial")
        //     })

        //     console.log("object");
        // })





    }














    //+==================================================================================================
    //----------------------------------------------------------------------------------
    //Extrai os valores das linhas de produtos e insere no array global  
    function extractValuesRelacional(formValues) {
        //form é um objeto 

        console.log(formValues);
        // console.log(formValues);
        //Receber a primeira parte do formulario, com os dados dos comapos item
        const formValuesAll = {};

        formValuesAll.item = formValues;

        formValuesAll.item.itemRelacional = [];


        Array.from(elTbodyCafeItens.children).forEach(element => {



            formValuesAll.item.itemRelacional.push({
                //Campo produto_id invisivel 
                itens_id: element.childNodes[1].childNodes[1].value,
                //Campo quantidade produto
                quantidade: b.paraFloat(element.childNodes[5].childNodes[1].value),

                custo: b.paraFloat(element.childNodes[7].childNodes[1].value)


            });


            // dataFormValues.push({
            //     //Valores na global dataFormValues para passar pra funçao lineInTable
            //     //Campo nome produto
            //     nome: element.childNodes[3].childNodes[1].childNodes[1].value,
            //     //Campo valor produto
            //     custo: element.childNodes[7].childNodes[1].value
            // });


        });
        return formValuesAll

    }







    //+==================================================================================================
    function inserirDataCafe() {
        elDataCafe.textContent = b.getDataAtualFormatada();

    }








    //+==================================================================================================
    function adicionarCafe(form) {


    }

}


