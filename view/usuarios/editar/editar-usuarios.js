import b from '../../../biblioteca/js/biblioteca.js';

export function init(valueInit) {

    //Variaveis
    //=====================================================================================================
    //GLOBAIS
    //----------------------------------------------------------


    //Elements DOM
    //----------------------------------------------------------
    const tituloPage = document.querySelector('#modal-window__title-texto');//Tabela Central


    //Formulario
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-modal');//Formulario Adicionar




    //MASCARAS
    //======================================================================================================
    // b.maskMoeda(inpCusto);





    //Init==================================================================================================
    tituloPage.textContent = "Editar Usuário";
    b.form.preencher(formAdicionar, valueInit.dadosItem);







    //Eventos
    //======================================================================================================
    //BTN - Salvar----------------
    formAdicionar.addEventListener('submit', function (e) {
        e.preventDefault();

        //Pega o FORM que é o target do evento submit
        const form = e.target;

        if (validarForm(form)) {
            b.crud.editar(b.extractFormValues(form), "usuarios", response => {//async           
                b.modal.fechar()
                b.render.lineInTable(valueInit.elLinhaSelecionada, response, "usuarios");
            });
        }
    });









    //Functions==================================================================================================
    function validarForm(form) {
        let validate = true;

        if (form["adicionar-usuario-repetir-senha"].value !== form[3].value) {
            alert("As senhas nao conferem!")
            validate = false;
        }

        return validate;
    }


}