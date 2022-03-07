import b from '../../../biblioteca/js/biblioteca.js';

export function init(valueInit) {
    //Variaveis
    //=====================================================================================================
    //GLOBAIS
    //----------------------------------------------------------


    //Elements DOM
    //----------------------------------------------------------
    const tituloPage = document.querySelector('#modal-window__title-texto');


    //Formulario
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-modal');//Formulario Adicionar




    //MASCARAS
    //======================================================================================================
    b.form.mask(formAdicionar);





    //Init==================================================================================================
    tituloPage.textContent = "Editar Produtos";
    b.form.preencher(formAdicionar, valueInit.dadosItem);

    console.log(valueInit);





    //Eventos
    //======================================================================================================
    //BTN - Salvar----------------
    formAdicionar.addEventListener('submit', function (e) {
        e.preventDefault();

        //Pega o FORM que é o target do evento submit
        const form = e.target;

        if (validarForm(form)) {


            const formFiltrado = b.form.extractValues(form);

            console.log(formFiltrado);

            b.crud.editar(formFiltrado, "produtos", response => {//async   
                b.modal.fechar()



                response.estoque_total = b.paraMoeda(0) + " " + response.unidade;
                response.custo = valueInit.dadosItem.custo;


                const linhaCriada = b.render.lineInTable(valueInit.elLinhaSelecionada, response, "produtos");
                inserirBotoesEstoque(linhaCriada, response);

            }).then(() => {
                b.modal.fechar()
            });

        }
    });









    //Functions==================================================================================================
    function validarForm(form) {
        let validate = true;

        // if (form["adicionar-usuario-repetir-senha"].value !== form[3].value) {
        //     alert("As senhas nao conferem!")
        //     validate = false;
        // }

        return validate;
    }




    //============================================================================================================
    //Cria os botoes de estoque na tabela
    function inserirBotoesEstoque(linhasCriadas, dadosItem) {
        // console.log(dadosItem);

        const celAcoesNodes = linhasCriadas[0].querySelector('.cel-acoes');


        celAcoesNodes.insertAdjacentHTML("afterbegin", `<button class="btn-estoque-linha" data-name="estoque">${b.ico.carrinho2}</button>`);

        //Pega o botão criado na cellula
        const novoBtnEstoque = celAcoesNodes.querySelector(`[data-name="estoque"]`);
        //Estoque
        //---------------------------------------------------------------------------------------------
        novoBtnEstoque.addEventListener('click', function (e) {
            window.location = "#/estoque/movimentacoes/" + dadosItem.id;

        });
    }


}