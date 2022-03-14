import b from '../biblioteca.js';




//=================================================================================================================
/**
 * Recebe um elemento FORM extrai os nomes e valores dos seus elementos filhos(campos), trata esses valores
 * seguindo  as regras de tipo no dataset retornando um objeto com todos os valores.
 * @param {object} form - um objeto elemento DOM do tipo Form
 * @return {object} formValues - retorna um novo objeto com os nomes e valores 
 */
export function extractValues(form) {


    const formValues = {};

    // Transforma o no de elementos em um array de elementos para usar foreach
    Array.from(form).forEach(element => {


        //Remove os elementos botoes e o dataset com valor extract = false do array de valores do form
        // console.log(form);
        if (element.nodeName != "BUTTON" && !element.dataset.extract) {


            if (element.dataset.relacional == "1") {

            } else {
          
                switch (element.dataset.type) {                   
                    case "date"://Formata a data no padrão para o banco
                        formValues[element.name] = b.formatDataUserforISO(element.value);            
                        break;
                    case "coin"://Formata de Moeda para Float
                        formValues[element.name] = b.paraFloat(element.value);
                        break;
                    case "coin-real"://Formata de Moeda para Float
                        formValues[element.name] = b.paraFloat(element.value);
                        break;
                    case "quantia"://Formata 
                        formValues[element.name] = b.paraFloat(element.value);
                        break;
                    case "ignore"://Campo e ignorado 

                        break;
                    case "float":// Se o campo estiver vazio ""(String), converte para um numero 0 float, evita erro no DB
                        if (element.value === "") {
                            formValues[element.name] = 0;
                        } else {
                            formValues[element.name] = element.value;
                        }
                        break;
                    default:
                        formValues[element.name] = element.value;
                        break;
                }
            }

        }

    });

    return formValues;
}





//USADO NA FUNÇÃO TRANSFERIR
//----------------------------------------------------------------------------------
//Extrai os valores dos inputs do form e coloca em um objeto com os parâmetros igual
//o atributo name do elementos
export function extractValuesAll(form) {

    const formValues = {};
    formValues.itensRelacionais = [];

    let item = {};
    // Trasnforma o no de lementos em um array de elementos para usar foreach
    Array.from(form).forEach(element => {

        // console.log(element);
        //Remove os botoes do array de valores do form
        if (element.nodeName != "BUTTON" && element.dataset.ignore !== "true") {//element.dataset.igrnore = true, ignora so para extrair

            let valor = "";

            //Fiiltra valor-------------------------------------------------
            switch (element.dataset.type) {
                case "coin"://Formata de Moeda para Float
                    valor = b.paraFloat(element.value);

                    // console.log(valor);
                    break;
                case "coin-real"://Formata de Moeda para Float
                    valor = b.paraFloat(element.value);
                    break;
                case "quantia"://Formata 
                    valor = b.paraFloat(element.value);
                    break;
                // case "ignore"://Campo e ignorado 

                //     break;
                case "float":// Se o campo estiver vazio ""(String), converte para um numero 0 float, evita erro no DB
                    if (element.value === "") {
                        valor = 0;
                    } else {
                        valor = element.value;
                    }
                    break;
                default:
                    valor = element.value;
                    break;
            }

            // if (element.dataset.type = "ignore") {

            //Armazena valor-----------------------------------------------------------
            if (element.dataset.relacional) {

                const numero = element.dataset.relacional;

                //Passa o valor para o objeto
                item[element.name] = valor;
                // formValues.itensRelacionais[numero] = b.objectValue(item);
                formValues.itensRelacionais[numero] = Object.assign({}, item);



            } else {
                formValues[element.name] = valor;

            }

            // }
        }

    });

    return formValues;

}







//=================================================================================================================
/**
 * Recebe Um Objeto com os dados de um item e um elemento form com todos os elementos campos ex.(input)
 * Percorre todos os Elementos dentro fo Form comparando o atributo NAME com a Key do Array de iten
 * @param {object} form - um objeto elemento DOM do tipo Form
 * @param {object} dataObject - um Objetos com os dados para ser preenchido nos campos do form
 */
export function preencher(form, dataObject) {
    // console.log(dataObject);
    // console.log(form);


    Array.from(form).forEach(element => {
        for (const key in dataObject) {


            //Se o nome do elemento for igual a key/nome do objeto
            if (key === element.name) {

                switch (element.dataset.type) {
                    case "password"://Se o elemento for do type "password" ele nao carrega no campo para editar
                        break;
                    case "coin":
                        element.value = b.paraMoeda(dataObject[key])
                        break;
                    case "coin-real":
                        element.value = b.paraMoedaReal(dataObject[key])
                        break;
                    //VERIFICAR REDUNDÂNCIA COM COIN ACIMA
                    case "quantia":
                        element.value = b.paraMoeda(dataObject[key])
                        break;
                    case "date":
                        element.value = b.formatDataISOforDataUser(dataObject[key])
                        break;


                    default:
                        element.value = dataObject[key];
                        break;
                }

            }


        }
    });
}





//=================================================================================================================
/**
 * Recebe um elemento FORM e extrai  e aplica maskaras altomaticamente em seus campos de acordo a data-typo="",
 * setado no HTml inline 
 * @param {object} form - um objeto elemento DOM do tipo Form
 */
export function mask(elemento) {


    //Regra para pegar qualquer grupo de elemntos
    let elementoArray;
    if (elemento.tagName !== "FORM") {
        elementoArray = elemento.querySelectorAll('input');

    } else {
        elementoArray = elemento;
    }





    // Trasnforma o no de lementos em um array de elementos para usar foreach
    Array.from(elementoArray).forEach(element => {

        //Remove os botoes do array de valores do form
        if (element.nodeName != "BUTTON") {

            switch (element.dataset.type) {
                case "coin"://Formata de Moeda para Float
                    b.maskMoeda(element)
                    break;

                default:

                    break;
            }

        }
    });
}