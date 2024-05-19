import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterDoctorProfile = () => {
  const navigate = useNavigate();

  // Initialize state for form inputs
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    phoneno: "",
  });

  // Update the inputs state when form fields change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleReset = () => {
    setInputs({
      fullname: "",
      username: "",
      email: "",
      password: "",
      phoneno: "",
    });
  };

  // Submit the form data to the server
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:5000/signupdoctor", inputs)
      .then(function (response) {
        console.log(response.data);
        // Navigate to the "/admin" route after successful user creation
        navigate("/admin");
      })
      .catch(function (error) {
        console.error("There was an error creating the user!", error);
      });
  };

  return (
    <>
      <h1>Register Doctor Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>Full Name</div>
        <input
          type="text"
          className="form-control"
          name="fullname"
          value={inputs.fullname}
          onChange={handleInputChange}
        />
        <div>Username</div>
        <input
          type="text"
          className="form-control"
          name="username"
          value={inputs.username}
          onChange={handleInputChange}
        />
        <div>Email</div>
        <input
          type="text"
          className="form-control"
          name="email"
          value={inputs.email}
          onChange={handleInputChange}
        />
        <div>Password</div>
        <input
          type="password"
          className="form-control"
          name="password"
          value={inputs.password}
          onChange={handleInputChange}
        />
        <div>Phone No.</div>
        <input
          type="text"
          className="form-control"
          name="phoneno"
          value={inputs.phoneno}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-sm btn-primary">
          Register
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </>
  );
};

export default RegisterDoctorProfile;
