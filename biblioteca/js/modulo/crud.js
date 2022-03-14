import b from "../biblioteca.js"



export async function fetchCrud(url, data, myFunction) {


    let responseJSON = [];
    try {
        const response = await fetch(url, {
            // cache: "force-cache",
            method: "POST",
            body: JSON.stringify(data)//body é o corpo da mensagem payload
        });
        responseJSON = await response.json();
    } catch (err) {

        b.modal.alert("erro", "Falha ao realizar ação!");
        console.error(err)
        return false; // return false impede de realizar o myFunction
    }


    return myFunction(responseJSON);
    // return true;  

};





//Função para deletar um item de uma tabela no banco
//==============================================================================================================
/**
 * Deleta um item de uma tabela no banco
 * @return {object} Retorna os dados do item deletado no banco.
 */
export function deletar(id, tabela, functionResponse) {
    // console.debug("function crud.deletar(id)");
    // console.debug(id);
    return fetchCrud("../controller/geral/ControllerGeral.class.php",
        {
            metodo: "deletar",
            tabela: tabela,
            data: { id: id }
        }, response => {
            console.log(response);
            //permissao_negada
            if (response["permissao"] == "negada") {
                b.modal.alert("erro", "Permissão negada.");
                return false;
            } else {
                // b.modal.alert("sucesso",  b.firstToUpperCase(tabela.slice(0, -1)) + " - Excluido(a) com sucesso");
                b.modal.alert("sucesso",   "Item excluido com sucesso.");
                functionResponse(response);
                return true;
            }



            // tabela[0].toUpperCase() + tabela.substr(1)
        })
    // .catch(err => {
    //     b.modal.alert("erro", "Falha ao tentar deletar.");
    //     console.error(err.message)
    // });


}








// Recebe um o bjeto data com todos os valores correspondentes aos campos de uma tabela
//==============================================================================================================
/**
 * Insere um item de uma tabela no banco
 * @return {object} Retorna o elemento criado junto da ID criada no banco
 */
export function salvar(data, tabelaDbNome, functionResponse) {


    //debug--------------------------------------------
    //  console.debug("function crud.editar(data, tabela, functionResponse)");
    //  console.debug("tabela: " + tabelaDbNome);

    //Retorna o elemento criado junto da ID criada no banco
    return fetchCrud("../controller/geral/ControllerGeral.class.php",
        {
            metodo: "salvar",
            tabela: tabelaDbNome,
            data: data
        }, response => {

            //debug--------------------------------------------
            // console.debug("response: " + response);
            // console.debug(response);
            if (response["permissao"] == "negada") {
                b.modal.alert("erro", "Permissão negada.");
                return false;
            } else {
                b.modal.alert("sucesso",  b.firstToUpperCase(tabelaDbNome.slice(0, -1)) + "Salvo(a) com sucesso!");
                functionResponse(response);//Retorno o item salvo e sua id no banco 
                return true;
            }


        })
    // .catch(err => {
    //     b.modal.alert("erro", "Falha ao tentar salvar!");
    //     console.error(err.message);
    // });

}





//
//==============================================================================================================
/**
 * Lista todos os itens da tabela informada e retorna um array de objetos para função de callback
 * @param {String} tabela Nome da tabela no Banco de Dados a ser listada
 * @param {FunctionStringCallback} functionResponse Função de CallBack que recebe como argumento a reposta da promisse
 * contendo a lista de itens do banco
 */
export function editar(data, tabelaDbNome, functionResponse) {

    //Log--------------------------------------------
    // console.debug("function crud.editar(data, tabela, functionResponse)");
    // console.debug("data: ");
    // console.debug(data);
    // console.info("tabela: " + tabelaDbNome);

    return fetchCrud("../controller/geral/ControllerGeral.class.php",
        {
            metodo: "editar",
            tabela: tabelaDbNome,
            data: data
        }, response => {            
            b.modal.alert("sucesso", b.firstToUpperCase(tabelaDbNome.slice(0, -1)) + " - Editado com sucesso!");
            functionResponse(response);

        })
    // .catch(err => {
    //     b.modal.alert("erro", "Falha ao realizar edição!");
    //     console.warn(err.message)
    // });

}






//
//==============================================================================================================
/**
 * Lista todos os itens da tabela informada e retorna um array de objetos para função de callback
 * @param {String} tabelaDbNome Nome da tabela no Banco de Dados a ser listada
 * @param {FunctionStringCallback} functionResponse Função de CallBack que recebe como argumento a reposta da promisse
 * contendo a lista de itens do banco
 */
export function listarById(id, tabelaDbNome, functionResponse) {


    return fetchCrud("../controller/geral/ControllerGeral.class.php",
        {
            metodo: "listarById",
            id: id,
            tabela: tabelaDbNome,
        }, response => {

            //debug--------------------------------------------
            // console.debug("response: ");
            // console.debug(response);

            functionResponse(response);
        });

}



//
//==============================================================================================================
/**
 * Lista todos os itens da tabela informada e retorna um array de objetos para função de callback
 * @param {String} tabelaDbNome Nome da tabela no Banco de Dados a ser listada
 * @param {FunctionStringCallback} functionResponse Função de CallBack que recebe como argumento a reposta da promisse
 * contendo a lista de itens do banco
 */
export function listarByKey(key, keyValor, tabelaDbNome, functionResponse) {

    // console.log(keyValor);
    return fetchCrud("../controller/geral/ControllerGeral.class.php",
        {
            metodo: "listarByKey",
            key: key,
            keyValor: keyValor,
            tabela: tabelaDbNome,
        }, response => {

            //debug--------------------------------------------
            // console.debug("response: ");
            // console.debug(response);

            functionResponse(response);
        });

}






//
//==============================================================================================================
/**
 * Lista todos os itens da tabela informada e retorna um array de objetos para função de callback
 * @param {String} tabelaDbNome Nome da tabela no Banco de Dados a ser listada
 * @param {FunctionStringCallback} functionResponse Função de CallBack que recebe como argumento a reposta da promisse
 * contendo a lista de itens do banco
 */
export function listar(tabelaDbNome, functionResponse) {

    //debug--------------------------------------------
    // console.debug("function crud.listar(tabela, functionResponse)");
    // console.debug("tabela: " + tabelaDbNome);
    // console.debug("functionResponse:" + functionResponse);

    return fetchCrud("../controller/geral/ControllerGeral.class.php",
        {
            metodo: "listar",
            tabela: tabelaDbNome,
        }, response => {

            //debug--------------------------------------------
            // console.debug("response: ");
            // console.debug(response);

            functionResponse(response);
        });

}







//
//==============================================================================================================
/**
 * Lista todos os itens da tabela informada e retorna um array de objetos para função de callback
 * @param {String} tabelaDbNome Nome da tabela no Banco de Dados a ser listada
 * @param {FunctionStringCallback} functionResponse Função de CallBack que recebe como argumento a reposta da promisse
 * contendo a lista de itens do banco
 */
export function listarLast(tabelaDbNome, functionResponse) {



    return fetchCrud("../controller/geral/ControllerGeral.class.php",
        {
            metodo: "listarLast",
            tabela: tabelaDbNome,
        }, response => {


            functionResponse(response);
        });

}







//
//==============================================================================================================
/**
 * Lista todos os itens da tabela informada e retorna um array de objetos para função de callback
 * @param {String} metodo Nome do metodo a ser chamado no controller
 * @param {String} controllerName Nome do controller para onde vai a requisição
 * @param {ObjectConstructor} data Dados passado para o controller
 * @param {FunctionStringCallback} functionResponse Função de CallBack que recebe como argumento a reposta da promisse
 * contendo a resposta do controller
 * @param {Boolean} alert True ou false para informar se vai exibir a janela de alerta notificando sobre 
 * sucesso da ação
 */
export function custom(metodo, controllerName, data, functionResponse, alert) {

    return fetchCrud(`../controller/${controllerName}/Controller${b.firstToUpperCase(controllerName)}.class.php`,
        {
            metodo: metodo,
            data: data
        }, response => {
            //    console.log("a");
            //Se a requisição deu certo exibe a mensagem depois faz uma interação com os valores.
             //ATENÇÃO

             if (alert) {
                b.modal.alert("sucesso",  "Ação realizada com sucesso!");
            } 

            // if (alert) {
            //     b.modal.alert("sucesso", alert);
            // }else{
            //     b.modal.alert("sucesso", "Ação realizada com sucesso!");
            // }
            

           
            functionResponse(response);



            // console.log(response);
            // //permissao_negada
            // if(response["permissao"] == "negada"){
            //     b.modal.alert("erro", "Permissão negada.");
            //     return false;
            // }else{
            //     if (alert) {
            //         b.modal.alert("sucesso", "Ação realizada com sucesso!");
            //     }
            //     functionResponse(response);
            //     return true;
            // }  

        })
    // .catch(e => {
    //     b.modal.alert("erro", "Falha ao realizar ação!");
    //     // console.log(e);
    //     console.error(e.message)
    // });

}
//
//==============================================================================================================
/**
 * Lista todos os itens da tabela informada e retorna um array de objetos para função de callback
 * @param {String} metodo Nome do metodo a ser chamado no controller
 * @param {String} controllerName Nome do controller para onde vai a requisição
 * @param {ObjectConstructor} data Dados passado para o controller
 * @param {FunctionStringCallback} functionResponse Função de CallBack que recebe como argumento a reposta da promisse
 * contendo a resposta do controller
 * @param {Boolean} alert True ou false para informar se vai exibir a janela de alerta notificando sobre 
 * sucesso da ação
 */










export function custom2(parametros) {

    return fetchCrud(`../controller/${parametros.controller.nome}/Controller${b.firstToUpperCase(parametros.controller.nome)}.class.php`,
        {
            metodo: parametros.controller.metodo,
            modo : parametros.controller.modo,
            data: parametros.controller.data
        }, response => {
            //    console.log("a");
            //Se a requisição deu certo exibe a mensagem depois faz uma interação com os valores.
            if (parametros.alert) {
               

                if(parametros.alert.message){
                    b.modal.alert("sucesso", parametros.alert.message);
                }else{
                    b.modal.alert("sucesso", "Ação realizada com sucesso!");
                }


            }

            parametros.functionResponse(response);



            // console.log(response);
            // //permissao_negada
            // if(response["permissao"] == "negada"){
            //     b.modal.alert("erro", "Permissão negada.");
            //     return false;
            // }else{
            //     if (alert) {
            //         b.modal.alert("sucesso", "Ação realizada com sucesso!");
            //     }
            //     functionResponse(response);
            //     return true;
            // }  

        })
    // .catch(e => {
    //     b.modal.alert("erro", "Falha ao realizar ação!");
    //     // console.log(e);
    //     console.error(e.message)
    // });

}


















































//RELACIONAL
//===========================================================================================================================






// Recebe um o bjeto data com todos os valores correspondentes aos campos de uma tabela
//==============================================================================================================
/**
 * Insere um item de uma tabela no banco
 * @return {object} Retorna o elemento criado junto da ID criada no banco
 */
export function salvarRelacional(data, tabelaDbNome, tabelaRelacionalDbNome, functionResponse) {


    //Retorna o elemento criado junto da ID criada no banco
    return fetchCrud("../controller/geral/ControllerGeral.class.php",
        {
            metodo: "salvarRelacional",
            tabela: tabelaDbNome,
            tabelaRelacional: tabelaRelacionalDbNome,
            data: data
        }, response => {

            //debug--------------------------------------------
            // console.debug("response: " + response);
            // console.debug(response);

            b.modal.alert("sucesso", "Salvo com sucesso!");
            functionResponse(response);//Retorno o item salvo e sua id no banco 

        })
    // .catch(err => {
    //     b.modal.alert("erro", "Falha ao tentar salvar!");
    //     console.error(err.message);
    // });

}





//
//==============================================================================================================
/**
 * Lista todos os itens da tabela informada e retorna um array de objetos para função de callback
 * @param {String} tabela Nome da tabela no Banco de Dados a ser listada
 * @param {FunctionStringCallback} functionResponse Função de CallBack que recebe como argumento a reposta da promisse
 * contendo a lista de itens do banco
 */
export function editarRelacional(data, tabelaDbNome, tabelaRelacionalDbNome, functionResponse) {


    return fetchCrud("../controller/geral/ControllerGeral.class.php",
        {
            metodo: "editarRelacional",
            tabela: tabelaDbNome,
            tabelaRelacional: tabelaRelacionalDbNome,
            data: data
        }, response => {
            b.modal.alert("sucesso", "Edição realizada com sucesso!");
            functionResponse(response);

        })
    // .catch(err => {
    //     b.modal.alert("erro", "Falha ao realizar edição!");
    //     console.warn(err.message)
    // });


}




//
//==============================================================================================================
/**
 * Lista todos os itens da tabela informada e retorna um array de objetos para função de callback
 * @param {String} tabelaDbNome Nome da tabela no Banco de Dados a ser listada
 * @param {FunctionStringCallback} functionResponse Função de CallBack que recebe como argumento a reposta da promisse
 * contendo a lista de itens do banco
 */
export function listarRelacional(tabelaDbNome, tabelaRelacionalDbNome, functionResponse) {

    fetchCrud("../controller/geral/ControllerGeral.class.php",
        {
            metodo: "listarRelacional",
            tabela: tabelaDbNome,
            tabelaRelacional: tabelaRelacionalDbNome,
        }, response => {





            functionResponse(response);
        });

}





