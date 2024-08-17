import React, { useEffect, useState } from "react";
import { HeadMetaData } from "../../component/Elements/HeadMetaData";
import AdminLayouts from "../../component/Layouts/AdminLayouts";
import { defaults } from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  getMonthlySales,
  getStatusDistribution,
  getTopSellingProducts,
} from "../../services/admin/dashboard/index";
import { useCustomToast } from "../../Hooks/useToast";

const AdminPage = () => {
  const [monthlySales, setMonthlySales] = useState<DataResponseMonthlySales[]>(
    [],
  );
  const [statusDistribution, setStatusDistribution] = useState<
    DataResponseStatusDistribution[]
  >([]);
  const [topSellingProducts, setTopSellingProducts] = useState<
    DataResponseTopSellingProducts[]
  >([]);
  const [getYear, setGetYear] = useState(new Date().getFullYear());
  const { ErrorToast } = useCustomToast();
  defaults.maintainAspectRatio = false;
  defaults.responsive = true;
  defaults.plugins.legend.display = true;
  defaults.plugins.title.display = true;
  defaults.plugins.title.align = "start";
  defaults.plugins.title.font = {
    size: 20,
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = {
          year: getYear,
        };

        await getMonthlySales(data, (status, res) => {
          if (status == true) {
            setMonthlySales(res.data);
          }
        });

        await getStatusDistribution((status, res) => {
          if (status == true) {
            setStatusDistribution(res.data);
          }
        });

        await getTopSellingProducts((status, res) => {
          if (status == true) {
            setTopSellingProducts(res.data);
          }
        });
      } catch (error) {
        ErrorToast({
          id: "fetch-chart-data-error",
          title: "Failed to fetch chart data",
        });
      }
    };

    fetchChartData();
  }, [getYear]);

  const handleGetYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGetYear(parseInt(e.target.value));
  };

  return (
    <React.Fragment>
      <HeadMetaData title="Admin" metaDescription="Admin" />
      <AdminLayouts>
        <div className="h-screen overflow-auto rounded-md bg-white p-3 text-black">
          <div className="relative h-full max-h-[530px]">
            <Line
              data={{
                labels: monthlySales.map((data) => data.month),
                datasets: [
                  {
                    label: "Monthly Income",
                    data: monthlySales.map((data) => data.total),
                    hoverBorderCapStyle: "round",
                    hoverBorderColor: "#1f3933",
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
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    text: "Monthly Income",
                    font(ctx, options) {
                      return {
                        size: 16,
                        weight: "bold",
                        style: "normal",
                      };
                    },
                  },
                  tooltip: {
                    usePointStyle: true,
                  },
                },
              }}
            />

            <form className="absolute right-3 top-0 mx-auto max-w-sm">
              <label htmlFor="year" className="sr-only">
                Select year
              </label>
              <select
                id="year"
                name="year"
                autoComplete="year"
                required
                onChange={handleGetYear}
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-200 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0"
              >
                {Array.from(
                  { length: 4 },
                  (v, i) => new Date().getFullYear() + i,
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <hr className="my-8 h-1 rounded border-0 bg-secondary" />
          <div className="grid w-full grid-cols-1 space-y-3 divide-secondary max-md:divide-y-4 md:grid-cols-2 md:divide-x-4">
            <div className="max-h-96 w-full px-3">
              <Bar
                data={{
                  labels: topSellingProducts.map((data) => data.product),
                  datasets: [
                    {
                      label: "many products sold",
                      data: topSellingProducts.map((data) => data.quantity),
                      backgroundColor: "#cba258",
                      borderColor: "rgba(0, 0, 0,  0.5)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: "Top 5 Best Products",
                      display: true,
                      font(ctx, options) {
                        return {
                          size: 16,
                          weight: "bold",
                          style: "normal",
                        };
                      },
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
                  labels: statusDistribution.map((data) => data.status),
                  datasets: [
                    {
                      label: "Status Penjualan",
                      data: statusDistribution.map((data) => data.count),
                      backgroundColor: [
                        "#3b82f6",
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
                      hoverOffset: 4,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: "Status Distribution",
                      font(ctx, options) {
                        return {
                          size: 16,
                          weight: "bold",
                          style: "normal",
                        };
                      },
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
