import b from '../../../../biblioteca/js/biblioteca.js';



export default class Apartamentos {


    constructor() {



       


        //Variaveis
        //==============================================================================================================
        //GLOBAIS
        //----------------------------------------------------------
        // this.adicionarUrl = "../view/estoque/movimentacoes/form/adicionar-movimentacoes.html";
        // this.urlJs = "../../../view/estoque/movimentacoes/form/adicionar-movimentacoes.js";//Url partir do render.js


        //Elements DOM
        //-------------------------------------------------------------------------
        this.eleApartamntos = document.querySelector('#c-apartamentos');
 

        // CARDS
        //----------------------------------------------------------
  

        //Formulario
        //--------------------------------------  

        //MASCARAS
        //==============================================================================================================
        // b.maskMoeda(inpValor);

    }




    init() {
        //Init==========================================================================================================
        this.carregarApartamentos();



        //Eventos
        //==============================================================================================================
        //BTN - Movimentar Estoque-------------------------------------------------------------------


    }




    //Funções
    //==============================================================================================================



    //Busca dados dos Ap no banco de dados
    //===================================================================================================
    carregarApartamentos() {
   
        b.crud.listar("apartamentos", responseList => {  //async     

            // console.log(responseList["data"]);

            this.criarApartamentos(responseList["data"])

        }, false);

    }



    //Cria os elemtentos dos apartamentos
    //===================================================================================================
    criarApartamentos(responseList) {



        responseList.forEach(element => {


           const a = this.eleApartamntos.insertAdjacentHTML("beforeend",
            `
            <div class="card-apartamento">
                <div class="apartamento cursor-pointer" id="apartamento-${element.id}">
                
                    <span class="ap-numero">${element.id}</span>
                
                </div>
            </div>
            `);


            const eleAp = document.querySelector(`#apartamento-${element.id}`)

            eleAp.addEventListener('click', ev => {

                b.inserirHash(`rouparia/apartamentos/detalhes/${element.id}`)
                
            })

            // eleAp.addEventListener('mouseover', ev => {
            //     console.log("object");
            // })


        });

    


    }




























}










