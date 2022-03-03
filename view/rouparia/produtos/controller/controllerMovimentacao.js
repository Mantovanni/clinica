import b from '../../../biblioteca/js/biblioteca.js';
    
    //Aplicar uma formatação de cor depois que a tabela e carregada
    //===================================================================================================
    export function destacarColunaMovimentacao(tbody) {

        //Pega todas as celulas da tabela com esse dataset
        const listaTd = tbody.querySelectorAll("td[data-name='tipo'] span");
       

        listaTd.forEach(element => {
            
            if (element.textContent === "Entrada") {
                // element.style.background = "Green";
                element.classList.add("background-verde");

            } else if (element.textContent === "Saida") {
                element.style.color = "white";
                element.classList.add("background-vermelho");
            }
        });


    }

    //=====================================================================================================


    function adicinarMovimentacao() {

b.crud.custom({

})

    }