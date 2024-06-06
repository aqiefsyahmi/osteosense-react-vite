import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GenderDropdown from "../../components/GenderDropdown";

const RegisterPatients = () => {
  const navigate = useNavigate();
  const [genderDropdownKey, setGenderDropdownKey] = useState(0);

  const [inputs, setInputs] = useState({
    fullname: "",
    age: "",
    gender: "",
    email: "",
    phoneno: "",
  });

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
    setGenderDropdownKey((prevKey) => prevKey + 1); // Update the key to reset the GenderDropdown component
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.age < 1) {
      alert("Age cannot be 0 or less!");
      return;
    }

    if (inputs.gender !== "male" && inputs.gender !== "female") {
      alert("Please select a valid gender, Male or Female");
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
      <div>
        <div className="font-bold text-3xl">Register Patient</div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 mb-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-bold text-lg">Full Name</div>
                <input
                  type="text"
                  className="form-control mt-2"
                  name="fullname"
                  value={inputs.fullname}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  required
                />
              </div>
              <div>
                <div className="font-bold text-lg">Email</div>
                <input
                  type="email"
                  className="form-control mt-2"
                  name="email"
                  value={inputs.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="font-bold text-lg">Age</div>
                <input
                  type="number"
                  className="form-control mt-2"
                  name="age"
                  value={inputs.age}
                  onChange={handleInputChange}
                  placeholder="Enter Age"
                  required
                  min="1"
                />
              </div>
              <div>
                <div className="font-bold text-lg">Gender</div>
                <GenderDropdown
                  key={genderDropdownKey}
                  value={inputs.gender}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <div className="font-bold text-lg">Phone No</div>
                <input
                  type="text"
                  className="form-control mt-2"
                  name="phoneno"
                  value={inputs.phoneno}
                  onChange={handleInputChange}
                  placeholder="Enter Phone No."
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button type="submit" className="w-40 btn btn-sm btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="w-40 btn btn-sm btn-outline btn-error"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPatients;
