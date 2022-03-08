import b from '../../../biblioteca/js/biblioteca.js';

export function init(valueInit) {
       //VARIÁVEIS
    //=====================================================================================================
    //=====================================================================================================

    //Globais
    //----------------------------------------------------------

    //Elements DOM
    //----------------------------------------------------------
    const tituloPage = document.querySelector('#modal-window__title-texto');


    //Formulário
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-modal');//Formulario Adicionar




    //MASCARAS
    //==========================================================================================
    b.form.mask(formAdicionar);














    //INIT / INICIAR
    //=====================================================================================================
    //=====================================================================================================
    tituloPage.textContent = "Editar Pacientes";
    b.form.preencher(formAdicionar, valueInit.dadosItem);


















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

            b.crud.editar(formFiltrado, "pacientes", response => {//async   
                b.modal.fechar()



                response.estoque_total = b.paraMoeda(0) + " " + response.unidade;
                response.custo = valueInit.dadosItem.custo;


                const linhaCriada = b.render.lineInTable(valueInit.elLinhaSelecionada, response, "pacientes");             

            }).then(() => {
                b.modal.fechar()
            });

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




}