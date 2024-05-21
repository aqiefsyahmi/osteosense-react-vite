// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ImagePrediction() {
//   const [profileData, setProfileData] = useState(null);
//   const navigate = useNavigate();
//   // Initialize state for form inputs
//   const [inputs, setInputs] = useState({
//     fullname: "",
//     age: "",
//     gender: "",
//     email: "",
//     phoneno: "",
//     doctorid: "",
//   });

//   useEffect(() => {
//     getDoctors();
//   }, []); // this Empty array ensures this get effect runs only once

//   const email = localStorage.getItem("email");
//   const token = localStorage.getItem("token");

//   // Submit the form data to the server
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     axios
//       .post("http://127.0.0.1:5000/addprediction", inputs)
//       .then(function (response) {
//         console.log(response.data);
//         alert("Prediction Successfully Submitted");
//         navigate("/doctors");
//       })
//       .catch(function (error) {
//         console.error("There was an error creating the patient!", error);
//       });
//   };

//   const getDoctors = () => {
//     axios({
//       method: "GET",
//       url: `http://127.0.0.1:5000/profile/${email}`,
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     })
//       .then((response) => {
//         console.log(response);
//         const res = response.data;
//         res.access_token && token.setToken(res.access_token);
//         setProfileData({
//           profile_id: res.id,
//           profile_fullname: res.fullname,
//           profile_username: res.username,
//           profile_email: res.email,
//           profile_phoneno: res.phoneno,
//         });
//       })
//       .catch((error) => {
//         if (error.response) {
//           console.log(error.response);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         }
//       });
//   };
//   return (
//     <>
//       <h1>Image Prediction</h1>
//       <div>Upload Photos</div>
//       <input id="file-upload" type="file" className="form-control" />
//       <div>Search Patient</div>
//       <div className="pt-1 pb-2">
//         <label className="input input-bordered flex items-center gap-2">
//           <input type="text" className="grow" placeholder="Search" />
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16"
//             fill="currentColor"
//             className="w-4 h-4 opacity-70"
//           >
//             <path
//               fillRule="evenodd"
//               d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </label>
//       </div>

//       <button className="btn btn-sm btn-primary">Submit and Save</button>
//       <button className="btn btn-sm btn-danger">Reset</button>
//     </>
//   );
// }
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ImagePrediction() {
  const [patients, setPatients] = useState([]);
  const [inputs, setInputs] = useState({
    fullname: "",
    age: "",
    gender: "",
    email: "",
    phoneno: "",
    doctorid: "",
    datetimeprediction: new Date().toISOString(),
    resultprediction: "",
  });
  const [predictionResult, setPredictionResult] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getDoctors();
    getPatients();
  }, []); // Empty array ensures this effect runs only once

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
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

    axios
      .post("http://127.0.0.1:5000/addprediction", {
        ...inputs,
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
          datetimeprediction: new Date().toISOString(),
          resultprediction: predictionResult.class,
        });
        navigate("/doctors");
      })
      .catch((error) => {
        console.error("There was an error creating the prediction!", error);
      });
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
          <select onChange={handlePatientChange}>
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
      <button className="btn btn-sm btn-danger">Reset</button>
    </>
  );
}
