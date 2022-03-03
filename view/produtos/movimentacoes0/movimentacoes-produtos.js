import b from '../../../biblioteca/js/biblioteca.js';
// import * as controller from '../controller/controllerMovimentacao.js';


export default class MovimentacoesProdutos {



    constructor(idProdutoInit) {



        this.idProdutoInit = idProdutoInit;


        //Variaveis
        //==============================================================================================================
        //GLOBAIS
        //----------------------------------------------------------
        this.adicionarUrl = "../view/produtos/movimentacoes/form/adicionar-movimentacoes.html";
        this.urlJs = "../../../view/produtos/movimentacoes/form/adicionar-movimentacoes.js";//Url partir do render.js


        //Elements DOM
        //-------------------------------------------------------------------------
        this.tbody = document.querySelector('#tbody-central');
        this.eleTituloPagina = document.querySelector('#c-view__title-text');

        this.inpPesquisar = document.querySelector("#acoes__buscar");
        this.selectEstoques = document.querySelector("#estoques-select");


        // CARDS
        //----------------------------------------------------------
        this.cardRouparia = document.querySelector("#card-rouparia");
        this.cardApartamentos = document.querySelector("#card-apartamentos");
        this.cardRecepcao = document.querySelector("#card-recepcao");
        this.cardLavanderia= document.querySelector("#card-lavanderia");


        //Formulario
        //--------------------------------------  
        this.btnMovimentar = document.querySelector('#acoes__button-adicionar');
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

            this.btnMovimentar.addEventListener('click', function (e) {

                b.modal.abrirCustom("Movimentar - " + dataProduto.nome)

                // dataInit.produto = dataProduto;
                //Forma como o formulario vai agir
                // dataInit.modo = "manual";

                // Passa o elemento Janela Modal para a função render.page 
                b.render.pageModalCustom(adicionarUrl, urlJs, dataProduto);//assync
                // b.render.page(b.modal.contentCustom, adicionarUrl, urlJs, "modal", dataInit);//assync
                // b.render.page(b.modal.content, adicionarUrl, urlJs);//assync

            });
            // btnMovimentar.click()
        }



        //SELECT ESTOQUES-------------------------------------------------------------------
        // this.selectEstoques.addEventListener('change', ev => {

        //     // if (ev.target.value == "Producao") {
        //         this.carregarDadosdoEstoque(ev.target.value);

        //     // } else if (ev.target.value == "Almoxerifado") {
        //     //     this.carregarTabela(2);

        //     // }
        // })

    }




    //Funções
    //==============================================================================================================
    carregarDadosdoEstoque(estoqueId) {
        this.preencherCards(this.idProdutoInit);
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


            console.log(responseParaTabela);

            //informa a TBody, 
            b.table.insertLineDesc(this.tbody, responseParaTabela);

            b.table.insertSearch(this.inpPesquisar, this.tbody);


            //Entrada de ver e saida de vermelho
            // controller.destacarColunaMovimentacao(this.tbody);
            


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
    preencherCards(idProduto) {

        console.log("preencherCards");
        // const data = {id : idProduto}
        
        //Verifica quanto tem no estoque
        b.crud.custom("listarEstoqueByProduto", "estoques", {id : idProduto}, response => {
            // console.log(response.quantidade_total);

            console.log(response);
       

            
            response.forEach(element => {
            
                switch (element.nome) {
                    case "Rouparia":
                        this.cardRouparia.textContent = b.paraMoeda(element.quantidade);
                        // this.cardRouparia.textContent = b.paraMoeda(element.quantidade);
                        break;
                    case "Apartamentos":
                        this.cardApartamentos.textContent = b.paraMoeda(element.quantidade);
                        break;
                    case "Recepção":
                        this.cardRecepcao.textContent = b.paraMoeda(element.quantidade);
                        break;
                    case "Lavanderia":
                        this.cardLavanderia.textContent = b.paraMoeda(element.quantidade);
                        break;
                
                    default:
                        break;
                }
                
                



            });






            // if(response.estoque_total !== null && response.estoque_total !== undefined){
            // if(response){
             
            //     this.cardRouparia.textContent = b.paraMoeda(response.estoque_total) + " " + response.unidade;
            //     this.cardApartamentos.textContent = b.paraMoedaReal(response.custo * response.estoque_total)
            //     this.cardRecepcao.textContent = b.paraMoedaReal(response.custo * response.estoque_total)
            //     this.cardLavanderia.textContent = b.paraMoedaReal(response.custo * response.estoque_total)
            // }else{
            //     // this.cardQuantidadeEstoque.textContent = "0,00"
            //     // this.cardValorEstoque.textContent = "R$ 0,00"
            // }

         

        })

    }







}























