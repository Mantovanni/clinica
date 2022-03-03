import b from '../../../../biblioteca/js/biblioteca.js';
// import { formatDataISOforDataUser, qs } from '../../../../biblioteca/js/biblioteca.js';
// import * as controller from '../../controller/controllerMovimentacao.js';

import Movimentacoes from '../movimentacoes-produtos.js';



export function init(dataInit) {
    //Variaveis
    //=====================================================================================================
    //=====================================================================================================
    //GLOBAIS
    //----------------------------------------------------------


    //Elements DOM
    //----------------------------------------------------------
    const tbody = document.querySelector('#tbody-central');//Tabela Central


    // console.log(Movimentacoes);

    //Formulario
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-modal');

    const inpOperacao = document.querySelector('#operacao');
    const inpIdProduto = document.querySelector("#produto_id");
    const inpTipo = document.querySelector("#tipo");
    const inpQuantidade = document.querySelector("#quantidade");
    const inpValor = document.querySelector("#valor");
    const inpOrigem = document.querySelector("#origem");
    const inpDestino = document.querySelector("#destino");
    const inpData = document.querySelector("#data");


    //FOMR DIV------------
    const inpTipoDiv = document.querySelector("#tipo-div");
    const inpValorDiv = document.querySelector("#valor-div");
    const inpOrigemDiv = document.querySelector("#origem-div");
    const inpDestinoDiv = document.querySelector("#destino-div");

    const eleDestinoDivLabel = document.querySelector("#destino-div-label");





    //MASCARAS
    //======================================================================================================
    // Aplica mascaras no form
    b.form.mask(formAdicionar);
    b.maskQuantidade(inpQuantidade);
    // b.maskPeso(inpQuantidade);






    //Init
    //==================================================================================================
    //==================================================================================================
    //Diminuir janela modal
    // const modalJanela = document.querySelector("#modal-window")
    // modalJanela.classList.toggle("movimentacoes", true)

    inpQuantidade.select();
    // inpQuantidade.focus

    preencherFormulario();
 



    //Eventos
    //======================================================================================================
    //======================================================================================================
    //BTN - Salvar-----------------------------------------------------
    formAdicionar.addEventListener('submit', function (e) {       
        e.preventDefault();

        //Pega o FORM que é o target do evento submit
        movimentarEstoque(e.target);
    });
  













    //Funções
    //======================================================================================================
    //======================================================================================================

    function validarForm(form) {
        let validate = true;

        // if (form["adicionar-usuario-repetir-senha"].value !== form[3].value) {
        //     alert("As senhas nao conferem!")
        //     validate = false;
        // }

        return validate;
    }





    //preencherFormulario
    //==============================================================================
    function preencherFormulario() {


        // inpValor.value = b.paraMoeda(dataProdutoInit.valor);

        //Passa a data Atual
        inpData.value = b.getDataAtualISO();
        // inpIdProduto.value = dataInit.produto.id
        inpIdProduto.value = dataInit.id





    }




    // movimentarEstoque/lançar compra
    //==============================================================================
    function movimentarEstoque(form) {


        if (validarForm(form)) {


            //----------------------------------------------------------------------------------
            //Extrai valores basicos do formulario,
            const formValues = b.form.extractValues(form);

            //---------------------------------------------------------------------
            // Trata valores do formulario, adiciona oque falta para enviar para 
            //enviar para a função de DB movimentarEstoque.
            const dataBd = formValues;

            //Passa a id do estoque
            // dataBd.estoques_id = formValues.destino;


            //Verifica o tipo de operação  --------------------------          
            // if (formValues.operacao == "Compra") {
                //Compra sempre é uma entrada
                // dataBd.tipo = "Entrada";

                //Se for trasnferencia é passa as ids dos estoques de origem e destino atravez
                //das propriedades "origem" e "destino"
            // } else if (formValues.operacao == "Transferencia") {
            //     // dataBd.estoques_id_origem = formValues.origem;

            // } else if (formValues.operacao == "Manual") {

            // }


            //Movimentaçãoes da rouparia é somente operação Trasnferencia
            dataBd.operacao = "Transferencia";

            console.log(dataBd);



            //Response contem o elemento salvo junto de sua ID criada no banco
            b.crud.custom("movimentarEstoque", "movimentacoes", dataBd, response => {
                b.modal.fecharCustom();

// console.log(response);

                const dados = Array.from(response).map(response => {
                    //Formata os valores  que foram salvos e retornaram do banco antes de passa para função criar a linha
                    // response.total = response.quantidade * response.valor;
                    response.quantidade = b.paraMoeda(response.quantidade) + " " + dataInit.unidade;


                    //Verifica a id do estoque para exibir  seu nome para a tabela
                    //--------------------------------------------------------------------
                    switch (response.estoques_id) {
                        case "1":
                            response.estoques_nome = "Produção"
                            break;
                        case "2":
                            response.estoques_nome = "Almoxerifado"
                            break;
                        case "3":
                            response.estoques_nome = "Rouparia"
                            break;
                        case "4":
                            response.estoques_nome = "Recepção"
                            break;
                        case "5":
                            response.estoques_nome = "Apartamentos"
                            break;
                        case "6":
                            response.estoques_nome = "Lavanderia"
                            break;

                    }

                    return response;
                });



                //Nao ultilizado poisa tabela é recarregada 
                dados.usuarios_id = document.querySelector('#header__direita-usuario-nome').textContent;



                //informa a TBody, Insere duas movimentacoes
                b.table.insertMultipleLinesDesc(tbody, dados);

                //Muda a cor dos valores da coluna movimentação
                // controller.destacarColunaMovimentacao(tbody);

                //Atualiza os cards
                // preencherCards();



                //Atualiza tabela TESTE
                //===========================================================================
                // movimentacoes.init(dataInit.id);
                const movimentacoes = new Movimentacoes(dataInit.id)
         
                movimentacoes.carregarDadosdoEstoque("%");


                // if(movimentacoes.selectEstoques.value == ""){
                //     movimentacoes.carregarTabela("%");

                // }else{
                //     movimentacoes.carregarTabela(movimentacoes.selectEstoques.value);
                // }
               
            }, true);




        }//if

    }//movimentarEstoque(form)

   
 



    //Preenche os cards com os dados da lista de movimentações do banco
    //===================================================================================================
    function preencherCards() {
        const cardQuantidadeEstoque = document.querySelector("#card-quantidade_estoques");
        const cardValorEstoque = document.querySelector("#card-valor_estoque");

        const data = {}
        data.id = dataInit.id;

        b.crud.custom("quantidadePorProduto", "estoques", data, response => {

            cardQuantidadeEstoque.textContent = b.paraMoeda(response.quantidade_total) + " " + response.unidade;
            cardValorEstoque.textContent = b.paraMoedaReal(response.custo * response.quantidade_total)

        })

    }




























}


