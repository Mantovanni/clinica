//Resolve bug do autocomplete ficar por cima da sidebar no modo mobile
// ===============================================================================
export function autocomplete(params) {
    const btnHamburguer = document.querySelector('.hamburguer');


    btnHamburguer.addEventListener('click', ev => {
        const inpAutoComplete = document.querySelectorAll('.autoComplete_wrapper');     
        //So aplica a class se encontrar o elemento 
        if (inpAutoComplete[0] !== undefined) {
            if (inpAutoComplete[0].firstElementChild.classList.toggle("position-initial")) {
                inpAutoComplete.forEach(element => {
                    element.classList.toggle("position-initial")
                })
            } else {
                setTimeout(() => {
                    inpAutoComplete.forEach(element => {
                        element.classList.toggle("position-initial")
                    })
                }, 500);

            }
        }


    })
}
