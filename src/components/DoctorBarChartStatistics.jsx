/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const DoctorBarChartStatistics = ({
  predictionsCount,
  normalCount,
  osteoporosisCount,
}) => {
  const [chartData, setChartData] = useState({ options: {}, series: [] });
  const [key, setKey] = useState(0); // Key to force re-render
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error

  useEffect(() => {
    // Reset loading and error states when data changes
    setLoading(true);
    setError(null);

    try {
      const seriesData = [
        {
          name: "Counts",
          data: [predictionsCount, normalCount, osteoporosisCount],
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

      // Set loading to false after chart data is set
      setLoading(false);
    } catch (err) {
      // Set error state if there's an error
      setError(err.message);
      setLoading(false);
    }
    setKey((prevKey) => prevKey + 1);
  }, [predictionsCount, normalCount, osteoporosisCount]); // Re-run effect when data changes

  // Render loading state
  if (loading) {
    return (
      <div>
        <span className="loading loading-dots loading-sm"></span>
      </div>
    );
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

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

export default DoctorBarChartStatistics;
