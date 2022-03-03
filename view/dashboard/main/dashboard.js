import b from '../../../biblioteca/js/biblioteca.js';
import * as chart from './chart.js';



export default class Dashboard {
    // grafico = new chart.default()

    constructor() {



        //Variaveis
        //==============================================================================================================
        //GLOBAIS
        //----------------------------------------------------------


        //Elements DOM
        //-------------------------------------------------------------------------


        // CARDS
        //----------------------------------------------------------


        //Formulario
        //--------------------------------------  
        // this.btnAdicionar = document.querySelector('#chart');








        //MASCARAS
        //==============================================================================================================
        // b.maskMoeda(inpValor);

    }




    init() {
        //Init==========================================================================================================
        // this.chartCafe = chart.cafes();

        this.atualizarChartEstoque();
        this.atualizarCards();

        atualizarTudo();

        function atualizarTudo() {

            // this.atualizarChartEstoque();
            // this.atualizarCards();
        }



        b.setIntervalCustom(() => {
            atualizarTudo();

            this.atualizarChartEstoque();
            this.atualizarCards();
        }, 1115000)







        //Eventos
        //==============================================================================================================
        //BTN - Movimentar Estoque-------------------------------------------------------------------








    }




    //Funções
    //==============================================================================================================

    //Dashboard central
    //===================================================================================================





    //Carregar Tabela
    //===================================================================================================

    atualizarChartEstoque() {
        const data = {
            estoque: "%"
        };
        b.crud.custom("listarEstoquesProdutos", "estoques", data, responseList => {  //async        



            //padrão de dados para enviar ao grafico
            const data = []
            const dados = Array.from(responseList["data"]).map(response => {

                data.push({
                    y: response.estoque_total,
                    x: response.nome,
                });

                return response;

            });


            // chart.estoque(data);

            //==========================================================================================
            //A primeria vez cria o grafico nas proximas chamadas atualiza

            // let chartCafe;
            if (this.chartCafe == undefined) {
                this.chartCafe = chart.estoque(data);

            } else {
                //   chart.estoque(data, "update")
                this.chartCafe.updateOptions({
                    series: [{
                        data: data
                    }]
                });
            }



        });

    }







    //Carregar CARDS
    //===================================================================================================

    //Preenche os cards com os dados da lista de movimentações do banco
    //===================================================================================================
    atualizarCards() {
        // const data = {estoque: "%"};

        const cardValorProducao = document.querySelector('#producao')
        const cardValorAlmoxerifado = document.querySelector('#almoxerifado')
        const cardUltimoCafe = document.querySelector('#ultimo-cafe')


        //Valor total de cada estoque
        b.crud.custom("valorAllEstoques", "estoques", "", responseList => {  //async  
      
            //Se não ouver produtos com custo
            if (responseList.length > 0) {
                cardValorProducao.textContent = b.paraMoedaReal(responseList[1].custo_total);
                cardValorAlmoxerifado.textContent = b.paraMoedaReal(responseList[0].custo_total);
            }


        });


        b.crud.listarLast("cafesCusto_view", response => {


            cardUltimoCafe.textContent = b.paraMoedaReal(response.custo);

        })











    }















}

