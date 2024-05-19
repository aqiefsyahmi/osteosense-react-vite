import { useNavigate } from "react-router-dom";
import error from "../image/error.png";
import axios from "axios";

const NotFoundPage = (props) => {
  const navigate = useNavigate();

  const logMeOut = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/logout",
    })
      .then(() => {
        // eslint-disable-next-line react/prop-types
        props.removeToken();
        localStorage.removeItem("email");
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const handleGoBack = () => {
    navigate(-1); // This navigates back to the previous page
  };

  return (
    <div className="grid place-items-center place-content-center h-full">
      <img src={error} className="size-48 mb-2" alt="Error" />

      <div className="text-9xl font-bold text-[#4A00FF]">404</div>
      <div className="text-lg font-semibold">
        The page you are looking for does not exist.
      </div>
      <div className="text-md font-semibold">
        <button
          className="text-md font-bold link link-primary place-items-center place-content-center"
          onClick={handleGoBack}
        >
          Go Back
        </button>{" "}
        or{" "}
        <button
          className="text-md font-bold link link-primary place-items-center place-content-center"
          onClick={logMeOut}
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
