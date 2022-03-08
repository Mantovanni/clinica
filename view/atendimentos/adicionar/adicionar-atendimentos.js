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
    //BTN - Salvar
    //------------------------------------------------------
    formAdicionar.addEventListener('submit', function (e) {
        e.preventDefault();

        //Envia o elemento form com todos os seus inputs para função salvarForm
        salvarForm(e.target);
     
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
 
             //Response contem o elemento salvo junto de sua ID criada no banco
             b.crud.salvar(b.form.extractValues(form), "pacientes", responseItemSalvo => {//async
                 b.modal.fechar();
 
        
                // console.log(responseItemSalvo.id);

                //Adicionar zero a esquerda //corrigir erro
                //  responseItemSalvo.id = responseItemSalvo.id.padStart(2, '0');
            
 
                 // Função que cria e insere a linha na tabela com os dados do formulário que foram salvos no banco e retornaram para ser tratados
                 const linhaCriada = b.render.lineInTable(tbody, responseItemSalvo, "pacientes");
            
                 
             }, true).then(()=>{
                 b.modal.fechar()
             });
            
         }
  }



    //Adicionar Autocomplete
    //=======================================================================================












}


