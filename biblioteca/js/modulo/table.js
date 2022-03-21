import b from '../biblioteca.js';



export function insertSearch(inpPesquisar, tbody) {

    //Cria uma tabela reserva, sem inseri-la no DOM
    const tabelaReserva = document.createElement("tbody")

    inpPesquisar.addEventListener('keyup', ev => {

        //Extrai todas as linhas da tabela principal e passa para uma tabela reserva
        //que foi criada.
        //----------------------------------------------------------------------------------
        Array.from(tbody.children).forEach(linha => {
            tabelaReserva.appendChild(linha);

        })




        //Ordenada o array de elementos linha pela primeira celula
        //-----------------------------------------------------------------------------------
        const tabelaOrdenada = Array.from(tabelaReserva.children).sort(function (aa, bb) {

            const primeiroValor = aa.firstChild.textContent
            const segundoValor = bb.firstChild.textContent

            //para inverter substitua 1- por 1 e 1 por -1
            if (primeiroValor > segundoValor) {

                return -1;
            }
            if (primeiroValor < segundoValor) {
                return 1;
            }

            return 0;
        });


        //Varre toda a tabela reserva, e insere na tabela principal apenas
        //as linhas que atenderem ao condicional exigido
        //----------------------------------------------------------------------------------
        tabelaOrdenada.forEach(linha => {


            let valoresAgrupadosDaLinha = "";
            //Extrai e agrupa todos os valores da linha
            Array.from(linha.children).forEach(celula => {

                valoresAgrupadosDaLinha += celula.textContent.toLowerCase();
            });


            //Valor do campo de pesquisa
            const stringPesquisada = ev.target.value.toLowerCase();

            //Se contem uma substring dentro da string o valor retornado e sempre diferente de -1
            if (valoresAgrupadosDaLinha.indexOf(stringPesquisada) !== -1) {

                //Preenche a tabela filtrada
                tbody.appendChild(linha)
            }

        })

    })

}
















//Cria as linhas de inputs na tabela de acordo com as regras no data-set aplicada no cabeçalho,
//essas regras ja determinam a formatação da tabela e também como serão criados os inputs.
//==================================================================================================================
//==================================================================================================================
/**
       * Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha da tabela com os dados passado por um Objeto
       * @param {HTMLTableElement} elTable Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha
       * @param {object} dados Um objeto com os valores/data de uma ou mais linhas
       
       * @returns {HTMLTableElement} Retorna a referencia para a linha criada
       */
export function insertLineInput2(elTable, dataAutocomplete, afterSelectAutoComplete) {//Espera receber um TBODY


    //Array de retorno da função
    const linhasCriadas = [];

    //Cria uma linha para manipular
    const elNovaLinha = document.createElement("tr")

    //Numeração das ids das linhas
    // =====================================================================================================
    const firstLine = elTable.lastElementChild;
    if (firstLine) {
        elNovaLinha.dataset.id = b.paraFloat(firstLine.dataset.id) + 1;
    } else {
        //Se nao existe linha no Tbody insere id = 1 na linha que sera adicionada
        elNovaLinha.dataset.id = 0;
    }

    //Insere a linha no TBody
    elTable.appendChild(elNovaLinha);




    //Cria as células e cria os inputs dentro delas na tabela
    // =====================================================================================================
    //Serve para agrupar os inputs da mesma linha , para quando for usar a função de extrair dados do form
    // let groupLine = 1;

    //Seleciona a linha<tr> correspondente ao cabeçalho na tabela
    const elTrCabecalho = elTable.parentNode.querySelector("thead tr");
    //Varre cada célula do cabeçalho
    Array.from(elTrCabecalho.cells).forEach(element => {

        // b.findElArrayInObject(elTrCabecalho.cells, dadosItem, (element, key) => {


        //Cria as linhas de inputs na tabela de acordo com as regras no data-set aplicada no cabeçalho
        // =====================================================================================================

        //Cria e insere a célula na linha nova --------------------------------------------------------------------------------
        elNovaLinha.insertAdjacentHTML("beforeend",
            `<td class="${element.dataset.class}"data-name="${element.dataset.name}">                   
            <input class="input-default" type="text" name="${element.dataset.name}" autocomplete="lala" 
            id="item-${element.dataset.name}-${elNovaLinha.dataset.id}"  data-relacional="${elNovaLinha.dataset.id}" required"></input>                  
        </td>`);


        //------------------------------------------------------------------------------------------------------
        //Seleciona a célula<td> e o seu input recém criados da linha para aplicar regras especificas.
        const tdAtual = elNovaLinha.lastElementChild;
        // const inpAtual = elNovaLinha.querySelector(`#item-${element.dataset.name}-${elNovaLinha.dataset.id}`)
        const inpAtual = elNovaLinha.lastElementChild.firstElementChild;







        //REGRAS - são adicionados nos atributos da célula e do input
        //=========================================================================================================

        //TYPE - normalmente aplicado na célula (tdAtual)
        //---------------------------------------------------------------------------------------------------
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

                //BOTÃO EXCLUIR
                //--------------------------------------------------------------------------------------------
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

                // AUTOCOMPLETE
                //----------------
                //Recebe dados para o auto comeplete e uma funç~ao para ser realizada apos escolher uma opção 
                if (dataAutocomplete) {
                    // b.autoComplete.ativar(`#item-nome-${elNovaLinha.dataset.id}`, dataAutocomplete, afterSelectAutoComplete);
                    b.autoComplete.ativar(`#item-nome-${elNovaLinha.dataset.id}`, dataAutocomplete, dataSelecionado => {
                        if (afterSelectAutoComplete) {
                            afterSelectAutoComplete(dataSelecionado, elNovaLinha);
                        }

                    });
                }
                break;



            default:
                break;
        }




        //FORMAT - no input        
        //---------------------------------------------------------------------------------------------------------
        //Adiciona as regras de formatação no inputs para serem usadas nos métodos do FORM
        //Adiciona alguns valores padrões em alguns tipos de formato
        switch (element.dataset.format) {
            case "coin":
                inpAtual.value = b.paraMoeda(0);
                inpAtual.dataset.type = "coin"; //mudar na função do FORM type para format
                break;


            case "coin-real":
                inpAtual.value = b.paraMoedaReal(0);
                inpAtual.dataset.type = "coin-real";
                break;


            case "date":
                inpAtual.value = b.formatDataISOforDataUser()
                inpAtual.dataset.type = "date";


            default:
                break;
        }




        //ATTR - no input
        //Passa algum atributo pa o input dentro da célula
        //---------------------------------------------------------------------------------------------------------
        //Passa a o atributo de formatação da Célula para o input
        switch (element.dataset.attr) {
            case "disabled":
                inpAtual.setAttribute("disabled", "disabled");
                // inpAtual.disabled = "true" ;
                break;

            case "coin-real":

                break;

        }




        //------------------------------------------------------------------------------------------------------
        //Verifica qual input da linha é pra ser ignorado no envio do formulário 
        //inserindo .dataset.ignore = "true";       
        if (element.dataset.ignore) {
            inpAtual.dataset.ignore = "true";
        }



        // ----------------------------------------------------------------------------------------------------
        //Verifica se o o campo input da célula vai ter a função de auto complete
        // if (element.dataset.autocomplete) {



        // }


    });//foreach



    // groupLine++;
    //Modificar o método mask para se basear no dataset.format e não no dataset-type
    b.form.mask(elNovaLinha)

    // linhasCriadas = elNovaLinha


    return elNovaLinha;

}//============================================================================================================







































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



    // console.log(params.data);
    // mantto


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
            //Verifica qual input da linha é pra ser ignorado no envio do formulario 
            //inserindo .dataset.ignore = "true";       
            if (element.dataset.ignore) {
                inpAtual.dataset.ignore = "true";
            }



            // ----------------------------------------------------------------------------------------------------
            //Verifica se o o campo input da celula vai ter a função de auto cmplete
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




















//============================================================================================================
/**
       * Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha da tabela com os dados passado por um Objeto
       * @param {HTMLTableElement} elTable Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha
       * @param {object} dados Um objeto com os valores/data de uma ou mais linhas
       * @param {string} nometabelaDoBanco Nome da tabela no banco, para as funções de excluir e editar
       * @returns {HTMLTableElement} Retorna a referencia para a linha criada
       */
export function insertLineInput(elTable, dataAutocomplete, afterSelectAutoComplete) {//Espera receber um TBODY


    //Array de retorno da função
    const linhasCriadas = [];

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


    //Insere dados nas células das tabelas
    //---------------------------------------------------------------------------------------------
    //Serve para agrupar os inputs da mesma linha , para quando for usar a função de extrair dados do form
    // let groupLine = 1;
    //Pega a linha de celulas do Head da tabela TH
    const cabecalho = elTable.parentNode.querySelector("thead tr");//Espera receber um TBODY
    Array.from(cabecalho.cells).forEach(element => {

        // b.findElArrayInObject(cabecalho.cells, dadosItem, (element, key) => {



        // ===================================================================================================================
        //Cria e insere a celula --------------------------------------------------------------------------------
        elNovaLinha.insertAdjacentHTML("beforeend", `
                <td class="${element.dataset.class}"data-name="${element.dataset.name}">                   
                    <input class="input-default" type="text" name="${element.dataset.name}" autocomplete="lala" 
                    id="item-${element.dataset.name}-${elNovaLinha.dataset.id}"  data-relacional="${elNovaLinha.dataset.id}" required"></input>                  
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
                inpAtual.value = b.paraMoeda(0);
                inpAtual.dataset.type = "coin";
                break;


            case "coin-real":
                inpAtual.value = b.paraMoedaReal(0);
                inpAtual.dataset.type = "coin-real";
                break;


            case "date":
                inpAtual.value = b.formatDataISOforDataUser()
                inpAtual.dataset.type = "date";


            default:
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

                // AUTOCOMPLETE
                //----------------
                //Recebe dados para o auto comeplete e uma funç~ao para ser realizada apos escolher uma opção 
                if (dataAutocomplete) {
                    // b.autoComplete.ativar(`#item-nome-${elNovaLinha.dataset.id}`, dataAutocomplete, afterSelectAutoComplete);
                    b.autoComplete.ativar(`#item-nome-${elNovaLinha.dataset.id}`, dataAutocomplete, dataSelecionado => {
                        if (afterSelectAutoComplete) {
                            afterSelectAutoComplete(dataSelecionado, elNovaLinha);
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


    });//foreach



    // groupLine++;
    b.form.mask(elNovaLinha)

    // linhasCriadas = elNovaLinha


    return elNovaLinha;

}//============================================================================================================
































//============================================================================================================
/**
       * Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha da tabela com os dados passado por um Objeto
       * @param {HTMLTableElement} elTable Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha
       * @param {object} dados Um objeto com os valores/data de uma ou mais linhas
       * @param {string} nometabelaDoBanco Nome da tabela no banco, para as funções de excluir e editar
       * @returns {HTMLTableElement} Retorna a referencia para a linha criada
       */
//Inserit linha preenchida
export function insertLineInputFilled(elTable, params) {//Espera receber um TBODY



    // console.log(params.data);
    // mantto


    //Array de retorno da função
    const linhasCriadas = [];



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
            //Verifica qual input da linha é pra ser ignorado no envio do formulario 
            //inserindo .dataset.ignore = "true";       
            if (element.dataset.ignore) {
                inpAtual.dataset.ignore = "true";
            }



            // ----------------------------------------------------------------------------------------------------
            //Verifica se o o campo input da celula vai ter a função de auto cmplete
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
















































//lineInTable - cria uma ou mais linhas em uma tabela
//============================================================================================================
/**
       * Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha da tabela com os dados passado por um Objeto
       * @param {HTMLTableElement} elTable Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha
       * @param {object} dados Um objeto com os valores/data de uma ou mais linhas
       * @param {string} nometabelaDoBanco Nome da tabela no banco, para as funções de excluir e editar
       * @returns {HTMLTableElement} Retorna a referencia para a linha criada
       */
export function insertLine(elTable, dados, nometabelaDoBanco, afterDelete) {//Espera receber um TBODY

    //---------------------------------------------------------------------------------------------
    //Verifica se está recevendo um um objeto ou array de objetos,
    //para adicionar um a muitas linhas
    let dadosArray;
    if (Array.isArray(dados)) {
        // Limpar tabela antes de criar outra
        elTable.innerHTML = "";
        dadosArray = dados;
    } else {
        dadosArray = [dados];
    }


    const linhasCriadas = [];
    dadosArray.forEach(dadosItem => {


        //Cria linha e insere a linha vazia  na tabela ou
        //se for edição , apaga o conteudo da linha selecionada  e a reultiliza
        //---------------------------------------------------------------------------------------------
        let elNovaLinha = "";
        //Sef for uma linha/TR selecionada no edit
        if (elTable.tagName == "TR") {
            //Passa a linha pra uma nova referencia;
            elNovaLinha = elTable;
            //Limpa a linha 
            elNovaLinha.innerHTML = "";
            //Pega o pai/tbody da linha 
            elTable = elTable.parentNode;

        } else {
            //Cria uma linha para manipular
            elNovaLinha = document.createElement("tr")
            //Insere a linha na tabela
            elTable.appendChild(elNovaLinha);
            // <tr class="tabela-item-linha" data-item-id="${responseItemSalvo.id}">
        }

        elNovaLinha.dataset.id = dadosItem.id;



        //Insere dados nas celulas das tabelas
        //---------------------------------------------------------------------------------------------
        //Pega a linha de celulas do Head da tabela TH
        const cabecalho = elTable.parentNode.querySelector("thead tr");//Espera receber um TBODY 
        //  elTable.parentNode.querySelector("thead tr").childNodes;
        //Encontra o NOME do parametro do objeto no data-nome="" do elemento       
        b.findElArrayInObject(cabecalho.cells, dadosItem, (element, key) => {

            switch (element.dataset.format) {
                case "coin-real":
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                    data-name="${key}">${b.paraMoedaReal(dadosItem[key])}</td>`);
                    // html += `<td data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`;
                    break;

                case "coin":
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                    data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`);
                    // html += `<td data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`;
                    break;

                case "date":
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                    data-name="${key}">${b.formatDataISOforDataUser(dadosItem[key])}</td>`);
                    // html += `<td data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`;
                    break;

                case "action":
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="cel-acoes">
                    <button class="btn-excluir-linha" data-name="excluir">${b.ico.lixeira}</button></td>`);
                    // html += `<td data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`;
                    break;

                default:
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                    data-name="${key}">${dadosItem[key]}</td>`);
                    // html += `<td data-name="${key}">${dadosItem[key]}</td>`;
                    break;
            }



        });

        //Insere as celulas criadas na linha
        // elNovaLinha.appendChild(b.htmlToElement(html));

        //Action 
        //==========================================================================================================================
        if (nometabelaDoBanco != undefined) {

            //Excluir 
            //---------------------------------------------------------------------------------------------
            const botaoExcluir = elNovaLinha.querySelector('[data-name="excluir"]');
            botaoExcluir.addEventListener('click', function (e) {
                // comanda.splice(linha.rowIndex, 1);//no array X remova 1 elemento

                //Recebe a mensagem a ser exibida na janela, e uma function de callback que
                //sera executada somente se clicar em Confirmar
                b.modal.confirm(() => {
                    b.crud.deletar(dadosItem.id, nometabelaDoBanco, () => {
                        elTable.deleteRow(elNovaLinha.rowIndex - 1);
                        //Recebe uma função para ser executada apos o delete.
                        afterDelete(elNovaLinha.rowIndex - 1);


                    })
                })
            });


            //Editar
            //---------------------------------------------------------------------------------------------
            // const botaoEditar = linhaElemento.querySelector('.editar-linha');
            //Coloca um evento para edição na celula de name=nome
            const eleCellNome = elNovaLinha.querySelector(`[data-name="nome"]`);
            eleCellNome.classList.add("cursor-pointer")
            eleCellNome.addEventListener('click', function (e) {

                b.modal.abrir();
                // Passa o elemento Janela Modal para a função render.page 

                b.render.page(

                    b.modal.content,
                    `../view/${nometabelaDoBanco}/adicionar/adicionar-${nometabelaDoBanco}.html`,
                    `../../../view/${nometabelaDoBanco}/editar/editar-${nometabelaDoBanco}.js`,
                    "modal",
                    {
                        dadosItem: dadosItem,
                        elLinhaSelecionada: e.target.parentNode
                    }

                );//assync


                // b.render.pageModal(
                // `../view/${nometabelaDoBanco}/adicionar/adicionar-${nometabelaDoBanco}.html`,
                // `../../../view/${nometabelaDoBanco}/editar/editar-${nometabelaDoBanco}.js`,
                //     {
                //         dadosItem: dadosItem,
                //         elLinhaSelecionada: e.target.parentNode
                //     }

                // );//assync

            });
        }

        //Coloca a linha criada no array 
        linhasCriadas.push(elNovaLinha);
    });

    return linhasCriadas;

}//============================================================================================================






























//lineInTable - cria uma ou mais linhas em uma tabela
//============================================================================================================
/**
       * Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha da tabela com os dados passado por um Objeto
       * @param {HTMLTableElement} elTable Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha
       * @param {object} dados Um objeto com os valores/data de uma ou mais linhas
       * @param {string} nometabelaDoBanco Nome da tabela no banco, para as funções de excluir e editar
       * @returns {HTMLTableElement} Retorna a referencia para a linha criada
       */
export function insertLineDesc(elTable, dados, nometabelaDoBanco, afterDelete) {//Espera receber um TBODY

    //---------------------------------------------------------------------------------------------
    //Verifica se está recevendo um um objeto ou array de objetos,
    //para adicionar um a muitas linhas
    let dadosArray;
    if (Array.isArray(dados)) {
        // Limpar tabela antes de criar outra
        elTable.innerHTML = "";
        dadosArray = dados;
    } else {
        dadosArray = [dados];
    }

    const linhasCriadas = [];
    dadosArray.forEach(dadosItem => {


        //Cria linha e insere a linha vazia  na tabela ou
        //se for edição , apaga o conteudo da linha selecionada  e a reultiliza
        //---------------------------------------------------------------------------------------------
        let elNovaLinha = "";
        //Sef for uma linha/TR selecionada no edit
        if (elTable.tagName == "TR") {
            //Passa a linha pra uma nova referencia;
            elNovaLinha = elTable;
            //Limpa a linha 
            elNovaLinha.innerHTML = "";
            //Pega o pai/tbody da linha 
            elTable = elTable.parentNode;

        } else {
            //Cria uma linha para manipular
            elNovaLinha = document.createElement("tr")

            //Insere linha no top da tabela
            elTable.insertBefore(elNovaLinha, elTable.firstChild);

        }

        elNovaLinha.dataset.id = dadosItem.id;



        //Insere dados nas celulas das tabelas
        //---------------------------------------------------------------------------------------------
        //Pega a linha de celulas do Head da tabela TH
        const cabecalho = elTable.parentNode.querySelector("thead tr");//Espera receber um TBODY 
        //  elTable.parentNode.querySelector("thead tr").childNodes;
        //Encontra o NOME do parametro do objeto no data-nome="" do elemento       
        b.findElArrayInObject(cabecalho.cells, dadosItem, (element, key) => {

            switch (element.dataset.format) {
                case "coin-real":
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                    data-name="${key}">${b.paraMoedaReal(dadosItem[key])}</td>`);
                    // html += `<td data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`;
                    break;

                case "coin":
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                    data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`);
                    // html += `<td data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`;
                    break;

                case "date":
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                    data-name="${key}">${b.formatDataISOforDataUser(dadosItem[key])}</td>`);
                    // html += `<td data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`;
                    break;

                case "action":
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="cel-acoes">
                    <button class="btn-excluir-linha" data-name="excluir">${b.ico.lixeira}</button></td>`);
                    // html += `<td data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`;
                    break;
                case "span":
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                    data-name="${key}"><span>${dadosItem[key]}</span></td>`);
                    break;

                default:
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                    data-name="${key}">${dadosItem[key]}</td>`);
                    // html += `<td data-name="${key}">${dadosItem[key]}</td>`;
                    break;
            }



        });

        //Insere as celulas criadas na linha
        // elNovaLinha.appendChild(b.htmlToElement(html));

        //Action 
        //==========================================================================================================================
        if (nometabelaDoBanco != undefined) {

            //Excluir 
            //---------------------------------------------------------------------------------------------
            const botaoExcluir = elNovaLinha.querySelector('[data-name="excluir"]');
            botaoExcluir.addEventListener('click', function (e) {

                //Executa apenaso evento na frente, ex o botao de ecluir, e nao o evento seguinte que pode
                //esta na linha
                e.stopPropagation();
                // comanda.splice(linha.rowIndex, 1);//no array X remova 1 elemento

                //Recebe a mensagem a ser exibida na janela, e uma function de callback que
                //sera executada somente se clicar em Confirmar
                b.modal.confirm(() => {

                    b.crud.deletar(dadosItem.id, nometabelaDoBanco, () => {
                        elTable.deleteRow(elNovaLinha.rowIndex - 1);


                        if (afterDelete) {
                            // console.log("object");
                            //Recebe uma função para ser executada apos o delete.
                            afterDelete(elNovaLinha.rowIndex - 1);
                        }



                    })
                })
            });






            //Editar
            //---------------------------------------------------------------------------------------------
            // const botaoEditar = linhaElemento.querySelector('.editar-linha');
            //Coloca um evento para edição na celula de name=nome
            // const eleCellNome = elNovaLinha.querySelector(`[data-name="nome"]`);
            const eleCellNome = elNovaLinha.querySelector(`[data-edit="true"]`);
            if (eleCellNome) {
                eleCellNome.classList.add("cursor-pointer")
                eleCellNome.addEventListener('click', function (e) {

                    b.modal.abrir();
                    // Passa o elemento Janela Modal para a função render.page 

                    b.render.page(

                        b.modal.content,
                        `../view/${nometabelaDoBanco}/adicionar/adicionar-${nometabelaDoBanco}.html`,
                        `../../../view/${nometabelaDoBanco}/editar/editar-${nometabelaDoBanco}.js`,
                        "modal",
                        {
                            dadosItem: dadosItem,
                            elLinhaSelecionada: e.target.parentNode
                        }

                    );//assync


                    // b.render.pageModal(
                    // `../view/${nometabelaDoBanco}/adicionar/adicionar-${nometabelaDoBanco}.html`,
                    // `../../../view/${nometabelaDoBanco}/editar/editar-${nometabelaDoBanco}.js`,
                    //     {
                    //         dadosItem: dadosItem,
                    //         elLinhaSelecionada: e.target.parentNode
                    //     }

                    // );//assync

                });
            }
        }

        //Coloca a linha criada no array 
        linhasCriadas.push(elNovaLinha);
    });

    return linhasCriadas;

}//============================================================================================================








































//lineInTable - cria uma ou mais linhas em uma tabela
//============================================================================================================
/**
       * Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha da tabela com os dados passado por um Objeto
       * @param {HTMLTableElement} elTable Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha
       * @param {object} dados Um objeto com os valores/data de uma ou mais linhas
       * @param {string} nometabelaDoBanco Nome da tabela no banco, para as funções de excluir e editar
       * @returns {HTMLTableElement} Retorna a referencia para a linha criada
       */
export function insertMultipleLinesDesc(elTable, dados, nometabelaDoBanco) {//Espera receber um TBODY

    //---------------------------------------------------------------------------------------------
    //Verifica se está recevendo um um objeto ou array de objetos,
    //para adicionar um a muitas linhas
    let dadosArray;
    if (Array.isArray(dados)) {
        // Limpar tabela antes de criar outra
        // elTable.innerHTML = "";
        dadosArray = dados;
    } else {
        dadosArray = [dados];
    }

    const linhasCriadas = [];
    dadosArray.forEach(dadosItem => {


        //Cria linha e insere a linha vazia  na tabela ou
        //se for edição , apaga o conteudo da linha selecionada  e a reultiliza
        //---------------------------------------------------------------------------------------------
        let elNovaLinha = "";
        //Sef for uma linha/TR selecionada no edit
        if (elTable.tagName == "TR") {
            //Passa a linha pra uma nova referencia;
            elNovaLinha = elTable;
            //Limpa a linha 
            elNovaLinha.innerHTML = "";
            //Pega o pai/tbody da linha 
            elTable = elTable.parentNode;

        } else {
            //Cria uma linha para manipular
            elNovaLinha = document.createElement("tr")

            //Insere linha no top da tabela
            elTable.insertBefore(elNovaLinha, elTable.firstChild);

        }

        elNovaLinha.dataset.id = dadosItem.id;



        //Insere dados nas celulas das tabelas
        //---------------------------------------------------------------------------------------------
        //Pega a linha de celulas do Head da tabela TH
        const cabecalho = elTable.parentNode.querySelector("thead tr");//Espera receber um TBODY 
        //  elTable.parentNode.querySelector("thead tr").childNodes;
        //Encontra o NOME do parametro do objeto no data-nome="" do elemento       
        b.findElArrayInObject(cabecalho.cells, dadosItem, (element, key) => {

            switch (element.dataset.format) {
                case "coin-real":
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                    data-name="${key}">${b.paraMoedaReal(dadosItem[key])}</td>`);
                    // html += `<td data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`;
                    break;

                case "coin":
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                    data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`);
                    // html += `<td data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`;
                    break;

                case "date":
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                    data-name="${key}">${b.formatDataISOforDataUser(dadosItem[key])}</td>`);
                    // html += `<td data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`;
                    break;

                case "action":
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="cel-acoes">
                    <button class="btn-excluir-linha" data-name="excluir">${b.ico.lixeira}</button></td>`);
                    // html += `<td data-name="${key}">${b.paraMoeda(dadosItem[key])}</td>`;
                    break;

                default:
                    elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                    data-name="${key}">${dadosItem[key]}</td>`);
                    // html += `<td data-name="${key}">${dadosItem[key]}</td>`;
                    break;
            }



        });

        //Insere as celulas criadas na linha
        // elNovaLinha.appendChild(b.htmlToElement(html));

        //Action 
        //==========================================================================================================================
        if (nometabelaDoBanco != undefined) {

            //Excluir 
            //---------------------------------------------------------------------------------------------
            const botaoExcluir = elNovaLinha.querySelector('[data-name="excluir"]');
            botaoExcluir.addEventListener('click', function (e) {
                // comanda.splice(linha.rowIndex, 1);//no array X remova 1 elemento

                //Recebe a mensagem a ser exibida na janela, e uma function de callback que
                //sera executada somente se clicar em Confirmar
                b.modal.confirm(() => {
                    b.crud.deletar(dadosItem.id, nometabelaDoBanco, () => {
                        elTable.deleteRow(elNovaLinha.rowIndex - 1);


                    })
                })
            });


            //Editar
            //---------------------------------------------------------------------------------------------
            // const botaoEditar = linhaElemento.querySelector('.editar-linha');
            //Coloca um evento para edição na celula de name=nome
            const eleCellNome = elNovaLinha.querySelector(`[data-name="nome"]`);
            eleCellNome.classList.add("cursor-pointer")
            eleCellNome.addEventListener('click', function (e) {

                b.modal.abrir();
                // Passa o elemento Janela Modal para a função render.page 

                b.render.page(

                    b.modal.content,
                    `../view/${nometabelaDoBanco}/adicionar/adicionar-${nometabelaDoBanco}.html`,
                    `../../../view/${nometabelaDoBanco}/editar/editar-${nometabelaDoBanco}.js`,
                    "modal",
                    {
                        dadosItem: dadosItem,
                        elLinhaSelecionada: e.target.parentNode
                    }

                );//assync


                // b.render.pageModal(
                // `../view/${nometabelaDoBanco}/adicionar/adicionar-${nometabelaDoBanco}.html`,
                // `../../../view/${nometabelaDoBanco}/editar/editar-${nometabelaDoBanco}.js`,
                //     {
                //         dadosItem: dadosItem,
                //         elLinhaSelecionada: e.target.parentNode
                //     }

                // );//assync

            });
        }

        //Coloca a linha criada no array 
        linhasCriadas.push(elNovaLinha);
    });

    return linhasCriadas;

}//============================================================================================================




























