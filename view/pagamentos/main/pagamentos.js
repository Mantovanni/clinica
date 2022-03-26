import b from '../../../biblioteca/js/biblioteca.js';


export function init() {

    //VARIÁVEIS
    //=====================================================================================================
    //=====================================================================================================

    //Globais
    //----------------------------------------------------------
    const adicionarUrl = " ../view/pagamentos/adicionar/adicionar-pagamentos.html";
    const urlJs = "../../../view/pagamentos/adicionar/adicionar-pagamentos.js";//Url partir do render.js


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
    // btnAdicionar.addEventListener('click', function (e) {
    //     b.modal.abrir("Adicionar Pagamentos");

    //     // Passa o elemento Janela Modal para a função render.page 
    //    b.render.pageModal(adicionarUrl, urlJs);//async
    //     // b.render.page(b.modal.content, adicionarUrl, urlJs);//async

    // });
    // btnAdicionar.click()







    //Jogar para biblioteca====================================={{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}
    const formatarData = (data) => {
        let d = new Date(data);
        // Month retorna entre 0 e 11, por isso a adição +1
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
    //FUNÇÕES
    //=====================================================================================================
    //=====================================================================================================

    //Carregar Tabela - Faturamentos
    //==================================================================================================
    function carregarTabela() {


        //Função que lista todas a linhas de uma tabela no banco e retorna os dados
        b.crud.custom("listarFaturamentoDetalhado", "pagamentos", "", responseList => {  //async     

            //Extrai os dados da tabela e faz algum tratamento caso necessário.
            const dados = responseList["data"].map(response => {
                //Adiciona um zero a esquerda da ID
                response.id = response.id.padStart(2, '0');
                response.atendimentos_id = response.atendimentos_id.padStart(4, '0');
                
                response.abertura = formatarData(response.abertura);

        
                return response;
            });



            //Função que cria a tabela na DOM utilizando os dados extraídos do banco.
            b.table.insertLineNoDelete(tbody, dados, "pagamentos");

            //CLICK
            // document.querySelector("#tbody-central > tr > td.w-22.cursor-pointer").click();

            //Insere a função de pesquisar na tabela
            //OBS. Adicionar essa função de forma automatica no futuro
            b.table.insertSearch(inpPesquisar, tbody);
        });

    }








    //==============================================================================================
}

