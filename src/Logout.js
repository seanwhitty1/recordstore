import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Logout = () => {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 3 * 1000);

  return (
    <>
    <button onClick={() => handleLogout()}>Logout</button>
    </>
  )
};

export default Logout;