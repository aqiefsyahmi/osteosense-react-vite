import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const BarChartDefault = () => {
  const [chartData, setChartData] = useState({ options: {}, series: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [key, setKey] = useState(0); // Key to force re-render

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/countpredics");
        const predictCount = response.data.predict_count;

        const responseNormal = await axios.get(
          "http://127.0.0.1:5000/countpredics/Normal"
        );
        const normalCount = responseNormal.data.count;

        const responseOsteoporosis = await axios.get(
          "http://127.0.0.1:5000/countpredics/Osteoporosis"
        );
        const osteoporosisCount = responseOsteoporosis.data.count;

        const seriesData = [
          {
            name: "Counts",
            data: [predictCount, normalCount, osteoporosisCount],
          },
        ];

        setChartData({
          options: {
            chart: {
              height: "100%",
              type: "bar",
              events: {
                click: function (chart, w, e) {
                  console.log(chart, w, e);
                },
              },
              toolbar: {
                show: false, // Disable the toolbar
              },
            },
            colors: ["#e07f00", "#64C5B9", "#E01B1B"], // Customize colors
            plotOptions: {
              bar: {
                columnWidth: "45%",
                distributed: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    height: "100%",
                    type: "bar",
                    events: {
                      click: function (chart, w, e) {
                        console.log(chart, w, e);
                      },
                    },
                    toolbar: {
                      show: false, // Disable the toolbar
                    },
                  },
                  legend: {
                    show: false,
                  },
                },
              },
            ],
            xaxis: {
              categories: ["Predictions", "Normal", "Osteoporosis"],
              labels: {
                style: {
                  colors: ["#e07f00", "#64C5B9", "#E01B1B"],
                  fontSize: "12px",
                  fontWeight: "bold",
                },
              },
            },
          },
          series: seriesData,
        });
        setKey((prevKey) => prevKey + 1);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <p>
        <span className="loading loading-dots loading-sm"></span>
      </p>
    );
  if (error) return <p>{error}</p>;

  return (
    <Chart
      key={key} // Use key to force re-render
      options={chartData.options}
      series={chartData.series}
      type="bar"
      height="100%"
    />
  );
};

export default BarChartDefault;
