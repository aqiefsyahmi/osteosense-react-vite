import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminReportAnalysisList = () => {
  // const navigate = useNavigate();

  const [doctorsWithPredictions, setDoctorsWithPredictions] = useState([]);

  useEffect(() => {
    getPredictions();
  }, []);

  const getPredictions = () => {
    axios.get("http://127.0.0.1:5000/listpredict").then(function (response) {
      console.log(response.data);
      const doctorIdsWithPredictions = response.data.map(
        (predict) => predict.doctorid
      );
      getDoctors(doctorIdsWithPredictions);
    });
  };

  const getDoctors = (doctorIdsWithPredictions) => {
    axios.get("http://127.0.0.1:5000/listdoctors").then(function (response) {
      console.log(response.data);
      const doctorsWithPredictions = response.data.filter((doctor) =>
        doctorIdsWithPredictions.includes(doctor.id)
      );
      setDoctorsWithPredictions(doctorsWithPredictions);
    });
  };

  return (
    <>
      <h1>Doctor Details</h1>
      <table className="table table-striped table-border table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Information Details</th>
          </tr>
        </thead>
        <tbody>
          {doctorsWithPredictions.map((doctor, key) => (
            <tr key={key}>
              <td>{doctor.fullname}</td>
              <td>
                <Link
                  className="btn btn-sm btn-primary"
                  to={`/adminreportanalysislist/${doctor.id}/doctorlist`}
                >
                  View More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminReportAnalysisList;
