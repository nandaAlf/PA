import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MultiLineChart = ({labels,datasets}) => {
  // const data = {
    // labels: ["Enero", "Febrero", "Marzo","Abril","Mayo,","Junio","Julio","Agosto","Septiembre"], // Meses
    // datasets: [
    //   {
    //     label: "Dato 1",
    //     data: [65, 59, 80], // Valores de dato 1
    //     fill: true, // Para sombrear el área debajo de la línea
    //     backgroundColor: "rgba(75, 192, 192, 0.2)", // Color de fondo con transparencia
    //     borderColor: "rgba(75, 192, 192, 1)", // Color de la línea
    //     pointBackgroundColor: "rgba(75, 192, 192, 1)", // Color de los puntos
    //     tension: 0.4, // Suaviza las curvas
    //     borderWidth: 1,
    //   },
    //   {
    //     label: "Dato 2",
    //     data: [28, 48, 40], // Valores de dato 2
    //     fill: true, // Para sombrear el área debajo de la línea
    //     backgroundColor: "rgba(75, 192, 192, 0.2)", // Color de fondo con transparencia
    //     borderColor: "rgba(75, 192, 192, 1)", // Color de la línea
    //     pointBackgroundColor: "rgba(75, 192, 192, 1)", // Color de los puntos
    //     tension: 0.4, // Suaviza las curvas
    //     borderWidth: 1,
    //   },
    //   {
    //     label: "Dato 3",
    //     data: [35, 60, 55,98,34,78,42,73,56], // Valores de dato 3
    //     fill: true, // Para sombrear el área debajo de la línea
    //     backgroundColor: "rgba(75, 192, 192, 0)", // Color de fondo con transparencia
    //     borderColor: "rgba(75, 192, 192, 1)", // Color de la línea
    //     pointBackgroundColor: "rgba(75, 192, 192, 1)", // Color de los puntos
    //     tension: 0.4, // Suaviza las curvas
    //     borderWidth: 1,
    //   },
    //   {
    //     label: "Dato 5",
    //     data: [23, 40, 45], // Valores de dato 3
    //     fill: true, // Para sombrear el área debajo de la línea
    //     backgroundColor: "rgba(75, 192, 192, 0.2)", // Color de fondo con transparencia
    //     borderColor: "rgba(75, 192, 192, 1)", // Color de la línea
    //     pointBackgroundColor: "rgba(75, 192, 192, 1)", // Color de los puntos
    //     tension: 0.4, // Suaviza las curvas
    //     borderWidth: 1,
    //   },
    // ],
  // };
  const data = {
    labels: labels, // Recibe las etiquetas de los meses
    datasets: datasets, // Recibe los datasets dinámicos
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: true, // Oculta la leyenda por defecto
        position: "right",
        labels: {
          padding: 40, // Espacio entre la leyenda y el borde
          boxWidth: 20, // Ajusta el tamaño del cuadro de color
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Inventario procesos",
        align: "end", // Alinea el título a la izquierda
        // color: "#333",
        font: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Oculta las líneas de la cuadrícula en el eje X
        },
      },
      y: {
        grid: {
         
          color: "rgba(200, 200, 200, 0.1)", // Líneas de la cuadrícula con transparencia
        },
       
        border: {
          display: false, // Esto quita la línea vertical en el punto 0
        },
      },
    },
  };

  return (
    <div className=" w-[95%] h-full ">
      <div className="relative h-[250px] w-full text-slate-700 ">
        <Line data={data} options={options} />
    </div>
    </div>
  );
};

export default MultiLineChart;
