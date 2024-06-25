import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PredictDeleteConfirmation from "../../components/PredictDeleteConfirmation";
import moment from "moment-timezone";
import ItemsPerPageDropdown from "../../components/ItemsPerPageDropdown";

const AllAnalysisLists = () => {
  const navigate = useNavigate();
  const [allanalysislists, setAllAnalysisLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [predictToDelete, setPredictToDelete] = useState(null);
  const idtoken = localStorage.getItem("id");

  // Pagination and sorting states
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [activePage, setActivePage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllAnalysisLists();
  }, []);

  useEffect(() => {
    setActivePage(1); // Reset to first page when search query changes
  }, [searchQuery]);

  function getAllAnalysisLists() {
    axios.get("http://127.0.0.1:5000/listpredict").then(function (response) {
      console.log(response.data);
      setAllAnalysisLists(response.data);
    });
  }

  const handlePredictionDetailsClick = (id) => {
    navigate(`/predictlistdetails/${id}/view`);
  };

  const handleDeleteClick = (id) => {
    setPredictToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:5000/predictdelete/${predictToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${idtoken}`,
          },
        }
      );
      getAllAnalysisLists();
      alert("Successfully Deleted");
    } catch (error) {
      console.error("There was an error deleting the prediction!", error);
    }
    setShowModal(false);
  };

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setActivePage(1); // Reset to first page when changing items per page
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Assuming allanalysislists is your full array of items
  const sortedItems = [...allanalysislists]
    .filter(
      (item) =>
        item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.age.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.resultprediction
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        moment(item.datetimeprediction)
          .format("DD MMM YYYY")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
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
    allanalysislists.filter(
      (item) =>
        item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.age.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.resultprediction
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        moment(item.datetimeprediction)
          .format("DD MMM YYYY")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    ).length / itemsPerPage
  );

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between pb-4">
          <div className="grid place-content-center justify-start font-bold text-3xl">
            All History Analysis Lists
          </div>
          <div className="flex justify-end items-center gap-3">
            <div className="flex justify-center items-center">
              <label className="font-semibold mr-2">Show List Analysis:</label>
              <ItemsPerPageDropdown
                value={itemsPerPage}
                options={["6", "15", "20", "25", allanalysislists.length]}
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
                    Patient Name
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
                <th onClick={() => handleSort("age")}>
                  <div className="flex items-center">
                    Age
                    {sortConfig.key === "age" ? (
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
                    Prediction
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
                <th onClick={() => handleSort("datetimeprediction")}>
                  <div className="flex items-center">
                    Date Prediction
                    {sortConfig.key === "datetimeprediction" ? (
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
                <th>Information</th>
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
                sortedItems.map((predict, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstItem + index + 1}.</td>
                    <td>{predict.fullname}</td>
                    <td>{predict.gender}</td>
                    <td>{predict.age}</td>
                    <td>
                      <div
                        className={`rounded-full w-5/6 py-1 flex justify-center pointer-events-none border-none ${
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
                      {moment(predict.datetimeprediction).format("DD MMM YYYY")}
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
                        className="btn btn-sm btn-error text-white ms-2"
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
        <PredictDeleteConfirmation
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleConfirm={handleConfirmDelete}
        />
      </div>
    </>
  );
};

export default AllAnalysisLists;
