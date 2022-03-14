import b from '../../../biblioteca/js/biblioteca.js';

// import autoComplete from '../../../biblioteca/js/modulo/submodulo/autocomplete/autoComplete.js';



export function init(valueInit) {
    //Variaveis
    //=====================================================================================================
    //GLOBAIS
    //----------------------------------------------------------------------------
    let contador = 0;
    const dataFormValues = [];
    dataFormValues.item = {};
    dataFormValues.itemRelacional = [];

    //Lista usado para o autocomplete
    let listaProdutosAsync = [];


    //Elements DOM
    //----------------------------------------------------------------------------
    const tbodyItens = document.querySelector('#tbody-central');//Tabela Central
    // const elNome = document.querySelector("#produto-nome");


    //Botoes
    //--------------------------------------
    const btnAdicionarItemProduto = document.querySelector('#btn-adicionar-item-produto');//Formulario Adicionar


    //Formulário
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-modal');//Formulario Adicionar

    const elTbodyItensProduto = document.querySelector('#itens-produtos_tbody');

    // const elNomeProduto = document.querySelector("#nome-produto");





    //MASCARAS
    //======================================================================================================
    // Aplica mascaras no form
    b.form.mask(formAdicionar);






    //Init==================================================================================================
    buscarListaDeProdutos();








    //Eventos
    //======================================================================================================
    //FORM - Adicionar----------------------------------------------------------------
    formAdicionar.addEventListener('submit', function (e) {
        //Evita que ao clicar enter dentro de qualquer input ative o envio do formulário
        e.preventDefault();

        //Pega o FORM que é o target do evento submit
        const form = e.target;

        console.log(b.form.extractValues(form));
        console.dir(b.form.extractValues(form));

        if (validarForm(form)) {

            const formValuesAll = extractValuesRelacional(b.form.extractValues(form));

            // console.log(formValuesAll);
            //Response contem o elemento salvo junto de sua ID criada no banco
            b.crud.salvarRelacional(formValuesAll, "itens", "itens_has_produtos", responseItemSalvo => {//async
                b.modal.fechar();

                //Dados para tabela-------------------------------------------
                responseItemSalvo.item.total = responseItemSalvo.item.custo * responseItemSalvo.item.quantidade;
                responseItemSalvo.item.custo = dataFormValues.item.custo;


               //Dados para Editar-------------------------------------------
                //Quando atualizar o sistema para a a opção edição trazer os dados através de uma consulta by id no banco,
                //ai pode remover isso
                //Dados usados para o loop, quando tentar editar um item editado na tabela
                //Usado para quando Editar a linha criada , antes de atualizar a tabela
                dataFormValues.itemRelacional.forEach((element, indice) => {

                    responseItemSalvo.item.itemRelacional[indice].nome = element.nome;
                    responseItemSalvo.item.itemRelacional[indice].custo = element.custo;
                });

                //informa a TBody, 
                b.render.lineInTable(tbodyItens, responseItemSalvo.item, "itens");
            }).then(response =>{
                b.modal.fechar();
            });;
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
    //======================================================================================================
    function validarForm(form) {
        let validate = true;

        //    Códigos aqui

        return validate;
    }












    //======================================================================================================
    function buscarListaDeProdutos() {
        b.crud.listar("produtosCusto_view", response => { //async //mudar nome da tabela para viewProdutos

            listaProdutosAsync = response["data"];

            adicionarProduto(); // Todo item tem pelo menos um produto
        })
    }

















    //======================================================================================================
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
             placeHolder="0"  inputmode="numeric"  autocomplete="off"  data-type="ignore" required>
        </td>
        <td class="produto-custo">
            <input class="input-default" id="produto-custo-${contador}" name="produto-custo" 
            data-type="ignore" placeHolder="R$ 0,00" disabled>
        </td>
        <td class="produto-total">
            <input class="input-default" name="produto-total"
             disabled id="produto-total-${contador}" data-group="produto-total-input" data-type="ignore" placeHolder="R$ 0,00">
        </td>
        <td class="produto-acoes">
          <button class="btn-excluir-linha" id="produto-excluir-${contador}" type="button">${b.ico.lixeira2}</button>
        </td>
    </tr>
    `);






        //Adiciona autoComplete no campo nome do produto criado
        // ----------------------------------------------------------------------------------------
        const linhaCriada = document.querySelector(`#linha-produto-${contador}`);

        const inpProdutoId = linhaCriada.querySelector(`#produto-id-${contador}`)
        const inpProdutoNome = linhaCriada.querySelector(`#produto-nome-${contador}`)
        const inpProdutoCusto = linhaCriada.querySelector(`#produto-custo-${contador}`)
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
            inpProdutoCusto.value = b.paraMoedaReal(itemSelecionado.custo);
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
            inpProdutoTotal.value = b.paraMoedaReal(b.paraFloat(inpProdutoQuantidade.value) * b.paraFloat(inpProdutoCusto.value));

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
            calcularTotais();
        });




        //Linhas de produtos
        contador++
    }
























    //======================================================================================================
    //Extrai os valores das linhas de produtos e insere no array global  
    function extractValuesRelacional(formValues) {
        //form é um objeto 

        //Receber a primeira parte do formulario, com os dados dos compos item
        const formValuesAll = {};

        formValuesAll.item = formValues;

        formValuesAll.item.itemRelacional = [];

        //Pega um Array de todos as linhas de itens criadas
        Array.from(elTbodyItensProduto.children).forEach(element => {

            // console.log(element.getElementsByTagName("td"));

            formValuesAll.item.itemRelacional.push({
                //Campo produto_id invisivel 
                produtos_id: element.childNodes[1].childNodes[1].value,
                //Campo quantidade produto
                quantidade: b.paraFloat(element.childNodes[5].childNodes[1].value),

            });

            //dataFormValues é usado para passar o nome e o valor de produto na hora que for inserir na tabela
            dataFormValues.itemRelacional.push({
                //Valores na global dataFormValues para passar pra funçao lineInTable
                //Campo nome produto
                nome: element.childNodes[3].childNodes[1].childNodes[1].value,
                //Campo custo produto
                custo: element.childNodes[7].childNodes[1].value
            });
        });
        dataFormValues.item.custo = b.paraFloat(document.querySelector("#custo").value);

        console.log(formValuesAll);

        return formValuesAll
        // console.log(data);
    }











}


