import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import {useDispatch } from 'react-redux';

const Logout = () => {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    setToken();
    localStorage.clear()
    dispatch({type:"UPDATEUSER", payload:null})
    navigate("/");
  };

  setTimeout(() => {
    handleLogout();
  }, 3 * 1000);

  return (
    <>
    <button onClick={() => handleLogout}>Logout</button>
    </>
  )
};

export default Logout;