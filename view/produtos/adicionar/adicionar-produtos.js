import b from '../../../biblioteca/js/biblioteca.js';



export function init(valueInit) {
    //Variaveis
    //=====================================================================================================
    //GLOBAIS
    //----------------------------------------------------------


    //Elements DOM
    //----------------------------------------------------------
    const tbody = document.querySelector('#tbody-central');//Tabela Central
    const tituloPage = document.querySelector('#modal-window__title-texto');

    //Formulario
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-modal');//Formulario Adicionar




    //MASCARAS
    //======================================================================================================
    // Aplica mascaras no form
    b.form.mask(formAdicionar);





    //Init==================================================================================================
    tituloPage.textContent = "Adicionar Produtos";




    //Eventos
    //======================================================================================================
    //BTN - Salvar----------------
    formAdicionar.addEventListener('submit', function (e) {
        e.preventDefault();

        //Pega o FORM que é o target do evento submit
        const form = e.target;


        if (validarForm(form)) {


            //Cria produto com estoque 0 para nao trucar no banco de daados, o campo de float naoa ceita "" null, somente numeros;
            //Remove o dataset.type = ignore
            // form["estoque"].dataset.type = "";
            // form["estoque"].value = 0;

            //Response contem o elemento salvo junto de sua ID criada no banco
            b.crud.custom("criarProduto", "produtos", b.form.extractValues(form), responseItemSalvo => {//async
                b.modal.fechar();

       

                responseItemSalvo.estoque_total = b.paraMoeda(0) + " " + responseItemSalvo.unidade;
                // response.quantidade_total = b.paraMoeda(response.quantidade_total) + " " + response.unidade;
                // responseItemSalvo.quantidade_total = 0;
                responseItemSalvo.custo = 0;
                // responseItemSalvo.estoque = 0;



                //informa a TBody, 
                const linhaCriada = b.render.lineInTableDesc(tbody, responseItemSalvo, "produtos");
                inserirBotoesEstoque(linhaCriada, responseItemSalvo);
                
            }, true).then(()=>{
                b.modal.fechar()
            });
           
        }
    });






    //Funções
    //======================================================================================================
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
        console.log(dadosItem);

        const celAcoesNodes = linhasCriadas[0].querySelector('.cel-acoes');


        celAcoesNodes.insertAdjacentHTML("afterbegin", `<button class="btn-estoque-linha" data-name="estoque">${b.ico.carrinho2}</button>`);

        //Pega o botão criado na cellula
        const novoBtnEstoque = celAcoesNodes.querySelector(`[data-name="estoque"]`);
        //Estoque
        //---------------------------------------------------------------------------------------------
        novoBtnEstoque.addEventListener('click', function (e) {
            window.location = "#/produtos/movimentacoes/" + dadosItem.id;

        });
    }

}


