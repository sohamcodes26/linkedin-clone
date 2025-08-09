import React, { useContext, useState } from "react";
import "../styles/Signup.css";
import logo from "../assets/logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import  {userDataContext} from "../context/userContext"

function Signup() {
  let navigate = useNavigate();
  let { serverURL } = useContext(authDataContext);
  const {setUserData} = useContext(userDataContext)

  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let result = await axios.post(
        `${serverURL}/api/auth/signup`,
        {
          firstName,
          lastName,
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );

      setLoading(false);
      
      if (result.status === 201) {
             setUserData(result.data.user);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setError(
          error.response.data.message || "An error occurred during signup."
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
      <div className="signup-container w-full max-w-[380px] flex flex-col border border-gray-200 rounded-xl p-4 sm:p-8 shadow bg-white mt-20 sm:mt-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-center my-4 sm:my-6 text-gray-800">
          Sign up
        </h1>
        <form
          className="signup-form flex flex-col gap-4"
          onSubmit={handleSignUp}
        >
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded">
              {error}
            </p>
          )}

          <input
            type="text"
            name="Firstname"
            placeholder="First Name"
            className="h-10 w-full border border-gray-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            name="Lastname"
            placeholder="Last Name"
            className="h-10 w-full border border-gray-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="text"
            name="Username"
            placeholder="Username"
            className="h-10 w-full border border-gray-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <input
            type="email"
            name="Email"
            placeholder="Email"
            className="h-10 w-full border border-gray-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
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
              minLength="8"
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
            className="mt-4 mb-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-full transition-colors duration-200 shadow text-sm sm:text-base disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600 text-sm sm:text-base">
            Already have an account?
          </span>
          <button
            className="ml-2 text-blue-600 hover:underline font-medium text-sm sm:text-base"
            onClick={() => navigate("/")}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
