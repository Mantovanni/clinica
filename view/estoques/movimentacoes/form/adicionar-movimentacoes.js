import b from '../../../../biblioteca/js/biblioteca.js';
// import { formatDataISOforDataUser, qs } from '../../../../biblioteca/js/biblioteca.js';
import * as controller from '../../controller/controllerMovimentacao.js';

import Movimentacoes from '../movimentacoes.js';



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





console.log(formAdicionar);

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
    operacaoSelecionada();







    //Eventos
    //======================================================================================================
    //======================================================================================================
    //BTN - Salvar-----------------------------------------------------
    formAdicionar.addEventListener('submit', function (e) {
        console.log("evento");
        e.preventDefault();

        //Pega o FORM que é o target do evento submit
        movimentarEstoque(e.target);
    });
    // Select Operacao----------------------------------------------------
    inpOperacao.addEventListener('change', function (e) {

        const selectValue = inpOperacao.options[inpOperacao.selectedIndex].value;
        operacaoSelecionada(selectValue);


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
            if (formValues.operacao == "Compra") {
                //Compra sempre é uma entrada
                dataBd.tipo = "Entrada";

                //Se for trasnferencia é passa as ids dos estoques de origem e destino atravez
                //das propriedades "origem" e "destino"
            } else if (formValues.operacao == "Transferencia") {
                // dataBd.estoques_id_origem = formValues.origem;

            } else if (formValues.operacao == "Manual") {

            }



            console.log(dataBd);


            //Response contem o elemento salvo junto de sua ID criada no banco
            b.crud.custom("movimentarEstoque", "movimentacoes", dataBd, response => {
                b.modal.fecharCustom();



                const dados = response.map(response => {
                    //Formata os valores  que foram salvos e retornaram do banco antes de passa para função criar a linha
                    response.total = response.quantidade * response.valor;
                    response.quantidade = b.paraMoeda(response.quantidade) + " " + dataInit.unidade;

                    // response.quantidade = b.paraMoeda(response.quantidade);
                    //Verifica a id do estoque para passar seu nome para a tabela
                    //--------------------------------------------------------------------
                    switch (response.estoques_id) {
                        case "1":
                            response.estoques_nome = "Produção"
                            break;
                        case "2":
                            response.estoques_nome = "Almoxerifado"
                            break;

                    }

                    return response;
                });





                //informa a TBody, 
                b.table.insertMultipleLinesDesc(tbody, dados);
                //Muda a cor dos valores da coluna movimentação
                controller.destacarColunaMovimentacao(tbody);

                //Atualiza os cards
                // preencherCards();



                //Atualiza tabela movimentações e os cards
                //===========================================================================
                // movimentacoes.init(dataInit.id);
                const movimentacoes = new Movimentacoes(dataInit.id)
                // console.log(movimentacoes);

                //Verifica em qual estoque o select está selecionado, então recarrega a tabela 
                //com o estoque especifico e os cards
                if(movimentacoes.selectEstoques.value == ""){
                    movimentacoes.carregarDadosdoEstoque("%");

                }else{
                    movimentacoes.carregarDadosdoEstoque(movimentacoes.selectEstoques.value);
                }
               
            }, true);




        }//if

    }//movimentarEstoque(form)

   
 



    function operacaoSelecionada(selectValue) {




        switch (selectValue) {
            case "Compra":
                eleDestinoDivLabel.textContent = "Estoque"
                inpTipoDiv.style.display = "none";
                inpOrigemDiv.style.display = "none";
                inpValorDiv.style.display = "block";
                inpValor.disabled = false;
                inpValor.value = "";
                inpOrigem.required = false;

                break;
            case "Transferencia":
                eleDestinoDivLabel.textContent = "Estoque Destino"
                inpOrigemDiv.style.display = "block";
                inpTipoDiv.style.display = "none";
                inpValor.disabled = true;
                inpValor.value = "R$ 0,00";
                inpOrigem.required = true;


                break;
            case "Manual":
                eleDestinoDivLabel.textContent = "Estoque"
                inpTipoDiv.style.display = "block";
                inpOrigemDiv.style.display = "none";
                inpValor.disabled = true;
                inpValor.value = "R$ 0,00";
                inpOrigem.required = false;

                break;
            default:
                eleDestinoDivLabel.textContent = "Estoque"
                inpTipoDiv.style.display = "none";
                inpOrigemDiv.style.display = "none";
                inpOrigem.required = false;

                break;
        }


    }

    function carregarEstoques() {

    }











    //Preenche os cards com os dados da lista de movimentações do banco
    //===================================================================================================
    // function preencherCards() {
    //     const cardQuantidadeEstoque = document.querySelector("#card-quantidade_estoques");
    //     const cardValorEstoque = document.querySelector("#card-valor_estoque");

    //     const data = {}
    //     data.id = dataInit.id;

    //     b.crud.custom("quantidadePorProduto", "estoques", data, response => {

    //         cardQuantidadeEstoque.textContent = b.paraMoeda(response.quantidade_total) + " " + response.unidade;
    //         cardValorEstoque.textContent = b.paraMoedaReal(response.custo * response.quantidade_total)

    //     })

    // }



















    // movimentarEstoque
    //==============================================================================
    // function lancarCompra(form) {


    //     if (validarForm(form)) {


    //         //----------------------------------------------------------------------------------
    //         //Extrai valores basicos do formulario,
    //         const formValues = b.form.extractValues(form);

    //         //---------------------------------------------------------------------
    //         // Trata valores do formulario, adiciona oque falta para enviar para 
    //         //enviar para a função de DB movimentarEstoque.
    //         const dataBd = {}


    //         //Pegar a id do usuario
    //         formValues.usuarios_id = 1;
    //         formValues.origem = "Operação Manual";

    //         //---------------------------------------
    //         const produtos = {}
    //         produtos.id = formValues.produtos_id;



    //         dataBd.movimentacoes = formValues;
    //         dataBd.produtos = produtos;

    //         // console.log(dataBd);

    //         //Response contem o elemento salvo junto de sua ID criada no banco
    //         b.crud.custom("movimentarEstoque", "movimentacoes", dataBd, response => {

    //             // console.log(response);

    //             // b.modal.fechar();
    //             b.modal.fecharCustom();

    //             response = response.movimentacoes;

    //             //Formata os valores  que foram salvos e retornaram do banco antes de passa para função criar a linha
    //             response.total = response.quantidade * response.valor;
    //             response.data = b.formatDataISOforDataUser(response.data);
    //             // response.quantidade =  b.paraMoeda(response.quantidade) + " " + response.unidade;
    //             response.quantidade = b.paraMoeda(response.quantidade);



    //             //informa a TBody, 
    //             b.render.lineInTable(tbody, response);
    //             //Muda a cor dos valores da coluna movimentação
    //             controller.destacarColunaMovimentacao(tbody);


    //         }, true);

    //         //inserir aqui um loading no botao Salvar

    //     }//if

    // }//movimentarEstoque(form)












}


