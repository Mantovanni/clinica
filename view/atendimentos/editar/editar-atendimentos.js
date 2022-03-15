import b from '../../../biblioteca/js/biblioteca.js';



export function init(valueInit) {
    //VARIÁVEIS
    //=====================================================================================================
    //=====================================================================================================

    //Globais
    //========================================================================
    //Lista usado para o autocomplete
    let listaPacientesAsync = [];
    let pacienteSelected = [];
    let atendimentoAberto = false;
    // let atendimentoStatus = "Fechado";



    //Elements DOM
    //========================================================================
    //Geral
    //----------------------------------------------------------------
    const tbody = document.querySelector('#tbody-central');//Tabela Central
    const tituloPage = document.querySelector('#modal-window__title-texto');//Titulo Modal
    const formModalAtendimento = document.querySelector('#form-modal');//Formulário Adicionar

    const btnSalvar = document.querySelector('#btn-salvar-modal')



    //Atendimento
    //----------------------------------------------------------------
    const inpAtendimentoId = document.querySelector('#atendimento_id')
    const btnAtendimento = document.querySelector('#btn-atendimento');
    const btnImpAtendimento = document.querySelector('#btn-imp-atendimento');


    //Paciente
    //----------------------------------------------------------------
    const inpNomePaciente = document.querySelector('#nome')

    const inpPacienteId = document.querySelector('#pacientes_id')
    const divIdade = document.querySelector('#paciente-idade')
    const divAtendimentos = document.querySelector('#paciente-atendimentos')
    const divPrimeiraConsulta = document.querySelector('#paciente-primeira_consulta')
    const divSexo = document.querySelector('#paciente-sexo')





    //MASCARAS
    //==========================================================================================
    // Aplica mascaras no form
    b.form.mask(formModalAtendimento);













    //INIT / INICIAR
    //=====================================================================================================
    //=====================================================================================================
    // tituloPage.textContent = "Adicionar Pacientes";

    buscarListaDePacientes();

    b.form.preencher(formModalAtendimento, valueInit.dadosItem);










    //EVENTOS
    //=====================================================================================================
    //=====================================================================================================
    //Form - Adicionar / Novo
    //--------------------------------------------------------------------
    formModalAtendimento.addEventListener('submit', function (e) {
        e.preventDefault();

    });


    //Input Paciente
    //Sempre que der foco no campo seleciona todo seu conteúdo
    //--------------------------------------------------------------------
    inpNomePaciente.addEventListener('focus', function (e) {
        inpNomePaciente.select()

    });



    //Botões
    //=============================================================================================
    //Botão - Abrir Atendimento
    //--------------------------------------------------------------------
    btnAtendimento.addEventListener('click', e => {
        //Cancela o evento Default do botão de ativar/submit o form     
        e.preventDefault();

        // Se o atendimento ja estiver aberto então chama a função de fechar/concluir o atendimento
        //se não estiver, chama a função de abrir
        if (atendimentoAberto) {
            concluirAtendimento();
        } else {
            abrirAtendimento();
        }

    })


    //Botão - Salvar
    //--------------------------------------------------------------------
    btnSalvar.addEventListener('click', e => {
        e.preventDefault();

        salvarAtendimento(b.form.extractValues(formModalAtendimento));
    })



    //Botão - Imprimir Atendimento
    //--------------------------------------------------------------------
    btnImpAtendimento.addEventListener('click', e => {
        //Cancela o evento Default do botão de ativar o form
        e.preventDefault();

    })












    //FUNÇÕES
    //=====================================================================================================
    //=====================================================================================================

console.log(valueInit.pacientes_id);

function carregarDadosPaciente(){
    valueInit.pacientes_id
}

function carregarDadosAtendimentoById{
    //fazer uma view no banco que traga todos os dados em um unica consulta
}







    //Cria regras para validar o formulário
    //=======================================================================================
    function validarForm() {
        let validate = true;
        console.log("object");

        if (inpNomePaciente.value == "") {
            alert("Selecione um paciente!")
            validate = false;
        }

        return validate;
    }



    //Cria/Abre um registro na tabela atendimento apenas com os dados de referencia ao paciente  e com status = Aberto
    //=======================================================================================
    function abrirAtendimento() {

        const dataFormAtendimentos = {};
        dataFormAtendimentos.pacientes_id = pacienteSelected.id;
        dataFormAtendimentos.status = "Aberto";


        //Verifica se um paciente foi selecionado
        if (validarForm()) {

            //Response contem o elemento salvo junto de sua ID criada no banco
            //Não é possível utilizar o crud.salvar pois é necessário pegar o id de usuário na session do php
            b.crud.custom("salvarAtendimento", "atendimentos", dataFormAtendimentos, responseItemSalvo => {//async

                // Função que cria e insere a linha na tabela com os dados do formulário que foram salvos no banco e retornaram para ser tratados
                const linhaCriada = b.render.lineInTable(tbody, responseItemSalvo, "atendimentos");

                //Coloca o status do atendimento como aberto
                atendimentoAberto = true;

                //Funções caso der certo o save do novo atendimento 
                // ----------------------------------------------------------
                mudarLayoutParaAtendimentoAberto(responseItemSalvo);

            }, true).then(() => {
                // b.modal.fechar()
            });
        }

    }



    //Salva todos as alterações do atendimento no banco mais nao muda o seu status para Concluído ele continua Aberto
    //=======================================================================================
    function salvarAtendimento(dataFormModalAtendimento) {
        //Pega o FORM que é o target do evento submit

        if (validarForm(formModalAtendimento)) {

            // const dataFormModalAtendimento = b.form.extractValues(formModalAtendimento);

            b.crud.editar(dataFormModalAtendimento, "atendimentos", response => {//async   
                b.modal.fechar()





            }).then(() => {
                b.modal.fechar()
            });

        }
    }



    // Salva e muda o Status do atendimento para Concluído
    //=======================================================================================
    function concluirAtendimento() {

        const dataFormModalAtendimento = b.form.extractValues(formModalAtendimento);

        dataFormModalAtendimento.status = "Concluido";

        salvarAtendimento(dataFormModalAtendimento);
    }












    //Faz um conjunto de alterações no layout para o modo do atendimento aberto
    //=======================================================================================
    function mudarLayoutParaAtendimentoAberto(atendimento) {

        //Insere a ID criada do atendimento no campo Id do form
        inpAtendimentoId.value = atendimento.id;



        //alterar o botão para fechar atendimento
        //--------------------------------------------------------------------------

        //mudar o titulo do modal para "Atendimento 00 - Paciente Fulano de Tal"
        //--------------------------------------------------------------------------

        //liberar para editar os campos do atendimento
        //--------------------------------------------------------------------------

        //fechar o campo de escolha do paciente
        //--------------------------------------------------------------------------

    }







    //==============================================================================================================

    function buscarListaDePacientes() {
        b.crud.listar("pacientes", response => { //async 


            listaPacientesAsync = response["data"];

            insertAutoCompletePacientes();
        })


    }









    //Busca no banco de dados a lista dos pacientes
    //Criar uma busca custom, onde ja tenha a quantidade de atendimentos e o ultimo 
    //=======================================================================================
    function buscarListaDePacientes() {
        b.crud.listar("pacientes", response => { //async 


            listaPacientesAsync = response["data"];

            insertAutoCompletePacientes();
        })


    }



    //Insere a função de auto complete no input Paciente
    //=======================================================================================
    function insertAutoCompletePacientes() {//async /buscarListaDePacientes


        b.autoComplete.ativar("#nome", listaPacientesAsync, selectedKeyData => {

            //Ações apos selecionar um item da lista / selectedKeyData contem os dados o item
            //--------------------------------------------------------

            //Passa os dados do paciente selecionado para variável global
            pacienteSelected = selectedKeyData.selection.value;


            const pacienteData = selectedKeyData.selection.value;
            inserirDadosPaciente(pacienteData);



        });
    }


    //Recebe os dados do Paciente e oe exibe na tela.
    //=======================================================================================
    function inserirDadosPaciente(pacienteData) {//async /insertAutoCompletePacientes

        // console.log(pacienteData);
        inpNomePaciente.dataset.pacientes_id = pacienteData.id;


        inpPacienteId.value = pacienteData.id;
        divIdade.textContent = b.formatDataForIdade(pacienteData.data_nascimento);
        divAtendimentos.textContent = 5; //criar função para retornar o numero de atendimentos do paciente
        divPrimeiraConsulta.textContent = 3434;
        divSexo.textContent = pacienteData.sexo;

    }









}


