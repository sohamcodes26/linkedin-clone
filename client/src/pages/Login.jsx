import React, { useState, useContext } from "react";
import "../styles/login.css";
import logo from "../assets/logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/userContext";

function Login() {
  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { serverURL } = useContext(authDataContext);
  const {setUserData} = useContext(userDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await axios.post(
        `${serverURL}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setEmail("");
      setPassword("");

      if (result.status === 200) {
        setUserData(result.data.user);
        navigate("/");
      }

    } catch (error) {
      if (error.response && error.response.data) {
        setError(
          error.response.data.message || "An error occurred during login."
        );
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gray-100 px-2">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <img src={logo} alt="logo" className="h-20 sm:h-30" />
      </div>
      <div className="login-container w-full max-w-[380px] flex flex-col border border-gray-200 rounded-xl p-4 sm:p-8 shadow bg-white mt-20 sm:mt-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-center my-4 sm:my-6 text-gray-800">
          Login
        </h1>
        <form
          className="login-form flex flex-col gap-3 sm:gap-4"
          onSubmit={handleLogin}
        >
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded">
              {error}
            </p>
          )}
          <input
            type="email"
            name="Email"
            placeholder="Email"
            className="h-10 border border-gray-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="pass relative">
            <input
              type={show ? "text" : "password"}
              name="Password"
              placeholder="Password"
              className="h-10 w-full border border-gray-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-2 hover:text-blue-600 cursor-pointer font-semibold text-gray-500 text-xs sm:text-sm"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? "hide" : "show"}
            </span>
          </div>
          <button
            type="submit"
            className="mt-4 mb-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-full transition-colors duration-200 shadow text-sm sm:text-base"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600 text-sm sm:text-base">
            Don't have an account?
          </span>
          <button
            className="ml-2 text-blue-600 hover:underline font-medium text-sm sm:text-base"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

// Prefix	CSS Equivalent
// sm:	@media (min-width: 640px)
// md:	@media (min-width: 768px)
// lg:	@media (min-width: 1024px)
// xl:	@media (min-width: 1280px)
// 2xl:	@media (min-width: 1536px)
