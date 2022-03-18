import  b from '../../../biblioteca/js/biblioteca.js';


export function init() {

    //VARIÁVEIS
    //=====================================================================================================
    //=====================================================================================================

    //Globais
    //----------------------------------------------------------
    const adicionarUrl = " ../view/atendimentos/adicionar/adicionar-atendimentos.html";
    const urlJs = "../../../view/atendimentos/editar/editar-atendimentos.js";//Url partir do render.js


    //Elements DOM
    //----------------------------------------------------------
    const btnAdicionar = document.querySelector('#acoes__button-adicionar');
    const tbody = document.querySelector('#tbody-central');

    const inpPesquisar = document.querySelector("#acoes__buscar");






    //INIT / INICIAR
    //=====================================================================================================
    //=====================================================================================================
    carregarTabela();







    //EVENTOS
    //=====================================================================================================
    //=====================================================================================================
    //BTN - Adicionar
    //------------------------------------------------------
    btnAdicionar.addEventListener('click', function (e) {
        b.modal.abrir("Novo Atendimento");

        // Passa o elemento Janela Modal para a função render.page 
       b.render.pageModal(adicionarUrl, urlJs);//async
        //  b.render.page(b.modal.content, adicionarUrl, urlJs);//async

    });
    // btnAdicionar.click()








    //FUNÇÕES
    //=====================================================================================================
    //=====================================================================================================

    //Carregar Tabela
    //==================================================================================================
    function carregarTabela() {


        //Função que lista todas a linhas de uma tabela no banco e retorna os dados
        b.crud.listar("atendimentos", responseList => {  //async     

            //Extrai os dados da tabela e faz algum tratamento caso necessário.
            const dados = responseList["data"].map(response => {
                //Adiciona um zero a esquerda da ID
                response.id = response.id.padStart(2, '0');
               
                return response;
            });
      


            //Função que cria a tabela na DOM utilizando os dados extraídos do banco.
            b.render.lineInTableDesc(tbody, dados, "atendimentos");
            
            //Insere a função de pesquisar na tabela
            //OBS. Adicionar essa função de forma automática no futuro
            b.table.insertSearch(inpPesquisar, tbody);
        });

    }








    //==============================================================================================
}

