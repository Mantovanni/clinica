//Funções modal
//=============================================================================================================
//=============================================================================================================




// MODAL padrao Janela de conteudo
// ==================================================================================
// const modalElement = document.querySelector("#modal-fundo");
//FECHAR
export function fechar() {

    const modalElement = document.querySelector("#modal-fundo");

    //Primeiro deixa o modal invisivel, colocando a opacidade em 0
    modalElement.classList.toggle("zero-opacidade", true);
    const modalWindowContent = modalElement.querySelector('#modal-window__content');


    //Apos clicar em fechar desabilita a interação com o modal durante o processo de efeito de escondelo
    // modalWindowContent.style['pointer-events'] = 'none';
    modalElement.style['pointer-events'] = 'none';
    setTimeout(() => {
        modalElement.style['pointer-events'] = 'auto';
    }, 390);





    //Depois do tempo da transição de opacidade remove o display="flex ficando "display="none"
    //e remove a opacidade 0, para quando abrir novamante ele apareça com opaciade normal 1
    setTimeout(() => {
        modalElement.classList.toggle("mostrar-flex", false);
        modalElement.classList.toggle("zero-opacidade", false);

        //Limpa o conteudo apos esconder o modal, evita comflito com o conteudo de outros modais.
        modalWindowContent.textContent = "";
    }, 400);


    // const modalElement = document.getElementById("modal-fundo");
    //    console.log(modalElement.classList.toggle("mostrar-flex"));

    // modalElement.classList.add("esconder");
    // modalElement.classList.remove("mostrar");
    // modalElement.classList.remove("mostrar-flex");
    // modalElement.style.display = "none";
}

// ABRIR
//=============================================================
//Recebe a id de um modal e exibe ele na tela alem de adicionar a funçãode removelo
export function abrir(titulo) {

    //Exibe um conteudo de loading page enquanto a função modal.content("") nao é chamada
    const modalWindow = document.querySelector('#modal-window');
    const modalWindowTitle = modalWindow.querySelector('#modal-window__title-texto');
    const modalWindowContent = modalWindow.querySelector('#modal-window__content');

    //Coloca o titulo
    modalWindowTitle.textContent = titulo;
    // Carrega um efeito de loading
    modalWindowContent.innerHTML = `<div class="loader">Loading...</div>`;

    //Abrir o modal coloando a class inline nele
    const modalElement = document.querySelector("#modal-fundo");
    modalElement.classList.toggle("mostrar-flex");

    // modalElement.classList.add("mostrar-flex");
    // modalElement.classList.remove("esconder");
}


//Conteudo que vai ser carregado dentro do modal
//=============================================================
export function content(content, resolve) {
    // #modal-window a div que fica dentro do #modal-fundo e recebe o conteudo da janela
    const modalWindow = document.querySelector('#modal-window');
    const modalWindowContent = modalWindow.querySelector('#modal-window__content');
    modalWindowContent.innerHTML = content;


    //Varre todos os elemntos em busca da DATA data-class='fechar-modal' para adionar nesse elemento 
    //um evento de ao clicar fechar a janela de modal
    const btnFecharModal = modalWindow.querySelectorAll("[data-class = 'fechar-modal']");

    btnFecharModal.forEach(element => {
        element.addEventListener('click', function (e) {
            fechar();
            //Se fechar retorna um resposta false para promisse     
            resolve(false);

        });
    });

}
//==================================================================================




//===========================================================================================================================================
//===========================================================================================================================================
//===========================================================================================================================================








// MODAL padrao Janela de conteudo
// ==================================================================================
// const modalElement = document.querySelector("#modal-fundo");
//FECHAR
export function fecharCustom() {

    const modalElement = document.querySelector("#modal-fundo-custom");
    const modalWindowContent = modalElement.querySelector('#modal-window__content');

    //Primeiro deixa o modal invisivel, colocando a opacidade em 0
    modalElement.classList.toggle("zero-opacidade", true);

    //Depois do tempo da transição de opacidade remove o display="flex ficando "display="none"
    //e remove a opacidade 0, para quando abrir novamante ele apareça com opaciade normal 1
    setTimeout(() => {
        modalElement.classList.toggle("mostrar-flex", false);
        modalElement.classList.toggle("zero-opacidade", false);

        //Limpa o conteudo apos esconder o modal, evita comflito com o conteudo de outros modais. 
        modalWindowContent.textContent = "";
    }, 600);


    // const modalElement = document.getElementById("modal-fundo");
    //    console.log(modalElement.classList.toggle("mostrar-flex"));

    // modalElement.classList.add("esconder");
    // modalElement.classList.remove("mostrar");
    // modalElement.classList.remove("mostrar-flex");
    // modalElement.style.display = "none";
}

// ABRIR
//==========================================================
//Recebe a id de um modal e exibe ele na tela alem de adicionar a funçãode removelo
export function abrirCustom(titulo) {
    //Exibe um conteudo de loading page enquanto a função modal.content("") nao é chamada
    const modalWindow = document.querySelector('#modal-window-custom');
    const modalWindowTitle = modalWindow.querySelector('#modal-window__title-texto');
    const modalWindowContent = modalWindow.querySelector('#modal-window__content');

    //Coloca o titulo
    modalWindowTitle.textContent = titulo;

    //Carrega um efeito de loading
    modalWindowContent.innerHTML = `<div class="loader">Loading...</div>`;

    //Abrir o modal coloando a class inline nele
    const modalElement = document.querySelector("#modal-fundo-custom");
    modalElement.classList.toggle("mostrar-flex");

    // modalElement.classList.add("mostrar-flex");
    // modalElement.classList.remove("esconder");
}


//Conteudo que vai ser carregado dentro do modal
//========================================================
export function contentCustom(content) {
    // #modal-window a div que fica dentro do #modal-fundo e recebe o conteudo da janela
    const modalWindow = document.querySelector('#modal-window-custom');
    const modalWindowContent = modalWindow.querySelector('#modal-window__content');
    modalWindowContent.innerHTML = content;



    //Varre todos os elemntos em busca da DATA data-class='fechar-modal' para adionar nesse elemento 
    //um evento de ao clicar fechar a janela de modal
    const btnFecharModal = modalWindow.querySelectorAll("[data-class = 'fechar-modal']");

    btnFecharModal.forEach(element => {
        element.addEventListener('click', function (e) {
            fecharCustom();
        });
    });

}
//==================================================================================







































// MODAL CONFIRMAÇÂO
// ===================================================================================================================
//Obs. Se for apagar o elemento , nao precisa se preocupar em remover os Eventos, pois sao escluidos juntamente
export function confirm(functionConfirm, mensagem) {

    //Cria o o modal e o insere no body ante de manipulalo--------------
    const body = document.querySelector("body");
    //Remove o elemento confirmar antes de crialo novamente.
    const modalConfirm = document.querySelector('#modal-fundo--confirmar')
    if (modalConfirm != null) {
        modalConfirm.remove();
    }


    // body.removeChild(document.querySelector('#modal-fundo--confirmar'));


    body.insertAdjacentHTML("beforeend", `
    <div class="modal-fundo--confirmar" id="modal-fundo--confirmar">
        <div class="modal-window--confirmar">
            <div class="modal-window--confirmar__mensagem">
                <span id="confirmar__mensagem-text"></span>
            </div>

            <div class="modal-window--confirmar__botoes">
                <button class="confirmar__botoes-btn-confirmar" id="confirmar__botoes-btn-confirmar">Confirma</button>
                <button class="confirmar__botoes-btn-cancelar" id="confirmar__botoes-btn-cancelar">Cancelar</button>
            </div>
        </div>

    </div>`);
    // ----------------------------------------------  




    const modalFundoConfirmar = document.querySelector('#modal-fundo--confirmar');


    // modalFundo.style.display
    modalFundoConfirmar.classList.toggle("mostrar-flex", true);


    //Se nao receber uma mensagem por argumento , exibe a mensagem padrão no html
    const texto = document.querySelector('#confirmar__mensagem-text')
    if (mensagem != undefined) {
        texto.textContent = mensagem;
    } else {
        texto.textContent = "Voce tem certeza que deseja excluir?";
    }



    //Condicional
    //----------------------------------------------
    const btnConfirmar = document.querySelector('#confirmar__botoes-btn-confirmar');
    const btnCancelar = document.querySelector('#confirmar__botoes-btn-cancelar');



    function confirmar() {
        //Efeito para sumir suavemente/ No css deve conter o transition opacity 500ms ou menos
        modalFundoConfirmar.classList.toggle("zero-opacidade", true);
        setTimeout(() => {
            modalFundoConfirmar.classList.toggle("mostrar-flex", false);
            modalFundoConfirmar.classList.toggle("zero-opacidade", false);
        }, 500);

        functionConfirm(true);

        // limparEventos();
    }
    function cancelar() {

        modalFundoConfirmar.classList.toggle("zero-opacidade", true);
        setTimeout(() => {
            modalFundoConfirmar.classList.toggle("mostrar-flex", false);
            modalFundoConfirmar.classList.toggle("zero-opacidade", false);
        }, 500);

        // limparEventos();
    }

    //limpa eventos para nao executar multiplas vezes
    function limparEventos() {
        //Remove o evento do botao confirmar
        btnConfirmar.removeEventListener('click', confirmar);
        btnCancelar.removeEventListener('click', cancelar);
    }


    //Botão confirmar
    btnConfirmar.addEventListener('click', confirmar);


    //Botao Cancelar
    btnCancelar.addEventListener('click', cancelar);
}























// MODAL ALERTA/NOTICAÇÂO
// ==============================================================================

export function alert(tipo, mensagem) {

    //SUCESSO
    //============================================================================
    if (tipo === "sucesso") {

        const body = document.querySelector("body");

        //Verifica se ja existe um elemento modal e remove caso exista antes de 
        //criar novamente 
        //---------------------------------------------------------------------------
        const modalSucesso = document.querySelector('#modal-alert')
        if (modalSucesso != null) {
            modalSucesso.remove();
        }


        body.insertAdjacentHTML("beforeend", `
                <div class="modal-alert" id="modal-alert">
                        <i class="svg-sucesso"></i>
                        <span class="modal-alert-text" id="modal-alert-text"></span>
                </div>`
        );

        const modalSucessoNovo = document.querySelector('#modal-alert')
        modalSucessoNovo.classList.add("alert--sucesso")


        //Pega o elemento SPAN onde fica o texto 
        const modalSucessoNovoTexto = modalSucessoNovo.querySelector('span')

        //Se nao receber uma mensagem, passa uma mensagem Default
        if (mensagem == null) {
            modalSucessoNovoTexto.textContent = `Operação realizada com sucesso.`;
        } else {
            modalSucessoNovoTexto.textContent = mensagem;
        }


        // ----------------------------------------------  

        modalSucessoNovo.classList.toggle("mostrar-flex");
        setTimeout(() => {
            modalSucessoNovo.classList.toggle("mostrar-flex");
        }, 6100);
    }


    //erro
    //============================================================================
    if (tipo === "erro") {

        const body = document.querySelector("body");
        //Remove o elemento confirmar antes de crialo novamente.
        const modalSucesso = document.querySelector('#modal-alert')
        if (modalSucesso != null) {
            modalSucesso.remove();
        }


        body.insertAdjacentHTML("beforeend", `<div class="modal-alert" id="modal-alert"></div>`);

        const modalSucessoNovo = document.querySelector('#modal-alert')
        modalSucessoNovo.classList.add("alert--erro")



        //Se nao receber uma mensagem, passa uma mensagem Default
        if (mensagem == null) {
            modalSucessoNovo.textContent = `Falha ao realizar a operação.`;
        } else {
            modalSucessoNovo.textContent = mensagem;
        }


        // ----------------------------------------------  

        modalSucessoNovo.classList.toggle("mostrar-flex");
        setTimeout(() => {
            modalSucessoNovo.classList.toggle("mostrar-flex");
        }, 6500);
    }




}

