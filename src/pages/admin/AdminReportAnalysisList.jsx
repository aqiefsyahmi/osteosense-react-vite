// import React from "react";
// import Header from "../components/Header";
// import Navigation from "../components/NavigationAdmin";

import { useNavigate } from "react-router-dom";

const AdminReportAnalysisList = () => {
  const navigate = useNavigate();

  const viewmore = () => {
    navigate("/adminreportanalysis");
  };
  return (
    <>
      {/* <Header />
      <Navigation /> */}
      <h1>History Report Analysis</h1>
      <table className="table table-striped table-border table-hover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>More Info</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Dr. Jamaluddin</td>
            <td>
              <button className="btn btn-sm btn-primary" onClick={viewmore}>
                View More
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AdminReportAnalysisList;
