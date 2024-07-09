import React, { useEffect, useRef, useState } from "react";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";
import AdminLayouts from "../../component/Layouts/AdminLayouts";
import { Chart as ChartJs, defaults } from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";

const AdminPage = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  defaults.maintainAspectRatio = false;
  defaults.responsive = true;

  defaults.plugins.legend.display = true;
  defaults.plugins.title.display = true;
  defaults.plugins.title.align = "start";
  defaults.plugins.title.font.size = 16;
  defaults.plugins.title.font.color = "#1f3933";

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(30,144,255,0.5)");
      gradient.addColorStop(1, "rgba(0,0,139,0.5)");

      setChartData(gradient);
    }
  }, []);

  return (
    <React.Fragment>
      <HeadMetaData title="Admin" description="Admin" />
      <AdminLayouts>
        <div className="h-screen overflow-auto rounded-md bg-white p-3 text-black">
          <div className="h-full max-h-[530px]">
            <Line
              ref={chartRef}
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    label: "Kenaikan Bulan Ini",
                    data: [100, 93, 80, 84, 56, 69, 90],
                    hoverBorderCapStyle: "round",
                    hoverBorderColor: "#1f3933",
                    fill: true,
                    borderColor: "#1f3933",
                    borderCapStyle: "round",
                    borderWidth: 1.5,
                    borderJoinStyle: "miter",
                    hoverBackgroundColor: "#1f3933",
                    cubicInterpolationMode: "monotone",
                    pointStyle: "star",
                    pointBorderWidth: 3,
                    pointBorderColor: "#2563eb",
                    pointBackgroundColor: "#bfdbfe",
                    backgroundColor: chartData,
                  },
                ],
              }}
              options={{
                animation: true,
                plugins: {
                  title: {
                    text: "Monthly Revenue",
                  },
                },
              }}
            />
          </div>
          <hr className="my-8 h-1 rounded border-0 bg-gray-200" />
          <div className="grid w-full grid-cols-1 max-md:divide-y-4 md:grid-cols-2 md:divide-x-4">
            <div className="max-h-96 w-full px-3">
              <Bar
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "My First Dataset",
                      data: [65, 59, 80, 81, 56, 55, 40],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 205, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(201, 203, 207, 0.2)",
                      ],
                      borderColor: [
                        "rgb(255, 99, 132)",
                        "rgb(255, 159, 64)",
                        "rgb(255, 205, 86)",
                        "rgb(75, 192, 192)",
                        "rgb(54, 162, 235)",
                        "rgb(153, 102, 255)",
                        "rgb(201, 203, 207)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: "Bar Chart",
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
            <div className="h-96 w-full px-3">
              <Pie
                data={{
                  labels: ["Red", "Blue", "Yellow"],
                  datasets: [
                    {
                      label: "My First Dataset",
                      data: [300, 50, 100],
                      backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                      ],
                      hoverOffset: 4,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: "Pie Chart",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </AdminLayouts>
    </React.Fragment>
  );
};

export default AdminPage;
