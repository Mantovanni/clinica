import b from '../../../biblioteca/js/biblioteca.js';



export function init(valueInit) {
    //VARIÁVEIS
    //=====================================================================================================
    //=====================================================================================================

    //Globais
    //========================================================================
    //Lista usado para o autocomplete
    let listaPacientesAsync = [];



    //Elements DOM
    //========================================================================
    //Geral
    //----------------------------------------------------------------
    const tbody = document.querySelector('#tbody-central');//Tabela Central
    const tituloPage = document.querySelector('#modal-window__title-texto');//Titulo Modal
    const formAdicionar = document.querySelector('#form-modal');//Formulário Adicionar



    //Paciente
    //----------------------------------------------------------------
    const inpNomePaciente = document.querySelector('#nome')

    const divIdade = document.querySelector('#paciente-idade')
    const divAtendimentos = document.querySelector('#paciente-atendimentos')
    const primeiraConsulta = document.querySelector('#paciente-primeira_consulta')
    const sexo = document.querySelector('#paciente-sexo')





    //MASCARAS
    //==========================================================================================
    // Aplica mascaras no form
    b.form.mask(formAdicionar);













    //INIT / INICIAR
    //=====================================================================================================
    //=====================================================================================================
    // tituloPage.textContent = "Adicionar Pacientes";

    buscarListaDeProdutos();







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



                // Função que cria e insere a linha na tabela com os dados do formulário que foram salvos no banco e retornaram para ser tratados
                const linhaCriada = b.render.lineInTable(tbody, responseItemSalvo, "pacientes");


            }, true).then(() => {
                b.modal.fechar()
            });

        }
    }




    //Busca no banco de dados a lista dos pacientes
    //=======================================================================================
    function buscarListaDeProdutos() {
        b.crud.listar("pacientes", response => { //async 


            listaPacientesAsync = response["data"];

            insertAutoCompletePacientes();
        })


    }



    //Insere a função de auto complete no input Paciente
    //=======================================================================================
    function insertAutoCompletePacientes() {//async /buscarListaDeProdutos


        b.autoComplete.ativar("#nome", listaPacientesAsync, selectedKeyData => {

            //Ações apos selecionar um item da lista
            //--------------------------------------------------------
            const pacienteData = selectedKeyData.selection.value;

            exibirDadosPaciente(pacienteData);


        });
    }


    //Recebe os dados do Paciente e oe exibe na tela.
    //=======================================================================================
    function exibirDadosPaciente(pacienteData) {
    
console.log(pacienteData);

        divIdade.textContent = b.formatDataForIdade(pacienteData.data_nascimento); //criar função que recebe uma data e retonra  idade
        divAtendimentos.textContent = 5; //criar função para retornar o numero de atendimentos do paciente
        primeiraConsulta.textContent = 3434;
        sexo.textContent = pacienteData.sexo;

    }








}


