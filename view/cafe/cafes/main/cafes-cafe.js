import b from '../../../../biblioteca/js/biblioteca.js';
// import * as controller from '../controller/controllerCafe.js';


export function init(init) {


    //Variaveis
    //==============================================================================================================
    //GLOBAIS
    //----------------------------------------------------------


    const dataProduto = {}



    //Elements DOM
    //----------------------------------------------------------
    const btnAdicionar = document.querySelector('#acoes__button-adicionar');
    const tbodyCentral = document.querySelector('#tbody-central');

    const btnPrintCafes = document.querySelector('#btn-print-cafes');

    const inpPesquisar = document.querySelector("#acoes__buscar");

    // CARDS---------------------------
    const cardCustoTotal = document.querySelector('#card-custo_total');
    const cardCustoHospedeTotal = document.querySelector('#card-custo_hospede_total');








    //MASCARAS
    //==============================================================================================================
    // b.maskMoeda(inpValor);





    //Init==========================================================================================================
    addEventoBotoes();
    carregarTabela();




    //Eventos
    //==============================================================================================================
    //BTN - Adicionar------------------------------------------------------------------------
    function addEventoBotoes(dataCafe) {
        btnAdicionar.addEventListener('click', function (e) {

            b.inserirHash("cafe/cafes/form");
        });
    }



    //BTN Imprimir cafes -----------------------------------------------------------------------
    btnPrintCafes.addEventListener('click', ev => window.print())








    //Funções
    //==============================================================================================================

    //Carregar Tabela
    //===================================================================================================
    function carregarTabela() {


        b.crud.custom("listarAllCafeItens", "cafes", "", responseList => {  //async        
            // console.log(responseList);

            //Trata o array com as resposta vinda do ctronller antes de passa para função que cria a tabela    
            const responseTratada = responseList["data"].map(response => {
                //Completa a String com  zeros
                response.id = response.id.padStart(4, '0');
                response.hospedes = response.hospedes.padStart(3, '0');
                response.quantidade_itens = response.quantidade_itens.padStart(2, '0');
                response.hospede_custo = response.custo / response.hospedes


                return response;
            });



            //informa a TBody, 
            b.table.insertLineDesc(tbodyCentral, responseTratada, "cafes", ()=>{
         
                carregarTabela();
            });

            // Adiciona a opção de abrir detalhes do item nos itens/linhas da tabela
            carregarViewCafeNaLinha();
            b.table.insertSearch(inpPesquisar, tbodyCentral);


            atualizarCards(responseTratada);
        }), true;
    }





    // Adiciona a opção de abrir detalhes do item nos itens/linhas da tabela
    //===================================================================================================
    function carregarViewCafeNaLinha() {

        //Pega todas as linhas
        Array.from(tbodyCentral.children).forEach(element => {


            element.addEventListener('click', e => {
                

                //Pega a id contida no dataset da linha
                const cafeId = b.paraFloat(e.target.parentNode.dataset.id)

                b.inserirHash(`cafe/cafes/detalhes/${cafeId}`)


            })
        });
    }





    //Preenche os cards 
    //===================================================================================================
    function atualizarCards(responseTratada) {

        let hospedes = 0;
        let custo = 0;

        responseTratada.forEach(element => {
            custo +=  b.paraFloat(element.custo);;
            hospedes +=  b.paraFloat(element.hospedes);
        });

        cardCustoTotal.textContent = b.paraMoedaReal(custo);
        cardCustoHospedeTotal.textContent = b.paraMoedaReal(custo / hospedes);


        // const data = {}
        // data.id = idProdutoInit;

        // b.crud.custom("quantidadePorProduto", "estoques", data, response=>{

        //     cardQuantidadeEstoque.textContent = b.paraMoeda(response.quantidade_total) + " " + response.unidade;
        //     cardValorEstoque.textContent = b.paraMoedaReal(response.custo)

        // })

    }








}

