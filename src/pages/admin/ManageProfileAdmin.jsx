import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageProfileAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState([]);

  const [initialInputs, setInitialInputs] = useState([]);

  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/admindetails/${id}`
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

    // eslint-disable-next-line no-unused-vars
    const { password_confirm, ...updateData } = inputs;

    try {
      await axios.put(`http://127.0.0.1:5000/adminupdate/${id}`, updateData);
      alert("Admn Profile Successfully Updated!");
      navigate("/admin");
    } catch (error) {
      console.error("There was an error updating the admin details!", error);
    }
  };

  const handleReset = () => {
    setInputs(initialInputs);
  };

  return (
    <>
      {/* <Header />
      <Navigation /> */}
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>Username</div>
        <input
          type="text"
          value={inputs.username}
          className="form-control"
          name="username"
          onChange={handleChange}
          required
        />
        <div>Email</div>
        <input
          type="email"
          value={inputs.email}
          className="form-control"
          name="email"
          onChange={handleChange}
          required
        />
        <div>Password</div>
        <input
          type="password"
          className="form-control"
          name="password"
          onChange={handleChange}
          value={inputs.password}
          required
        />
        <div>Confirm Password</div>
        <input
          type="password"
          name="password_confirm"
          className="form-control"
          onChange={handleChange}
          value={inputs.password_confirm}
          required
        />
        <button className="btn btn-sm btn-primary">Save</button>
        <button
          className="btn btn-sm btn-danger"
          type="button"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </>
  );
}
