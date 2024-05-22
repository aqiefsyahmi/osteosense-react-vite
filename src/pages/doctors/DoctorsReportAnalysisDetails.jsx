import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DoctorsReportAnalysisDetails = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    getPredict();
  }, []);

  const getPredict = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/listpredictdetails/${id}`
      );
      setPatientData(response.data);
    } catch (error) {
      console.error("There was an error fetching the patient details!", error);
    }
  };

  return (
    <>
      <div className="font-bold">Detail History Analysis</div>
      <div className="font-semibold">Patient Name</div>
      <div>{patientData?.fullname}</div>
      <div className="font-semibold">Age</div>
      <div>{patientData?.age}</div>
      <div className="font-semibold">Gender</div>
      <div>{patientData?.gender}</div>
      <div className="font-semibold">Date/Time Test</div>
      <div>{patientData?.datetimeprediction}</div>
      <div className="font-semibold">Result Analysis:</div>
      <div>{patientData?.resultprediction}</div>
      <div className="font-semibold">Email:</div>
      <div>{patientData?.email}</div>
      <div className="font-semibold">Phone No.:</div>
      <div>{patientData?.phoneno}</div>
    </>
  );
};

export default DoctorsReportAnalysisDetails;
