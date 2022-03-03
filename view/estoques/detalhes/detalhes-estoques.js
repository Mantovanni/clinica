import b from '../../../biblioteca/js/biblioteca.js';


export function init(idInit) {


    //Variaveis
    //==============================================================================================================
    //GLOBAIS
    //----------------------------------------------------------
    const transferirUrl = "../view/controller/movimentacoes/transferir/transferir.html";
    const transferirJs = "../../../view/controller/movimentacoes/transferir/transferir.js";//Url partir do render.js



    //Elements DOM
    //----------------------------------------------------------
    const tbodyProdutos = document.querySelector('#tbody-central-produtos');
    const inpPesquisarProdutos = document.querySelector("#acoes__buscar-produtos");

    const tbodyMovimentacoes = document.querySelector('#tbody-central-movimentacoes');
    const inpPesquisarMovimentacoes = document.querySelector("#acoes__buscar-movimentacoes");

    const eleTituloPagina = document.querySelector('#c-view__title-text');


    // Botoes
    //----------------------------------------------------------
    const btnTransferir = document.querySelector("#btn-transferir");
    const btnEntrada = document.querySelector("#btn-entrada");
    const btnSaida = document.querySelector("#btn-saida");


    //CARDS
    //----------------------------------------------------------
    const cardValorEstoque = document.querySelector("#card-valor_estoque");




    //Init==========================================================================================================
    //Busca dados de todos os estoques
    buscarDadosEstoque();

    buscarProdutosDeAllEstoques(idInit);
    listarMovimentacoesPorEstoque(idInit);



    //Eventos
    //==============================================================================================================

    //Recebe dados do estoque que vem de uma consulta ao banco
    function ativarBotoes(dadosEstoque) {


        //BTN - Entrada ================================================================
        btnEntrada.addEventListener('click', ev => {

            b.modal.abrir("Entrada - " + dadosEstoque.nome);

            const dataInit = {
                layout: "entrada",
                estoque: dadosEstoque// estoque , categoria e id  
              
            }

            // Passa o elemento Janela Modal para a função render.page 
            b.render.pageModal(transferirUrl, transferirJs, dataInit)
                .then(response => {
                    //Se cancelar ou fechar a promisse retorna false
                    if (response) {
                        buscarProdutosDeAllEstoques(idInit);
                        listarMovimentacoesPorEstoque(idInit);
                    }

                });

        })

        //BTN - Saida ================================================================
        btnSaida.addEventListener('click', ev => {

            b.modal.abrir("Saída - " + dadosEstoque.nome);

            const dataInit = {
                layout: "saida",             
                estoque: dadosEstoque// estoque , categoria e id
            }

            // Passa o elemento Janela Modal para a função render.page 
            b.render.pageModal(transferirUrl, transferirJs, dataInit)
                .then(response => {
                    //Se cancelar ou fechar a promisse retorna false
                    if (response) {
                        buscarProdutosDeAllEstoques(idInit);
                        listarMovimentacoesPorEstoque(idInit);
                    }

                });

        })
    }




    //Funções
    //==============================================================================================================


    //Busca dados do estoque
    //===================================================================================================
    function buscarDadosEstoque() {//Async

        b.crud.listarById(idInit, "estoques", (response) => {

            eleTituloPagina.textContent = "Estoque - " + response["data"].nome;

            //Passa os dados do estoque para os eventoos dos botoes
            ativarBotoes(response["data"])
        });

    }




    //Carregar Tabela PRODUTOS
    //===================================================================================================
    function buscarProdutosDeAllEstoques(estoqueId) {
        const data = {
            estoque: estoqueId //todos os estoques
        };

        b.crud.custom("listarEstoquesProdutos", "estoques", data, responseList => {  //async        

            const responseTreated = responseList["data"].map(response => {
                response.id = response.id.padStart(4, '0');
                response.quantidade = b.paraMoeda(response.estoque_total) + " " + response.unidade;
                response.total = response.estoque_total * response.custo;
                return response;
            });

            //informa a TBody, 
            b.table.insertLine(tbodyProdutos, responseTreated);
            inserirLinkProEstoqueProduto();

            b.table.insertSearch(inpPesquisarProdutos, tbodyProdutos);

            atualizarCards(responseTreated)

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


    //Carregar Tabela Movimentações
    //===================================================================================================
    function listarMovimentacoesPorEstoque(estoqueId) {
        const data = {
            estoque: estoqueId
        };


        b.crud.custom("listarMovimentacoesPorEstoque", "movimentacoes", data, responseList => {  //async    

            const responseTreated = responseList["data"].map(response => {

                response.total = response.quantidade * response.valor;
                response.valor = b.paraMoeda(response.valor) + " / " + response.unidade;
                response.quantidade = b.paraMoeda(response.quantidade) + " " + response.unidade;
                return response

            });


            b.table.insertLineDesc(tbodyMovimentacoes, responseTreated, "movimentacoes", () => {
                //after delete
                buscarProdutosDeAllEstoques(idInit);
                // listarMovimentacoesPorEstoque(idInit);
            });

            b.table.insertSearch(inpPesquisarMovimentacoes, tbodyMovimentacoes);

        });
    }







    //Recebe os dados da tabela de produtos e faz os calculos
    //===================================================================================================
    function atualizarCards(response) {

        let total = 0;

        response.forEach(element => {
            total += b.paraFloat(element.total);;

        });

        cardValorEstoque.textContent = b.paraMoedaReal(total);

    }









}

