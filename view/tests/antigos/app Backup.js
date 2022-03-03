import * as b from '../biblioteca/biblioteca.js';

import * as itensJS from '../view/itens/itens.js';
// import * as itensHTML from '../view/itens/itensHTML.js';

import * as cafeJS from '../view/cafe/cafe.js';
import * as cafeHTML from '../view/cafe/cafeHTML.js';



//========================================================================================
const sideBarCheckBox = document.querySelector('#menu-checkbox');
const navTopTitle = document.querySelector('#nav-top__title');


const eleItensMenu = document.querySelector('#itens-menu');
const eleCafeMenu = document.querySelector('#cafe-menu');


window.onload = function (a) {

    
    console.log(b.lerHash());
    if(b.lerHash() === "itens"){
        carregarPagina(b.lerHash(), itensJS);
    }
    if(b.lerHash() === "cafe"){
        carregarPagina(b.lerHash(), cafeJS);
    }
   
   

};





/**
 * Escuta alterações na hash da localização actual.
 * @param {Event} e HashChangeEvent object
 */
window.onhashchange = function (a) {

    
    console.log(b.lerHash());
    if(b.lerHash() === "itens"){
        carregarPagina(b.lerHash(), itensJS);
    }
    if(b.lerHash() === "cafe"){
        carregarPagina(b.lerHash(), cafeJS);
    }
   
   

};



//ULTILIZAR FUTURAMENTE==============================================================================================
//popstate evento e ativado toda vez que que é requisitado umobjeto history.// ao clicar em voltar ou avançar
// window.addEventListener('popstate', e => {

//     if(e.state !== null){
//         renderPagina(e.state.urlPath);
//     }else{
//         document.querySelector('main').innerHTML = "";

//         navTopTitle.textContent = "Home"
//         eleItensMenu.classList.remove("active")
//         eleCafeMenu.classList.remove("active")
//     }

// });
//====================================================================================================================






//Eventos nos Botoes do side bar==============================================================
//============================================================================================

// ITENS -------------------------------------------------------------------------
eleItensMenu.addEventListener('click', function (e) {
    //Cancela o evento natural de link
    e.preventDefault();

    //Muda na barra de navegação 
    // window.location.replace("#itens")
    // escreverHash("itens")
    // window.history.pushState({state: 1}, "Editar 1", "itens.php3")
    // window.history.pushState({ urlPath: "itens"}, "Itens", 'http://localhost/cafe/view/itens')



    carregarPagina("itens", itensJS);



});
// CAFE --------------------------------------------------------------------------
eleCafeMenu.addEventListener('click', function (e) {
    e.preventDefault();
    carregarPagina("cafe",cafeJS);

});












//Conjunto de ações apos carregar uma nova pagina no main
//============================================================================
function carregarPagina(pagina, js) {

    //Function que busca a pagina e insera ela na DOM dentro do elemento Main
    function renderPageMain(pagina, js) {
        b.fetchText(`../view/${pagina}/${pagina}.html`, html => {
            //Insere Elementos HTML no DOM. criando a pagina no main
            document.querySelector('main').innerHTML = html;
            //ativa o JS com as regras depois dos elementos da pagina forem inseridos no DOM
            js.init();
        });

    }

    //Esconde o SIDEBAR depois de clica, na versao de celular
    sideBarCheckBox.checked = 0;

    //Muda o nome no topo do sidebar, indicando onde esta no momento
    navTopTitle.textContent = pagina;

    //Destaca no menu lateral o local que esta no momento
    eleItensMenu.classList.add("active")
    eleCafeMenu.classList.remove("active")


    renderPageMain(pagina, js)

    //Insere o nome na url
    b.inserirHash(pagina);








    // if (pagina === "itens") {
    //     //Esconde o SIDEBAR depois de clica, na versao de celular
    //     sideBarCheckBox.checked = 0;

    //     //Muda o nome no topo do sidebar, indicando onde esta no momento
    //     navTopTitle.textContent = "Itens"

    //     //Destaca no menu lateral o local que esta no momento
    //     eleItensMenu.classList.add("active")
    //     eleCafeMenu.classList.remove("active")


    //     renderPageMain(pagina, itensJS)



    // }

    // if (pagina === "cafe") {
    //     sideBarCheckBox.checked = 0;
    //     navTopTitle.textContent = "Café"
    //     eleCafeMenu.classList.add("active")
    //     eleItensMenu.classList.remove("active")
    //     document.querySelector('main').innerHTML = cafeHTML.html();
    //     cafe.init();
    // }



}
//===============================================================================================
















//TESTANDO AGORA+ ===========================================================
function init(params) {

    // console.log(window.location.hash.substring(1));

    // console.log(window);

    sideBarCheckBox.checked = 0;

    navTopTitle.textContent = "Itens"

    eleItensMenu.classList.add("active")
    eleCafeMenu.classList.remove("active")

    //Cancela o evento natural de link
    //Insere Elementos no DOM
    document.querySelector('main').innerHTML = itensHTML.html();
    //ativa o JS depois dos elementos da pagina forem inseridos no DOM
    itens.init();
}

// init()