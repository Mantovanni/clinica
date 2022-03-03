import b from '../../../biblioteca/js/biblioteca.js';


export default class Estoques {


    constructor() {


        //Variaveis
        //==============================================================================================================
        //GLOBAIS
        //----------------------------------------------------------
        this.transferirUrl = "../view/controller/movimentacoes/transferir/transferir.html";
        this.transferirJs = "../../../view/controller/movimentacoes/transferir/transferir.js";//Url partir do render.js



        //Elements DOM
        //----------------------------------------------------------
        this.tbodyEstoques = document.querySelector('#tbody-central-estoques');
        this.inpPesquisarEstoques = document.querySelector("#acoes__buscar-estoques");

        this.tbodyProdutos = document.querySelector('#tbody-central-produtos');
        this.inpPesquisarProdutos = document.querySelector("#acoes__buscar-produtos");


        // Botoes
        //----------------------------------------------------------
        this.btnTransferir = document.querySelector("#btn-transferir");


        //CARDS
        //----------------------------------------------------------
        this.cardValorEstoque = document.querySelector("#card-valor_estoque");

    }








    //Init==========================================================================================================
    init() {
        //Recebe id dos estoque
        this.buscarProdutosPorEstoque("%");//all 
        //Recebe grupo do estoque
        this.listarEstoques("%");//all



        //Eventos
        //==============================================================================================================
        //BTN - Transferir================================================================
        this.btnTransferir.addEventListener('click', ev => {

            b.modal.abrir("Transferir Itens");

            //Dados para a função que vai abrir no modal
            const dataInit = {
                layout: "transferencia",
                estoque: {
                    categoria: "%"//todos os estoques
                }
            }

            // Passa o elemento Janela Modal para a função render.page 
            b.render.pageModal(this.transferirUrl, this.transferirJs, dataInit)
                .then(response => {
                    //Se cancelar ou fechar a promisse retorna false
                    if (response) {
                        this.buscarProdutosPorEstoque();
                    }

                });

        })

    }






    //Função para Extender
    //===================================================================================================
    //=============================================================================================================


    //===================================================================================================
    //Lista produtos de um determinado Grupo e valore de estoques , mesmo que seja 0
    buscarProdutosPorGrupo(estoqueGrupo) {
        const data = {
            grupo: estoqueGrupo
        };

        b.crud.custom("listarProdutosPorGrupo", "produtos", data, responseList => {  //async        

            const dados = responseList["data"].map(response => {
                response.id = response.id.padStart(4, '0');
                response.quantidade = b.paraMoeda(response.estoque_total) + " " + response.unidade;
                response.total = response.estoque_total * response.custo;
                return response;
            });

            //informa a TBody, 
            b.table.insertLine(this.tbodyProdutos, dados);
            this.inserirLinkProEstoqueProduto();

            b.table.insertSearch(this.inpPesquisarProdutos, this.tbodyProdutos);

            this.atualizarCards(dados)

        });
    }



















    //Funções
    //==============================================================================================================
    //Carregar Tabela PRODUTOS
    //===================================================================================================
    //Lista produtos que ja tiveram alguma movimentação no estoque
    buscarProdutosPorEstoque(estoqueId) {
        const data = {
            estoque: estoqueId
        };

        b.crud.custom("listarEstoquesProdutos", "estoques", data, responseList => {  //async        

            const dados = responseList["data"].map(response => {
                response.id = response.id.padStart(4, '0');
                response.quantidade = b.paraMoeda(response.estoque_total) + " " + response.unidade;
                response.total = response.estoque_total * response.custo;
                return response;
            });

            //informa a TBody, 
            b.table.insertLine(this.tbodyProdutos, dados);
            this.inserirLinkProEstoqueProduto();

            b.table.insertSearch(this.inpPesquisarProdutos, this.tbodyProdutos);

            this.atualizarCards(dados)

        });
    }


    // Insere link pro estoque do produto em cada linha
    //===================================================================================================
    inserirLinkProEstoqueProduto() {

        //Pega todas as linhas
        Array.from(this.tbodyProdutos.children).forEach(element => {

            element.addEventListener('click', e => {
                //Pega a id contida no dataset da linha
                const produtoId = b.paraFloat(e.target.parentNode.dataset.id)

                b.inserirHash(`produtos/movimentacoes/${produtoId}`)
            })
        });
    }







    //Estoques
    //========================================================================================================================
    //========================================================================================================================


    //Carregar Tabela Estoques
    //===================================================================================================
    //Lista estoques por Grupo/categoria
    listarEstoques(estoqueGrupo) {


        b.crud.listarByKey("categoria", estoqueGrupo, "estoques", responseList => {  //async        

            //Lista somente estoques que nao sao de apartamentos
            const dados = responseList["data"].filter(response => {

                if (response.subcategoria !== "Apartamento") {
                    response.id = response.id.padStart(4, '0');
                    return true;
                }

            });


            //informa a TBody, 
            b.table.insertLine(this.tbodyEstoques, dados);
            this.inserirLinkProEstoque();

            b.table.insertSearch(this.inpPesquisarEstoques, this.tbodyEstoques);

            // atualizarCards(dados)

        });
    }


    // Insere link pro estoque do produto em cada linha
    //===================================================================================================
    inserirLinkProEstoque() {

        //Pega todas as linhas
        Array.from(this.tbodyEstoques.children).forEach(element => {

            element.addEventListener('click', e => {
                //Pega a id contida no dataset da linha
                const estoqueId = b.paraFloat(e.target.parentNode.dataset.id)

                b.inserirHash(`estoques/detalhes/${estoqueId}`)
            })
        });
    }









    //Preenche os cards com os dados da lista de movimentações do banco
    //===================================================================================================
    atualizarCards(response) {


        let total = 0;

        response.forEach(element => {
            total += b.paraFloat(element.total);;

        });

        this.cardValorEstoque.textContent = b.paraMoedaReal(total);


    }









}

