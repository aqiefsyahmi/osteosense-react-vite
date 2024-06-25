import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const PieChartPatientGenderStatistics = () => {
  const [series, setSeries] = useState([0, 0, 0, 0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchPatientCounts = async () => {
      try {
        const maleNormalResponse = await axios.get(
          "http://127.0.0.1:5000/countpredics/male/normal"
        );
        const maleOsteoporosisResponse = await axios.get(
          "http://127.0.0.1:5000/countpredics/male/osteoporosis"
        );
        const femaleNormalResponse = await axios.get(
          "http://127.0.0.1:5000/countpredics/female/normal"
        );
        const femaleOsteoporosisResponse = await axios.get(
          "http://127.0.0.1:5000/countpredics/female/osteoporosis"
        );

        const maleNormalCount = maleNormalResponse.data.count;
        const maleOsteoporosisCount = maleOsteoporosisResponse.data.count;
        const femaleNormalCount = femaleNormalResponse.data.count;
        const femaleOsteoporosisCount = femaleOsteoporosisResponse.data.count;

        setSeries([
          maleNormalCount,
          maleOsteoporosisCount,
          femaleNormalCount,
          femaleOsteoporosisCount,
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
  }, []);

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

export default PieChartPatientGenderStatistics;
