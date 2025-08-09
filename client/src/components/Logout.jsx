import axios from 'axios';
import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { authDataContext } from '../context/AuthContext';
import {userDataContext} from '../context/userContext'

function Logout() {

    let {serverURL} = useContext(authDataContext);
    const {setUserData} = useContext(userDataContext);
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();

        

        try {
            axios.get(`${serverURL}/api/auth/logout`,  {withCredentials:true} );

            setUserData(null);

            navigate('/login');

        } catch (error) {
            console.log("Logout failed", error);
        }
    }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
