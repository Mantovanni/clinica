// import b from "../biblioteca/js/biblioteca.js";
import b from "../biblioteca/js/biblioteca.js";

// console.log(b.modal);
//========================================================================================
const sidebar = document.querySelector(".sidebar__nav-menu")

// const btnVoltarPagina = document.querySelector("#voltar-pagina")

const eleUsuario = document.querySelector('#header__direita-usuario-nome');

const eleLogout = document.querySelector('#logout');







//Init==========================================================================================================

sub();


function sub(params) {
   
    const sidebar = document.querySelector("#sidebar");
    const menu = sidebar.querySelector("#cafe-menu");
    const submenu = sidebar.querySelector("[data-submenu='cafe-menu']");


    menu.addEventListener('click', ev => {
        console.log("object");
        submenu.classList.toggle("submenu-show");
    })

    const menu2 = sidebar.querySelector("#rouparia-menu");
    const submenu2 = sidebar.querySelector("[data-submenu='rouparia-menu']");


    menu2.addEventListener('click', ev => {
        console.log("object");
        submenu2.classList.toggle("submenu-show");
    })
    
}















//Auth
//=========================================================
b.auth.buscarDadosDaSessao();
b.auth.nivelDeAcesso() 

// onbeforeunload(window, ()=>{

// });
//Ao fechar uma janela
// window.onbeforeunload = b.auth.logout;


//Verifica se a sessao do usuario esta ativa no backend PHP
//renova a sessao
setInterval(() => {
    // b.auth.logout();
    b.auth.verificarSessao();
}, 1200000);//30 min







//Navegação
//=========================================================
// Apos carregar toda a pagina le o hash
window.onload = controleHash;
// Escuta alterações na hash 
window.onhashchange = controleHash;

//Resolve bug do autocomplete por cima do sidebar
b.bug.autocomplete();





//Eventos
//======================================================================================================
//BTN - Logout----------------
eleLogout.addEventListener('click', b.auth.logout)









//Funções
//==============================================================================================================
//controleHash
//==============================================================================================
function controleHash() {
    b.render.pageMain(b.lerHash());
    
    const sidebar = document.querySelector(".sidebar__nav-menu")
    const menuOptions = sidebar.querySelectorAll(".menu-option")


    //Destaca no menu lateral o local que esta no momento  
    // const elementsSidebar = Array.from(sidebar.children);


    //Roda todos os menus do side bar e coloca a class active no menu de mesmo nome da hash na url 
    //ex. element.dataset.value = "produtos" e url: /produtos
    menuOptions.forEach(element => {
      

        //insere um destaque no meu com a data-url correspoedente a do navegador
        if (element.dataset.url === b.lerHash()) {
            element.classList.toggle("active", true)
        } else {
            element.classList.toggle("active", false)
        }
    });


}




//Sessao
//=========================================================================================================
//=========================================================================================================



























// btnVoltarPagina.innerHTML = `${b.ico.setaVoltarCheio}`

// //Teste
// btnVoltarPagina.addEventListener('click', ev => {
//     window.history.back() 
// })











// window.addEventListener('resize', () => {
//     // Executa o mesmo script de antes
//     let vh = window.innerHeight * 0.01;
//     document.documentElement.style.setProperty('--vh', `${vh}px`);
//   });














// function addEventSideBar() {
//     // pega o HtmlColection do side bar e transforma e um array para usar a função forEach
//     const elementsSidebar = Array.from(sidebar.children);

//     //Uso children no lugar de childNodes para evitar os elementos (text), linhas vazias
//     elementsSidebar.forEach(element => {

//         //Adiciona um evento para item(botao, link) no sideBar
//         element.addEventListener('click', function (e) {

//             //Cancela o evento natural de link
//             e.preventDefault();
//             // document.querySelector("main").innerHTML = "";

//             controleHash()
//             // b.inserirHash(e.target.dataset.value);




//         });

//     });
// }







