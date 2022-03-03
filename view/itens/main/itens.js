import b from '../../../biblioteca/js/biblioteca.js';



export function init() {
    //Variaveis
    //==============================================================================================================
    //GLOBAIS
    //----------------------------------------------------------
    const controllerUrl = "../controller/itens/ControllerItens.class.php";
    const adicionarUrl = " ../view/itens/adicionar/adicionar-itens.html";
    const urlJs = "../../../view/itens/adicionar/adicionar-itens.js";//Url partir do render.js






    //Elements DOM
    //----------------------------------------------------------
    const btnAdicionar = document.querySelector('#acoes__button-adicionar');
    const tbody = document.querySelector('#tbody-central');

    const inpPesquisar = document.querySelector("#acoes__buscar");




    //Formulario
    //--------------------------------------
    const formAdicionar = document.querySelector('#form-adicionar');//Formulario Adicionar




    //MASCARAS
    //==============================================================================================================
    // b.maskMoeda(inpCusto);




    //Init==========================================================================================================
    carregarTabela();



    //Eventos
    //==============================================================================================================
    //BTN - Adicionar----------------
    btnAdicionar.addEventListener('click', function (e) {
        b.modal.abrir("Adicionar Novo Item");

        // Passa o elemento Janela Modal para a função render.page 
        b.render.pageModal(adicionarUrl, urlJs);//assync
        // b.render.page(b.modal.content, adicionarUrl, urlJs);//assync

    });

    //==============================================================================================================
    // btnAdicionar.click()










    //Funções
    //==============================================================================================================
    //==============================================================================================================

    //Carregar Tabela
    //===================================================================================================

    //Agrupa os produtos no mesmo item pela id do item igual
    function listarItensProdutos(functionResponse) { //mudar para arquivo controllerItens.js
        const intesProdutos = [];
        let idAnterior = 0;

        b.crud.custom("listarItensProdutos", "itens", "",response => {

            //Agrupa os produtos no mesmo item pela id do item igual
            response["data"].forEach((element) => {
                //Se a id do item for igual a ultima passada , so adiciona na propriedade produtos
                if (element.id == idAnterior) {

                    intesProdutos[intesProdutos.length - 1].itemRelacional.push({
                        produtos_id: element.produtos_id,
                        nome: element.produtos_nome,
                        unidade: element.produtos_unidade,
                        quantidade: element.produtos_quantidade,
                        custo: element.produtos_custo
                    })

                } else {

                    intesProdutos.push({
                        id: element.id,
                        nome: element.nome,
                        // quantidade: element.quantidade,
                        unidade: element.unidade,
                        custo: element.custo,
                        itemRelacional: [{
                            produtos_id: element.produtos_id,
                            idhas: element.produtos_idhas,
                            nome: element.produtos_nome,
                            unidade: element.produtos_unidade,
                            quantidade: element.produtos_quantidade,
                            custo: element.produtos_custo
                        }]
                    })
                }

                idAnterior = element.id;
            });


            
            functionResponse(intesProdutos);

            b.table.insertSearch(inpPesquisar, tbody);

        });

    }
   
    // function listarItensProdutos(functionResponse) { //mudar para arquivo controllerItens.js
    //     const intesProdutos = [];
    //     let idAnterior = 0;

    //     b.fetchPost(controllerUrl, { metodo: "listarItensProdutos" }, response => {

    //         //Agrupa os produtos no mesmo item pela id do item igual
    //         response["data"].forEach((element) => {
    //             //Se a id do item for igual a ultima passada , so adiciona na propriedade produtos
    //             if (element.id == idAnterior) {

    //                 intesProdutos[intesProdutos.length - 1].itemRelacional.push({
    //                     produtos_id: element.produtos_id,
    //                     nome: element.produtos_nome,
    //                     unidade: element.produtos_unidade,
    //                     quantidade: element.produtos_quantidade,
    //                     custo: element.produtos_custo
    //                 })

    //             } else {

    //                 intesProdutos.push({
    //                     id: element.id,
    //                     nome: element.nome,
    //                     // quantidade: element.quantidade,
    //                     unidade: element.unidade,
    //                     custo: element.custo,
    //                     itemRelacional: [{
    //                         produtos_id: element.produtos_id,
    //                         idhas: element.produtos_idhas,
    //                         nome: element.produtos_nome,
    //                         unidade: element.produtos_unidade,
    //                         quantidade: element.produtos_quantidade,
    //                         custo: element.produtos_custo
    //                     }]
    //                 })
    //             }

    //             idAnterior = element.id;
    //         });

    //         functionResponse(intesProdutos);


    //     });

    // }







    //Cria as Linhas da tabela==================================================================================
    function carregarTabela() {

        listarItensProdutos(response => {  //async        


            // console.log(response);
            //Insere um valor total em todos os objetos antes de enviar para a função render.lineInTable
            const dados = response.map(element => {
                element.total = element.custo * element.quantidade;
                return element
            });

    
            //informa a TBody, 
            b.render.lineInTable(tbody, dados, "itens");

            // document.querySelector('td').nextElementSibling.click();//Edit
        });

    }
























}








