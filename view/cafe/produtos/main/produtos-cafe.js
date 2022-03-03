import b from '../../../../biblioteca/js/biblioteca.js';
import Estoques from '../../../estoques/main/estoques.js';



export default class ProdutosCafe extends Estoques{



    constructor() {
     
        super();
        
       
        //Variaveis
        //==============================================================================================================
        //GLOBAIS
        //----------------------------------------------------------
   
        //Elements DOM
        //-------------------------------------------------------------------------
   
        // Botoes
        //----------------------------------------------------------
   
        // CARDS
        //----------------------------------------------------------
     



    }




    init() {
       
        //Init==========================================================================================================
         //Recebe id dos estoque
         this.buscarProdutosPorGrupo("cafe");
         //Recebe grupo do estoque
         this.listarEstoques("cafe");







        //Eventos
        //==============================================================================================================

        //BTN - Transferir================================================================
        this.btnTransferir.addEventListener('click', ev => {

            b.modal.abrir("Transferir Produtos");

            //Dados para a função que vai abrir no modal
            const dataInit = {
                layout: "transferencia",
                estoque: {
                    categoria: "cafe" //GRUPO
                }
            }
        
            // Passa o elemento Janela Modal para a função render.page 
            b.render.pageModal(this.transferirUrl, this.transferirJs, dataInit)
                .then(response => {
                    //Se cancelar ou fechar a promisse retorna false
                    if (response) {
                        this.buscarProdutosDeAllEstoques();
                    }

                });

        })

    }








    //Funções
    //==============================================================================================================





}










