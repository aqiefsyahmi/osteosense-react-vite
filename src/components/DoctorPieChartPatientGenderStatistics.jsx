/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const DoctorPieChartPatientGenderStatistics = ({
  normalMaleCount,
  osteoMaleCount,
  normalFemaleCount,
  osteoFemaleCount,
}) => {
  const [series, setSeries] = useState([0, 0, 0, 0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchPatientCounts = async () => {
      try {
        setSeries([
          normalMaleCount,
          osteoMaleCount,
          normalFemaleCount,
          osteoFemaleCount,
        ]);
        setIsLoading(false);
        setKey((prevKey) => prevKey + 1);
      } catch (error) {
        setError("Error fetching patient counts");
        console.error("Error fetching patient counts", error);
        setIsLoading(false);
      }
    };

    fetchPatientCounts();
  }, [normalMaleCount, osteoMaleCount, normalFemaleCount, osteoFemaleCount]);

  const options = {
    chart: {
      type: "pie",
      height: "100%", // Fixed height to ensure uniform size
    },
    labels: [
      "Normal Male",
      "Osteoporosis Male",
      "Normal Female",
      "Osteoporosis Female",
    ],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "10px",
        fontWeight: "900",
      },
    },
    colors: ["#4A5CFF", "#0f1ea3", "#FA00FF", "#8b008d"],
    legend: {
      position: "bottom",
      fontSize: "8px",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: "100%", // Adjust height for smaller screens
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
    <Chart
      key={key}
      options={options}
      series={series}
      type="pie"
      height="180px"
    />
  );
};

export default DoctorPieChartPatientGenderStatistics;
