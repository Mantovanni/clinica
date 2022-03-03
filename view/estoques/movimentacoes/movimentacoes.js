import b from '../../../biblioteca/js/biblioteca.js';
import * as controller from '../controller/controllerMovimentacao.js';


export default class Movimentacoes {



    constructor(idProdutoInit) {



        this.idProdutoInit = idProdutoInit;


        //Variaveis
        //==============================================================================================================
        //GLOBAIS
        //----------------------------------------------------------
        this.adicionarUrl = "../view/estoque/movimentacoes/form/adicionar-movimentacoes.html";
        this.urlJs = "../../../view/estoque/movimentacoes/form/adicionar-movimentacoes.js";//Url partir do render.js


        //Elements DOM
        //-------------------------------------------------------------------------
        this.tbody = document.querySelector('#tbody-central');
        this.eleTituloPagina = document.querySelector('#c-view__title-text');

        this.inpPesquisar = document.querySelector("#acoes__buscar");
        this.selectEstoques = document.querySelector("#estoques-select");


        // CARDS
        //----------------------------------------------------------
        this.cardQuantidadeEstoque = document.querySelector("#card-quantidade_estoques");
        this.cardValorEstoque = document.querySelector("#card-valor_estoque");


        //Formulario
        //--------------------------------------  
        this.btnAdicionar = document.querySelector('#acoes__button-adicionar');
        // const btnLancarCompra = document.querySelector('#acoes__button-lancar_compra');
        // const btnTransferirEstoque = document.querySelector('#acoes__button-transferir_estoque');


        //MASCARAS
        //==============================================================================================================
        // b.maskMoeda(inpValor);

    }




    init() {
        // console.log("init");
        //Init==========================================================================================================
        //% busca os dois estoques
        this.carregarDadosdoEstoque("%");
        //Busca dados de todos os estoques
        // this.carregarTabela("%");

        this.buscarDadosProduto();
        // this.preencherCards("%");





        // b.modal.abrirCustom("Estoque - ");


        //Eventos
        //==============================================================================================================
        //BTN - Movimentar Estoque-------------------------------------------------------------------
        this.addEventoBotaoMovimentarEstoque = function (dataProduto) {

            const adicionarUrl = this.adicionarUrl;
            const urlJs = this.urlJs;

            this.btnAdicionar.addEventListener('click', function (e) {

                b.modal.abrirCustom("Estoque - " + dataProduto.nome)

                // dataInit.produto = dataProduto;
                //Forma como o formulario vai agir
                // dataInit.modo = "manual";

                // Passa o elemento Janela Modal para a função render.page 
                b.render.pageModalCustom(adicionarUrl, urlJs, dataProduto);//assync
                // b.render.page(b.modal.contentCustom, adicionarUrl, urlJs, "modal", dataInit);//assync
                // b.render.page(b.modal.content, adicionarUrl, urlJs);//assync

            });
            // btnAdicionar.click()
        }



        //SELECT ESTOQUES-------------------------------------------------------------------
        this.selectEstoques.addEventListener('change', ev => {

            // if (ev.target.value == "Producao") {
                this.carregarDadosdoEstoque(ev.target.value);

            // } else if (ev.target.value == "Almoxerifado") {
            //     this.carregarTabela(2);

            // }
        })

    }




    //Funções
    //==============================================================================================================
    carregarDadosdoEstoque(estoqueId) {
        this.preencherCards(estoqueId);
        this.carregarTabela(estoqueId);
    }

    //Carregar Tabela
    //===================================================================================================
    carregarTabela(estoqueId) {
        const data = {
            produto: this.idProdutoInit,
            estoque: estoqueId
        };

        b.crud.custom("listarMovimentacoesPorProdutoEstoque", "movimentacoes", data, responseList => {  //async        
            // b.crud.custom("listarEstoquesProdutos", "estoques", data, responseList => {  //async   



            let responseParaTabela = [];
            responseParaTabela = responseList["data"].map(response => {
                responseParaTabela = response;
                //  responseTratada =  response;
                // if (response.cafes_id == null) {
                //     response.cafes_id = "";
                // }
                // console.log(response.valor);
                // response.operacao = response.operacao + " " + response.cafes_id.padStart(4, '0');
                // response.operacao = response.operacao;
                responseParaTabela.total = response.quantidade * response.valor;
                responseParaTabela.valor =  b.paraMoeda(response.valor) + " / " + response.unidade;
                responseParaTabela.quantidade = b.paraMoeda(response.quantidade) + " " + response.unidade;

                // console.log(responseParaTabela.valor);

                return responseParaTabela;

            });

    

            //informa a TBody, 
            b.table.insertLineDesc(this.tbody, responseParaTabela, "movimentacoes",()=>{
                //after delete
                this.carregarDadosdoEstoque(b.selectValue("#estoques-select"));
            });

            b.table.insertSearch(this.inpPesquisar, this.tbody);


            //Entrada de ver e saida de vermelho
            controller.destacarColunaMovimentacao(this.tbody);
            


        }), false;


    }


    //Busca dados do produto
    //===================================================================================================
    buscarDadosProduto() {//Async

        b.crud.listarById(this.idProdutoInit, "produtos", (response) => {

            this.eleTituloPagina.textContent = "Estoque - " + response["data"].nome;

            // dataProduto = response["data"];
            this.addEventoBotaoMovimentarEstoque(response["data"])
            // addEventoBotaoLancarCompra(response["data"]);
            // addEventoTranferirEstoque(response["data"]);



        });

    }



    //Preenche os cards com os dados da lista de movimentações do banco
    //===================================================================================================
    preencherCards(estoqueId) {

        const data = {
            produto : this.idProdutoInit,
            estoque : estoqueId

        }
        

        //Verifica quanto tem no estoque
        b.crud.custom("quantidadePorProdutoEstoque", "estoques", data, response => {
            // console.log(response.quantidade_total);

       
            // if(response.estoque_total !== null && response.estoque_total !== undefined){
            if(response.estoque_total){
             
                this.cardQuantidadeEstoque.textContent = b.paraMoeda(response.estoque_total) + " " + response.unidade;
                this.cardValorEstoque.textContent = b.paraMoedaReal(response.custo * response.estoque_total)
            }else{
                this.cardQuantidadeEstoque.textContent = "0,00"
                this.cardValorEstoque.textContent = "R$ 0,00"
            }

         

        })

    }







}

































// ==================================================================================================================



























export function init(idProdutoInit) {
    // console.log("movimentação ok ");
    // console.log(idProdutoInit);

    // const name = new movimentacoes();

    // name.name()

    //Variaveis
    //==============================================================================================================
    //GLOBAIS
    //----------------------------------------------------------
    const adicionarUrl = "../view/estoque/movimentacoes/form/adicionar-movimentacoes.html";
    const urlJs = "../../../view/estoque/movimentacoes/form/adicionar-movimentacoes.js";//Url partir do render.js


    // const dataProduto = {}

    // const dataInit = {};



    //Elements DOM
    //-------------------------------------------------------------------------
    const tbody = document.querySelector('#tbody-central');
    const eleTituloPagina = document.querySelector('#c-view__title-text');

    const inpPesquisar = document.querySelector("#acoes__buscar");
    const selectEstoques = document.querySelector("#estoques-select");


    // CARDS
    //----------------------------------------------------------
    const cardQuantidadeEstoque = document.querySelector("#card-quantidade_estoques");
    const cardValorEstoque = document.querySelector("#card-valor_estoque");


    //Formulario
    //--------------------------------------  
    const btnAdicionar = document.querySelector('#acoes__button-adicionar');
    // const btnLancarCompra = document.querySelector('#acoes__button-lancar_compra');
    // const btnTransferirEstoque = document.querySelector('#acoes__button-transferir_estoque');




    //MASCARAS
    //==============================================================================================================
    // b.maskMoeda(inpValor);





    //Init==========================================================================================================
    //Busca dados de todos os estoques
    carregarTabela("%");

    buscarDadosProduto();
    preencherCards();




    //Eventos
    //==============================================================================================================
    //BTN - Movimentar Estoque-------------------------------------------------------------------
    function addEventoBotaoMovimentarEstoque(dataProduto) {
        btnAdicionar.addEventListener('click', function (e) {

            b.modal.abrirCustom("Estoque - " + dataProduto.nome)

            // dataInit.produto = dataProduto;
            //Forma como o formulario vai agir
            // dataInit.modo = "manual";

            // Passa o elemento Janela Modal para a função render.page 
            b.render.pageModalCustom(adicionarUrl, urlJs, dataProduto);//assync
            // b.render.page(b.modal.contentCustom, adicionarUrl, urlJs, "modal", dataInit);//assync
            // b.render.page(b.modal.content, adicionarUrl, urlJs);//assync

        });
        // btnAdicionar.click()
    }



    //SELECT ESTOQUES-------------------------------------------------------------------
    selectEstoques.addEventListener('change', ev => {

        if (ev.target.value == "Producao") {
            carregarTabela(1);

        } else if (ev.target.value == "Almoxerifado") {
            carregarTabela(2);

        }

    })



    // //BTN - Lançar Compra----------------------------------------------------------------------
    // function addEventoBotaoLancarCompra(dataProduto) {
    //     btnLancarCompra.addEventListener('click', function (e) {

    //         b.modal.abrirCustom("Lançar compra - " + dataProduto.nome)

    //         dataInit.produto = dataProduto;
    //         dataInit.modo = "compra";

    //         // Passa o elemento Janela Modal para a função render.page 
    //         b.render.pageModalCustom(adicionarUrl, urlJs, dataInit);//assync
    //         // b.render.page(b.modal.content, adicionarUrl, urlJs);//assync

    //     });
    //     // btnLancarCompra.click()
    // }

    // //BTN - Tranferir Estoque----------------------------------------------------------------------
    // function addEventoTranferirEstoque(dataProduto) {
    //     btnTransferirEstoque.addEventListener('click', function (e) {

    //         b.modal.abrirCustom("Transferir Estoque - " + dataProduto.nome)

    //         dataInit.produto = dataProduto;
    //         dataInit.modo = "tranferencia";

    //         // Passa o elemento Janela Modal para a função render.page 
    //         b.render.pageModalCustom(adicionarUrl, urlJs, dataInit);//assync
    //         // b.render.page(b.modal.content, adicionarUrl, urlJs);//assync

    //     });
    //     // btnLancarCompra.click()
    // }
    //==============================================================================================================












    //Funções
    //==============================================================================================================

    //Carregar Tabela
    //===================================================================================================
    function carregarTabela(estoqueId) {
        const data = {
            estoque: estoqueId
        };


        b.crud.custom("listarMovimentacoesPorProduto", "movimentacoes", idProdutoInit, responseList => {  //async        
            // b.crud.custom("listarEstoquesProdutos", "estoques", data, responseList => {  //async   



            const response = responseList["data"].map(response => {
                //  responseTratada =  response;
                // if (response.cafes_id == null) {
                //     response.cafes_id = "";
                // }

                // response.operacao = response.operacao + " " + response.cafes_id.padStart(4, '0');
                // response.operacao = response.operacao;
                response.total = response.quantidade * response.valor;
                response.quantidade = b.paraMoeda(response.quantidade) + " " + response.unidade;


                return response;

            });

            //informa a TBody, 
            b.table.insertLineDesc(tbody, response);

            b.table.insertSearch(inpPesquisar, tbody);


            //Entrada de ver e saida de vermelho
            controller.destacarColunaMovimentacao(tbody);
        }), false;


    }


    //Busca dados do produto
    //===================================================================================================
    function buscarDadosProduto() {//Async

        b.crud.listarById(idProdutoInit, "produtos", (response) => {

            eleTituloPagina.textContent = "Estoque - " + response["data"].nome;

            // dataProduto = response["data"];
            addEventoBotaoMovimentarEstoque(response["data"])
            // addEventoBotaoLancarCompra(response["data"]);
            // addEventoTranferirEstoque(response["data"]);



        });

    }



    //Preenche os cards com os dados da lista de movimentações do banco
    //===================================================================================================
    function preencherCards() {


        const data = {}
        data.id = idProdutoInit;

        b.crud.custom("quantidadePorProduto", "estoques", data, response => {

            cardQuantidadeEstoque.textContent = b.paraMoeda(response.quantidade_total) + " " + response.unidade;
            cardValorEstoque.textContent = b.paraMoedaReal(response.custo * response.quantidade_total)

        })

    }









}

init.prototype.teste = function () {
    console.log("teste");
}
