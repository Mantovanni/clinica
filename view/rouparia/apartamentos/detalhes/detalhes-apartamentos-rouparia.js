import b from '../../../../biblioteca/js/biblioteca.js';
// import {a} from '../../../biblioteca/js/biblioteca.js';



export default class DetalhesApartamentosRouparia {



    constructor(idInit) {

        this.idInit = idInit;


        //Variaveis
        //==============================================================================================================
        //GLOBAIS
        //----------------------------------------------------------
        this.estoqueData;
        this.itensData;

        this.adicionarUrl = "../view/controller/movimentacoes/transferir/transferir.html";
        this.urlJs = "../../../view/controller/movimentacoes/transferir/transferir.js";//Url partir do render.js


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
        this.btnMovimentar = document.querySelector('#btn-movimentar');
        this.btnEntrada = document.querySelector('#btn-entrada');
        this.btnSaida = document.querySelector('#btn-saida');



        //MASCARAS
        //==============================================================================================================
        // b.maskMoeda(inpValor);

    }




    init() {      
        //Init==========================================================================================================
        // this.carregarTabela();
        this.buscarDadosEstoque();
        this.eleTituloPagina.textContent = "Apartamento - " + this.idInit;






        //Eventos
        //==============================================================================================================
        //BTN - Movimentar Estoque-------------------------------------------------------------------
        // this.btnMovimentar.addEventListener('click', ev => {
        //     b.modal.abrir("Transferir");

        //     // Passa o elemento Janela Modal para a função render.page 
        //     b.render.page(b.modal.content, this.adicionarUrl, this.urlJs, "modal");//assync
        // })
        //BTN - Entrada================================================================
        this.btnEntrada.addEventListener('click', ev => {
            b.modal.abrir("Entrada de Rouparia - " + this.estoqueData.nome);



            //passa dados para a tela do modal
            const dataInit = {

                layout: "entrada",              
                grupo: "rouparia",
                estoque: this.estoqueData, //dados do estoque do banco 
                preencher: false 

            }


            // Passa o elemento Janela Modal para a função render.page 
            b.render.pageModal(this.adicionarUrl, this.urlJs, dataInit)
                .then(response => {
                    //Se cancelar ou fechar a promisse retorna false
                    if (response) {
                        this.buscarDadosEstoque();
                    }

                });


        })


        // BTN - Saida=================================================================
        this.btnSaida.addEventListener('click', ev => {
            b.modal.abrir("Saída de Rouparia - " + this.estoqueData.nome);

            //passa dados para a tela do modal
            const dataInit = {

                layout: "saida",
                grupo: "rouparia",
                estoque: this.estoqueData, //dados do estoque do banco
                preencher: true,
                preencherData: this.itensData
            }

            // Passa o elemento Janela Modal para a função render.page 
            b.render.pageModal(this.adicionarUrl, this.urlJs, dataInit)
                .then(response => {

                    if (response) {
                        this.buscarDadosEstoque();
                    }

                });

        })

        // setTimeout(() => {
        //     this.btnSaida.click();
        // }, 300);


    }









    //Funções
    //==============================================================================================================

    //Busca dados do produto
    //===================================================================================================
    buscarDadosApartamento() {//Async//mesclar com a consulta de dados sobre o estoque do ap e fazer um custom so

        b.crud.listarById(this.idInit, "apartamentos", (response) => {

            // this.eleTituloPagina.textContent = "Estoque - " + response["data"].nome;
            this.eleTituloPagina.textContent = "Estoque - " + this.idInit;

            // dataProduto = response["data"];
            this.addEventoBotaoMovimentarEstoque(response["data"])
            // addEventoBotaoLancarCompra(response["data"]);
            // addEventoTranferirEstoque(response["data"])

        });
        namea(params);
        function namea(params) {
            console.log("tete");
        }

    }







    //===================================================================================================


    //Busca a id do estoque do Apartamnto
    buscarDadosEstoque() {

        b.crud.listarByKey("apartamentos_id", this.idInit, "estoques", response => {

            this.estoqueData = response["data"][0];

            this.carregarTabelaDeProdutosDoEstoque(response["data"][0].id)
        })
    }




    //===================================================================================================
     // Lista os produtos do estoque pela id
    carregarTabelaDeProdutosDoEstoque(estoqueId) {
       
       
        const data = {
            estoque: estoqueId
        }


        b.crud.custom("listarEstoquesProdutos", "estoques", data, responseList => {


            this.itensData = responseList["data"];

            const responseTratada = responseList["data"].map(response => {

                // response.estoque = parseFloat(response.estoque).toFixed(2)             
                response.estoque_total = b.paraMoeda(response.estoque_total) + " " + response.unidade;
                return response;
            });



            b.table.insertLine(this.tbody, responseTratada);

            //Inserir função pesquisar tabela
            b.table.insertSearch(this.inpPesquisar, this.tbody);

            this.inserirLinkMovimentacoesNaLinha(this.tbody)



            //Ativar botoes apos os dados chgarem do banco----------------------------
           
                this.btnSaida.disabled = false;
                this.btnEntrada.disabled = false;
           



        })

    }





    // Adiciona a opção de abrir detalhes do item nos itens/linhas da tabela
    //===================================================================================================
    inserirLinkMovimentacoesNaLinha(tabela) {
        //Pega todas as linhas
        Array.from(tabela.children).forEach(element => {

            element.addEventListener('click', e => {
                //Pega a id contida no dataset da linha
                const produtoId = b.paraFloat(e.target.parentNode.dataset.id)

                b.inserirHash(`produtos/movimentacoes/${produtoId}`)

            })
        });
    }















}










