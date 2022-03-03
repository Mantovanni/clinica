import b from '../../../../biblioteca/js/biblioteca.js';



export default class ProdutosCafe {



    constructor(idProdutoInit) {



        this.idProdutoInit = idProdutoInit;


        //Variaveis
        //==============================================================================================================
        //GLOBAIS
        //----------------------------------------------------------
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
        // this.cardQuantidadeEstoque = document.querySelector("#card-quantidade_estoques");
        // this.cardValorEstoque = document.querySelector("#card-valor_estoque");


        //Formulario
        //--------------------------------------  
        this.btnTransferir = document.querySelector('#btn-transferir');



        //MASCARAS
        //==============================================================================================================
        // b.maskMoeda(inpValor);

    }




    init() {
        //Init==========================================================================================================
        this.carregarTabela();



        //Eventos
        //==============================================================================================================

        //BTN - Transferir================================================================
        this.btnTransferir.addEventListener('click', ev => {
            b.modal.abrir("Transferir Produtos");


            //passa dados para a tela do modal
            const dataInit = {

                layout: "transferencia",            
                grupo: "cafe", //grupo de estoques
                estoque: this.estoqueData, //dados do estoque do banco   
                preencher: false //ja carrega os itens do estoque
                // preencherData: this.preencherData //itens para o preencher 
            }


            // Passa o elemento Janela Modal para a função render.page 
            b.render.pageModal(this.adicionarUrl, this.urlJs, dataInit)
                .then(response => {
                    //Se cancelar ou fechar a promisse retorna false
                    if (response) {
                        this.carregarTabela();
                    }

                });

        })



    }











    //Funções
    //==============================================================================================================


    //Lista produtos por grupo, produtos com e sem estoque ou custo
    //===================================================================================================
    carregarTabela() {
        const data = {
            grupo: 'Cafe'
        }

        // b.crud.listar("produtos", responseList => {  //async     
        b.crud.custom("listarProdutosPorGrupo", "produtos", data, responseList => {  //async     


            // console.log(responseList);
            const responseTratada = responseList["data"].map(response => {

                // response.estoque = parseFloat(response.estoque).toFixed(2)             
                response.estoque_total = b.paraMoeda(response.estoque_total) + " " + response.unidade;
                return response;
            });



            b.table.insertLine(this.tbody, responseTratada);

            //Inserir função pesquisar tabela
            b.table.insertSearch(this.inpPesquisar, this.tbody);

            this.inserirLinkMovimentacoesNaLinha(this.tbody)
        });

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










