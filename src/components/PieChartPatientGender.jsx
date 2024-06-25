import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const PieChartPatientGender = () => {
  const [series, setSeries] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchPatientCounts = async () => {
      try {
        const maleResponse = await axios.get(
          "http://127.0.0.1:5000/countpatients/male"
        );
        const femaleResponse = await axios.get(
          "http://127.0.0.1:5000/countpatients/female"
        );

        const maleCount = maleResponse.data.count;
        const femaleCount = femaleResponse.data.count;

        setSeries([maleCount, femaleCount]);
        setIsLoading(false);
        setKey((prevKey) => prevKey + 1);
      } catch (error) {
        setError("Error fetching patient counts");
        console.error("Error fetching patient counts", error);
        setIsLoading(false);
      }
    };

    fetchPatientCounts();
  }, []);

  const options = {
    chart: {
      type: "pie",
      height: "100%",
    },
    labels: ["Male", "Female"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "10px",
        fontWeight: "900",
      },
      dropShadow: {
        // enabled: false, // Disable drop shadow
      },
    },
    legend: {
      position: "bottom",
      fontSize: "8px",
    },
    colors: ["#4A5CFF", "#FA00FF"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  if (isLoading)
    return (
      <div>
        <span className="loading loading-dots loading-sm"></span>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="chart-container">
      <Chart
        key={key}
        options={options}
        series={series}
        type="pie"
        height="180px"
      />
    </div>
  );
};

export default PieChartPatientGender;
