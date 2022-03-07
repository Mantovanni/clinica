import b from '../../../biblioteca/js/biblioteca.js';



export function init() {

    // globalThis.novaProp = { hello: 'World' }

    // console.log(globalThis);

    //Variaveis
    //========================================================================================================

    //GLOBAIS
    //----------------------------------------------------------
    const adicionarUrl = " ../view/produtos/adicionar/adicionar-produtos.html";
    const urlJs = "../../../view/produtos/adicionar/adicionar-produtos.js";//Url partir do render.js



    //Elements DOM
    //----------------------------------------------------------
    const btnAdicionar = document.querySelector('#acoes__button-adicionar');
    const tbody = document.querySelector('#tbody-central');

    const inpPesquisar = document.querySelector("#acoes__buscar");


    // let copiaTabela = "";




    //Formulario
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-adicionar');//Formulario Adicionar




    //MASCARAS
    //==============================================================================================================
    // b.maskMoeda(inpValor);





    //Init==========================================================================================================
    carregarTabela();










    //Eventos
    //==============================================================================================================
    //BTN - Adicionar----------------
    btnAdicionar.addEventListener('click', function (e) {
        b.modal.abrir();

        // Passa o elemento Janela Modal para a função render.page 
        b.render.pageModal(adicionarUrl, urlJs);//assync
        // b.render.page(b.modal.content, adicionarUrl, urlJs);//assync

    });
    //==============================================================================================================
    // btnAdicionar.click()










    //Funções
    //==============================================================================================================

    //Carregar Tabela
    //===================================================================================================
    function carregarTabela() {


        // b.crud.listar("produtos", responseList => {  //async     
        b.crud.custom("listarProdutos", "produtos", "", responseList => {  //async     


            // console.log(responseList);
            const responseTratada = responseList["data"].map(response => {

                // response.estoque = parseFloat(response.estoque).toFixed(2)             
                response.estoque_total = b.paraMoeda(response.estoque_total) + " " + response.unidade;
                return response;
            });



            
            b.render.lineInTable(tbody, responseTratada, "produtos");

            //Inserir função pesquisar tabela
            b.table.insertSearch(inpPesquisar, tbody);

            inserirBotoesEstoque(tbody, responseList["data"]);
        }, false);

    }








    //============================================================================================================
    //Cria os botoes de estoque na tabela
    function inserirBotoesEstoque(elTable, dadosItensArray) {//Espera receber um TBODY

        //Pega todos os elementos celula da coluna ações na tabela
        const celAcoesNodes = elTable.querySelectorAll('.cel-acoes');


        dadosItensArray.forEach((dadosItem, indice) => {


            celAcoesNodes[indice].insertAdjacentHTML("afterbegin", `<button class="btn-estoque-linha" data-name="estoque">${b.ico.carrinho2}</button>`);



            //Pega o botão criado na cellula
            const novoBtnEstoque = celAcoesNodes[indice].querySelector(`[data-name="estoque"]`);
            //Estoque
            //---------------------------------------------------------------------------------------------
            novoBtnEstoque.addEventListener('click', function (e) {
                // window.location = "#/estoque/movimentacoes/" + dadosItem.id;
                b.inserirHash(`produtos/movimentacoes/${dadosItem.id}`)

            });

        });

    }














}