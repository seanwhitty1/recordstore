import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
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

  const getAndSetUserFromToken = async(token) => {
    let decoded = await axios.get(`http://localhost:3001/users/auth/decodeJWT/${token}`)
    let foundUserObject = await axios.get(`http://localhost:3001/users/getByName/${decoded.data.payload.username}`)
    setUser(foundUserObject)
    return decoded
  }
  useEffect(() => {
    //anytime we update the token in the local storage 
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      getAndSetUserFromToken(token)

    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }

    if (user) {
      console.log("user was found")
   
    } else {
    
      localStorage.removeItem('user')
    }
  }, [token]);

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