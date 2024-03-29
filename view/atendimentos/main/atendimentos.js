import b from '../../../biblioteca/js/biblioteca.js';


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




    //Jogar para biblioteca
    const formatarData = (data) => {
        let d = new Date(data);
        // Month retorna entre 0 e 11, por isso a adição +1
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }



    //FUNÇÕES
    //=====================================================================================================
    //=====================================================================================================

    //Carregar Tabela
    //==================================================================================================
    function carregarTabela() {


        //Função que lista todas a linhas de uma tabela no banco e retorna os dados
        b.crud.custom("listarAtendimentosClientes", "atendimentos", "", responseList => {  //async     

            //Extrai os dados da tabela e faz algum tratamento caso necessário.
            const listaDeAtendimentos = responseList["data"].map(response => {

                // console.log(response);
                //Adiciona um zero a esquerda da ID
                response.id = response.id.padStart(4, '0');

                response.abertura = formatarData(response.abertura);


                return response;
            });



            //Função que cria a tabela na DOM utilizando os dados extraídos do banco.
            const linhasCriadas = b.table.insertLineObject(tbody, {
                dados: listaDeAtendimentos, tableName: "atendimentos",
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
                    switch (statusValue) {
                        case "Concluido":
                            // divStatusValue.classList.toggle("");
                            divStatusValue.style.backgroundColor = '#048bff';//azul
                            break;
                        case "Aberto":
                            // divStatusValue.classList.toggle("");
                            divStatusValue.style.backgroundColor = '#22e10b';//verde
                            break;


                    }

                }
            });


            //CLICK TESTEg
            // document.querySelector("#tbody-central > tr > td.w-22.cursor-pointer").click();



            //    console.log(linhasCriadas);

            //Insere a função de pesquisar na tabela
            //OBS. Adicionar essa função de forma automática no futuro
            b.table.insertSearch(inpPesquisar, tbody);
        });

    }








    //==============================================================================================
}

