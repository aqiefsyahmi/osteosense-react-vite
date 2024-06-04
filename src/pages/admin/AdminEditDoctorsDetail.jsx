// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useNavigate, useParams } from "react-router-dom";

// // const AdminEditDoctorsDetail = () => {
// //   const navigate = useNavigate();
// //   const { id } = useParams();

// //   const [inputs, setInputs] = useState([]);

// //   const [initialInputs, setInitialInputs] = useState([]);

// //   useEffect(() => {
// //     getDoctor();
// //   }, []);

// //   const getDoctor = async () => {
// //     try {
// //       const response = await axios.get(
// //         `http://127.0.0.1:5000/doctordetails/${id}`
// //       );
// //       const initialData = {
// //         ...response.data,
// //         password: "",
// //         password_confirm: "",
// //       };
// //       setInputs(initialData);
// //       setInitialInputs(initialData);
// //     } catch (error) {
// //       console.error("There was an error fetching the doctor details!", error);
// //     }
// //   };

// //   const handleChange = (event) => {
// //     const { name, value } = event.target;
// //     setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     if (inputs.password !== inputs.password_confirm) {
// //       alert("Passwords do not match");
// //       return;
// //     }

// //     // eslint-disable-next-line no-unused-vars
// //     const { password_confirm, ...updateData } = inputs;

// //     try {
// //       await axios.put(`http://127.0.0.1:5000/doctorupdate/${id}`, updateData);
// //       alert("Doctor Profile Successfully Updated!");
// //       navigate("/admineditdoctors");
// //     } catch (error) {
// //       console.error("There was an error updating the doctor details!", error);
// //     }
// //   };

// //   const handleReset = () => {
// //     setInputs(initialInputs);
// //   };

// //   return (
// //     <>
// //       <h1>Edit Doctor Profile</h1>
// //       <form onSubmit={handleSubmit}>
// //         <div>Full Name</div>
// //         <input
// //           type="text"
// //           value={inputs.fullname}
// //           className="form-control"
// //           name="fullname"
// //           onChange={handleChange}
// //           required
// //         />
// //         <div>Username</div>
// //         <input
// //           type="text"
// //           value={inputs.username}
// //           className="form-control"
// //           name="username"
// //           onChange={handleChange}
// //           required
// //         />
// //         <div>Email</div>
// //         <input
// //           type="email"
// //           value={inputs.email}
// //           className="form-control"
// //           name="email"
// //           onChange={handleChange}
// //           required
// //         />
// //         <div>Password</div>
// //         <input
// //           type="password"
// //           className="form-control"
// //           name="password"
// //           onChange={handleChange}
// //           value={inputs.password}
// //           required
// //         />
// //         <div>Confirm Password</div>
// //         <input
// //           type="password"
// //           name="password_confirm"
// //           className="form-control"
// //           onChange={handleChange}
// //           value={inputs.password_confirm}
// //           required
// //         />
// //         <div>Phone No.</div>
// //         <input
// //           type="text"
// //           value={inputs.phoneno}
// //           className="form-control"
// //           name="phoneno"
// //           onChange={handleChange}
// //           required
// //         />
// //         <button className="btn btn-sm btn-primary" type="submit">
// //           Save
// //         </button>
// //         <button
// //           className="btn btn-sm btn-danger"
// //           type="button"
// //           onClick={handleReset}
// //         >
// //           Reset
// //         </button>
// //       </form>
// //     </>
// //   );
// // };

// // export default AdminEditDoctorsDetail;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const AdminEditDoctorsDetail = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [inputs, setInputs] = useState([]);
//   const [initialInputs, setInitialInputs] = useState([]);

//   useEffect(() => {
//     getDoctor();
//   }, []);

//   const getDoctor = async () => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:5000/doctordetails/${id}`
//       );
//       const initialData = {
//         ...response.data,
//         password: "",
//         password_confirm: "",
//       };
//       setInputs(initialData);
//       setInitialInputs(initialData);
//     } catch (error) {
//       console.error("There was an error fetching the doctor details!", error);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (inputs.password !== inputs.password_confirm) {
//       alert("Passwords do not match");
//       return;
//     }

//     const { password_confirm, ...updateData } = inputs;

//     try {
//       await axios.put(`http://127.0.0.1:5000/doctorupdate/${id}`, updateData);
//       alert("Doctor Profile Successfully Updated!");
//       navigate("/admineditdoctors");
//     } catch (error) {
//       console.error("There was an error updating the doctor details!", error);
//     }
//   };

//   const handleReset = () => {
//     setInputs(initialInputs);
//   };

//   return (
//     <>
//       <div>
//         <div className="font-bold text-3xl">Edit Doctor Profile</div>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-3 gap-4 py-4">
//             <div>
//               <div className="font-bold text-xl">Full Name</div>
//               <input
//                 type="text"
//                 value={inputs.fullname}
//                 className="form-control mt-3"
//                 name="fullname"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <div className="font-bold text-xl">Username</div>
//               <input
//                 type="text"
//                 value={inputs.username}
//                 className="form-control mt-3"
//                 name="username"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <div className="font-bold text-xl">Email</div>
//               <input
//                 type="email"
//                 value={inputs.email}
//                 className="form-control mt-3"
//                 name="email"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <div className="font-bold text-xl">Phone No.</div>
//               <input
//                 type="text"
//                 value={inputs.phoneno}
//                 className="form-control mt-3"
//                 name="phoneno"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <div className="font-bold text-xl">Password</div>
//               <input
//                 type="password"
//                 className="form-control mt-3"
//                 name="password"
//                 onChange={handleChange}
//                 value={inputs.password}
//                 required
//               />
//             </div>
//             <div>
//               <div className="font-bold text-xl">Confirm Password</div>
//               <input
//                 type="password"
//                 name="password_confirm"
//                 className="form-control mt-3"
//                 onChange={handleChange}
//                 value={inputs.password_confirm}
//                 required
//               />
//             </div>
//           </div>
//           <div className="flex justify-center gap-4">
//             <button className="w-40 btn btn-sm btn-primary">Save</button>
//             <button
//               className="w-40 btn btn-sm btn-outline btn-error"
//               type="button"
//               onClick={handleReset}
//             >
//               Reset
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AdminEditDoctorsDetail;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AdminEditDoctorsDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState([]);
  const [initialInputs, setInitialInputs] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    getDoctor();
  }, []);

  const getDoctor = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/doctordetails/${id}`
      );
      const initialData = {
        ...response.data,
        password: "",
        password_confirm: "",
      };
      setInputs(initialData);
      setInitialInputs(initialData);
    } catch (error) {
      console.error("There was an error fetching the doctor details!", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.password !== inputs.password_confirm) {
      alert("Passwords do not match");
      return;
    }

    const { password_confirm, ...updateData } = inputs;

    try {
      await axios.put(`http://127.0.0.1:5000/doctorupdate/${id}`, updateData);
      alert("Doctor Profile Successfully Updated!");
      navigate("/admineditdoctors");
    } catch (error) {
      console.error("There was an error updating the doctor details!", error);
    }
  };

  const handleReset = () => {
    setInputs(initialInputs);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <>
      <div>
        <div className="font-bold text-3xl">Edit Doctor Profile</div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4 py-4">
            <div>
              <div className="font-bold text-xl">Full Name</div>
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
              <div className="font-bold text-xl">Username</div>
              <input
                type="text"
                value={inputs.username}
                className="form-control mt-3"
                name="username"
                onChange={handleChange}
                placeholder="Enter Username"
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
            <div>
              <div className="font-bold text-xl">Phone No.</div>
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
            <div>
              <div className="font-bold text-xl">Password</div>
              <div className="input-group mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control mt-3"
                  name="password"
                  onChange={handleChange}
                  value={inputs.password}
                  placeholder="**********"
                  required
                />
                <div className="input-group-append mt-3">
                  <span className="input-group-text rounded-none rounded-r-lg">
                    <div
                      className="password-toggle"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#666666"
                        >
                          <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#666666"
                        >
                          <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                        </svg>
                      )}
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold text-xl">Confirm Password</div>
              <div className="input-group mb-3">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirm"
                  className="form-control mt-3"
                  onChange={handleChange}
                  value={inputs.password_confirm}
                  placeholder="**********"
                  required
                />
                <div className="input-group-append mt-3">
                  <span className="input-group-text rounded-none rounded-r-lg">
                    <div
                      className="password-toggle"
                      onClick={handleToggleConfirmPassword}
                    >
                      {showConfirmPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#666666"
                        >
                          <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#666666"
                        >
                          <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                        </svg>
                      )}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button className="w-40 btn btn-sm btn-primary">Save</button>
            <button
              className="w-40 btn btn-sm btn-outline btn-error"
              type="button"
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

export default AdminEditDoctorsDetail;
