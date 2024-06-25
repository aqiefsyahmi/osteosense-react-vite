/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import DoctorPieChartPatientGenderStatistics from "../../components/DoctorPieChartPatientGenderStatistics";
import DoctorPieChartPatientGender from "../../components/DoctorPieChartPatientGender";
import DoctorBarChartStatistics from "../../components/DoctorBarChartStatistics";
import { useSpring, animated } from "@react-spring/web";

export default function Doctors() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [profileData, setProfileData] = useState(null);
  const [analysisData, setAnalysisData] = useState([]);
  const [patientCount, setPatientCount] = useState(0);
  const [predictCount, setPredictCount] = useState(0);
  const [doctorData, setDoctorData] = useState(null);
  const [predictionsData, setPredictionsData] = useState([]);
  const [mypredictionsCount, setMyPredictionsCount] = useState(0);
  const [osteoporosisCount, setOsteoporosisCount] = useState(0);
  const [normalCount, setNormalCount] = useState(0);
  const [normalMaleCount, setNormalMaleCount] = useState(0);
  const [osteoMaleCount, setOsteoMaleCount] = useState(0);
  const [normalFemaleCount, setNormalFemaleCount] = useState(0);
  const [osteoFemaleCount, setOsteoFemaleCount] = useState(0);
  const [femalecount, setFemaleCount] = useState(0);
  const [malecount, setMaleCount] = useState(0);

  useEffect(() => {
    getUsers();
    getPatientCount();
    getPredictCount();
    getPredectionDetails();
  }, []); // This empty array ensures this effect runs only once

  useEffect(() => {
    if (profileData) {
      getAnalysis();
    }
  }, [profileData]); // Fetch analysis data only after profileData is set

  const patientCountProps = useSpring({
    number: patientCount,
    from: { number: 0 },
    config: {
      tension: 50,
      friction: 20,
    },
  });

  const predictCountProps = useSpring({
    number: predictCount,
    from: { number: 0 },
    config: {
      tension: 50,
      friction: 20,
    },
  });

  const mypredictionsCountProps = useSpring({
    number: mypredictionsCount,
    from: { number: 0 },
    config: {
      tension: 50,
      friction: 20,
    },
  });

  // Animation setup for normal count
  const normalCountProps = useSpring({
    number: normalCount,
    from: { number: 0 },
    config: {
      tension: 50,
      friction: 20,
    },
  });

  // Animation setup for osteoporosis count
  const osteoporosisCountProps = useSpring({
    number: osteoporosisCount,
    from: { number: 0 },
    config: {
      tension: 50,
      friction: 20,
    },
  });

  const getPredectionDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/doctor_with_predictions/${id}`
      );
      const data = response.data;

      setDoctorData(data.doctor);
      setPredictionsData(data.predictions);
      setMyPredictionsCount(data.predictions_count);
      setOsteoporosisCount(data.osteoporosis_count);
      setNormalCount(data.normal_count);
      setNormalMaleCount(data.normal_male_count);
      setOsteoMaleCount(data.osteo_male_count);
      setNormalFemaleCount(data.normal_female_count);
      setOsteoFemaleCount(data.osteo_female_count);
      setFemaleCount(data.female_count);
      setMaleCount(data.male_count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPatientCount = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/countpatients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatientCount(response.data.patient_count);
    } catch (error) {
      console.error("There was an error fetching the patient count!", error);
    }
  };

  const getPredictCount = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/countpredics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPredictCount(response.data.predict_count);
    } catch (error) {
      console.error("There was an error fetching the doctor count!", error);
    }
  };

  const getUsers = () => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/profile/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const res = response.data;
        setProfileData({
          profile_id: res.id,
          profile_fullname: res.fullname,
          profile_username: res.username,
          profile_email: res.email,
          profile_phoneno: res.phoneno,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const getAnalysis = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/listpredict", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filteredData = response.data.filter(
        (predict) => predict.doctorid === profileData.profile_id
      );
      setAnalysisData(filteredData);
    } catch (error) {
      console.error("There was an error fetching the analysis data!", error);
    }
  };

  const addPrediction = () => {
    navigate("/imageprediction");
  };

  const doctorsReportAnalysis = () => {
    navigate("/doctorsreportanalysis");
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="font-bold text-3xl">Overview</div>
        <div className="flex flex-col">
          <div className="grid grid-cols-5 gap-4 flex-grow">
            <div className="col-span-3 flex flex-col">
              <div className="grid grid-cols-3 py-4 gap-4 flex-grow">
                <div className="col-span-1 flex flex-col">
                  <div className="bg-[#FFFFFF] w-full border-2 px-3 py-3 drop-shadow-lg rounded-[1.0rem]">
                    <div className="flex justify-between">
                      <div className="font-bold text-gray-500 text-md">
                        Total Patients
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#4A00FF"
                        >
                          <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="font-black text-2xl">
                      {" "}
                      <animated.div>
                        {patientCountProps.number.to((n) => n.toFixed(0))}
                      </animated.div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col">
                  <div className="bg-[#FFFFFF] w-full border-2 px-3 py-3 drop-shadow-lg rounded-[1.0rem]">
                    <div className="flex justify-between">
                      <div className="font-bold text-gray-500 text-md">
                        Total Analysis
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#4A00FF"
                      >
                        <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-560H200v560Zm160 0v-72l-72-84q-11-11-19.5-30t-8.5-44q0-13 2.5-25.5T271-440q-5-11-8-23.5t-3-26.5q0-25 8.5-44t19.5-30l72-84v-72h60v83q0 5-7 19l-80 94q-7 8-10 16.5t-3 17.5q0 20 13 34.5t33 14.5q9 0 17-3t14-10q17-17 38.5-26t44.5-9q23 0 44.5 9t38.5 26q7 7 15 10t16 3q20 0 33-14.5t13-33.5q0-9-3.5-17.5T627-523l-80-95q-4-4-5.5-9t-1.5-10v-83h60v72l73 86q14 16 20.5 34.5T700-489q0 13-3.5 25.5T688-440q6 12 9 24.5t3 25.5q0 25-8.5 44T672-316l-72 84v72h-60v-83q0-6 7-19l80-94q7-8 10-17t3-18q-11 5-22 7.5t-23 2.5q-20 0-40-8t-35-24q-7-8-17.5-12t-22.5-4q-11 0-21.5 4T440-413q-15 16-34.5 24t-39.5 8q-12 0-23.5-2.5T320-391q0 9 3 18t10 17l80 94q3 5 5 9.5t2 9.5v83h-60Zm-160 0v-560 560Z" />
                      </svg>
                    </div>
                    <div className="font-black text-2xl">
                      {" "}
                      <animated.div>
                        {predictCountProps.number.to((n) => n.toFixed(0))}
                      </animated.div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col">
                  <div className="bg-[#FFFFFF] w-full border-2 px-3 py-3 drop-shadow-lg rounded-[1.0rem]">
                    <div className="flex justify-between">
                      <div className="font-bold text-gray-500 text-md">
                        My Analysis
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#4A00FF"
                        >
                          <path d="M411-338Zm495 67-195-64 26-77 195 65-26 76Zm14-169H735v-80h185v80Zm11-175-196 66-24-77 196-65 24 76ZM285-400q-52 0-88.5-36.5T160-525q0-26 10-48.5t27-39.5l83-84v-183h80v200q0 8-3.5 15.5T348-651l-95 95q-6 6-9.5 14t-3.5 17q0 18 13.5 31.5T285-480q12 0 19-4t19-14q22-18 43.5-27t43.5-9q22 0 43.5 9t43.5 27q12 10 19 14t19 4q19 0 32-13.5t13-31.5q0-9-3.5-17.5T567-557l-95-95q-5-6-8.5-13t-3.5-15v-200h80v182l84 84q17 17 26.5 40t9.5 49q0 52-36 88.5T535-400q-33 0-53.5-12.5T447-437q-15-12-23.5-14.5T410-454q-9 0-18.5 6T374-437q-14 12-34.5 24.5T285-400ZM460-80v-190q0-8 3.5-15.5T472-299l95-95q6-6 9.5-14t3.5-17q0-10-3.5-18t-9.5-14l57-57q17 17 26.5 40t9.5 49q0 26-9.5 48T624-338l-84 84v174h-80Zm-180 0v-174l-83-84q-17-17-27-39t-10-48q0-26 10-49t27-40l57 57q-7 6-10.5 14t-3.5 18q0 9 3.5 17t9.5 14l95 95q5 6 8.5 13.5T360-270v190h-80Zm130-572Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-black text-2xl">
                        <animated.div>
                          {mypredictionsCountProps.number.to((n) =>
                            n.toFixed(0)
                          )}
                        </animated.div>
                      </div>
                      <button
                        className="btn btn-xs btn-outline btn-primary flex items-center space-x-1 absolute right-4 bottom-4 group"
                        onClick={addPrediction}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="11px"
                          viewBox="0 -960 960 960"
                          width="11px"
                          className="fill-current text-[#4A00FF] group-hover:text-[#D1DBFF]"
                        >
                          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                        </svg>
                        Add Prediction
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 flex flex-col">
              <div className="grid grid-cols-2 py-4 gap-4 flex-grow">
                <div className="col-span-1 flex flex-col">
                  <div className="bg-[#64C5B9] w-full border-2 px-3 py-3 drop-shadow-lg rounded-[1.0rem]">
                    <div className="flex justify-between">
                      <div className="font-bold text-white text-md">
                        Normal Bone
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#FFFFFF"
                        >
                          <path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400h-66q-22 37-58.5 58.5T480-320q-43 0-79.5-21.5T342-400h-66q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="font-black text-white text-2xl">
                      <animated.div>
                        {normalCountProps.number.to((n) => n.toFixed(0))}
                      </animated.div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col">
                  <div className="bg-[#E01B1B]  w-full border-2 px-3 py-3 drop-shadow-lg rounded-[1.0rem]">
                    <div className="flex justify-between">
                      <div className="font-bold text-white text-md">
                        Osteoporosis
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#FFFFFF"
                        >
                          <path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 100q-68 0-123.5 38.5T276-280h66q22-37 58.5-58.5T480-360q43 0 79.5 21.5T618-280h66q-25-63-80.5-101.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="font-black text-white text-2xl">
                      <animated.div>
                        {osteoporosisCountProps.number.to((n) => n.toFixed(0))}
                      </animated.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-4 flex-grow">
            <div className="row-span-2 flex flex-row">
              <div className="grid grid-cols-5 gap-4 flex-grow">
                <div className="col-span-3 flex flex-col">
                  <div className="bg-[#FFFFFF] w-full border-2 px-4 py-3 drop-shadow-lg rounded-[1.0rem] flex-grow">
                    <div className="font-bold text-gray-500 text-md pb-0.5">
                      History Report Analysis
                    </div>
                    <table className="table table-striped table-border table-hover">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Patient Name</th>
                          <th>Gender</th>
                          <th>Age</th>
                          <th>Prediction</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysisData.slice(0, 6).map((predict, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{predict.fullname}</td>
                            <td>{predict.gender}</td>
                            <td>{predict.age}</td>
                            <td>
                              <div
                                className={`rounded-full w-full py-1 flex justify-center pointer-events-none border-none ${
                                  predict.resultprediction === "Normal"
                                    ? "bg-green-200"
                                    : "bg-red-200"
                                }`}
                              >
                                <span
                                  className={`font-semibold text-${
                                    predict.resultprediction === "Normal"
                                      ? "success"
                                      : "danger"
                                  }`}
                                >
                                  {predict.resultprediction}
                                </span>
                              </div>
                            </td>
                            <td>
                              {moment(predict.datetimeprediction).format(
                                "DD MMM YYYY"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex justify-end">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={doctorsReportAnalysis}
                      >
                        See History Report Analysis
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 flex flex-col h-full">
                  <div className="grid grid-rows-2 gap-4 flex-grow">
                    <div className="row-span-1 flex flex-col h-full">
                      <div className="flex-grow flex flex-row">
                        <div className="bg-[#FFFFFF] w-full border-2 px-4 py-2.5 drop-shadow-lg rounded-[1.0rem] flex flex-col">
                          <div className="font-bold text-gray-500 text-md pb-0.5">
                            Overview Analysis Statistic
                          </div>
                          <div className="grid grid-cols-2 gap-4 flex-grow">
                            <div className="col-span-1 flex flex-col justify-center items-center h-full">
                              <DoctorPieChartPatientGender
                                femalecount={femalecount}
                                malecount={malecount}
                              />
                            </div>

                            <div className="col-span-1 flex flex-col justify-center items-center">
                              <DoctorPieChartPatientGenderStatistics
                                normalMaleCount={normalMaleCount}
                                osteoMaleCount={osteoMaleCount}
                                normalFemaleCount={normalFemaleCount}
                                osteoFemaleCount={osteoFemaleCount}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row-span-1 flex flex-col h-full">
                      <div className="flex-grow flex flex-row">
                        <div className="bg-[#FFFFFF] w-full border-2 px-4 py-2.5 drop-shadow-lg rounded-[1.0rem] flex flex-col">
                          <div className="font-bold text-gray-500 text-md pb-0.5">
                            Overall Analysis Statistic
                          </div>
                          <div className="grid grid-cols-2 gap-4 flex-grow">
                            <div className="col-span-2 flex flex-col justify-center items-center">
                              <DoctorBarChartStatistics
                                predictionsCount={mypredictionsCount}
                                normalCount={normalCount}
                                osteoporosisCount={osteoporosisCount}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
