import b from '../../../biblioteca/js/biblioteca.js';
import { logout } from '../../../biblioteca/js/modulo/auth.js';



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
    let globalAtendimentoData = {};
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

    // valueInit.novoAtendimento = true

    if (valueInit != undefined) {
        console.log("AAA");
        carregarDadosCompletosAtendimentoById();
    }

    buscarListaDePacientes();


    // b.form.preencher(formModalAtendimento, valueInit.dadosItem);










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


        if (globalAtendimentoData.status = "Aberto") {
            concluirAtendimento();
        } else if (globalAtendimentoData.status = "Concluido") {
            reabrirAtendimento();

        }
        //globalAtendimentoData = null
        else {
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

    // console.log(valueInit.pacientes_id);

    // function carregarDadosPaciente(){
    //     valueInit.pacientes_id
    // }




    //Busca no banco dos dados do atendimento
    //=======================================================================================
    //buscarDadosCompletosDoAtendimentoById
    function carregarDadosCompletosAtendimentoById() {

        const data = {};
        //Pega a id passada por parâmetro pela função que cria a linha na tabela
        data.id = valueInit.dadosItem.id;


        //Função que busca no banco todos os dados daquele atendimentos nas tabelas relacionadas
        b.crud.custom("carregarDadosCompletosAtendimentoById", "atendimentos", data, responseList => {  //async     

            //Coloca em uma variável global os dados do paciente.
            globalAtendimentoData = responseList["data"];


            preencherCamposAtendimento(responseList["data"])


        });


    }



    //
    //=======================================================================================
    function preencherCamposAtendimento(atendimentoData) {

        //Muda um conjunto de regras no layout na DOM de acordo com o status do atendimento
        if (atendimentoData.status == "Aberto") {
            mudarLayoutParaAtendimentoAberto(atendimentoData)

        } else if (atendimentoData.status == "Concluido") {
            mudarLayoutParaAtendimentoConcluido()
        }


        //Preenche os dados do atendimento
        //----------------------------------------------------
        b.form.preencher(formModalAtendimento, atendimentoData);


        //Preenche os dados sobre o paciente na tela
        // --------------------------------------------------
        inserirDadosPaciente(atendimentoData);
        inpNomePaciente.value = atendimentoData.nome;

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






















    //Salva/Abre um registro na tabela atendimento apenas com os dados de referencia ao paciente  e com status = Aberto
    //=======================================================================================
    function abrirAtendimento() {

        //dataFormAtendimentos é um objeto que ira receber os dados do atendimento.
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


                //Conjunto de alterações no layout apos abrir o atendimento
                //Manda como parâmetro os dados do novo atendimento criado
                mudarLayoutParaAtendimentoAberto(responseItemSalvo);

            }, true).then(() => {
                // b.modal.fechar()
            });
        }

    }



    //Salva todos as alterações do atendimento no banco mais nao muda o seu status para Concluído ele continua Aberto
    //salvarAtendimento recebe um objeto com os dados do atendimento como parâmetro.
    //=======================================================================================
    function salvarAtendimento(dataFormModalAtendimento) {
        //Pega o FORM que é o target do evento submit

        if (validarForm(formModalAtendimento)) {

            // const dataFormModalAtendimento = b.form.extractValues(formModalAtendimento);

            // b.crud.custom("editarAtendimento", "atendimentos" )
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





    // Muda o atendimento para status = Aberto
    //=======================================================================================
    function reabrirAtendimento() {

        const data = {};
        data.id = globalAtendimentoData.id;
        data.status = "Aberto"

        b.crud.editar(data, "atendimentos", response => {//async   


            mudarLayoutParaAtendimentoAberto(globalAtendimentoData);


        }).then(() => {

        });


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



    //Faz um conjunto de alterações no layout para o modo do atendimento aberto
    //=======================================================================================
    function mudarLayoutParaAtendimentoConcluido() {





        //alterar o botão para fechar atendimento
        //--------------------------------------------------------------------------

        //mudar o titulo do modal para "Atendimento 00 - Paciente Fulano de Tal"
        //--------------------------------------------------------------------------

        //liberar para editar os campos do atendimento
        //--------------------------------------------------------------------------

        //fechar o campo de escolha do paciente
        //--------------------------------------------------------------------------

    }













    // FUNÇÕES PARA OS CAMPOS DE PACIENTES
    //==============================================================================================================
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


