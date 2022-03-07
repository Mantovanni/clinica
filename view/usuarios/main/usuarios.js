import  b from '../../../biblioteca/js/biblioteca.js';


export function init() {

    // GLOBAL
    //=================================================================

    const adicionarUrl = " ../view/usuarios/adicionar/adicionar-usuarios.html";
    const urlJs = "../../../view/usuarios/adicionar/adicionar-usuarios.js";//Url partir do render.js



    //Usuarios - VIEW
    //=================================================================
    const btnAdicionar = document.querySelector('#acoes__button-adicionar');
    const tbody = document.querySelector('#tbody-central');

    const inpPesquisar = document.querySelector("#acoes__buscar");






    //Iniciar ==========================================================================================
    carregarTabela();


    globalThis.aaa = 2;

console.log(globalThis);


    //BOTAO ADICIONAR
    //==============================================================================================================
    btnAdicionar.addEventListener('click', function (e) {
        b.modal.abrir();

        // Passa o elemento Janela Modal para a função render.page 
        b.render.page(b.modal.content, adicionarUrl, urlJs, "modal");//assync
        // b.render.page(b.modal.content, adicionarUrl, urlJs);//assync

    });
    //==============================================================================================================
    // btnAdicionar.click();

    //Carregar Tabela
    //==============================================================================================================
    function carregarTabela() {

        b.crud.listar("usuarios", responseList => {  //async     

            const dados = responseList["data"].map(response => {
                response.id = response.id.padStart(2, '0');
               
                return response;
            });
      
            //informa a TBody, 
            b.render.lineInTable(tbody, dados, "usuarios");
            b.table.insertSearch(inpPesquisar, tbody);
        });

    }
    //==============================================================================================================

}

