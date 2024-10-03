import React, { useState } from "react";
import "../css/page.css";
import MultiLineChart from "../components/charts/MultiLineChart";
import DashboardCard from "../components/DashboardCard";
import DoughnutChart from "../components/charts/DoughnutChart";
import { useEffect } from "react";
import { usePage } from "../util/usePage";
import { useService } from "../util/useService";
import ModalComponent from "../components/Modal";
import Loader from "../components/Loader";
export default function HomePage() {
  const { fetchStats } = useService();
  const [data1, setData1] = useState({ label: [], data: [] });
  const [data2, setData2] = useState({ label: [], data: [] });
  const [loading,setLoading]=useState(true)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // const [data3, setData3] = useState({ label: [], data: [] });
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    async function fetchGraph1Data() {
      setLoading(true)
      const result = await fetchStats("entidad");
      const label = result?.map((item) => item.entity); // Asumiendo que 'entity' es el nombre
      const data = result?.map((item) => item.total); // Asumiendo que 'total' es el valor

      // Actualiza el estado con los datos formateados
      setData1({ label, data });
      setLoading(false)
    }
    async function fetchGraph2Data() {
      setLoading(true)
      const result = await fetchStats("departamento");
      const label = result?.map((item) => item.department); // Asumiendo que 'entity' es el nombre
      const data = result?.map((item) => item.total); // Asumiendo que 'total' es el valor

      // Actualiza el estado con los datos formateados
      setData2({ label, data });
      setLoading(false)
    }
    async function fetchGraph3Data() {
      setLoading(true)
      const result = await fetchStats("inventario");
      const labels = result?.map((item) => monthNames[item.month - 1]); // Mapea el número del mes al nombre
      const datasetBloques = result?.map((item) => item.total_bloques);
      const datasetCr = result?.map((item) => item.total_cr);
      const datasetCe = result?.map((item) => item.total_ce);
      const datasetLaminas = result?.map((item) => item.total_laminas);
      setLineChartData({
        labels,
        datasets: [
          {
            label: "Bloques",
            data: datasetBloques,
            fill: false,
            // backgroundColor: "rgba(75, 192, 192, 0.2)",
           backgroundColor:"rgb(248, 237, 227)",
            borderColor: "rgba(248, 237, 227,2)",
            tension: 0.4,
            borderWidth: 1,
          },
          {
            label: "CR",
            data: datasetCr,
            fill: true,
            backgroundColor:"rgb(223, 211, 195)",
            // backgroundColor: "rgba(255, 221, 219,0.2)",
            borderColor: "rgb(223, 211, 195)",
            tension: 0.4,
            borderWidth: 1,
          },
          {
            label: "CE",
            data: datasetCe,
            fill: false,
            // backgroundColor: "rgb(247, 249, 250)",
            backgroundColor:"rgb(208, 184, 168)",
            borderColor: "rgba(208, 184, 168)",
            tension: 0.4,
            borderWidth: 1,
          },
          {
            label: "Laminas",
            data: datasetLaminas,
            fill: false,
            backgroundColor:"rgb(197, 112, 93)",
            // backgroundColor: "rgba(255, 205, 86, 0.2)",
            borderColor: "rgb(197, 112, 93)",
            tension: 0.4,
            borderWidth: 1,
          },
        ],
      });
      setLoading(false)
    }
    
    fetchGraph1Data();
    fetchGraph2Data();
    fetchGraph3Data();
    // window.location.reload()
  }, []);
  while (loading)return <Loader/>
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center p-9 my-2 ">
      <div className="flex flex-col  md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 w-full  ">
        <div className="w-full md:w-1/2  bg-white rounded-xl border-[1px] ">
          <DoughnutChart chartLabels={data1.label} chartData={data1.data} title={"Entidades"}/>
        </div>
        <div className="w-full  md:w-1/2 bg-white rounded-xl border-[1px] ">
          <DoughnutChart chartLabels={data2.label} chartData={data2.data} title={"Departamentos"}/>
        </div>
      
      </div>

      <div className="bg-white w-full m-4 p-4 my-8 rounded-xl border-[1px] ">
        <MultiLineChart labels={lineChartData.labels} datasets={lineChartData.datasets}  />
      </div>
      {/* <ModalComponent/> */}
    </div>
  );
}
