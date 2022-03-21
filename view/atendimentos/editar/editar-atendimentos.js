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
    const elHeaderWindowModal = document.querySelector('.modal-window__title');//Header do Modal
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


    //Procedimentos
    //----------------------------------------------------------------
    const btnAdicionarProcedimento = document.querySelector('#btn-adicionar_procedimento');
    const btnLimparLista = document.querySelector('#btn-limpar_lista');
    const elTbody_TableInput = document.querySelector('#table-input_tbody');














    //MASCARAS
    //==========================================================================================
    // Aplica mascaras no form
    b.form.mask(formModalAtendimento);








    //INIT / INICIAR
    //=====================================================================================================
    //=====================================================================================================
    // tituloPage.textContent = "Adicionar Pacientes";

    // valueInit.novoAtendimento = true

    //Quando entra pela opção de editar
    if (valueInit != undefined) {
        console.log("carregarDadosCompletosAtendimentoById");
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


        if (globalAtendimentoData.status == "Aberto") {
            concluirAtendimento();
        } else if (globalAtendimentoData.status == "Concluido") {

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




    //Procedimentos
    //=============================================================================================
    //Botão - Adicionar Procedimento
    //--------------------------------------------------------------------
    btnAdicionarProcedimento.addEventListener('click', e => {
        e.preventDefault();

        adicionarLinhaItem();
    })


    btnLimparLista.addEventListener('click', function (e) {
        e.preventDefault();

        //Limpa as linhas
        elTbody_TableInput.innerHTML = "";

        // /Adiciona uma Linha 
        adicionarLinhaItem();
    });






























    //FUNÇÕES
    //==============================================================================================================
    //==============================================================================================================

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

            mudarLayoutParaAtendimentoConcluido(atendimentoData)
        }


        //Preenche os dados do atendimento
        //----------------------------------------------------
        b.form.preencher(formModalAtendimento, atendimentoData);


        //Preenche os dados sobre o paciente na tela
        // ---------------------------------------------------
        //Retorna o valor do objeto e não sua referencia
        const pacienteData = b.objectValue(atendimentoData);
        pacienteData.id = atendimentoData.pacientes_id;

        inserirDadosPaciente(pacienteData);
        inpNomePaciente.value = atendimentoData.nome;

        // console.log(atendimentoData);

    }










    // FUNÇÕES Paciente
    //============================================================================================================
    //============================================================================================================

    //Cria regras para validar o formulário
    //=======================================================================================
    function validarForm() {
        let validate = true;


        if (inpNomePaciente.value == "") {
            alert("Selecione um paciente!")
            validate = false;
        }

        return validate;
    }




    //Busca no banco de dados a lista dos pacientes
    //Criar uma busca custom, onde ja tenha a quantidade de atendimentos e o ultimo 
    //=======================================================================================
    function buscarListaDePacientes() {
        b.crud.listar("pacientes", response => { //async 


            listaPacientesAsync = response["data"];


            insertAutoCompletePacientes(response["data"]);
        })


    }



    //Insere a função de auto complete no input Paciente
    //=======================================================================================
    function insertAutoCompletePacientes(listaPacientesData) {//async /buscarListaDePacientes


        b.autoComplete.ativar("#nome", listaPacientesData, selectedKeyData => {

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
        // inpNomePaciente.dataset.pacientes_id = pacienteData.id;

        inpPacienteId.value = pacienteData.id;
        divIdade.textContent = b.formatDataForIdade(pacienteData.data_nascimento);
        divAtendimentos.textContent = 5; //criar função para retornar o numero de atendimentos do paciente
        divPrimeiraConsulta.textContent = 3434;
        divSexo.textContent = pacienteData.sexo;

    }























    // FUNÇÕES Atendimento
    //==============================================================================================================
    //==============================================================================================================



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


                //Muda o status na globalAtendimento para Aberto
                globalAtendimentoData.status = "Aberto";


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
            console.log(dataFormModalAtendimento);
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
        console.log("concluirAtendimento");

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

            globalAtendimentoData.status = "Aberto";

            mudarLayoutParaAtendimentoAberto(globalAtendimentoData)


        }).then(() => {

        });


    }






    //Faz um conjunto de alterações no layout para o modo do atendimento aberto
    //=======================================================================================
    function mudarLayoutParaAtendimentoAberto(atendimentoData) {

        //Insere a ID criada do atendimento no campo Id do form
        inpAtendimentoId.value = atendimentoData.id;

        //Alterar o botão para Concluir atendimento
        //--------------------------------------------------------------------------
        btnAtendimento.textContent = "Concluir Atendimento";



        //Mudar o titulo do modal para "Atendimento 00 - Paciente Fulano de Tal"
        //--------------------------------------------------------------------------
        tituloPage.textContent = "Atendimento - " + atendimentoData.id;
        elHeaderWindowModal.style.backgroundColor = 'green';


        //liberar para editar os campos do atendimento
        //--------------------------------------------------------------------------

        //fechar o campo de escolha do paciente
        //--------------------------------------------------------------------------
        inpNomePaciente.disabled = "true";

    }



    //Faz um conjunto de alterações no layout para o modo do atendimento Concluído
    //=======================================================================================
    function mudarLayoutParaAtendimentoConcluido(atendimentoData) {




        //Mudar o titulo do modal para "Atendimento 00 - Paciente Fulano de Tal"
        //--------------------------------------------------------------------------
        tituloPage.textContent = "Atendimento - " + atendimentoData.id;
        elHeaderWindowModal.style.backgroundColor = '#2559a7';//Azul 



        inpNomePaciente.disabled = "true";

    }





























    // FUNÇÕES Procedimentos
    //==============================================================================================================
    //==============================================================================================================

    //------------------------------------------------------------------------------------
    //Adiciona uma linha vazia de procedimentos
    function adicionarLinhaItem(listaProdutosAsync) {

        //insere uma linha de inputs recebendo a tabela, e os dados para o autocomplete
        const eleNewLine = b.table.insertLineInput2(elTbody_TableInput, listaProdutosAsync, (dataSelecionado, linha) => {

            //Pega os valores o item selecionado na lista
            const itemSelecionado = dataSelecionado.selection.value;

            //Auto Preenche os campos quando seleciona um item na lista
            linha.cells[0].firstElementChild.value = itemSelecionado.id;
            linha.cells[2].firstElementChild.value = b.paraMoeda(itemSelecionado.estoque_total);//quantidade em estoque
            linha.cells[3].firstElementChild.value = "1,00";

            // Seleciona o proximo input automaticamente apos escolher um item
            linha.cells[3].firstElementChild.select();
            // dataSelecionado.event.path[3].nextElementSibling.firstElementChild.select();
        });





        // const inpNome = eleNewLine.cells[1].firstElementChild.firstElementChild;
        // const inpAtual = eleNewLine.cells[2].firstElementChild;
        // const inpQuantidade = eleNewLine.cells[3].firstElementChild;


        // //Impede de passar um valor maior que tem em estoque
        // //------------------------------------------------------------------------------------------
        // const checarEstoqueMinimo = ev => {
        //     if (b.paraFloat(inpAtual.value) < b.paraFloat(inpQuantidade.value)) {
        //         inpQuantidade.value = inpAtual.value;
        //     }
        // }
        // inpQuantidade.addEventListener('input', checarEstoqueMinimo)


        // //Se nao encontrar nenhum valor e sair do campo , limpa ele
        // //------------------------------------------------------------------------------------------
        // inpNome.addEventListener('focusout', resetarInvalido);
        // inpNome.addEventListener('focus', resetarInvalido);
        // function resetarInvalido(e) {
        //     inpNome.value = "";
        // }

    }












}


