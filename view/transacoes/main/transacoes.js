import b from '../../../biblioteca/js/biblioteca.js';


export function init() {

    //VARIÁVEIS
    //=====================================================================================================
    //=====================================================================================================

    //Globais
    //----------------------------------------------------------
    const adicionarUrl = " ../view/transacoes/adicionar/adicionar-transacoes.html";
    const urlJs = "../../../view/transacoes/editar/editar-transacoes.js";//Url partir do render.js


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


    console.log(new Date().toLocaleString());




    //EVENTOS
    //=====================================================================================================
    //=====================================================================================================
    //BTN - Nova Despesa
    //------------------------------------------------------
    btnNovaDespesa.addEventListener('click', function (e) {
        b.modal.abrir("Nova Despesa");

        const dataInitModal = {};

        dataInitModal.dadosItem = {
            tipo: "Despesa"
        };

        dataInitModal.metodo = "Salvar";


        // Passa o elemento Janela Modal para a função render.page 
        b.render.pageModal(adicionarUrl, urlJs, dataInitModal);//async
        // b.render.page(b.modal.content, adicionarUrl, urlJs);//async

    });


    //BTN - Nova Receita
    //------------------------------------------------------
    btnNovaReceita.addEventListener('click', function (e) {
        b.modal.abrir("Nova Receita");

        const dataInitModal = {};

        dataInitModal.dadosItem = {
            tipo: "Receita"
        };
        dataInitModal.metodo = "Salvar";

        // Passa o elemento Janela Modal para a função render.page 
        b.render.pageModal(adicionarUrl, urlJs, dataInitModal);//async
        // b.render.page(b.modal.content, adicionarUrl, urlJs);//async

    });
    // btnNovaDespesa.click()








    //FUNÇÕES
    //=====================================================================================================
    //=====================================================================================================

    //Carregar Tabela
    //==================================================================================================
    function carregarTabela() {


        //Função que lista todas a linhas de uma tabela no banco e retorna os dados
        b.crud.listar("transacoes", responseList => {  //async     

            //Extrai os dados da tabela e faz algum tratamento caso necessário.
            const transacoesData = responseList["data"].map(response => {
                //Adiciona um zero a esquerda da ID
                response.id = response.id.padStart(2, '0');

                return response;
            });



            //Função que cria a tabela na DOM utilizando os dados extraídos do banco.
            // b.table.insertLineObject(tbody, dados, "transacoes");


            //Função que cria a tabela na DOM utilizando os dados extraídos do banco.
            const linhasCriadas = b.table.insertLineObject(tbody, {
                dados: transacoesData, tableName: "transacoes",
                afterCreateNewLine(newLineCreated, newLineData) {

                    //Cria uma referência para célula Status
                    const tdStatus = newLineCreated.querySelector('[data-name=status]');
                    //Pega valor da célula Status
                    const statusValue = tdStatus.textContent;
                    // Limpa Célula do Status
                    tdStatus.textContent = "";

                    //Cria e insere div status value
                    tdStatus.insertAdjacentHTML("afterbegin", `
                        <div class="status_value">${statusValue}</div>
                        `)

                    //Cria uma referência para célula Status Value
                    const divStatusValue = tdStatus.firstChild.nextElementSibling


                    //Muda a cor de acordo com o valor do Status
                    //--------------------------------------------------------------------
                    switch (statusValue) {
                        case "Pago":
                            // divStatusValue.classList.toggle("");
                            divStatusValue.style.backgroundColor = '#048bff';//azul
                            break;
                        case "Pendente":
                            // divStatusValue.classList.toggle("");
                            divStatusValue.style.backgroundColor = '#118406';//verde
                            break;


                    }

                }
            });

            //Insere a função de pesquisar na tabela
            //OBS. Adicionar essa função de forma automatica no futuro
            b.table.insertSearch(inpPesquisar, tbody);
        });

    }








    //==============================================================================================
}

