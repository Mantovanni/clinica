import  b from '../biblioteca.js';







//busca dados da sessao no backend e insere o nome do usuario no topo do menu
//==============================================================================================
export function buscarDadosDaSessao() {

    b.crud.custom("buscarDadosDaSessao", "auth", "", response => {

        // eleUsuario.insertAdjacentText = response.usuario       
        // eleUsuario.innerHTML = b.ico.user + response.usuario 
        const eleUsuario = document.querySelector('#header__direita-usuario-nome');      
        eleUsuario.innerHTML = response.usuario

    })
}



//Adiciona o evento de logout no botao
//==============================================================================================
export function logout() {

    b.crud.custom("encerrarSessao", "auth", "", response => {

        //Retorna true se a sessao foi removida
        if (response) {
            window.location = "../"
        }


    })

}


//Redireciona para tela de login se nao retornar dados de uma sessao.
//==============================================================================================
export function verificarSessao() {

    // console.log("verificarSessao");
    b.crud.custom("buscarDadosDaSessao", "auth", "", response => {
        console.log(response);
    
        //Se a sessao retornar vazia redireciona para a tela de login
        if (!response) {
        // if (response == "deslogado") {
            window.location = "../"
        }


    })

}



//Redireciona para tela de login se nao retornar dados de uma sessao.
//==============================================================================================
export function nivelDeAcesso() {

    // console.log("verificarSessao");
    b.crud.custom("buscarDadosDaSessao", "auth", "", response => {
    
    

     if (response.acesso == "admin") {
        //  document.querySelector('#usuarios-menu').classList.add("esconder")
     }
        

    })

}



















