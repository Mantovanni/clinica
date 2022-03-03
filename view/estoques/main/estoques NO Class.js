import b from '../../../biblioteca/js/biblioteca.js';


export function init() {


    //Variaveis
    //==============================================================================================================
    //GLOBAIS
    //----------------------------------------------------------
    const transferirUrl = "../view/controller/movimentacoes/transferir/transferir.html";
    const transferirJs = "../../../view/controller/movimentacoes/transferir/transferir.js";//Url partir do render.js



    //Elements DOM
    //----------------------------------------------------------
    const tbodyEstoques = document.querySelector('#tbody-central-estoques');
    const inpPesquisarEstoques = document.querySelector("#acoes__buscar-estoques");

    const tbodyProdutos = document.querySelector('#tbody-central-produtos');
    const inpPesquisarProdutos = document.querySelector("#acoes__buscar-produtos");


    // Botoes
    //----------------------------------------------------------
    const btnTransferir = document.querySelector("#btn-transferir");


    //CARDS
    //----------------------------------------------------------
    const cardValorEstoque = document.querySelector("#card-valor_estoque");




    //Init==========================================================================================================
    //Busca dados de todos os estoques
    buscarProdutosDeAllEstoques("%");//all estoques
    listarEstoques("%");//all estoques



    //Eventos
    //==============================================================================================================
    //BTN - Transferir================================================================
    btnTransferir.addEventListener('click', ev => {

        b.modal.abrir("Transferir Itens");

        //Dados para a função que vai abrir no modal
        const dataInit = {
            layout: "transferencia",
            estoque: {
                categoria : "%"//todos os estoques
            }                  
        }

        // Passa o elemento Janela Modal para a função render.page 
        b.render.pageModal(transferirUrl, transferirlJs, dataInit)
            .then(response => {
                //Se cancelar ou fechar a promisse retorna false
                if (response) {
                    this.buscarProdutosDeAllEstoques();
                }

            });

    })





    //Funções
    //==============================================================================================================

    //Carregar Tabela PRODUTOS
    //===================================================================================================
    function buscarProdutosDeAllEstoques(estoqueId) {
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
            b.table.insertLine(tbodyProdutos, dados);
            inserirLinkProEstoqueProduto();

            b.table.insertSearch(inpPesquisarProdutos, tbodyProdutos);

            atualizarCards(dados)

        });
    }


    // Insere link pro estoque do produto em cada linha
    //===================================================================================================
    function inserirLinkProEstoqueProduto() {

        //Pega todas as linhas
        Array.from(tbodyProdutos.children).forEach(element => {

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
    function listarEstoques(estoqueId) {


        b.crud.listarByKey("categoria", estoqueId, "estoques", responseList => {  //async        

            //Lista somente estoques que nao sao de apartamentos
            const dados = responseList["data"].filter(response => {

                if (response.subcategoria !== "Apartamento") {
                    response.id = response.id.padStart(4, '0');
                    return true;
                }

            });


            //informa a TBody, 
            b.table.insertLine(tbodyEstoques, dados);
            inserirLinkProEstoque();

            b.table.insertSearch(inpPesquisarEstoques, tbodyEstoques);

            // atualizarCards(dados)

        });
    }


    // Insere link pro estoque do produto em cada linha
    //===================================================================================================
    function inserirLinkProEstoque() {

        //Pega todas as linhas
        Array.from(tbodyEstoques.children).forEach(element => {

            element.addEventListener('click', e => {
                //Pega a id contida no dataset da linha
                const estoqueId = b.paraFloat(e.target.parentNode.dataset.id)

                b.inserirHash(`estoques/detalhes/${estoqueId}`)
            })
        });
    }




    




    //Preenche os cards com os dados da lista de movimentações do banco
    //===================================================================================================
    function atualizarCards(response) {


        let total = 0;

        response.forEach(element => {
            total += b.paraFloat(element.total);;

        });

        cardValorEstoque.textContent = b.paraMoedaReal(total);


    }









}

