// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const ManageProfilePatients = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [inputs, setInputs] = useState({
//     fullname: "",
//     age: "",
//     gender: "",
//     email: "",
//     phoneno: "",
//   });

//   const [initialInputs, setInitialInputs] = useState({
//     fullname: "",
//     age: "",
//     gender: "",
//     email: "",
//     phoneno: "",
//   });

//   useEffect(() => {
//     getPatient();
//   }, []);

//   const getPatient = async () => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:5000/patientdetails/${id}`
//       );
//       const initialData = response.data;
//       setInputs(initialData);
//       setInitialInputs(initialData);
//     } catch (error) {
//       console.error("There was an error fetching the patient details!", error);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (inputs.age < 1) {
//       alert("Age cannot be 0 or less!");
//       return;
//     }
//     try {
//       await axios.put(`http://127.0.0.1:5000/patientupdate/${id}`, inputs);
//       alert("Patient Profile Successfully Updated!");
//       navigate("/doctors");
//     } catch (error) {
//       console.error("There was an error updating the patient details!", error);
//     }
//   };

//   const handleReset = () => {
//     setInputs(initialInputs);
//   };

//   return (
//     <>
//       {/* <Header />
//       <Navigation /> */}
//       <h1>Detail Patient Profile</h1>
//       <form onSubmit={handleSubmit}>
//         <div>Patient Full Name</div>
//         <input
//           type="text"
//           value={inputs.fullname}
//           className="form-control"
//           name="fullname"
//           onChange={handleChange}
//           required
//         />
//         <div>Age</div>
//         <input
//           type="number"
//           className="form-control"
//           name="age"
//           value={inputs.age}
//           onChange={handleChange}
//           required
//           min="0"
//         />
//         <div>Gender</div>
//         <select
//           className="form-control"
//           name="gender"
//           value={inputs.gender}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>
//         <div>Email</div>
//         <input
//           type="text"
//           value={inputs.email}
//           className="form-control"
//           name="email"
//           onChange={handleChange}
//           required
//         />
//         <div>Phone No</div>
//         <input
//           type="text"
//           value={inputs.phoneno}
//           className="form-control"
//           name="phoneno"
//           onChange={handleChange}
//           required
//         />
//         <button type="submit" className="btn btn-sm btn-primary">
//           Update
//         </button>
//         <button
//           type="button"
//           className="btn btn-sm btn-danger"
//           onClick={handleReset}
//         >
//           Reset
//         </button>
//       </form>
//     </>
//   );
// };

// export default ManageProfilePatients;
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import GenderDropdown from "../../components/GenderDropdown";

const ManageProfilePatients = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [genderDropdownKey, setGenderDropdownKey] = useState(0);

  const [inputs, setInputs] = useState({
    fullname: "",
    age: "",
    gender: "",
    email: "",
    phoneno: "",
  });

  const [initialInputs, setInitialInputs] = useState({
    fullname: "",
    age: "",
    gender: "",
    email: "",
    phoneno: "",
  });

  useEffect(() => {
    getPatient();
  }, []);

  const getPatient = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/patientdetails/${id}`
      );
      const initialData = response.data;
      // Set default value to "male" if gender is not provided in the response
      const gender = initialData.gender || "male";
      setInputs({ ...initialData, gender });
      setInitialInputs({ ...initialData, gender });
      setGenderDropdownKey((prevKey) => prevKey + 1); // Force re-render of GenderDropdown
    } catch (error) {
      console.error("There was an error fetching the patient details!", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.age < 1) {
      alert("Age cannot be 0 or less!");
      return;
    }
    try {
      await axios.put(`http://127.0.0.1:5000/patientupdate/${id}`, inputs);
      alert("Patient Profile Successfully Updated!");
      navigate("/doctors");
    } catch (error) {
      console.error("There was an error updating the patient details!", error);
    }
  };

  const handleReset = () => {
    setInputs(initialInputs);
    setGenderDropdownKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <div>
        <h1 className="font-bold text-3xl">Detail Patient Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 mb-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-bold text-xl">Patient Full Name</div>
                <input
                  type="text"
                  value={inputs.fullname}
                  className="form-control mt-3"
                  name="fullname"
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  required
                />
              </div>
              <div>
                <div className="font-bold text-xl">Email</div>
                <input
                  type="email"
                  value={inputs.email}
                  className="form-control mt-3"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="font-bold text-xl">Age</div>
                <input
                  type="number"
                  className="form-control mt-3"
                  name="age"
                  value={inputs.age}
                  onChange={handleChange}
                  placeholder="Enter Age"
                  required
                  min="0"
                />
              </div>
              <div>
                <div className="font-bold text-xl">Gender</div>
                <GenderDropdown
                  key={genderDropdownKey}
                  value={inputs.gender}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="font-bold text-xl">Phone No</div>
                <input
                  type="text"
                  value={inputs.phoneno}
                  className="form-control mt-3"
                  name="phoneno"
                  onChange={handleChange}
                  placeholder="Enter Phone No."
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button type="submit" className="w-40 btn btn-sm btn-primary">
              Update
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

export default ManageProfilePatients;
