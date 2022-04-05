import  b from '../../../biblioteca/js/biblioteca.js';


export function init() {

    //VARIÁVEIS
    //=====================================================================================================
    //=====================================================================================================

    //Globais
    //----------------------------------------------------------
    const adicionarUrl = " ../view/transacoes/adicionar/adicionar-transacoes.html";
    const urlJs = "../../../view/transacoes/adicionar/adicionar-transacoes.js";//Url partir do render.js


    //Elements DOM
    //----------------------------------------------------------
    const btnAdicionar = document.querySelector('#acoes__button-adicionar');
    const tbody = document.querySelector('#tbody-central');

    const inpPesquisar = document.querySelector("#acoes__buscar");



    const btnNovaReceita = document.querySelector('#acoes__button-nova_receita')
    const btnNovaDespesa = document.querySelector('#acoes__button-nova_despesa');





    //INIT / INICIAR
    //=====================================================================================================
    //=====================================================================================================
    carregarTabela();







    //EVENTOS
    //=====================================================================================================
    //=====================================================================================================
    //BTN - Adicionar
    //------------------------------------------------------
    btnNovaDespesa.addEventListener('click', function (e) {
        b.modal.abrir("Nova Despesa");

        // Passa o elemento Janela Modal para a função render.page 
       b.render.pageModal(adicionarUrl, urlJs);//async
        // b.render.page(b.modal.content, adicionarUrl, urlJs);//async

    });
    btnNovaDespesa.click()








    //FUNÇÕES
    //=====================================================================================================
    //=====================================================================================================

    //Carregar Tabela
    //==================================================================================================
    function carregarTabela() {


        //Função que lista todas a linhas de uma tabela no banco e retorna os dados
        b.crud.listar("transacoes", responseList => {  //async     

            //Extrai os dados da tabela e faz algum tratamento caso necessário.
            const dados = responseList["data"].map(response => {
                //Adiciona um zero a esquerda da ID
                response.id = response.id.padStart(2, '0');
               
                return response;
            });
      


            //Função que cria a tabela na DOM utilizando os dados extraídos do banco.
            b.render.lineInTable(tbody, dados, "transacoes");
            
            //Insere a função de pesquisar na tabela
            //OBS. Adicionar essa função de forma automatica no futuro
            b.table.insertSearch(inpPesquisar, tbody);
        });

    }








    //==============================================================================================
}

