import b from '../biblioteca.js';



/**
 * Recebe todos os valores de um item do banco de uma tabela , para usar na opção de editar
 */
export let dataItem = Object; //Objeto para armazenar um item/linha de uma tabela do banco
export let elLinhaSelecionada = Object;


//Function que busca a pagina e insera ela na DOM dentro do elemento Main
//==============================================================================================
/**
 * Function que busca a pagina e insera ela na DOM dentro do elemento Main
 * em seguida importa um JS de mesmo nome na mesma pagina
 * @param {string}
 */
export function pageMain(url) {



    //Limpa todos os setInterval ao renderizar uma novapagina principal
    b.clearIntervalCustom()




    // try {

    //Define a pagina inicial
    //---------------------------------------------------------
    if (url == "") {
        url = "dashboard"

    }

    // console.log(url);



    //Tratamento da String Url
    ////====================================================================================================
    //Transforma a string url em um array separando por "/"
    const arrayUrl = url.split("/");
    // console.log(arrayUrl);

    //Segundo array é o nome da pagina
    // let pagina = arrayUrl[1];
    // let paginaJs = arrayUrl[1];
    let pagina;
    let paginaJs;

    //primeiro e segundo array é o endereço
    // let endereco = arrayUrl[0] + "/" + arrayUrl[1];
    let endereco;

    //Id na ultima parte da url é passado como parametro para a função init do JS que abre junto da pagina
    // let id = arrayUrl[2];
    let id;


    //-----------------------------
    // Titulo que vai ser exibido no topo do sidebar
    let tituloSidebar = ""





    //Regras para url
    //Recebe a url separa em um array , entao de acordo com cada condicional chama uma URl da forma especifica
    //===============================================================================================



    //GRUPO - Regras da Url para uma pasta de grupo  
    // -------------------------------------------------------------------------
    if (arrayUrl[0] == "rouparia" || arrayUrl[0] == "cafe" || arrayUrl[0] == "manutencao") {
        //Regras para url da pagina principal
        // -------------------------------------------------------------------------
        pagina = arrayUrl[1] + "-" + arrayUrl[0];
        paginaJs = arrayUrl[1] + "-" + arrayUrl[0];
        endereco = arrayUrl[0] + "/" + arrayUrl[1] + "/main";
        // console.log(pagina);
        tituloSidebar = arrayUrl[0] + "  " + arrayUrl[1];;


        // Regras para Detalhes para url composta , sempre pega a segunda url e junta com a primeira 
        //para gerar o nome do arquivo HTML e Js
        // -------------------------------------------------------------------------  
        if (arrayUrl.length == 4) {
            endereco = arrayUrl[0] + "/" + arrayUrl[1] + "/" + arrayUrl[2];
            pagina = arrayUrl[2] + "-" + arrayUrl[1] + "-" + arrayUrl[0];
            paginaJs = arrayUrl[2] + "-" + arrayUrl[1] + "-" + arrayUrl[0];
            tituloSidebar = arrayUrl[1];
            id = arrayUrl[3];
        }




        // Regras especificas para pastas de formulario
        // -------------------------------------------------------------------------   
        if (arrayUrl[2] == "form") {
            pagina = "form-" + arrayUrl[1] + "-" + arrayUrl[0];
            paginaJs = "adicionar-" + arrayUrl[1] + "-" + arrayUrl[0];
            endereco = arrayUrl[0] + "/" + arrayUrl[1] + "/form";
           
            tituloSidebar = arrayUrl[1];
            id = arrayUrl[3];
        }


    } else {
        //Regras para url da pagina principal
        // -------------------------------------------------------------------------
        //Qualquer Url de uma parte so vai acessar a pagina de mesmo nome , detro da pasta main
        if (arrayUrl.length == 1) {
            pagina = arrayUrl[0];
            paginaJs = arrayUrl[0];
            endereco = arrayUrl[0] + "/main";
            tituloSidebar = pagina;
        }

        // Regras especificas para pastas de formulario
        // -------------------------------------------------------------------------   
        if (arrayUrl[1] == "adicionar") {
            pagina = "form-" + arrayUrl[0];
            endereco = arrayUrl[0] + "/form";
            paginaJs = "adicionar-" + arrayUrl[0];

            tituloSidebar = arrayUrl[1];
            id = arrayUrl[2];
        }
        if (arrayUrl[1] == "editar") {
            pagina = "form-" + arrayUrl[0];
            endereco = arrayUrl[0] + "/form";
            paginaJs = "editar-" + arrayUrl[0];
            tituloSidebar = arrayUrl[1];
            id = arrayUrl[2];
        }
        // Regras para Detalhes para url composta , sempre pega a segunda url e junta com a primeira 
        //para gerar o nome do arquivo HTML e Js
        // -------------------------------------------------------------------------  
        if (arrayUrl.length == 3) {
            endereco = arrayUrl[0] + "/" + arrayUrl[1];
            pagina = arrayUrl[1] + "-" + arrayUrl[0];
            paginaJs = arrayUrl[1] + "-" + arrayUrl[0];
            tituloSidebar = arrayUrl[1];
            id = arrayUrl[2];
        }


    }








    //==================================================================================

    //Referencia pro elemento onde vai ser redenrizado o conteudo principal.
    const mainContent = document.querySelector('main .main__content');

    //Limpa o main enquanto espera a proxima tela ser carregada
    mainContent.innerHTML = ``;

    let promisseResolvida = false;
    const promisses = b.fetchText(`../view/${endereco}/${pagina}.html`, html => {//async

        // console.log(mainContent);

        // console.log("html :" + pagina);
        //Insere Elementos HTML no DOM. criando a pagina no main
        promisseResolvida = true;
        mainContent.innerHTML = html;
        // document.querySelector('html').innerHTML = html;

        //ativa o JS com as regras depois dos elementos da pagina forem inseridos no DOM
        //Mesmo coisa que import * as paginaJs from '../../../view/${pagina}/main/${pagina}.js';
        import(`../../../view/${endereco}/${paginaJs}.js`)
            .then((moduloJs) => {

                // console.log(url);
                // console.log(b.lerHash());
                //==============================================================================================
                //Condicional caso a Promisse do import JS atrase em conexões lentas e a pagina HTML ja tenha mudado
                //não e chamado a função de inicialização do js
                //Verifica se a url passada para a função pageMain e a mesma que está na URL do navegador.
                if (b.lerHash() == url || b.lerHash() == "") {
                    // Em movimentações estu testanto usar classes
                    //========================================
                    // console.log(moduloJs);

                    //Se der erro executa como classe;
                    // try {
                    //     moduloJs.init(id);
                    // } catch (error) {
                    //     new moduloJs.default(id).init();
                    // }


                    if (paginaJs == "movimentacoes" || paginaJs == "dashboard" || paginaJs == "modelo"
                        || paginaJs == "rouparia" || paginaJs == "apartamentos" || paginaJs == "detalhes-apartamentos"
                        || paginaJs == "produtos-rouparia" || paginaJs == "movimentacoes-produtos" || paginaJs == "apartamentos-rouparia"
                        || paginaJs == "detalhes-apartamentos-rouparia" || paginaJs == "movimentar" || paginaJs == "produtos-cafe"
                        || paginaJs == "estoques" 
                        ) {
                        //Default e a classe, que pode ter qualquer nome
                        const newObject = new moduloJs.default(id).init();
                    } else {
                        moduloJs.init(id);

                    }
                }


            })


        // .catch(erro => {
        //     console.error(erro);
        // });

    });





    //Remove o efeito de ficar piscando o loading muito rapido entre as trocas de tela,
    //Loading so aparece a partir de X segundos 
    //-------------------------------------------------------------------------------------
    setTimeout(() => {
        // console.log("loading: " + promisseResolvida);
        if (promisseResolvida == false) {
            mainContent.innerHTML = `<DIV><div class="loader">Loading...</div> </div>`;
        }
    }, 330);

    //Esconde o SIDEBAR depois de clica, na versao de celular
    document.querySelector('#menu-checkbox').checked = 0;

    //Muda o nome no topo do sidebar, indicando onde esta no momento
    document.querySelector('#nav-top__title').textContent = tituloSidebar.toUpperCase();
    // document.querySelector('#nav-top__title-text').setAttribute("href", `#/${pagina}`);

    //Insere o nome na url
    //Buga duplica o evento render, adiionar pelo link direito no index
    // b.inserirHash(pagina);


    // } catch (error) {
    //     console.log(error);
    //     console.log(object);
    // }

    // return promisses;


}//============================================================================================================













// 
//============================================================================================================
/**
       * Recebe a Url da pagina e de seu JS e renderiza ele no elemento referenciado
       * se passar o argumento "modal" para o parametro tipo a função aceita receber como elementoHtml a função modal.content
       * @param {String} elementoHtml Elemento onse será renderizado o conteudo Html
       * @param {String} urlPagina Url para a pagina Html
       * @param {String} urlJs Url para o JavaScript 
       * @param {String} tipo Se o Elemento for a janela modal passar tipo "modal" para receber como 
       * @param {Object} valueInit Valor passado por parametro para a função de inicializção do JS init(valueInit)
       * uma function.
       */
export function page(elementoHtml, urlPagina, urlJs, tipo, valueInit) {
    return new Promise((resolve, reject) => {
        b.fetchText(urlPagina, html => {
            //Insere o conteudo HTML no elemento referenciado

            //Passa a resolve da promisse por parametro         
            if (valueInit) {
                valueInit.resolve = resolve;
            }

            if (tipo === "modal") {
                elementoHtml(html, resolve);
            } else {
                elementoHtml.innerHTML = html;
            }



            //ativa o JS com as regras depois dos elementos da pagina forem inseridos no DOM
            import(urlJs)
                .then((paginaJs) => {
                    paginaJs.init(valueInit);
                });

        });
    });

}//============================================================================================================














//============================================================================================================
/**
       * Recebe a Url da pagina e de seu JS e renderiza ele no elemento referenciado
       * se passar o argumento "modal" para o parametro tipo a função aceita receber como elementoHtml a função modal.content
       * @param {String} elementoHtml Elemento onse será renderizado o conteudo Html
       * @param {String} urlPagina Url para a pagina Html
       * @param {String} urlJs Url para o JavaScript 
       * @param {String} tipo Se o Elemento for a janela modal passar tipo "modal" para receber como 
       * @param {Object} valueInit Valor passado por parametro para a função de inicializção do JS init(valueInit)
       * uma function.
       */
export function pageModal(urlPagina, urlJs, valueInit) {


    return new Promise((resolve, reject) => {

        //Passa a resolve da promisse por parametro, se a função receber um valueInit
        if (valueInit) {
            valueInit.resolve = resolve;
        }


        b.fetchText(urlPagina, html => {
            //Insere o conteúdo HTML no elemento referenciado  
            b.modal.content(html, resolve);

            //ativa o JS com as regras depois dos elementos da pagina forem inseridos no DOM
            import(urlJs)
                .then((paginaJs) => {
                    paginaJs.init(valueInit);
                });

        });


    });





}//============================================================================================================


//============================================================================================================
/**
       * Recebe a Url da pagina e de seu JS e renderiza ele no elemento referenciado
       * se passar o argumento "modal" para o parametro tipo a função aceita receber como elementoHtml a função modal.content
       * @param {String} elementoHtml Elemento onse será renderizado o conteudo Html
       * @param {String} urlPagina Url para a pagina Html
       * @param {String} urlJs Url para o JavaScript 
       * @param {String} tipo Se o Elemento for a janela modal passar tipo "modal" para receber como 
       * @param {Object} valueInit Valor passado por parametro para a função de inicializção do JS init(valueInit)
       * uma function.
       */
export function pageModalCustom(urlPagina, urlJs, valueInit) {

    b.fetchText(urlPagina, html => {
        //Insere o conteudo HTML no elemento referenciado    
        b.modal.contentCustom(html);


        //ativa o JS com as regras depois dos elementos da pagina forem inseridos no DOM
        import(urlJs)
            .then((paginaJs) => {
                paginaJs.init(valueInit);
            });

    });

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
export function lineInTable(elTable, dados, nometabelaDoBanco) {//Espera receber um TBODY

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


                    if (element.dataset.edit == "true") {
                        elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                        data-name="${key}"  data-edit="true">${dadosItem[key]}</td>`);
                    } else {
                        elNovaLinha.insertAdjacentHTML("beforeend", `<td class="${element.dataset.class}" 
                        data-name="${key}">${dadosItem[key]}</td>`);
                    }



                    // html += `<td data-name="${key}">${dadosItem[key]}</td>`;
                    break;
            }

            //Adiciona a opção de clicar na celula para editar
            //=====================================================



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







            //Adiciona edição no TH que estiver com data-edit="true"
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
export function lineInTableDesc(elTable, dados, nometabelaDoBanco) {//Espera receber um TBODY

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


































//ARRUMAR O EDIT PARA BUSCAR OS DADOS NO BANCO
//lineInTable - cria uma ou mais linhas em uma tabela
//============================================================================================================
/**
       * Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha da tabela com os dados passado por um Objeto
       * @param {HTMLTableElement} elTable Recebe um elemento Tbody ou TR para adicionar uma ou mais linhas ou editar uma llinha
       * @param {object} dados Um objeto com os valores/data de uma ou mais linhas
       * @param {string} nometabelaDoBanco Nome da tabela no banco, para as funções de excluir e editar
       */
export function lineInTable2(elTable, dados, nometabelaDoBanco) {//Espera receber um TBODY

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
    });
}//============================================================================================================



































