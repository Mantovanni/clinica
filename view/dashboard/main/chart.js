
import b from '../../../biblioteca/js/biblioteca.js';



// export default class Graficos {
//     constructor() {

//     }


// teste = 1;


// /Default
const optionsDefault = {
    series: [

    ],
    xaxis: {
        // categories: ['10/09/2021', '10/09/2021', '10/09/2021', '10/09/2021', '10/09/2021', '10/09/2021', '10/09/2021', '10/09/2021', '10/09/2021'],
        // categories: data.nome,
        // position: 'top',
        // type: 'catefory'
        // x: new Date('14 Nov 2012').getTime(),
        // type: 'datetime'
        // labels: {
        //     show: false
        //   }
        // type: 'datetime',
        // categories: ["2018-09-17T", "2018-09-18T", "2018-09-19T", "2018-09-20T", "2018-09-21T", "2018-09-22T", "2018-09-23T", "2018-09-24T", "2018-09-25T"]

        // categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],

        //     '10/09/2021', '10/09/2021', '10/09/2021', '10/09/2021', '10/09/2021', '10/09/2021', '10/09/2021', '10/09/2021', '10/09/2021'],


    },


    yaxis: {

        title: {
            text: 'Quantidade de Produtos'
        },
        // decimalsInFloat: 2,
        //Quando usa o labels formatter , desativa o decimalsInFloat
        labels: {
            formatter: function (val) {

                return b.paraMoeda(val)
            }
        },
        // min: 20,
        // max: 100
    },

    title: {
        text: "Medicamentos",
        align: 'left',
        margin: 10,
        offsetX: -10,
        offsetY: 0,
        floating: false,
        style: {
            fontSize: '20px',
            // fontWeight: 'bold',
            fontFamily: undefined,
            color: 'rgba(0, 0, 0, 0.589'
        },
    },
    subtitle: {

    },
    tooltip: {
        y: {
            formatter: function (val) {
                return b.paraMoedaReal(val)
                // return "$ " + val + " thousands"
            }
        }
    },





    // Grafico
    //==========================================================================================
    //Detalhes gerais para todos os graficos
    chart: {
        id: "grafico01",
        type: 'bar',
        height: "100%",
        // height: "350px",

        //Traduzir---------------------------------------
        locales: [{
            "name": "pt-br",
            "options": {
                "months": [
                    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                "shortMonths": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                "days": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
                "shortDays": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                "toolbar": {
                    "exportToSVG": "Baixar SVG",
                    "exportToPNG": "Baixar PNG",
                    "exportToCSV": "Baixar CSV",
                    "menu": "Menu",
                    "selection": "Selecionar",
                    "selectionZoom": "Selecionar Zoom",
                    "zoomIn": "Aumentar",
                    "zoomOut": "Diminuir",
                    "pan": "Navegação",
                    "reset": "Reiniciar Zoom"
                }
            }
        }
        ],
        defaultLocale: "pt-br",

        animations: {
            enabled: true,
            easing: 'easeout',
            speed: 1700,
            animateGradually: {
                enabled: false,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 1700
            }
        },

        // events: {
        //     click: function (event, chartContext, config) {
        //         // console.log(event);
        //         // console.log(chartContext);
        //         // console.log(config);
        //         // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
        //     }
        // }

        // brush: {
        //     enabled: true,
        //     target: undefined,
        //     autoScaleYaxis: false
        // }


    },
    //Detalhes de cada tipo de grafico, barra, bolha, pizza
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
            // dataLabels: {
            //     position: 'bottom'
            // },
            borderRadius: 4,


        },
    },
    //Valor exato de cada coluna
    dataLabels: {
        enabled: false,
        formatter: function (val, opt) {
            return b.paraMoedaReal(val)
        }

    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },




    //Quanto tem mais de um tipo de barra
    legend: {
        position: 'top',
        // tooltipHoverFormatter: function (val, opts) {
        //     console.log(val);
        //     return val + " - " + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]
        // }

        // horizontalAlign: 'right'
    },

    fill: {
        opacity: 1
    }

};

// Apex.chart = options

//=====================================================================================================================



























//Cafe Chart ============================================================================================
export function estoque(data, modo) {


    const options = {
        series: [{
            name: 'Almoxerifado',
            data: data
        }],
        yaxis: {

            title: {
                text: 'Quantidade de Produtos '
            },

            labels: {
                formatter: function (val, opts) {
                    // console.log(opts.)
                    // console.log(val + " - " + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]);
                    // return val + " - " + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]
                    return b.paraMoeda(val)
                }
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return b.paraMoeda(val)
                    // return "$ " + val + " thousands"
                }
            }
        },
    }

   
    //Primeiro cria com optionsDefault e ja atualiza com options, em seguida se for chamado a função
    //novamente atualiza
    const chartCafe = new ApexCharts(document.querySelector("#chart"), optionsDefault);
    chartCafe.render();
  
    //Atualiza mesclando as options
    chartCafe.updateOptions(options);










    // let chartCafe;
    // if (modo !== "update") {
     
    //     chartCafe = new ApexCharts(document.querySelector("#chart"), optionsDefault);
    //     chartCafe.render();
      
    //     //Atualiza mesclando as options
    //     chartCafe.updateOptions(options);
    //     console.log("if");
    // } else {
    //     console.log("else");
    //     chartCafe.updateOptions(options);
    // }





    return chartCafe;
}


















// }

