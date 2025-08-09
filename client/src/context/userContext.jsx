import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; // Bug 1: Import axios
import { authDataContext } from "./AuthContext";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverURL } = useContext(authDataContext);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!serverURL) return;

      try {
        const result = await axios.get(`${serverURL}/api/user/currentUser`, {
          withCredentials: true,
        });

        setUserData(result.data);
      } catch (error) {
        console.log("Could not fetch user:", error);
        setUserData(null);
      }
    };

    fetchCurrentUser();
  }, [serverURL]);
  const value = { userData, setUserData };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
