import b from '../../../biblioteca/js/biblioteca.js';


export function init(valueInit) {


    //Variaveis
    //==============================================================================================================
    //GLOBAIS
    //----------------------------------------------------------


    //Elements DOM
    //----------------------------------------------------------
    const tbodyItens = document.querySelector('#tbody-central');//Tabela Central

    //Formulario
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-modal');//Formulario Adicionar

    const tituloPage = document.querySelector('#modal-window__title-texto');//Tabela Central




    //MASCARAS
    //==============================================================================================================
    // b.maskMoeda(inpCusto);





    //Init//========================================================================================================
    tituloPage.textContent = "Adicionar Usuário";







    //Eventos
    //==============================================================================================================
    //BTN - Salvar----------------
    formAdicionar.addEventListener('submit', function (e) {
        e.preventDefault();

        //Pega o FORM que é o target do evento submit
        const form = e.target;

        if (validarForm(form)) {           
            //Response contem o elemento salvo junto de sua ID criada no banco
            b.crud.salvar(b.form.extractValues(form), "usuarios", responseItemSalvo => {//async

                b.modal.fechar();

                //informa a TBody, 
                b.render.lineInTable(tbodyItens, responseItemSalvo, "usuarios");
            });
        }
    });






    //Funções
    //==============================================================================================================
    function validarForm(form) {
        let validate = true;

        if (form["adicionar-usuario-repetir-senha"].value !== form[3].value) {
            alert("As senhas nao conferem!")
            validate = false;
        }

        return validate;
    }

}


