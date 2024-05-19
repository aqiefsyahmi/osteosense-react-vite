import { useNavigate, Outlet } from "react-router-dom";
import unauthorizedimg from "../image/unauthorized.png";
const ProtectedRouteAdmin = () => {
  const navigate = useNavigate();
  let auth = {
    token: localStorage.getItem("token"), // Get the token from local storage
    role: localStorage.getItem("role"), // Get the role from local storage
  };

  const handleGoBack = () => {
    navigate(-1); // This navigates back to the previous page
  };

  return auth.token && auth.role === "admin" ? (
    <Outlet />
  ) : (
    <div
      className="grid place-items-center place-content-center h-full"
      // style={{
      //   backgroundImage:
      //     "url(https://media.tenor.com/ZX95mDnlodwAAAAd/the-rock-sus-eye.gif)",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      {/* <img
        src="https://media.tenor.com/ZX95mDnlodwAAAAd/the-rock-sus-eye.gif"
        className="size-80"
      ></img> */}
      <img src={unauthorizedimg} className="size-60 mb-0"></img>

      <div className="text-9xl font-bold text-[#4A00FF]">401</div>
      <div className="text-lg font-semibold ">
        You are not authorized for this action.
      </div>
      <div className="text-md font-semibold ">
        Go back?{" "}
        <button
          className="text-md font-bold link link-primary place-items-center place-content-center"
          onClick={handleGoBack}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default ProtectedRouteAdmin;
