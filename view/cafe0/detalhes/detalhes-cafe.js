import b from '../../../biblioteca/js/biblioteca.js';
import * as controller from '../controller/controllerCafe.js';





export function init(initId) {
    //Variaveis
    //=====================================================================================================
    //=====================================================================================================
    //GLOBAIS
    //----------------------------------------------------------
    let listaItensAsync = [];
    const dataFormValues = [];
    let contador = 0;


    //Elements DOM
    //----------------------------------------------------------
    const btnImprimirCafeDetalhes = document.querySelector('#btn-imprimir-cafe-detalhes');//
    const elTbodyCafeItens = document.querySelector('#cafe-itens_tbody');//Tbody

    const elDataCafe = document.querySelector('#detalhes-data-cafe');//H!
    const elIdCafe = document.querySelector('#detalhes-id-cafe');//H!


    // CARDS---------------------------
    const eleCardCustoTotal = document.querySelector('#cards-custo_total-valor');
    const eleCardQuantidade = document.querySelector('#cards-quantidade-valor');
    const cardsHospedes = document.querySelector('#cards-hospedes-valor')
    const cardsClintesCusto = document.querySelector('#cards-hospedes_custo-valor')




    //Formulario
    //--------------------------------------
    const formCafe = document.querySelector('#form-cafe');//

    //MASCARAS
    //=================================================================================================





    //Init
    //======================================================================================================
    //======================================================================================================

    // console.log(b.paraFloat("45.46")); 



    buscarDadosDoCafe();










    //Eventos
    //======================================================================================================
    //======================================================================================================
    // BTN - btnImprimirCafe---------------------------------------------------
    btnImprimirCafeDetalhes.addEventListener('click', ev => window.print())








    //Funções
    //======================================================================================================
    //======================================================================================================

    //Carregar Tabela
    //===============================================================================================
    //Busca detalhes do cafe para exibir na tela
    function buscarDadosDoCafe() {

        b.crud.custom("listarCafeItensById", "cafes", formatarObjetoParaEnviarData(), responseList => {  //async   
            // console.log(responseList);

            //Id cafe
            elIdCafe.textContent = responseList["data"][0].cafe_id.padStart(4, '0');
            //Data do Café
            elDataCafe.textContent = b.formatDataISOforDataUser(responseList["data"][0].data);


            preencherCards(responseList["data"]);

            //informa a TBody, 
            b.render.lineInTable(elTbodyCafeItens, formatarItensParaTabela(responseList["data"]));


        }), true;
    }




    //formtarObjetoParaEnviarData
    //=====================================================================================================
    //Formatar Objeto para o request
    function formatarObjetoParaEnviarData(responseList) {
        //Dados para ser enviado ao controller db
        const data = {};
        //Id vinda como parametro da init da pagina
        data.id = initId;

        return data;
    }



    //formatarItensParaTabela
    //=====================================================================================================
    //Prepara os itens para caregar na tabela
    function formatarItensParaTabela(responseList) {
        //Trata o array com as resposta vinda do ctronller antes de passa para função que cria a tabela
        const responseTratada = responseList.map(response => {
            //Completa a String com  zeros
            response.id = response.id.padStart(2, '0');
            response.total = response.custo * response.quantidade;
            response.quantidade = b.paraMoeda(response.quantidade) + " " + response.unidade;
            return response;
        });

        return responseTratada;
    }




    function preencherCards(responseList) {



        //Soma o custo de todos os totais de itens
        const custoTotalCafes = responseList.reduce((total, response) => {
            return b.paraFloat(total) + (response.custo * response.quantidade);
        }, 0);

  

        //Insere o custo total no Card
        eleCardCustoTotal.textContent = b.paraMoedaReal(custoTotalCafes)
        eleCardQuantidade.textContent = responseList.length.toString().padStart(2, 0);
        cardsHospedes.textContent = responseList[0].hospedes;
        cardsClintesCusto.textContent = b.paraMoedaReal(custoTotalCafes / b.paraFloat(responseList[0].hospedes));
    

    }




}