import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
// Registrar los componentes de Chart.js necesarios
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ chartData, chartLabels, chartOptions, title }) => {
  const data = {
    // labels: ["Entidad 1", "Entidad 2", "Entidad 3","Entidad 1", "Entidad 2", "Entidad 3"],
    labels: chartLabels,
    datasets: [
      {
        label: "Cantidad de estudios",
        // data: [400, 300, 500,900,976],
        data: chartData,
        backgroundColor: [
        //   "rgb(151, 49, 49)",
        //   "rgb(224, 167, 94)",
        //   "rgb(249, 214, 137)",
        //  "rgb(245, 231, 178)",

          //  "rgb(234, 216, 177)",
          // " rgb(0, 31, 63)",
          // "rgb(58, 109, 140)",
          // "rgb(106, 154, 176)",

          "rgb(248, 237, 227)",
          "rgb(223, 211, 195)",
          "rgb(208, 184, 168)",
          "rgb(197, 112, 93)",
         
          "rgb(177, 233, 163)",
          "rgb(122, 195, 143)",
          "rgb(136, 224, 208)",
          "rgb(199, 238, 255)",

          "rgb(101, 181, 162)",
          "rgb(180, 217, 209)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          ,
        ],
        borderColor: [
          "rgba(230, 234, 237,0.8)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        align: "center", // Alinear la leyenda en el centro verticalmente
        labels: {
          // boxWidth: 10, // Ajusta el tamaño de las cajas de la leyenda
          padding: 10, // Aumenta el espacio entre las leyendas y el gráfico
          usePointStyle: true, // Usa estilos de punto en lugar de cajas
          textAlign: "center", // Asegura que el texto esté alineado
          font: {
            size: 12, // Ajusta el tamaño de la fuente para hacer que la leyenda sea más legible
          },
          // maxHeight:10
        },
        // fulSize:true,
      },
      title: {
        display: true,
        text: title,
        align: "start", // Alinea el título a la izquierda
      
        font: {
          size: 14,
        },
      },
      maxWidth: "100%",
    },
  };

  return (
    <div className="relative px-2 w-full h-60 bg flex justify-center text-slate-700 ">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
