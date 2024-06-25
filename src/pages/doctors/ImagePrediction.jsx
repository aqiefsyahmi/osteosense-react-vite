/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import Select from "react-select";

export default function ImagePrediction() {
  const [patients, setPatients] = useState([]);
  const [inputs, setInputs] = useState({
    fullname: "",
    age: "",
    gender: "",
    id: "",
    email: "",
    phoneno: "",
    doctorid: "",
    datetimeprediction: "",
    resultprediction: "",
    imageprediction: "",
  });
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getDoctors();
    getPatients();
  }, []); // Empty array ensures this effect runs only once

  // const showSavedTime = () => {
  //   const getMalaysiaTimes = getMalaysiaTime();

  //   // Format the date in dd/mm/yyyy style
  //   const formattedDate = getMalaysiaTimes.format("DD/MM/YYYY");

  //   // Format the time in hh:mm am/pm style
  //   const formattedTime = getMalaysiaTimes.format("hh:mm A");

  //   // Combine date and time
  //   return `${formattedDate} (${formattedTime})`;
  // };

  const getMalaysiaTime = () => {
    return moment().tz("Asia/Kuala_Lumpur").format("YYYY-MM-DDTHH:mm:ssZ");
  };

  const handleFileUpload = async (event) => {
    if (!selectedPatient) {
      alert("Please select a patient first!");
      return;
    }

    const file = event.target.files[0];

    const validFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validFileTypes.includes(file.type)) {
      alert("Only PNG, JPEG, and JPG files are accepted!");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    const currentMalaysiaTime = getMalaysiaTime();
    setInputs((prevInputs) => ({
      ...prevInputs,
      datetimeprediction: currentMalaysiaTime,
    }));

    await axios
      .post("http://127.0.0.1:5000/predict", formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const result = response.data;
        setInputs((prevInputs) => ({
          ...prevInputs,
          resultprediction: result.class,
          imageprediction: result.imageprediction,
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
      url: `http://127.0.0.1:5000/profile/${id}`,
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
    if (!event) {
      setSelectedPatient("");
      setInputs((prevInputs) => ({
        ...prevInputs,
        fullname: "",
        age: "",
        gender: "",
        email: "",
        phoneno: "",
      }));
      return;
    }

    const patientId = event.value;
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

    if (!inputs.fullname) {
      alert("Please select a patient!");
      return;
    }

    if (!selectedFile) {
      alert("Please upload an image!");
      return;
    }

    axios
      .post("http://127.0.0.1:5000/addprediction", {
        ...inputs,
        datetimeprediction: getMalaysiaTime(), // Ensure datetimeprediction is in Malaysia time
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
          imageprediction: "",
        });
        setSelectedFile(null); // Reset file input
        setSelectedPatient(""); // Reset selected patient
        setImagePreviewUrl(""); // Clear image preview
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
      doctorid: inputs.doctorid,
      datetimeprediction: "", // Reset datetimeprediction to current Malaysia time
      resultprediction: "",
      imageprediction: "",
    });
    setSelectedFile(null);
    setSelectedPatient("");
    setImagePreviewUrl(""); // Clear image preview
    document.getElementById("file-upload").value = null; // Clear file input field
  };

  //for custondropdown andimation
  const customDropdownIndicator = ({ isDropdownOpen }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#666666"
      className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
    >
      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
    </svg>
  );
  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="font-bold text-3xl">Image Prediction</div>
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
          <div className="grid grid-cols-4 py-4 gap-4 flex-grow">
            <div className="col-span-1 flex flex-col">
              <div className="font-bold text-lg">Search and Select Patient</div>
              <div className="py-3">
                <Select
                  value={selectedPatient}
                  onChange={handlePatientChange}
                  options={patients.map((patient) => ({
                    value: patient.id,
                    label: patient.fullname,
                  }))}
                  placeholder="Select or search patient name"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "#ececec",
                      border: "0px solid #ced4da",
                      borderRadius: "9px",
                      padding: "4px",
                      paddingRight: "7px",
                      fontSize: "1rem",
                      color: "#333",
                      width: "100%",
                      transition:
                        "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                      borderColor: state.isFocused ? "#c2dbfe" : "#ced4da",
                      outline: state.isFocused ? "none" : "inherit",
                      boxShadow: state.isFocused
                        ? "0 0 0 0.25rem rgba(194, 219, 254)"
                        : "none",
                    }),
                  }}
                  components={{
                    DropdownIndicator: (props) =>
                      customDropdownIndicator({
                        isDropdownOpen: props.selectProps.menuIsOpen,
                      }),
                  }}
                />
              </div>
              <div className="font-bold text-lg">Upload Image</div>
              <div className="file-upload mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="80px"
                  viewBox="0 -960 960 960"
                  width="80px"
                  fill="#4A00FF"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm480-480v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM240-280h480L570-480 450-320l-90-120-120 160Zm-40-480v560-560Z" />
                </svg>
                <div className="font-bold text-md">
                  <span className="text-[#727272]">
                    {" "}
                    Drop your image here, or{" "}
                  </span>
                  <span className="text-[#4A00FF]">browse</span>
                </div>
                <div className="font-bold text-xs text-[#B5B5B5]">
                  Support JPG, JPEG and PNG only
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="form-control"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
            <div className="col-span-3 flex">
              <div className="bg-[#FFFFFF] w-full border-2 px-4 py-4 drop-shadow-lg rounded-[1.0rem]">
                <div className="font-bold text-gray-500 text-xl">
                  View Updated Information
                </div>
                {selectedPatient ? (
                  <div className="grid grid-cols-3 py-4 gap-4 mb-4 h-full">
                    <div className="col-span-1 flex flex-col h-full">
                      {/* Image preview placeholder */}
                      <div className="font-bold text-lg">Uploaded Image:</div>
                      <div className="bg-gray-200 w-full h-full flex items-center rounded-xl justify-center mt-2">
                        {imagePreviewUrl ? (
                          <img
                            src={imagePreviewUrl}
                            alt="Uploaded"
                            className="max-w-full h-5/6"
                          />
                        ) : (
                          <div>No uploaded image</div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-lg">
                              Fullname:
                            </label>
                            <input
                              type="text"
                              className="form-control mt-2"
                              name="fullname"
                              value={inputs.fullname}
                              onChange={(e) =>
                                setInputs({
                                  ...inputs,
                                  fullname: e.target.value,
                                })
                              }
                              disabled
                            />
                          </div>
                          <div>
                            <label className="font-bold text-lg">Email:</label>
                            <input
                              type="email"
                              className="form-control mt-2"
                              name="email"
                              value={inputs.email}
                              onChange={(e) =>
                                setInputs({ ...inputs, email: e.target.value })
                              }
                              disabled
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="font-bold text-lg">
                              Phone No:
                            </label>
                            <input
                              type="text"
                              className="form-control mt-2"
                              name="phoneno"
                              value={inputs.phoneno}
                              onChange={(e) =>
                                setInputs({
                                  ...inputs,
                                  phoneno: e.target.value,
                                })
                              }
                              disabled
                            />
                          </div>
                          <div>
                            <label className="font-bold text-lg">Gender:</label>
                            <input
                              type="text"
                              className="form-control mt-2"
                              name="gender"
                              value={inputs.gender}
                              onChange={(e) =>
                                setInputs({ ...inputs, gender: e.target.value })
                              }
                              disabled
                            />
                          </div>
                          <div>
                            <label className="font-bold text-lg">Age:</label>
                            <input
                              type="number"
                              className="form-control mt-2"
                              name="age"
                              value={inputs.age}
                              onChange={(e) =>
                                setInputs({ ...inputs, age: e.target.value })
                              }
                              disabled
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-lg">
                              Datetime Prediction:
                            </label>
                            <input
                              type="text"
                              className="form-control mt-2"
                              name="datetimeprediction"
                              value={inputs.datetimeprediction}
                              placeholder="-"
                              disabled
                            ></input>
                          </div>
                          <div>
                            <label className="font-bold text-lg">
                              Result Prediction:
                            </label>
                            <input
                              type="text"
                              className="form-control mt-2"
                              name="resultprediction"
                              value={inputs.resultprediction}
                              placeholder="-"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="font-bold text-lg text-gray-400 flex items-center justify-center h-full">
                    No patient selected. Please select a patient to view their
                    information.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-center gap-4 mt-4">
              <button type="submit" className="w-40 btn btn-sm btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="w-40 btn btn-sm btn-outline btn-error btn-hover-white"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
