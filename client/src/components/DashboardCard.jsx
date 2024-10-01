import React from "react";

const DashboardCard = ({ icon, title, value, percentage, color }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 m-2 w-full md:w-1/4">
      {/* Icono y Título */}
      <div className="flex items-center justify-start w-full">
        <div className={`p-2 rounded-full ${color} bg-opacity-20`}>{icon}</div>
        <h2 className="text-xl font-semibold ml-2 ">{title}</h2>
      </div>
      {/* Valor y Gráfico */}
      <div className="flex flex-col items-center mt-4">
        <div className="text-4xl font-bold">{value}+</div>
        {/* Simulación de gráfico de barras */}
        <div className="flex items-end justify-between mt-4 w-full h-16 ">
          {[100, 50, 70, 40, 80, 60, 90].map((height, index) => (
            <div
              key={index}
              className="w-2 bg-red-700"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        {/* Porcentaje */}
        <div className="text-sm mt-2" style={{ color } }>
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
