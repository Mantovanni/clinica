import b from '../../../biblioteca/js/biblioteca.js';



export function init(valueInit) {
    //VARIÁVEIS
    //=====================================================================================================
    //=====================================================================================================

    //Globais
    //----------------------------------------------------------


    //Elements DOM
    //----------------------------------------------------------
    const tbody = document.querySelector('#tbody-central');//Tabela Central
    const tituloPage = document.querySelector('#modal-window__title-texto');

    const selectStatus = document.querySelector('#status');
    const inpDataPagamento = document.querySelector('#data_pagamento')






    //Formulário
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-modal');//Formulario Adicionar




    //MASCARAS
    //==========================================================================================
    // Aplica mascaras no form
    b.form.mask(formAdicionar);













    //INIT / INICIAR
    //=====================================================================================================
    //=====================================================================================================
    // tituloPage.textContent = "Adicionar Pacientes";







    //EVENTOS
    //=====================================================================================================
    //=====================================================================================================
    //Form - Adicionar / Novo
    //------------------------------------------------------
    formAdicionar.addEventListener('submit', function (e) {
        e.preventDefault();

        //Envia o elemento form com todos os seus inputs para função salvarForm
        salvarForm(e.target);

    });


    //Select - Status
    //------------------------------------------------------
    selectStatus.addEventListener('change', function (e) {
        e.preventDefault();

        // console.log(e.target.value);

        if (e.target.value == "Pago") {
            inpDataPagamento.removeAttribute("disabled");

            //Pega data de hoje
            const today = new Date().toISOString().split('T')[0];//hoje
            //Insere um limite máximo de data no campo
            inpDataPagamento.setAttribute('max', today);
            //Coloca a data atual
            inpDataPagamento.value = today;


            inpDataPagamento.dataset.ignore = "false";

            

            console.log(inpDataPagamento.value);

        } else if (e.target.value == "Pendente") {
            inpDataPagamento.setAttribute("disabled", true);

            inpDataPagamento.value = "";
            // console.log(inpDataPagamento.value);

            //Se for pendente ignora o campo de data de pagamento
            inpDataPagamento.dataset.ignore = "true";
        }


    });














    //FUNÇÕES
    //=====================================================================================================
    //=====================================================================================================


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



    //Salva os dados do formulário no banco de dados
    //=======================================================================================
    function salvarForm(form) {

        if (validarForm(form)) {

            
            const formData  = b.form.extractValues2(form);
            console.log(formData);

            //Response contem o elemento salvo junto de sua ID criada no banco
            b.crud.salvar(formData, "transacoes", responseItemSalvo => {//async
                b.modal.fechar();


                // console.log(responseItemSalvo.id);

                //Adicionar zero a esquerda //corrigir erro
                //  responseItemSalvo.id = responseItemSalvo.id.padStart(2, '0');


                // Função que cria e insere a linha na tabela com os dados do formulário que foram salvos no banco e retornaram para ser tratados
                const linhaCriada = b.render.lineInTable(tbody, responseItemSalvo, "transacoes");


            }, true).then(() => {
                b.modal.fechar()
            });

        }
    }






}


