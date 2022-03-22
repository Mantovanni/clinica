import b from '../../../biblioteca/js/biblioteca.js';

export function init(valueInit) {
       //VARIÁVEIS
    //=====================================================================================================
    //=====================================================================================================

    //Globais
    //----------------------------------------------------------
    let globalAtendimentoData = {};




    //Elements DOM
    //----------------------------------------------------------
    const tituloPage = document.querySelector('#modal-window__title-texto');


    //Formulário
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-modal');//Formulario Adicionar




    //Procedimentos
    //----------------------------------------------------------------
    const btnAdicionarProcedimento = document.querySelector('#btn-adicionar_procedimento');
    const btnLimparLista = document.querySelector('#btn-limpar_lista');
    const elTbody_TableInput = document.querySelector('#table-input_tbody');


    //MASCARAS
    //==========================================================================================
    b.form.mask(formAdicionar);














    //INIT / INICIAR
    //=====================================================================================================
    //=====================================================================================================

    carregarDadosCompletosAtendimentoById();


    tituloPage.textContent = "Faturar Atendimento - " + valueInit.dadosItem.atendimentos_id.padStart(4, '0');
    b.form.preencher(formAdicionar, valueInit.dadosItem);




console.log(valueInit);













    //EVENTOS
    //=====================================================================================================
    //=====================================================================================================
    //BTN - Salvar
    //------------------------------------------------------
    formAdicionar.addEventListener('submit', function (e) {
        e.preventDefault();

        //Pega o FORM que é o target do evento submit
        const form = e.target;

        if (validarForm(form)) {


            const formFiltrado = b.form.extractValues(form);

            console.log(formFiltrado);

            b.crud.editar(formFiltrado, "pagamentos", response => {//async   
                b.modal.fechar()



                response.estoque_total = b.paraMoeda(0) + " " + response.unidade;
                response.custo = valueInit.dadosItem.custo;


                const linhaCriada = b.render.lineInTable(valueInit.elLinhaSelecionada, response, "pagamentos");             

            }).then(() => {
                b.modal.fechar()
            });

        }
    });










    //FUNÇÕES
    //=====================================================================================================
    //=====================================================================================================


    //Carregar Tabela - Faturamentos
    //==================================================================================================
    function buscarFaturamentoDetalhadoById() {


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


        });

    }






    //Cria regras para validar o formulário
    //=======================================================================================
    function validarForm(form) {
        let validate = true;

        // if (form["adicionar-usuario-repetir-senha"].value !== form[3].value) {
        //     alert("As senhas nao conferem!")
        //     validate = false;
        // }

        return validate;
    }













    //Busca no banco todos os dados do atendimento
    //=======================================================================================
    //buscarDadosCompletosDoAtendimentoById
    function carregarDadosCompletosAtendimentoById() {

        const data = {};
        //Pega a id passada por parâmetro pela função que cria a linha na tabela
        data.id = valueInit.dadosItem.atendimentos_id;


        //Função que busca no banco todos os dados daquele atendimentos nas tabelas relacionadas
        b.crud.custom("carregarDadosCompletosAtendimentoById", "atendimentos", data, responseList => {  //async    


            console.log(responseList);
            //Coloca em uma variável global os dados do paciente.
            globalAtendimentoData = responseList["data"]["atendimento"];

            const procedimentosDoAtendimentoData = responseList["data"]["procedimentos"];



            // //Muda um conjunto de regras no layout na DOM de acordo com o status do atendimento
            // if (globalAtendimentoData.status == "Aberto") {
            //     mudarLayoutParaAtendimentoAberto(globalAtendimentoData)

            // } else if (globalAtendimentoData.status == "Concluido") {

            //     mudarLayoutParaAtendimentoConcluido(globalAtendimentoData)
            // }



            //Preenche os campos do atendimento com os dados do banco
            preencherCamposFaturamento(globalAtendimentoData, procedimentosDoAtendimentoData)

        });


    }






  //=======================================================================================
  function preencherCamposFaturamento(atendimentoData, procedimentosDoAtendimentoData) {




    //Preenche os dados do atendimento não relacionais
    //-------------------------------------------------------------
    // b.form.preencher(formModalAtendimento, atendimentoData);


    //Preenche os dados sobre o paciente na tela
    // ------------------------------------------------------------
    //Retorna o valor do objeto e não sua referencia
    // const pacienteData = b.objectValue(atendimentoData);
    // pacienteData.id = atendimentoData.pacientes_id;

    // //Campos das Divs
    // inserirDadosPaciente(pacienteData);
    // //Campo Nome
    // inpNomePaciente.value = atendimentoData.nome;


    //Preenche os Procedimentos
    // ------------------------------------------------------------
    preencherProcedimento(procedimentosDoAtendimentoData)



}












    //Adiciona uma linha vazia de procedimentos
    //------------------------------------------------------------------------------------
    function preencherProcedimento(atendimentoData) {


        // console.log(atendimentoData);
        //Formata os dados de estoque para inserir em movimentações.
        // let data = {};
        // data = atendimentoData.map(element => {
        //     data = element;

        //     //Mudar estoque total para estoque
        //     data.produtos_id = element.id;
        //     data.estoque_atual = element.estoque_total;
        //     data.quantidade = element.estoque_total;

        //     return data;
        // });


        elTbody_TableInput.innerHTML = "";

        //insere uma linha de inputs recebendo a tabela, e os dados para o autocomplete
        b.table.insertLineInputFilled2(elTbody_TableInput,
            {
                data: atendimentoData,
                afterCreateNewLine: (eleNewLine) => {

                    const inpNome = eleNewLine.cells[1].firstElementChild.firstElementChild;

                    // //Se nao encontrar nenhum valor e sair do campo , limpa ele
                    // //------------------------------------------------------------------------------------------
                    // inpNome.addEventListener('focusout', resetarInvalido);
                    // inpNome.addEventListener('focus', resetarInvalido);
                    // function resetarInvalido(e) {
                    //     inpNome.value = "";
                    // }



                }
              
            });




    }












}