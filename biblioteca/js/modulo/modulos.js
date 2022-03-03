// console.log("Biblioteca OK");
//Verificar se a biblioteca está sendo encontrada
export function verifique() {
    console.log("Biblioteca OK");
}


//==============================================================================================











//SELECT
//==============================================================================================

//-------------------------------------------------------------------------------
/**
 * Pega o valor da option atua selecionado no elemento select 
 * @return {string} Valor da option.
 */
export function selectValue(element) {
    // const select = document.querySelector(element);
	return element.options[element.selectedIndex].value;
}

//-------------------------------------------------------------------------------
/**
 * Adiciona uma option no select , recebendo o nome e o valor dela
 * @param {Element} select A referencia para o Select
 * @param {String} text O nome que sera exibido na option
 * @param {} value O valor da option
 */
export function selectAdd(select, text, value) {

    const option = document.createElement("option");
    option.text = text;
    option.value = value;   
    select.add(option);
}

//-------------------------------------------------------------------------------








//==============================================================================================
//Retonar o valor do objeto e nao ao inves de sua referencia
export function objectValue(object) {
    JSON.parse(JSON.stringify(object));
}





//Função para limpar o setInterval ao mudar de pagina para sistemas de uma pagina so
//Criar um set interval e passa sua id para uma variavel global
//==============================================================================================
export function setIntervalCustom(callBackFunction, delay) {

   
    //Instancia idInterval apenas na primeira vez que setIntervalCustom é declarada
    if(!globalThis.idInterval){
        globalThis.idInterval = []
    }

    const idInterval = [setInterval(callBackFunction, delay)]
    globalThis.idInterval.push(idInterval);

}

// Limpa todas as setIntervals criadas pela função setIntervalCustom
//==================================================================
/**
 * Devolve a hash da localização actual
 * @return {string} Valor da Hash com prefixo '#/' ignorado.
 */
export function clearIntervalCustom() {
    const arrayDeIdsSetInterval = globalThis.idInterval;

    if (arrayDeIdsSetInterval) {
        arrayDeIdsSetInterval.forEach(element => {
            clearInterval(element)
        });
    }

}










//QUERY SELECTOR
//==============================================================================================
export function qs(elemento) {
    return document.querySelector(elemento);
}







//Funções Hash # // Manipular a url
//==============================================================================================
/**
 * Devolve a hash da localização actual
 * @return {string} Valor da Hash com prefixo '#/' ignorado.
 */
export function lerHash() {
    return window.location.hash.substring(2);
}


/**
* Actualiza a hash da localização actual com o valor facultado
* @param {string} str
*/
export function inserirHash(str) {
    window.location.hash = "/" + str;

}






//=====================================================================================================
//retorna um document fragment, pode ser um ou mais elementos que ficam na memoria pronto para ser inserido no DOM
export function htmlToElement(html) {
    //Deve se ultilizar o elemento 'template' para funcionar com alguns elementos como "TD's"
    var template = document.createElement('template');
    html = html.trim(); // Remove espaços em branco
    template.innerHTML = html;
    return template.content;
    // return template.content.firstChild;
    // return template.content.cloneNode(true);
}




//=====================================================================================================
// Função para pegar os dados GET na URL do navegador
export const getGet = () => {
    const partes = location.search.slice(1).split('&');
    const data = {};
    partes.forEach((parte) => {
        const chaveValor = parte.split('=');
        data[chaveValor[0]] = chaveValor[1];
    });
    return data;
}



//=====================================================================================================
//Função para requisições ajax por payload request
export function fetchPost2(url, data, myFunction) {

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data)//body é o corpo da mensagem payload
    })
        // .then(() => {throw new Error("boom")})
        .then((response) => response.json())
        .then((response) => { myFunction(response) })
        .catch((e) => {
            console.log(
                `${e}
                Url : ${url}
                Metodo: ${data.metodo}
                Retorno: ${myFunction}
            `)
        })
    // .catch((e) => console.error(
    //     `Erro e - ${e}
    //     Erro err - ${err}`));

}

//Mesa função acima, ultilizando async, await
//=====================================================================================================
//Função assync é uma promise, podendo usar cath
export async function fetchPost(url, data, myFunction) {

    const response = await fetch(url, {
        // cache: "force-cache",
        method: "POST",
        body: JSON.stringify(data)//body é o corpo da mensagem payload
    });
    const responseJSON = await response.json();
    myFunction(responseJSON);
    // await myFunction(responseJSON);

};


const to = promise => (
    promise
        .then(data => ({ data, error: null }))
        .catch(error => ({ error, data: null }))
);


//Fetch buscar o texto/html de um documento
//=====================================================================================================
//Retorna a Promisse
//Retorna a Promisse
export function fetchText(url, myFunction) {

    const promisses = {
        html: {},
        js: {}

    }
    let teste = "";

    promisses.html = fetch(url)
        .then(response => {
            if (!response.ok) {
                // _handleErrors(response) 
                // console.log(response);                         
                throw Error(`${response.status} - ${response.statusText} - ${response.url}`)
            };

            return response.text()
        })
        .then(res => {
            teste = 2;
            return promisses.js = myFunction(res)


        })
        .catch(e => {

            // myFunction(e)
            myFunction("Pagina não encontrada.")

            // console.log(e)

        });





    return promisses;
};


export async function fetchText1(url, myFunction) {

    console.log("object");
    console.log("obj");
    try {
        const response = await fetch(url);
        const responseText = await response.text();
        // console.log(responseText);
        myFunction(responseText);

    } catch (error) {
        console.log(error);
    }


};


export async function fetchText2(url, myFunction) {
    const [error, response] = await to(fetch(url));

    if (error) {
        console.log(error);
        return;
    }

    const responseText = await response.text();
    await myFunction(responseText);

};











// fetch('./api/some.json')
//   .then(
//     function(response) {
//       if (response.status !== 200) {
//         console.log('Looks like there was a problem. Status Code: ' +
//           response.status);
//         return;
//       }

//       // Examine the text in the response
//       response.json().then(function(data) {
//         console.log(data);
//       });
//     }
//   )
//   .catch(function(err) {
//     console.log('Fetch Error :-S', err);
//   });







//=====================================================================================================
export function ajax() {
    // requisição com o XMLHttpRequest
    const request = new XMLHttpRequest()

    request.open('GET', 'http://exemplo.com/usuario')

    request.onload = function () {
        console.log(JSON.parse(this.responseText))
    }

    request.onerror = function () {
        console.log('erro ao executar a requisição')
    }

    request.send()
}

//=====================================================================================================
export function appendMultipleNodes() {
    var args = [].slice.call(arguments);
    for (var x = 1; x < args.length; x++) {
        args[0].appendChild(args[x])
    }
    return args[0]
}













//=====================================================================================================
export function paraMoeda2(valor) {
    var inteiro = null, decimal = null, c = null, j = null;
    var aux = new Array();
    valor = "" + valor;
    c = valor.indexOf(".", 0);
    //encontrou o ponto na string
    if (c > 0) {
        //separa as partes em inteiro e decimal
        inteiro = valor.substring(0, c);
        decimal = valor.substring(c + 1, valor.length);
    } else {
        inteiro = valor;
    }

    //pega a parte inteiro de 3 em 3 partes
    for (j = inteiro.length, c = 0; j > 0; j -= 3, c++) {
        aux[c] = inteiro.substring(j - 3, j);
    }

    //percorre a string acrescentando os pontos
    inteiro = "";
    for (c = aux.length - 1; c >= 0; c--) {
        inteiro += aux[c] + '.';
    }
    //retirando o ultimo ponto e finalizando a parte inteiro

    inteiro = inteiro.substring(0, inteiro.length - 1);

    decimal = parseInt(decimal);
    if (isNaN(decimal)) {
        decimal = "00";
    } else {
        decimal = "" + decimal;
        if (decimal.length === 1) {
            decimal = "0" + decimal;
        }
    }

    valor = "R$ " + inteiro + "," + decimal;

    return valor;
}



//=====================================================================================================
//Formata um valor float(1234.56) ou string(1234.56) para uma string no padrão moeda (1.234,56)
export function paraMoeda(valor) {
    if (valor === "") {
        valor = 0
    }
    valor = parseFloat(valor);
    
    return valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}


//=====================================================================================================
//Formata um valor float(1234.56) ou string(1234.56) para uma string no padrão moeda (1.234,56)
//string "7901.1900000000005" ou float 7901.1900000000005 para 7.901,19
export function paraMoedaReal(valor) {




    //Tratamento caso receba uma String R$ 1.256,25 retorna 1256.25
    // if(typeof valor == "string"  && valor.length < 15){
    //     console.log(valor);
    //     valor = valor.replace('R$','').replace('.','').replace(',', '.')
    //     console.log(valor);
    // }


    // Se for vazio
    if (valor === "") {
        valor = 0
    }
    valor = parseFloat(valor);
    return "R$ " + valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}


//=====================================================================================================

//passa valores strings "1.500,12" para float 1500.12
//nao aceita string no formato float ex. "1.234.56" retorna 123456
export function paraFloat(valor) {


    // Se receber um float ou um String do tipo "0.565454687894" a função 
    //nao efetua nenhuma regra 
    if (typeof valor === "number" || valor.length > 15) {
        // Arredondar
        valor = parseFloat(valor);
        // console.log(valor);

    } else {

        //Verifica se a String tem . ou , como separador do fracional
        //se for . passa para , para o restante da função funcionar
        const pontuacao = valor.substr(valor.length - 3, 1)
        // const pontuacao = valor.slice(-3, -3);
        // console.log(pontuacao);
        if (pontuacao == ".") {
            valor = valor.replace(".", ",");
        }


        if (valor === "") {
            valor = 0;
        } else {
            // console.log(valor);
            valor = valor.replace("R$", "");
            valor = valor.replace(".", "");
            valor = valor.replace(",", ".");
            valor = parseFloat(valor);
        }
    }


    return valor;
}






// //==============================================================================================
/**
 * Verifica se um array de Elementos( Node List ou HTMLCollection) o atributo "name" ou data-nome
 * coincide com o nome de alguma propriedade do objeto, se sim executa a função de callback com 
 * o elemento e a Key da propriedade passada por argumento de volta
 * @param {Array} elementeArray
 * @param {object} object
 */
// //=======================================================================================================================================================
// //=======================================================================================================================================================
export function findElArrayInObject(elementeArray, object, callFunction) {
  
    //Busca dentro de um HTMLCollection de TH da uma linha
    Array.from(elementeArray).forEach((element) => {

        //Se a celula e do tipo "data-tipo='action'",ja pula direito, se nao pega os valores o 
        //object e coloca no seu respectivo lugar do  elementeArray de acordo como nome 
        if (element.dataset.format != "action" && element.dataset.type != "action") {          
            // console.log(element);
            for (const key in object) {
           
                if (key === element.dataset.name) {                  
                    // console.log("object");
                    // callFunction(element, object[key])//mudar pára retonar o valor do objeto diretamente
                    callFunction(element, key)
                } else if (key === element.name) {
                    callFunction(element, key)
                }
            };
        } else {        
            callFunction(element)
        }
    });
}

//Verifica swe existe alguma propriedade no objeto com o nome passado
export function findNamePropInObeject(nome, object, callFunction) {
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            if (nome === key) {
                callFunction(key);
            }

        }
    }
}



















// DATAS
// =======================================================================================================================
// =======================================================================================================================
// Pega a data atual do sistema  e formata nesse modelo .- Ex dde saida - 12/09/2019
export function getDataAtualFormatada() {
    var date = new Date()
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var formatterDay;
    if (day < 10) {
        formatterDay = '0' + day;
    } else {
        formatterDay = day;
    }

    var formatterMonth;
    if (month < 10) {
        formatterMonth = '0' + month;
    } else {
        formatterMonth = month;
    }

    return formatterDay + '/' + formatterMonth + '/' + year;
}


//==================================================================================================
// Recebe uma data  no padrao ISO 2020-05-31 e converte para 31/05/2020
export function formatDataISOforDataUser(data) {
    let dataFormatada = data;


    if (data != null) {
        dataFormatada = dataFormatada.split("-");
        dataFormatada = dataFormatada[2] + "/" + dataFormatada[1] + "/" + dataFormatada[0];
    } else {
        console.warn("Valor recebido de data é nulo");
    }

    return dataFormatada;
}

//==================================================================================================
// Recebe uma data  no padrao 31/05/2020  e converte para padrao ISO 2020-05-31
export function formatDataUserforISO(data) {
    let dataFormatada = data;

    if (data != null) {
        dataFormatada = dataFormatada.split("/");
        dataFormatada = dataFormatada[2] + "-" + dataFormatada[1] + "-" + dataFormatada[0];
    } else {
        console.warn("Valor recebido de data é nulo");
    }


    return dataFormatada;
}


//=======================================================================================
// Ex gera uma data atual nesse modelo - 2019-09-12
export function getDataAtualISO() {
    var todayDate = new Date();
    todayDate.setMinutes(todayDate.getMinutes() - todayDate.getTimezoneOffset());
    todayDate = todayDate.toISOString().slice(0, 10);
    return todayDate;
}



//Formatar data=======================================================================================
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

// console.log(formatDate('Sun May 11,2014'));







// STRINGS
// =======================================================================================================================
// =======================================================================================================================

//Pasa para maiscula o primeiro caracter da String
export function firstToUpperCase(string) {

    const primeiroCaractere = string.slice(0, 1)
    const restoDaFrase = string.slice(1, string.length);
    // const restoDaFrase = string.slice(1);


    const primeiroCaractereMaiusculo = primeiroCaractere.toUpperCase();

    return string = primeiroCaractereMaiusculo + restoDaFrase;
}



//-------------------------------------------------------------------------------------------
//Pasa para maiscula o primeiro caracter de cada PALAVRA da STRING
export function allFirstToUpperCase(frase) {
    let fraseFormatada = "";

    //Quebro a frase em um array de palavras separando por um espaço em branco
    const arrayDePalavras = frase.split(" ")

    //Para cada palavra no arrayDEPalavras faça.
    arrayDePalavras.forEach(palavra => {
        //Pega o primeiro caracter da palavra
        const primeiroCaractere = palavra.slice(0, 1)
        //Separa do segundo caracter ao restante da palavra
        const restoDaPalavra = palavra.slice(1, palavra.length);
        //Passo o primeiro caracter para maisculo
        const primeiroCaractereMaiusculo = primeiroCaractere.toUpperCase();

        //Junta a primeira letra a 
        fraseFormatada += primeiroCaractereMaiusculo + restoDaPalavra;
    });

    return fraseFormatada;

}





// Mascara
// =======================================================================================================================
// =======================================================================================================================


//=====================================================================================================
export function maskMoeda(elemento) {//formatar para pegar o input do evento
    // var elemento = document.getElementById('valor');

    // console.log(elemento);
    elemento.addEventListener("keyup", mask);
    elemento.addEventListener("keydown", mask);
    elemento.addEventListener("input", mask);

    function mask(params) {
        var valor = elemento.value;

        // var valor = this.value;

        // console.log("0 = " + valor);
        valor = valor + '';
        // console.log("1 = " + valor);
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        // console.log("2 = " + valor);
        valor = valor + '';
        // console.log("3 = " + valor);

        if (valor.length < 2) {
            // console.log("IF 01 = " + valor);
            valor = valor.replace(/([0-9]{1})$/g, "0,0$1");
            // console.log("IF 02 = " + valor);
        } else if (valor.length < 3) {
            valor = valor.replace(/([0-9]{2})$/g, "0,$1");
        } else {
            valor = valor.replace(/([0-9]{2})$/g, ",$1");
        }
        // console.log("4 = " + valor);
        if (valor.length > 6) {
            // console.log("5 = " + valor);
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            // console.log("6 = " + valor);
        }
        // console.log("7 = " + valor);

        elemento.value = valor;
        if (valor == 'NaN') elemento.value = '';
        // console.log("8 = " + elemento.value);
    };

}


//===================================================================================

export function maskQuantidade(elemento) {


    elemento.addEventListener("keyup", mask);
    elemento.addEventListener("keydown", mask);

    function mask(params) {
        var valor = elemento.value;

        // var valor = this.value;

        // console.log("0 = " + valor);
        valor = valor + '';
        // console.log("1 = " + valor);
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        // console.log("2 = " + valor);
        valor = valor + '';
        // console.log("3 = " + valor);

        if (valor.length < 2) {
            // console.log("IF 01 = " + valor);
            valor = valor.replace(/([0-9]{1})$/g, "0,0$1");
            // console.log("IF 02 = " + valor);
        } else if (valor.length < 3) {
            valor = valor.replace(/([0-9]{2})$/g, "0,$1");
        } else {
            valor = valor.replace(/([0-9]{2})$/g, ",$1");
        }
        // console.log("4 = " + valor);
        if (valor.length > 6) {
            // console.log("5 = " + valor);
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            // console.log("6 = " + valor);
        }
        // console.log("7 = " + valor);

        elemento.value = valor;
        if (valor == 'NaN') elemento.value = '';
        // console.log("8 = " + elemento.value);
    };
}



export function maskPeso1(e) {

    e.addEventListener("keyup", mask);
    e.addEventListener("keydown", mask);

    function mask(params) {

        let v = e.value;
        let integer = v.split(',')[0]

        v = v.replace(/\D/g, "");

        v = v.replace(/^[0]+/, "");
        if (v.length <= 5 || !integer) {

            if (v.length === 5) v = v.substring(0, 2) + ',' + v.substring(2, 5);

            if (v.length === 4) v = '0' + v.substring(0, 1) + ',' + v.substring(1, 4);

            if (v.length === 3) v = '00,' + v;

            if (v.length === 2) v = '00,0' + v;

            if (v.length === 1) v = '00,00' + v;

        } else {
            //  v = v.replace(/^(\d{2,})(\d{3})$/, "$1.$2");
            if (v.length > 5 || !integer) {
                v = v.substring(0, 2) + ',' + v.substring(2, 5);
            }
        }
        e.value = v
    }
}








    // function mascarapeso() {
    //     var v = this.value, integer = v.split('.')[0];
    //     v = v.replace(/\D/g, "");
    //     v = v.replace(/^[0]+/, "“”");
    //     if (v.length <= 3 || !integer) {
    //         if (v.length === 1) v = ' 00,' + v;
    //         if (v.length === 2) v = ' 0' + v[0] +', '+v[1];
    //         if (v.length === 3) v = ' ' + v[0] + v[1] +','+v[2];
    //         if (v.length === 4) v = v[0] + v[1] + v[2] +','+v[3];
    //     } else {
    //         v = v[0] + v[1] + v[2] +','+v[3];
    //     }
    //     console.log(v);
    //     if (v > '200') {
    //         v = ' ' + v[0] + v[1] +','+v[2];
    //     }

    //     this.value = v;
    // }