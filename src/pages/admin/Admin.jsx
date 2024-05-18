import { useNavigate, Link } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const editprofile = () => {
    navigate("/manageprofileadmin");
  };

  const historyanalysis = () => {
    navigate("/adminreportanalysislist");
  };
  return (
    <>
      {/* <Header /> */}
      {/* <Navigation /> */}
      <h4>Doctors</h4>
      <h5>100</h5>
      <h4>Prediction Tested</h4>
      <h5>2150</h5>
      <h4>Welcome Back, admin01</h4>
      <button className="btn btn-sm btn-primary" onClick={editprofile}>
        Edit Profile
      </button>
      <table className="table table-striped table-border table-hover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Dr. Jamaluddin</td>
            <td>10/01/2023</td>
            <td>2.30 pm</td>
          </tr>
        </tbody>
        <button className="btn btn-sm btn-primary" onClick={historyanalysis}>
          See History Report Analysis
        </button>

        <Link to="/test" className="btn btn-success">
          Test Page
        </Link>
      </table>
    </>
  );
}
