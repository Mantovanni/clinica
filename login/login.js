// import * as b from '../biblioteca/js/biblioteca.js';
import b from '../biblioteca/js/biblioteca.js';



//Variaveis
//==============================================================================================================
//GLOBAIS
//----------------------------------------------------------


//Elements DOM
//----------------------------------------------------------
const formLogin = document.querySelector('#login-centro__form');

const inpUsuario = document.querySelector('#usuario');
const inpSenha = document.querySelector('#senha');



//MASCARAS
//==============================================================================================================



//Init==========================================================================================================



//Eventos
//==============================================================================================================
//BTN - LOGIN-------------------------------------------------------------------
formLogin.addEventListener('submit', function (e) {

    e.preventDefault();

    verificarLogin();
});






//Funções
//==============================================================================================================
function verificarLogin() {
    const data = {};
    data.usuario = inpUsuario.value
    data.senha = inpSenha.value


    b.crud.custom("autenticarLogin", "auth", data, response => {

  
        //Se retornar um usuario, me redireciona para o sistema
        if (response.usuario !== undefined) {
            window.location = "../app"
        }else{
            b.modal.alert("erro", "Usuário ou senha não encontrado.")
        }
        // b.modal.alert("erroa", "Usuário ou senha não encontrado.")

    });



}