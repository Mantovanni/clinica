

//============================================================================================================
/**
       * Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha da tabela com os dados passado por um Objeto
       * @param {HTMLTableElement} elTable Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha
       * @param {object} dados Um objeto com os valores/data de uma ou mais linhas
       * @param {string} nometabelaDoBanco Nome da tabela no banco, para as funções de excluir e editar
       * @returns {HTMLTableElement} Retorna a referencia para a linha criada
       */
//Inserit linha preenchida
export function insertLineInputFilled2(elTable, params) {//Espera receber um TBODY


    //Array de retorno da função
    const linhasCriadas = [];



    // let dadosArray;
    // if (Array.isArray(dados)) {
    //     // Limpar tabela antes de criar outra
    //     elTable.innerHTML = "";
    //     dadosArray = dados;
    // } else {
    //     dadosArray = [dados];
    // }
    // dadosArray.forEach(dadosItem => {



    params.data.forEach(dadosItem => {

        //Cria uma linha para manipular
        const elNovaLinha = document.createElement("tr")

        //Numeração das ids das linhas----------------------------------------------------------
        const firstLine = elTable.lastElementChild;
        if (firstLine) {
            elNovaLinha.dataset.id = b.paraFloat(firstLine.dataset.id) + 1;
        } else {
            //Se nao existe linha no Tbody insere id = 1 na linha que sera adicionada
            elNovaLinha.dataset.id = 0;
        }

        //Insere a linha no TBody
        elTable.appendChild(elNovaLinha);


        //Insere dados nas celulas das tabelas
        //---------------------------------------------------------------------------------------------
        //Serve para agrupar os inputs da mesma linha , para quando for usar a função de extrair dados do form
        // let groupLine = 1;
        //Pega a linha de celulas do Head da tabela TH
        const cabecalho = elTable.parentNode.querySelector("thead tr");//Espera receber um TBODY
        // Array.from(cabecalho.cells).forEach(element => {


        // console.log(cabecalho); //Recebe um array de Cells TH de uma TR(linha)
        b.findElArrayInObject(cabecalho.cells, dadosItem, (element, key) => {
            // Array.from(elTrCabecalho.cells).forEach(element => {

            // console.log(element);
            // ===================================================================================================================
            //Cria e insere a celula --------------------------------------------------------------------------------
            elNovaLinha.insertAdjacentHTML("beforeend", `
                <td class="${element.dataset.class}"data-name="${element.dataset.name}">                   
                    <input class="input-default" type="text" name="${element.dataset.name}"  autocomplete="lala"
                    id="item-${element.dataset.name}-${elNovaLinha.dataset.id}"  data-relacional="${elNovaLinha.dataset.id}" required></input>                  
                </td>`);


            //------------------------------------------------------------------------------------------------------
            //Pega a celula td e o seu input recem criada da linha para aplicar regras especificas.
            const tdAtual = elNovaLinha.lastElementChild;
            // const inpAtual = elNovaLinha.querySelector(`#item-${element.dataset.name}-${elNovaLinha.dataset.id}`)
            const inpAtual = elNovaLinha.lastElementChild.firstElementChild;





            //format
            //Formatar o valore recebido-------------------------------------------------------------------------------
            //Passa a o atributo de formatação da Celula para o input
            switch (element.dataset.format) {
                case "coin":

                    inpAtual.value = b.paraMoeda(dadosItem[key]);
                    inpAtual.dataset.type = "coin";
                    break;


                case "coin-real":
                    inpAtual.value = b.paraMoedaReal(dadosItem[key]);
                    inpAtual.dataset.type = "coin-real";
                    break;


                case "date":
                    inpAtual.value = b.formatDataISOforDataUser(dadosItem[key])
                    inpAtual.dataset.type = "date";


                default:
                    inpAtual.value = dadosItem[key];
                    break;
            }



            //Insere atribuos html
            //--------------------------------------------------------------------------------------------------
            //Passa a o atributo de formatação da Celula para o input
            switch (element.dataset.attr) {
                case "disabled":
                    inpAtual.setAttribute("disabled", "disabled");
                    // inpAtual.disabled = "true" ;
                    break;

                case "coin-real":

                    break;

            }



            //type
            //----------------------------------------------------------------------------------------------------------
            //Verifica o tipo de campo 
            switch (element.dataset.type) {
                case "esconder":
                    // tdAtual.style.display = "none";
                    tdAtual.setAttribute("style", "display:none");
                    break;


                case "action":
                    //Zera a linha
                    tdAtual.innerHTML = "";
                    tdAtual.classList.add("cel-acoes");
                    tdAtual.insertAdjacentHTML("beforeend", `
                <button class="btn-excluir-linha" data-name="excluir">${b.ico.lixeira}</button>`);

                    //BOTAO EXCLUIR
                    //-------------------------------------------------------------------------------------------------
                    const botaoExcluir = elNovaLinha.querySelector('[data-name="excluir"]');
                    botaoExcluir.addEventListener('click', function (e) {
                        e.preventDefault();

                        //Impede de remover a ultima linha
                        if (elTable.rows.length > 1) {
                            elTable.deleteRow(elNovaLinha.rowIndex - 1);

                        }

                    });
                    break;


                case "autocomplete":
                    //Insere autoComplete_wrapper entre o TD e o Input---------------------
                    tdAtual.innerHTML = `<div class="autoComplete_wrapper"></div>`;
                    tdAtual.firstElementChild.appendChild(inpAtual);

                    // console.log(params);
                    // AUTOCOMPLETE
                    //----------------
                    //Recebe dados para o auto comeplete e uma funç~ao para ser realizada apos escolher uma opção 
                    if (params.autoComplete) {
                        // b.autoComplete.ativar(`#item-nome-${elNovaLinha.dataset.id}`, dataAutocomplete, afterSelectAutoComplete);
                        b.autoComplete.ativar(`#item-nome-${elNovaLinha.dataset.id}`, params.autoComplete.data, dataSelecionado => {
                            if (params.autoComplete.afterSelect) {
                                params.autoComplete.afterSelect(dataSelecionado, elNovaLinha);
                            }

                        });
                    }



                    break;
                default:
                    break;
            }



            //------------------------------------------------------------------------------------------------------
            //Verifica qual input da linha é pra ser ignorado no envio do formulário 
            //inserindo .dataset.ignore = "true";       
            if (element.dataset.ignore) {
                inpAtual.dataset.ignore = "true";
            }



            // ----------------------------------------------------------------------------------------------------
            //Verifica se o o campo input da celula vai ter a função de auto complete
            if (element.dataset.autocomplete) {



            }


        });//findElArrayInObject

        //-------------------------------------------------------------------------------------------
        // groupLine++;
        b.form.mask(elNovaLinha)

        //-------------------------------------------------------------------------------------------
        //Executa uma função de callBack recebendo como parametro a linha atual criada
        params.afterCreateNewLine(elNovaLinha);

        //-------------------------------------------------------------------------------------------
        //Passa a linha criada para o arrya de linha que sera retornado no final        
        linhasCriadas.push(elNovaLinha);
    });//foreach


    return linhasCriadas;

}//============================================================================================================
