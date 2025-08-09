import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { userDataContext } from "./context/userContext";

function App() {
  let { userData } = useContext(userDataContext);
  console.log(userData);
  return (
    <Routes>
      {/* <Route
      path="/"
      /> */}
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/signup"
        element={userData ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/login"
        element={userData ? <Navigate to="/" /> : <Login />}
      />
      {/* <Route path="/logout" element={userData ? }/> */}
    </Routes>
  );
}

export default App;
