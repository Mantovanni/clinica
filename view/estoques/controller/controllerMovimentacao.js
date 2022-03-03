import b from '../../../biblioteca/js/biblioteca.js';
    
    //Aplicar uma formatação de cor depois que a tabela e carregada
    //===================================================================================================
    export function destacarColunaMovimentacao(tbody) {

        //Pega todas as celulas da tabela com esse dataset
        const listaTd = tbody.querySelectorAll("td[data-name='tipo']")

        listaTd.forEach(element => {
            if (element.textContent === "Entrada") {
                element.style.color = "Green";

            } else {
                element.style.color = "Red";;
            }
        });


    }

    //=====================================================================================================


    function adicinarMovimentacao() {

b.crud.custom({

})

    }