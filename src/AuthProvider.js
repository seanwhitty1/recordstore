import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import App from './App'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  console.log("rendering the auth provider wrapper")
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [user, setUser_] = useState(localStorage.getItem("user"))

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setUser = (newUser) => {
    setUser_(newUser);
  };

  useEffect(() => {
    //anytime we update the token in the local storage 
    //we set our axios default headers

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      console.log("setting the token via the auth provider in local storage")
  
      localStorage.setItem('token',token);
      setToken(token)
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }


    if (user) {

  
      localStorage.setItem('user',user);
      setUser(user)
    } else {
    
      localStorage.removeItem('user')
    }
  }, [token,user]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      user,
      setToken,
      setUser
    }),
    [token, user]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;