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

const MultiLineChart = () => {
  const data = {
    labels: ["Enero", "Febrero", "Marzo"], // Meses
    datasets: [
      {
        label: "Dato 1",
        data: [65, 59, 80], // Valores de dato 1
        fill: true, // Para sombrear el área debajo de la línea
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Color de fondo con transparencia
        borderColor: "rgba(75, 192, 192, 1)", // Color de la línea
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Color de los puntos
        tension: 0.4, // Suaviza las curvas
        borderWidth: 1,
      },
      {
        label: "Dato 2",
        data: [28, 48, 40], // Valores de dato 2
        fill: true, // Para sombrear el área debajo de la línea
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Color de fondo con transparencia
        borderColor: "rgba(75, 192, 192, 1)", // Color de la línea
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Color de los puntos
        tension: 0.4, // Suaviza las curvas
        borderWidth: 1,
      },
      {
        label: "Dato 3",
        data: [35, 60, 55], // Valores de dato 3
        fill: true, // Para sombrear el área debajo de la línea
        backgroundColor: "rgba(75, 192, 192, 0)", // Color de fondo con transparencia
        borderColor: "rgba(75, 192, 192, 1)", // Color de la línea
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Color de los puntos
        tension: 0.4, // Suaviza las curvas
        borderWidth: 1,
      },
      {
        label: "Dato 5",
        data: [23, 40, 45], // Valores de dato 3
        fill: true, // Para sombrear el área debajo de la línea
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Color de fondo con transparencia
        borderColor: "rgba(75, 192, 192, 1)", // Color de la línea
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Color de los puntos
        tension: 0.4, // Suaviza las curvas
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Oculta la leyenda por defecto
        position: "right",
        labels: {
          padding: 40, // Espacio entre la leyenda y el borde
          boxWidth: 20, // Ajusta el tamaño del cuadro de color
        },
      },
      title: {
        display: true,
        text: "Totales por Mes y Dato (Líneas Múltiples)",
        align: "start", // Alinea el título a la izquierda
        color: "#333",
        font: {
          size: 16,
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
          // display: false,
          //   borderDash: [0],
          color: "rgba(200, 200, 200, 0.1)", // Líneas de la cuadrícula con transparencia
        },
        // ticks: {
        //   callback: function (value) {
        //     return value ; // Añade el sufijo "k" a los valores del eje Y
        //   },
        // },
        // beginAtZero: true,  // Asegura que el gráfico comience en cero
        border: {
          display: false, // Esto quita la línea vertical en el punto 0
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", height: "300px", width: "100%" }}>
      <Line data={data} options={options} />
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "#28a745",
          fontSize: "14px",
        }}
      >
        bla bla
      </div>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "50px",
          color: "#333",
          fontSize: "14px",
        }}
      >
        mas mas
      </div>
    </div>
  );
};

export default MultiLineChart;
