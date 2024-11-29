import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

// Define a functional component called Login
const Login = () => {
  // Use useState hook to create state variables for inputs and errors
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);

  // Use useNavigate hook to create a navigate function
  const navigate = useNavigate();

  //useContext hook to get the login function from the AuthContext.
  const { login } = useContext(AuthContext);

  // Define handleChange function to update the input state variables when the user types into the input fields
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Define handleSubmit function to handle the form submission when the user clicks the submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post the user input to the "/auth/login" endpoint and navigate to the home page
      await login(inputs);
      navigate("/");
    } catch (err) {
      // If there is an error, set the error state variable to the error message
      setError(err.response.data);
    }
  };

  // Render the login form with input fields for username and password and a button to submit the form
  return (
    <div
      className=" text-white max-h-full mt-20 pt-12"
      style={{
        backgroundImage: `url("https://www.nolanai.app/_next/image?url=https%3A%2F%2Fnolan-space.sfo3.cdn.digitaloceanspaces.com%2Fassets%2Flogin_hero.webp&w=3840&q=75")`,
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div>
        <div className="text-center  lg:text-left">
          <h1 className="text-5xl font-bold text-white text-center py-10">
            Login now!
          </h1>
        </div>
        <div
          className="card mx-auto justify-center align-top lg:w-1/3 sm:w-full md:w-1/2 rounded-lg text-neutral-content"
          style={{ backgroundColor: "#25272cb3" }}
        >
          <form className="card-body">
            <input
              type="text"
              placeholder="username"
              name="username"
              className=" mt-6 input input-bordered bg-transparent text-white border-gray-500  pr-10 w-full "
              required
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              className="mt-6 mb-6 input input-bordered border-gray-500 bg-transparent pr-10 w-full focus:bg-lightpink focus:text-white"
              required
              onChange={handleChange}
            />
            <div>
              <span
                className="btn bg-amber-300 text-black font-bold border-none flex items-center  "
                onClick={handleSubmit}
              >
                <p>Login</p>
                {err && <p>{err}</p>}
              </span>
              <span className="font-semibold mt-6 text-center text-yellow-300 flex items-center justify-center">
                Don't you have an account?
                <Link to="/register" className="flex items-center ml-2">
                  <span className="mr-2">➜</span>
                  <span>Register</span>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
