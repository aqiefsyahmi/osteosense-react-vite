import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminReportAnalysisDetails = () => {
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

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const formattedDate = date.toLocaleDateString("en-GB"); // dd/mm/yyyy
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }); // hh:mm am/pm
    return { date: formattedDate, time: formattedTime };
  };

  const formattedDateTime = patientData
    ? formatDateTime(patientData.datetimeprediction)
    : null;

  return (
    <>
      <div>
        <div className="flex pb-4">
          <div className="grid place-content-center justify-start font-bold text-3xl">
            Detail History Analysis
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <div className="bg-[#FFFFFF] w-full border-2 px-4 py-4 drop-shadow-lg rounded-[1.0rem]">
            <div className="font-bold text-gray-500 text-xl pb-4">
              Patient Information
            </div>
            <div className="bg-[#FFFFFF] border-2 px-2 py-2 rounded-[1.0rem] ">
              <div className="font-semibold text-gray-500 text-lg">
                Full Name
              </div>
              <div className="font-bold text-lg">{patientData?.fullname}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="bg-[#FFFFFF] border-2 px-2 py-2 rounded-[1.0rem] ">
                <div className="font-semibold text-gray-500 text-lg">Age</div>
                <div className="font-bold text-lg">{patientData?.age}</div>
              </div>
              <div className="bg-[#FFFFFF] border-2 px-2 py-2 rounded-[1.0rem] ">
                <div className="font-semibold text-gray-500 text-lg">
                  Gender
                </div>
                <div className="font-bold text-lg">{patientData?.gender}</div>
              </div>
            </div>
            <div className="bg-[#FFFFFF] border-2 px-2 py-2 rounded-[1.0rem] ">
              <div className="font-semibold text-gray-500 text-lg">Email</div>
              <div className="font-bold text-lg">{patientData?.email}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="bg-[#FFFFFF] border-2 px-2 py-2 rounded-[1.0rem] ">
                <div className="font-semibold text-gray-500 text-lg">
                  Phone No.
                </div>
                <div className="font-bold text-lg">{patientData?.phoneno}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] w-full border-2 px-4 py-4 drop-shadow-lg rounded-[1.0rem] ">
            <div className="font-bold text-gray-500 text-xl pb-4">
              Prediction Details
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#FFFFFF] border-2 rounded-[1.0rem] ">
                <div className="font-semibold text-gray-500 text-lg px-2 py-2">
                  Image Prediction
                </div>
                <div>
                  {patientData?.imageprediction && (
                    <img
                      src={`http://127.0.0.1:5000/static/uploads/${patientData.imageprediction}`}
                      alt="Prediction"
                      className="img-fluid max-w-full mx-auto pb-4 px-4"
                      width="220px"
                    />
                  )}
                </div>
              </div>
              <div>
                <div className="pb-4">
                  <div className="bg-[#FFFFFF] border-2 rounded-[1.0rem] px-2 py-2">
                    <div className="font-semibold text-gray-500 text-lg">
                      Date Prediction
                    </div>
                    <div className="font-bold text-lg">
                      {formattedDateTime?.date}
                    </div>
                  </div>
                </div>
                <div className="pb-4">
                  <div className="bg-[#FFFFFF] border-2 rounded-[1.0rem] px-2 py-2">
                    <div className="font-semibold text-gray-500 text-lg">
                      Time Prediction
                    </div>
                    <div className="font-bold text-lg">
                      {formattedDateTime?.time}
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFFFFF] border-2 rounded-[1.0rem] px-2 py-2">
                  <div className="font-bold text-black text-lg text-center">
                    Result Analysis:
                  </div>
                  <div className="flex justify-center">
                    <div
                      className={`rounded-full w-3/6 py-2 flex justify-center pointer-events-none border-none ${
                        patientData?.resultprediction === "Normal"
                          ? "bg-green-200"
                          : "bg-red-200"
                      }`}
                    >
                      <span
                        className={`font-semibold text-${
                          patientData?.resultprediction === "Normal"
                            ? "success"
                            : "danger"
                        }`}
                      >
                        {patientData?.resultprediction}
                      </span>
                    </div>
                  </div>
                </div>
                {/* PS: If the prediction result is "Normal", the background color of the div will be green and the text color will be success. */}
                {/* PS: If the prediction result is "Osteoporosis", the background color of the div will be red and the text color will be danger. */}
                {patientData?.resultprediction === "Normal" ? (
                  <div className="text-center text-green-500 font-semibold mt-2">
                    Notes: This patient is in good bone health.
                  </div>
                ) : (
                  <div className="text-center text-red-500 font-semibold mt-2">
                    Notes: This patient has osteoporosis and needs further
                    evaluation.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReportAnalysisDetails;
