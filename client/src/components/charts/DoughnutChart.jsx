import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
// Registrar los componentes de Chart.js necesarios
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ chartData, chartLabels, chartOptions ,title}) => {
  const data = {
    // labels: ["Entidad 1", "Entidad 2", "Entidad 3","Entidad 1", "Entidad 2", "Entidad 3"],
    labels: chartLabels,
    datasets: [
      {
        label: "Cantidad de estudios",
        // data: [400, 300, 500,900,976],
        data: chartData,
        backgroundColor: [
          "rgba(78, 199, 110,0.8)",
          "rgb(101, 181, 162)",
          "rgb(180, 217, 209)",
        ],
        borderColor: [
          "rgba(230, 234, 237,0.8)"
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
          boxWidth: 10, // Ajusta el tamaño de las cajas de la leyenda
          padding: 15, // Aumenta el espacio entre las leyendas y el gráfico
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
        color: "#333",
        font: {
          size: 14,
        },
      },
      maxWidth: "100%",
    },
    // layout: {
    //   padding: {
    //     top: 20,
    //     bottom: 10,
    //     left: 10,
    //     right: 10,
    //   },
    // },
  };

  return (
    <div className="relative px-2 w-full h-56 flex justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
