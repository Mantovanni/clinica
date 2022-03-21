import b from '../../../../biblioteca/js/biblioteca.js';

// import autoComplete from '../../../biblioteca/js/modulo/submodulo/autocomplete/autoComplete.js';



export function init(dataInit) {

    //Valores que podem ser recebidos por paramentro.
    // const dataInit = {
        // layout: "transferencia", // layout de "saida" e "entrada" precisão de uma id de estoque padrão    
        // estoque: estoque // objeto estoque, com categoria e id 
        // preencher: false //ja carrega os itens do estoque
        // preencherData: this.preencherData //itens para o preencher 
    // }


    //Variaveis
    //=====================================================================================================
    //GLOBAIS
    //----------------------------------------------------------------------------
    //Lista usado para o autocomplete
    let listaProdutosAsync = [];


    //Elements DOM
    //----------------------------------------------------------------------------
    const tbodyItens = document.querySelector('#tbody-central');//Tabela Central
    // const elNome = document.querySelector("#produto-nome");


    //Botoes
    //--------------------------------------
    const btnAdicionarItemProduto = document.querySelector('#btn-adicionar-item-produto');//Formulario Adicionar
    const btnlimparItemProduto = document.querySelector('#btn-limpar-item-produto');//Formulario Adicionar
    const btnSalva = document.querySelector('#btn-salvar-modal-item');

    //Formulario
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-modal');//Formulario Adicionar
    const elTbody_TableInput = document.querySelector('#table-input_tbody');
    const selectDestino = document.querySelector('#destino');
    const selectOrigem = document.querySelector('#origem');

    // const elNomeProduto = document.querySelector("#nome-produto");





    //MASCARAS
    //======================================================================================================
    // Aplica mascaras no form
    b.form.mask(formAdicionar);






    //Init==================================================================================================
    //Customiza a exibição da tela entre exibição de estoque origem ou destino
    customizarLayout();

    //lista os estoques para inserir no select
    buscarEstoques();



    //Eventos
    //======================================================================================================
    //BTN - Salvar----------------------------------------------------------------
    formAdicionar.addEventListener('submit', function (e) {
        e.preventDefault();

        //Pega o FORM que é o target do evento submit
        const form = e.target;

        const formValuesAll = b.form.extractValuesAll(form);


        //Layout----------------------------------------------
        //Se for layout trasnferencia , recebe os dois estoques do formulario
        if (dataInit.layout == "entrada") {
            //Passa a id do estoque de entrada
            formValuesAll.destino = dataInit.estoque.id;
        } else if (dataInit.layout == "saida") {
            formValuesAll.origem = dataInit.estoque.id;
        }





        //========================================================================
        b.crud.custom2({
            controller: {
                nome: "movimentacoes",
                metodo: "transferirMultiplos", //inserirMovimentacao,
                modo: "transferencia", //modo de como metodo vai funcionar, alguns metodos tem variações de funções a ser realizada, para evitar escrever outro metodo que é muito parecido
                data: formValuesAll
            },
            alert: {
                message: "Ação realizada com sucesso."
            },
            functionResponse: responseItemSalvo => {

                //Resposta da promisse
                dataInit.resolve(responseItemSalvo);

            }

        }).then(() => {
            b.modal.fechar();
        });


        btnSalva.disabled = "true";
        // btnSalva.setAttribute('disabled', 'disabled');
    });






    //BTN - btnAdicionarItemProduto---------------------------------------------------
    btnAdicionarItemProduto.addEventListener('click', function (e) {
        e.preventDefault();

        adicionarLinhaItem(listaProdutosAsync);
    });

    //BTN - Limpar-------------------------------------------------------------------
    btnlimparItemProduto.addEventListener('click', function (e) {
        e.preventDefault();

        elTbody_TableInput.innerHTML = "";
        adicionarLinhaItem(listaProdutosAsync);
    });


    //----------------------------------------------------------------------------------
    // Select origem e destino
    selectOrigem.addEventListener('change', ev => {
        atualizarListaDeProdutos(ev.target.value);
    })











    //Funções
    //======================================================================================================

    //------------------------------------------------------------------------------------
    //Lista por grupo
    //Dados para o select de estoques
    //Lista o nome de todos os estoques de determinado grupo/categoria
    function buscarEstoques() {

        let grupo;
        //Se não passar um grupo, lista todos
        if(dataInit.estoque.categoria){
            grupo = dataInit.estoque.categoria;//nome
        }else{
            grupo = "%";
        }

        //Buscar alem do nome a quantidade em cada estoque para adicionar no campo 
        //quantidade atual

        //Lista produtos de cada grupo, Rouparia, cafe , etc
        b.crud.listarByKey("categoria", grupo, "estoques", response => { //async //mudar nome da tabela para viewProdutos

            response["data"].forEach(element => {

                //Seleciona apenas os estoques que nao são da categoria apartamentos
                //Prenche os dois selects options com os estoques
                if (element.subcategoria !== "Apartamento") {
                    b.selectAdd(selectOrigem, element.nome, element.id);
                    b.selectAdd(selectDestino, element.nome, element.id);

                }

            });


            //Lista os produtos apos os estoques serem carregados
            atualizarListaDeProdutos();

        })
    }












    //------------------------------------------------------------------------------------
    //Dados para o autocomplete
    //Busca lista de produtos pelo ID do estoque recebido Select de Estoques
    function atualizarListaDeProdutos(estoqueId) {

        let data = {};

        //Se for layout de entrada pega o valor do estoque no select caso o mesmo nao seja passado 
        //por parametro da função
        if (!estoqueId) {

            switch (dataInit.layout) {
                case "entrada":
                    data = { estoque: b.selectValue(selectOrigem) };
                    break;

                case "saida":
                    data = { estoque: dataInit.estoque.id };
                    break;

                case "transferencia":
                    data = { estoque: b.selectValue(selectOrigem) };
                    break;
            }

        } else {
            data = {
                estoque: estoqueId
            };
        }



        b.crud.custom("listarEstoquesProdutos", "estoques", data, responseList => {  //async        

            //Sempre que escolhe um estoque novo no select atualiza a lista
            listaProdutosAsync = responseList["data"];


            //Zera a tabela e atualiza os valores de acordo com o novo estoque
            elTbody_TableInput.innerHTML = "";


            //Se passar false ou nao passar adicionarLinhaItem
            if (dataInit.preencher) {
                preencher(listaProdutosAsync);//adiciona linha vazia
            } else {
                adicionarLinhaItem(listaProdutosAsync);
            }

        });
    }






 










    //Altera o layout de acordo com o modo de movimentação
    //Deve ser executado primeiro sem empera de um função Async , para o layout nao atrasar 
    //------------------------------------------------------------------------------------
    function customizarLayout(params) {
        const selectDestinoDiv = document.querySelector('#destino-div');
        const selectOrigemDiv = document.querySelector('#origem-div');


        switch (dataInit.layout) {
            case "entrada":
                selectDestinoDiv.setAttribute("style", "display:none");
                break;
            case "saida":
                selectOrigemDiv.setAttribute("style", "display:none");
                break;
            case "transferencia":

                break;

            default:
                break;
        }


    }













    //------------------------------------------------------------------------------------
    //Adiciona uma linha vazia
    function adicionarLinhaItem(listaProdutosAsync) {

        //insere uma linha de inputs recebendo a tabela, e os dados para o autocomplete
        const eleNewLine = b.table.insertLineInput(elTbody_TableInput, listaProdutosAsync, (dataSelecionado, linha) => {

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





        const inpNome = eleNewLine.cells[1].firstElementChild.firstElementChild;
        const inpAtual = eleNewLine.cells[2].firstElementChild;
        const inpQuantidade = eleNewLine.cells[3].firstElementChild;


        //Impede de passar um valor maior que tem em estoque
        //------------------------------------------------------------------------------------------
        const checarEstoqueMinimo = ev => {
            if (b.paraFloat(inpAtual.value) < b.paraFloat(inpQuantidade.value)) {
                inpQuantidade.value = inpAtual.value;
            }
        }
        inpQuantidade.addEventListener('input', checarEstoqueMinimo)


        //Se nao encontrar nenhum valor e sair do campo , limpa ele
        //------------------------------------------------------------------------------------------
        inpNome.addEventListener('focusout', resetarInvalido);
        inpNome.addEventListener('focus', resetarInvalido);
        function resetarInvalido(e) {
            inpNome.value = "";
        }

    }














    //------------------------------------------------------------------------------------
    //Cria e preenche as linhas inputs de itens
    function preencher(listaProdutosAsync) {


        //Formata os dados de estoque para inserir em movimentações.
        let data = {};
        data = dataInit.preencherData.map(element => {
            data = element;

            //Mudar estoque total para estoque
            data.produtos_id = element.id;
            data.estoque_atual = element.estoque_total;
            data.quantidade = element.estoque_total;

            return data;
        });



        //insere uma linha de inputs recebendo a tabela, e os dados para o autocomplete
        b.table.insertLineInputFilled(elTbody_TableInput, {
            data: data,
            afterCreateNewLine: (eleNewLine) => {

                const inpNome = eleNewLine.cells[1].firstElementChild.firstElementChild;
                const inpAtual = eleNewLine.cells[2].firstElementChild;
                const inpQuantidade = eleNewLine.cells[3].firstElementChild;


                //Impede de passar um valor maior que tem em estoque
                //------------------------------------------------------------------------------------------
                const checarEstoqueMinimo = ev => {
                    if (b.paraFloat(inpAtual.value) < b.paraFloat(inpQuantidade.value)) {
                        inpQuantidade.value = inpAtual.value;
                    }
                }
                inpQuantidade.addEventListener('input', checarEstoqueMinimo)




                //Se nao encontrar nenhum valor e sair do campo , limpa ele
                //------------------------------------------------------------------------------------------
                inpNome.addEventListener('focusout', resetarInvalido);
                inpNome.addEventListener('focus', resetarInvalido);
                function resetarInvalido(e) {
                    inpNome.value = "";
                }

            },
            autoComplete: {
                data: listaProdutosAsync,
                afterSelect: (dataSelecionado, linha) => {


                    // Pega os valores o item selecionado na lista
                    const itemSelecionado = dataSelecionado.selection.value;

                    //Auto Preenche os campos quando seleciona um item na lista
                    linha.cells[0].firstElementChild.value = itemSelecionado.id;
                    linha.cells[2].firstElementChild.value = b.paraMoeda(itemSelecionado.estoque_total);//quantidade em estoque
                    linha.cells[3].firstElementChild.value = "1,00";

                    // Seleciona o proximo input automaticamante apos escolher um item
                    linha.cells[3].firstElementChild.select();
                    // dataSelecionado.event.path[3].nextElementSibling.firstElementChild.select();
                }
            },

        });


    }







}


