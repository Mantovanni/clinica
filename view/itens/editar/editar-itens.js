import  b from '../../../biblioteca/js/biblioteca.js';
import * as controllerItens from '../controller/controllerItens.js';


export function init(valueInit) {
    //Variaveis
    //=====================================================================================================
    //GLOBAIS
    //----------------------------------------------------------
    let contador = 0;
    const dataFormValues = [];
    dataFormValues.item = {};
    dataFormValues.itemRelacional = [];

    //Lista usado para o autocomplete
    let listaProdutosAsync = [];

    //Elements DOM
    //----------------------------------------------------------
    const tituloPage = document.querySelector('#modal-window__title-texto');

    //Botoes
    //--------------------------------------
    const btnAdicionarItemProduto = document.querySelector('#btn-adicionar-item-produto');//Formulario Adicionar

    // tituloPage.textContent = "Editar Usuário";
    //Formulario
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-modal');//Formulario Adicionar

    const elTbodyItensProduto = document.querySelector('#itens-produtos_tbody');



    //MASCARAS
    //======================================================================================================
    b.form.mask(formAdicionar);





    //Init==================================================================================================
    tituloPage.textContent = "Editar Itens";
    b.form.preencher(formAdicionar, valueInit.dadosItem); //async

    //busca produtos no banco para perencher a tabela de produtos
    buscarListaDeProdutos();//async





    //Eventos
    //======================================================================================================
    //BTN - Salvar----------------
    formAdicionar.addEventListener('submit', function (e) {
        e.preventDefault();

        //Pega o FORM que é o target do evento submit
        const form = e.target;

        if (validarForm(form)) {

            const formValues = extractValuesRelacional(b.form.extractValues(form));

console.log(formValues);


            b.crud.editarRelacional(formValues, "itens", "itens_has_produtos", responseItemSalvo => {//async                  
                b.modal.fechar();

                //Dados para tabela-------------------------------------------
                responseItemSalvo.item.total = responseItemSalvo.item.custo * responseItemSalvo.item.quantidade;
                responseItemSalvo.item.custo = dataFormValues.item.custo;

             
                //Dados para Editar-------------------------------------------
                //Quando atuzalizar o sistema para a a opção edição trazer os dados atraves de uma sonsulta by id no banco,
                //ai pode remover isso
                //Dados usados para o loop, quando tentar editar um item editado na tabela
                //Usado para quando Editar a linha criada , antes de atualizar a tabela
                dataFormValues.itemRelacional.forEach((element, indice) => {

                    responseItemSalvo.item.itemRelacional[indice].nome = element.nome;
                    responseItemSalvo.item.itemRelacional[indice].custo = element.custo;            
                });

                
                b.render.lineInTable(valueInit.elLinhaSelecionada, responseItemSalvo.item, "itens");
            }).then(response =>{
                b.modal.fechar();
            });



        }
    });


    // //Carregar Tabela
    // //===============================================================================================
    // function buscarListaDecCafesPorId() {

    //     b.crud.custom("listarCafeItensById", "cafes", formatarObjetoParaEnviarData(), responseList => {  //async   
    //         // console.log(responseList);

    //         //Id cafe
    //         elIdCafe.textContent = responseList["data"][0].cafe_id.padStart(4, '0');
    //         //Data do Café
    //         elDataCafe.textContent = b.formatDataISOforDataUser(responseList["data"][0].data);


    //         preencherCards(responseList["data"]);

    //         //informa a TBody, 
    //         b.render.lineInTable(elTbodyCafeItens, formatarItensParaTabela(responseList["data"]));


    //     }), true;
    // }




    // //formtarObjetoParaEnviarData
    // //=====================================================================================================
    // //Formatar Objeto para o request
    // function formatarObjetoParaEnviarData(responseList) {
    //     //Dados para ser enviado ao controller db
    //     const data = {};
    //     //Id vinda como parametro da init da pagina
    //     data.id = initId;

    //     return data;
    // }



    // //formatarItensParaTabela
    // //=====================================================================================================
    // //Prepara os itens para caregar natabela
    // function formatarItensParaTabela(responseList) {
    //     //Trata o array com as resposta vinda do ctronller antes de passa para função que cria a tabela
    //     const responseTratada = responseList.map(response => {
    //         //Completa a String com  zeros
    //         response.id = response.id.padStart(2, '0');
    //         response.total = response.custo * response.quantidade;
    //         response.quantidade = b.paraMoeda(response.quantidade) + " " + response.unidade;
    //         return response;
    //     });

    //     return responseTratada;
    // }


    //BTN - btnAdicionarItemProduto----------------
    btnAdicionarItemProduto.addEventListener('click', function (e) {
        e.preventDefault();

        adicionarProduto();

    });



    //Functions==================================================================================================
    function validarForm(form) {
        let validate = true;

        // if (form["adicionar-usuario-repetir-senha"].value !== form[3].value) {
        //     alert("As senhas nao conferem!")
        //     validate = false;
        // }

        return validate;
    }






    //=======================================================================================================
    //Busca lista de prosutos no banco para o auto complete
    function buscarListaDeProdutos() {
        b.crud.listar("produtosCusto_view", response => { //async


            listaProdutosAsync = response["data"];


            preencherRelacional();
        })
    }











    ////===================================================================================================================================
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

        // Evento Calcula valor total de um produto da linha ---------------------
        inpProdutoQuantidade.addEventListener('keyup', calcularTotais);
        inpProdutoQuantidade.addEventListener('change', calcularTotais);
        inpProdutoQuantidade.addEventListener('input', calcularTotais);
        inpProdutoQuantidade.addEventListener('click', calcularTotais);



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

        });




        //Linhas de produtos
        contador++
    }




    //valor que vai para o controller e volta para o preencher quando é uma linha editada
    //-------------------------------------------------------------------------------------------
    //Extrai os valores das linhas de produtos e insere no array global  
    function extractValuesRelacional(formValues) {//tabela Has
        //form é um objeto 

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


            dataFormValues.itemRelacional.push({
                //Valores na global dataFormValues para passar pra funçao lineInTable
                //Campo nome produto
                nome: element.childNodes[3].childNodes[1].childNodes[1].value,
                //Campo custo produto
                custo: element.childNodes[7].childNodes[1].value
            });
        });
        dataFormValues.item.custo = b.paraFloat(document.querySelector("#custo").value);

        return formValuesAll
    }









    //=======================================================================================================
    function preencherRelacional() {

        // console.log(valueInit.dadosItem);
        const itensRelacionais = valueInit.dadosItem.itemRelacional;

        // console.log(valueInit.dadosItem.itemRelacional);


        //Valor extraido d banco e formatado //Cria a quantidade de linhas de acordo
        //com o tamnho do array
        itensRelacionais.forEach(() => {
            adicionarProduto();

        });
        // console.log(valueInit.dadosItem.itensRelacionais);



        Array.from(elTbodyItensProduto.children).forEach((element, indice) => {

            //Item relacional do Item é o produto
            // console.log(itensRelacionais);
            const produto = itensRelacionais[indice];

            //O valor a primeira vez vem do banco como float, e se editar novamente vem ja formatado 
            //como Moeda Real - por isso precisa fazer assim b.paraMoedaReal(b.paraFloat(produto.valor))

            //Campo id produto invisivel 
            element.childNodes[1].childNodes[1].value = produto.produtos_id
            //Campo nome produto
            element.childNodes[3].childNodes[1].childNodes[1].value = produto.nome
            //Campo quantidade produto
            element.childNodes[5].childNodes[1].value = b.paraMoeda(produto.quantidade)
            //Campo valor produto
            element.childNodes[7].childNodes[1].value = b.paraMoedaReal(b.paraFloat(produto.custo))


            // element.childNodes[3].childNodes[1].click();//ativar o evento
            element.childNodes[5].childNodes[1].click()//ativar o evento

        });

    }















}//init







