import React, { createContext } from 'react'

export const authDataContext = createContext();
const serverURL = import.meta.env.VITE_BACKEND_URL;


let value = {
  serverURL
}

function AuthContext({children}) { //by default passes a prop
  return (
    <div>
      <authDataContext.Provider value = {value}>
      {children}
      </authDataContext.Provider>
    </div>
  )
}

export default AuthContext;
