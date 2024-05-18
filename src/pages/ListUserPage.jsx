import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListUserPage() {
  // Initialize state for storing the list of users
  const [users, setUsers] = useState([]);

  // Fetch the list of users from the server when the component mounts
  useEffect(() => {
    getUsers();
  }, []);

  // Function to fetch the list of users from the server
  function getUsers() {
    axios.get("http://127.0.0.1:5000/listusers").then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  }

  // Function to delete a user
  const deleteUser = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/userdelete/${id}`)
      .then(function (response) {
        console.log(response.data);
        // Refresh the list of users after deletion
        getUsers();
      });
    alert("Successfully Deleted");
  };

  // Render the list of users
  return (
    <div>
      <div className="container h-100">
        <div className="col-12">
          {/* Link to the add new user page */}
          <p>
            <Link to="/addnewuser" className="btn btn-success">
              Add New User
            </Link>
          </p>
          <h1>List Users</h1>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, key) => (
                <tr key={key}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.date}</td>
                  <td>
                    {/* Link to edit the user */}
                    <Link
                      to={`/user/${user.id}/edit`}
                      className="btn btn-success"
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </Link>
                    {/* Button to delete the user */}
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
