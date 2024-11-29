import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div
      className="text-white max-h-full mt-20 pt-12"
      style={{
        backgroundImage: `url("https://www.nolanai.app/_next/image?url=https%3A%2F%2Fnolan-space.sfo3.cdn.digitaloceanspaces.com%2Fassets%2Flogin_hero.webp&w=3840&q=75")`,
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-white text-center py-10">
            Register Now!
          </h1>
        </div>
        <div
          className="card mx-auto justify-center align-top lg:w-1/3 sm:w-full md:w-1/2 rounded-lg text-neutral-content"
          style={{ backgroundColor: "#25272cb3" }}
        >
          <form className="card-body">
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="mt-6 input input-bordered bg-transparent text-white border-gray-500 w-full"
              required
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="mt-6 input input-bordered bg-transparent text-white border-gray-500 w-full"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="mt-6 mb-6 input input-bordered border-gray-500 bg-transparent w-full focus:bg-lightpink focus:text-white"
              required
              onChange={handleChange}
            />
            <div>
              <span
                className="btn bg-amber-300 text-black font-bold border-none flex items-center"
                onClick={handleSubmit}
              >
                <p>Register</p>
              </span>
              {err && <p className="text-red-500 mt-2">{err}</p>}
              <span className="font-semibold mt-6 text-center text-yellow-300 flex items-center justify-center">
                Do you have an account?
                <Link to="/login" className="flex items-center ml-2">
                  <span className="mr-2">➜</span>
                  <span>Login</span>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
