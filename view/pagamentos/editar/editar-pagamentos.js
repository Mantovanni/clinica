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
    const formModalPagamento = document.querySelector('#form-modal');//Formulario Adicionar
    const btnConfirmar = document.querySelector('#btn-salvar-modal')



    //Procedimentos
    //----------------------------------------------------------------
    const btnAdicionarProcedimento = document.querySelector('#btn-adicionar_procedimento');
    const btnLimparLista = document.querySelector('#btn-limpar_lista');
    const elTbody_TableInput = document.querySelector('#table-input_tbody');






    // Totais
    //----------------------------------------------------------------
    const inpSubtotal = document.querySelector('#subtotal')
    const inpDesconto = document.querySelector('#desconto')
    const inpTotal = document.querySelector('#total')





    //MASCARAS
    //==========================================================================================
    b.form.mask(formModalPagamento);














    //INIT / INICIAR
    //=====================================================================================================
    //=====================================================================================================

    listarAtendimentosProcedimentosTrasacoesById();


    tituloPage.textContent = "Atendimento - " + valueInit.dadosItem.id.padStart(4, '0');
    b.form.preencher(formModalPagamento, valueInit.dadosItem);




    // console.log(valueInit);













    //EVENTOS
    //=====================================================================================================
    //=====================================================================================================
    //Form - Salvar
    //------------------------------------------------------
    formModalPagamento.addEventListener('submit', function (e) {//passar conteúdo para uma função especifica
        e.preventDefault();

        confirmarPagamento()


    });


    //Input - Desconto
    //------------------------------------------------------
    inpDesconto.addEventListener('input', function (e) {
        e.preventDefault();

        calcularDesconto();

    });

    //Cancela o evento de enviar o form ao da enter dentro do input
    inpDesconto.addEventListener("keypress", function (e) {
        if (e.which == 13) { // se pressionar enter
            e.preventDefault();
        }
    });

    //Selecionar o campo ao clicar nele
    inpDesconto.addEventListener('focus', ev => {
        inpDesconto.select();
    })













    //FUNÇÕES
    //=====================================================================================================
    //=====================================================================================================


    // //Carregar Tabela - Faturamentos
    // //==================================================================================================
    // function buscarFaturamentoDetalhadoById() {


    //     //Função que lista todas a linhas de uma tabela no banco e retorna os dados
    //     b.crud.custom("listarFaturamentoDetalhado", "pagamentos", "", responseList => {  //async     

    //         //Extrai os dados da tabela e faz algum tratamento caso necessário.
    //         const dados = responseList["data"].map(response => {
    //             //Adiciona um zero a esquerda da ID
    //             response.id = response.id.padStart(2, '0');
    //             response.id = response.atendimentos_id.padStart(4, '0');

    //             response.abertura = formatarData(response.abertura);


    //             return response;
    //         });


    //     });

    // }





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




    //Insere uma transação altera o status_pagamento da tabela pagamentos
    //=======================================================================================
    function confirmarPagamento(params) {
        //Pega o FORM que é o target do evento submit


        //Trata os valores para ser inderidos no banco
        //---------------------------------------------------------------------------
        const formFiltrado = {};

        //atendimentos
        //--------------------------------
        formFiltrado.atendimentos = {};
        formFiltrado.atendimentos.id = globalAtendimentoData.id;
        formFiltrado.atendimentos.status_pagamento = "Recebido";


        //transacoes
        //--------------------------------      
        formFiltrado.transacoes = b.form.extractValues2(formModalPagamento);

        formFiltrado.transacoes.atendimentos_id = globalAtendimentoData.id;
        formFiltrado.transacoes.status = "Recebido";
        formFiltrado.transacoes.descricao = "Atendimento " + globalAtendimentoData.id.padStart(4, '0');
        formFiltrado.transacoes.tipo = "Recebido";
        formFiltrado.transacoes.forma_de_pagamento = "Dinheiro"; //adicionar na tela de faturar
        formFiltrado.transacoes.operacao = "Atendimento";



        //Função para inserir no banco
        b.crud.custom("confirmarPagamento", "atendimentos", formFiltrado, response => {//async   
            b.modal.fechar()

            console.log(response);
            // response.estoque_total = b.paraMoeda(0) + " " + response.unidade;
            // response.custo = valueInit.dadosItem.custo;
            const faturamentoParaLinhaData = response;

            faturamentoParaLinhaData.nome = globalAtendimentoData.nome;
            faturamentoParaLinhaData.id = globalAtendimentoData.id.padStart(4, '0');
            faturamentoParaLinhaData.abertura = b.formatTimeStampForDataUser(globalAtendimentoData.abertura);
            faturamentoParaLinhaData.status_pagamento = response.atendimentos.status_pagamento;



            const linhaCriada = b.table.insertLineNoDelete(valueInit.elLinhaSelecionada, faturamentoParaLinhaData, "pagamentos");

        }, { message: "Atendimento - " + globalAtendimentoData.id.padStart(4, '0') + " recebido." }
        ).then(() => {
            b.modal.fechar()
        });

    }















    //Busca no banco todos os dados do atendimento
    //=======================================================================================
    //buscarDadosCompletosDoAtendimentoById
    function listarAtendimentosProcedimentosTrasacoesById() {

        const data = {};
        //Pega a id passada por parâmetro pela função que cria a linha na tabela
        data.id = valueInit.dadosItem.id;


        //Função que busca no banco todos os dados daquele atendimentos nas tabelas relacionadas
        //Busca tambem o valor doa atendimento
        b.crud.custom("listarAtendimentosProcedimentosTrasacoesById", "atendimentos", data, responseList => {  //async    


            // console.log(responseList);
            //Coloca em uma variável global os dados do paciente.
            globalAtendimentoData = responseList["data"]["atendimento"];

            const procedimentosDoAtendimentoData = responseList["data"]["procedimentos"];



            // //Muda um conjunto de regras no layout na DOM de acordo com o status do atendimento
            // if (globalAtendimentoData.status == "Aberto") {
            //     mudarLayoutParaAtendimentoAberto(globalAtendimentoData)

            // } else if (globalAtendimentoData.status == "Concluido") {

            //     mudarLayoutParaAtendimentoConcluido(globalAtendimentoData)
            // }
console.log(globalAtendimentoData);
            mudarLayoutStatusPendente(globalAtendimentoData)

            //Preenche os campos do atendimento com os dados do banco
            preencherCamposFaturamento(globalAtendimentoData, procedimentosDoAtendimentoData)


            calcularSubtotal(procedimentosDoAtendimentoData);
            calcularDesconto(procedimentosDoAtendimentoData);


        });


    }



//=======================================================================================
    function mudarLayoutStatusPendente(globalAtendimentoData) {
        // console.log(globalAtendimentoData);


        //Se o pagamento esta pedente mostra o botão para confirmar pagamento
        if(globalAtendimentoData.status_pagamento == "Pendente"){

            // console.log("object");
            // btnConfirmar.style.display = "none";
            // btnConfirmar.classList.add("mostrar");
            btnConfirmar.classList.toggle("esconder")
        }
        
    }






















    //=======================================================================================
    function preencherCamposFaturamento(atendimentoData, procedimentosDoAtendimentoData) {




        //Preenche os dados do atendimento não relacionais
        //-------------------------------------------------------------
        b.form.preencher(formModalPagamento, atendimentoData);


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






    //------------------------------------------------------------------------------------------
    function calcularSubtotal(procedimentosDoAtendimentoData) {

        //Pega todos os campos total do produto
        // const inpTotalProdutoAll = document.querySelectorAll('[data-group="produto-total-input"]');


        //Soma o valor total do produto na linha
        // inpProdutoTotal.value = b.paraMoedaReal(b.paraFloat(inpProdutoQuantidade.value) * b.paraFloat(inpProdutoCusto.value));

        // Soma todos os valores totais dos produtos para informar o custo do item
        //     inpCusto.value = Array.from(inpTotalProdutoAll).reduce((total, element) => {
        //         return b.paraMoedaReal(b.paraFloat(total) + b.paraFloat(element.value));
        //     }, 0);
        // }

        // console.log(procedimentosDoAtendimentoData);
        inpSubtotal.value = Array.from(procedimentosDoAtendimentoData).reduce((total, procedimento) => {
            return b.paraMoedaReal(b.paraFloat(total) + b.paraFloat(procedimento.valor));
        }, 0);



    }





    //------------------------------------------------------------------------------------------
    function calcularDesconto(procedimentosDoAtendimentoData) {

        inpTotal.value = b.paraMoedaReal(b.paraFloat(inpSubtotal.value) - b.paraFloat(inpDesconto.value));


    }





















}