import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

export default function ImagePrediction() {
  const [patients, setPatients] = useState([]);
  const [inputs, setInputs] = useState({
    fullname: "",
    age: "",
    gender: "",
    email: "",
    phoneno: "",
    doctorid: "",
    datetimeprediction: "",
    resultprediction: "",
  });
  const [selectedPatient, setSelectedPatient] = useState("");
  const [predictionResult, setPredictionResult] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getDoctors();
    getPatients();
    setInputs((prevInputs) => ({
      ...prevInputs,
      datetimeprediction: getMalaysiaTime(), // Initial datetime in Malaysia time
    }));
  }, []); // Empty array ensures this effect runs only once

  const getMalaysiaTime = () => {
    return moment().tz("Asia/Kuala_Lumpur").format("YYYY-MM-DDTHH:mm:ssZ");
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", file);

    await axios
      .post("http://127.0.0.1:5000/predict", formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const result = response.data;
        setPredictionResult(result); // Update the predictionResult state with the result object
        setInputs((prevInputs) => ({
          ...prevInputs,
          resultprediction: result.class, // Update the resultprediction field with the class from the result object
        }));
      })
      .catch((error) => {
        alert("Prediction Failed!");
        console.error("There was an error uploading the file!", error);
      });
  };

  const getDoctors = () => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/profile/${email}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        const res = response.data;
        setInputs((prevInputs) => ({
          ...prevInputs,
          doctorid: res.id,
        }));
      })
      .catch((error) => {
        console.error("Error fetching doctor profile", error);
      });
  };

  const getPatients = () => {
    axios
      .get("http://127.0.0.1:5000/listpatients")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patients list", error);
      });
  };

  const handlePatientChange = (event) => {
    const patientId = event.target.value;
    setSelectedPatient(patientId);
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        fullname: patient.fullname,
        age: patient.age,
        gender: patient.gender,
        email: patient.email,
        phoneno: patient.phoneno,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please upload a file!");
      return;
    }

    if (!inputs.fullname) {
      alert("Please select a patient!");
      return;
    }

    axios
      .post("http://127.0.0.1:5000/addprediction", {
        ...inputs,
        datetimeprediction: getMalaysiaTime(), // Ensure datetimeprediction is in Malaysia time
        resultprediction: predictionResult.class, // Include the result prediction
      })
      .then((response) => {
        console.log(response.data);
        alert("Prediction Successfully Submitted");
        // Reset form fields after successful submission
        setInputs({
          fullname: "",
          age: "",
          gender: "",
          email: "",
          phoneno: "",
          doctorid: inputs.doctorid, // Retain doctorid for potential further submissions
          datetimeprediction: getMalaysiaTime(), // Reset datetimeprediction to current Malaysia time
          resultprediction: "",
        });
        setSelectedFile(null); // Reset file input
        setSelectedPatient(""); // Reset selected patient
        document.getElementById("file-upload").value = null; // Clear file input field
        navigate("/doctors");
      })
      .catch((error) => {
        console.error("There was an error creating the prediction!", error);
      });
  };

  const handleReset = () => {
    setInputs({
      fullname: "",
      age: "",
      gender: "",
      email: "",
      phoneno: "",
      doctorid: "",
      datetimeprediction: getMalaysiaTime(), // Reset datetimeprediction to current Malaysia time
      resultprediction: "",
    });
    setSelectedFile(null);
    setSelectedPatient("");
    setPredictionResult("");
    document.getElementById("file-upload").value = null; // Clear file input field
  };

  return (
    <>
      <h1>Image Prediction</h1>
      <div>Upload Photos</div>
      <input
        id="file-upload"
        type="file"
        className="form-control"
        onChange={handleFileUpload}
      />
      <div>Search and Select Patient</div>
      <div className="pt-1 pb-2">
        <label className="input input-bordered flex items-center gap-2">
          <select value={selectedPatient} onChange={handlePatientChange}>
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.fullname}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
        Submit and Save
      </button>
      <button className="btn btn-sm btn-danger" onClick={handleReset}>
        Reset
      </button>
    </>
  );
}
