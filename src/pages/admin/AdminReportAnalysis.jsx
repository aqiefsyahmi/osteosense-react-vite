import { useState, useEffect } from "react";
import axios from "axios";
import PredictDeleteConfirmation from "../../components/PredictDeleteConfirmation";
import ItemsPerPageDropdown from "../../components/ItemsPerPageDropdown";
import AdminModalConfirmDeletedMessage from "../../components/AdminModalConfirmDeletedMessage";

import { useParams, useNavigate } from "react-router-dom";

const AdminReportAnalysis = () => {
  const navigate = useNavigate();
  const { id: doctorId } = useParams();
  const [predictData, setPredictData] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [predictIdToDelete, setPredictIDToDelete] = useState(null);
  const [showDeletedMessageModal, setShowDeletedMessageModal] = useState(false);

  //for show list table
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [activePage, setActivePage] = useState(1);
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageClick = (page) => {
    setActivePage(page);
  };
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setActivePage(1); // Reset to first page when changing items per page
  };

  const handleDeletedMessage = () => {
    setShowDeletedMessageModal(true);
  };

  //handle sort ascending descending
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = [...predictData]
    .filter(
      (item) =>
        item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.resultprediction.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    predictData.filter(
      (item) =>
        item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.resultprediction.toLowerCase().includes(searchQuery.toLowerCase())
    ).length / itemsPerPage
  );
  useEffect(() => {
    setActivePage(1); // Reset to first page when search query changes
  }, [searchQuery]);

  useEffect(() => {
    if (doctorId) {
      getPredictionsForDoctor(doctorId);
      getDoctors(); // Fetch doctor's full name when doctorId changes
    }
  }, [doctorId]);

  const handlePredictionDetailsClick = (id) => {
    navigate(`/adminpredictlistdetails/${id}/edit`);
  };

  const getDoctors = () => {
    axios
      .get("http://127.0.0.1:5000/listdoctors")
      .then(function (response) {
        // Assuming the response contains an array of doctors
        // Find the doctor with the corresponding doctorId
        const doctor = response.data.find((doc) => doc.id === doctorId);
        if (doctor) {
          setDoctorName(doctor.fullname);
        }
      })
      .catch(function (error) {
        console.error("Error fetching doctors:", error);
      });
  };

  const getPredictionsForDoctor = async (doctorId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/listpredict/${doctorId}`
      );
      setPredictData(response.data);
    } catch (error) {
      console.error("There was an error fetching the patient details!", error);
    }
  };

  const handleDeleteClick = (id) => {
    setPredictIDToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://127.0.0.1:5000/predictdelete/${predictIdToDelete}`)
      .then((response) => {
        console.log(response.data);
        getPredictionsForDoctor(doctorId);
      })
      .catch((error) => {
        console.error("There was an error deleting the doctor!", error);
      });
    setShowModal(false);
    handleDeletedMessage();
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between pb-4">
          <div>
            <div className="grid place-content-center justify-start font-bold text-3xl">
              History Report Analysis
            </div>
            <div className="grid place-content-center justify-start font-semibold text-xl">
              By {doctorName}
            </div>
          </div>
          <div className="flex justify-end items-center gap-3">
            <div>
              <label className="font-semibold mr-2">Show List Doctor:</label>
              <ItemsPerPageDropdown
                value={itemsPerPage}
                options={["6", "15", "20", "25", predictData.length]}
                onChange={handleItemsPerPageChange}
              />
            </div>
          </div>
        </div>
        <div className="bg-[#FFFFFF] w-full border-2 px-4 py-4 drop-shadow-lg rounded-[1.0rem] ">
          <div className="flex ">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control border-1 w-2/6"
              placeholder="Search Information..."
            />
          </div>
          <table className="table table-striped table-border table-hover">
            <thead>
              <tr>
                <th>No.</th>
                <th onClick={() => handleSort("fullname")}>
                  <div className="flex items-center">
                    Name
                    {sortConfig.key === "fullname" ? (
                      sortConfig.direction === "ascending" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                          fill="#666666"
                        >
                          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                          fill="#666666"
                        >
                          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                      )
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#666666"
                      >
                        <path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z" />
                      </svg>
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort("gender")}>
                  <div className="flex items-center">
                    Gender
                    {sortConfig.key === "gender" ? (
                      sortConfig.direction === "ascending" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                          fill="#666666"
                        >
                          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                          fill="#666666"
                        >
                          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                      )
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#666666"
                      >
                        <path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z" />
                      </svg>
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort("resultprediction")}>
                  <div className="flex items-center">
                    Result
                    {sortConfig.key === "resultprediction" ? (
                      sortConfig.direction === "ascending" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                          fill="#666666"
                        >
                          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                          fill="#666666"
                        >
                          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                      )
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#666666"
                      >
                        <path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z" />
                      </svg>
                    )}
                  </div>
                </th>

                <th>More Info</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center ">
                    No data found
                  </td>
                </tr>
              ) : (
                sortedItems.map((predict, key) => (
                  <tr key={key}>
                    <td>{indexOfFirstItem + key + 1}.</td>
                    <td>{predict.fullname}</td>
                    <td>{predict.gender}</td>
                    <td>
                      <div
                        className={`rounded-full w-4/6 py-1 flex justify-center pointer-events-none border-none ${
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
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handlePredictionDetailsClick(predict.id)}
                      >
                        Prediction Details
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteClick(predict.id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-between radio-buttons gap-2">
            <div className="w-28 flex justify-start">
              {activePage > 1 && (
                <div
                  className="w-28 btn flex items-center justify-center"
                  onClick={() => handlePageClick(activePage - 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="10px"
                    viewBox="0 -960 960 960"
                    width="10px"
                    fill="#666666"
                  >
                    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                  </svg>
                  Previous
                </div>
              )}
            </div>
            <div className="flex gap-2 justify-center">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                if (
                  page === 1 ||
                  page === activePage ||
                  page === activePage - 1 ||
                  page === activePage + 1 ||
                  page === totalPages
                ) {
                  return (
                    <div
                      key={index}
                      className={`btn btn-square ${
                        page === activePage ? "btn-primary" : ""
                      }`}
                      onClick={() => handlePageClick(page)}
                    >
                      {page}
                    </div>
                  );
                } else if (
                  (page === activePage - 2 && activePage > 3) ||
                  (page === activePage + 2 && activePage < totalPages - 2)
                ) {
                  return (
                    <div
                      key={index}
                      className="text-xl btn btn-square pointer-events-none"
                    >
                      ...
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className="w-28 flex justify-end">
              {activePage < totalPages && (
                <div
                  className="w-28 btn flex items-center justify-center"
                  onClick={() => handlePageClick(activePage + 1)}
                >
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="10px"
                    viewBox="0 -960 960 960"
                    width="10px"
                    fill="#666666"
                  >
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="py-4"></div>
      </div>
      <PredictDeleteConfirmation
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
      />
      <AdminModalConfirmDeletedMessage
        show={showDeletedMessageModal}
        handleClose={() => setShowDeletedMessageModal(false)}
      />
    </>
  );
};

export default AdminReportAnalysis;
