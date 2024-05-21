import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPatients = () => {
  const navigate = useNavigate();

  // Initialize state for form inputs
  const [inputs, setInputs] = useState({
    fullname: "",
    age: "",
    gender: "",
    email: "",
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
      age: "",
      gender: "",
      email: "",
      phoneno: "",
    });
  };

  // Submit the form data to the server
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.age < 1) {
      alert("Age cannot be 0 or less!");
      return;
    }

    axios
      .post("http://127.0.0.1:5000/signuppatient", inputs)
      .then(function (response) {
        console.log(response.data);
        alert("Patient Successfully Registered");
        navigate("/doctors");
      })
      .catch(function (error) {
        console.error("There was an error creating the patient!", error);
      });
  };

  return (
    <>
      {/* <Header />
      <Navigation /> */}
      <h1>Register Patient</h1>
      <form onSubmit={handleSubmit}>
        <div>Patient Full Name</div>
        <input
          type="text"
          className="form-control"
          name="fullname"
          value={inputs.fullname}
          onChange={handleInputChange}
          required
        />
        <div>Age</div>
        <input
          type="number"
          className="form-control"
          name="age"
          value={inputs.age}
          onChange={handleInputChange}
          required
          min="1"
        />
        <div>Gender</div>
        <select
          className="form-control"
          name="gender"
          value={inputs.gender}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <div>Email</div>
        <input
          type="email"
          className="form-control"
          name="email"
          value={inputs.email}
          onChange={handleInputChange}
          required
        />
        <div>Phone No</div>
        <input
          type="text"
          className="form-control"
          name="phoneno"
          value={inputs.phoneno}
          onChange={handleInputChange}
          required
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Submit and Save
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

export default RegisterPatients;
