import LoginForm from "./forms/loginForm";
import RegisterForm from "./forms/registerForm";
import Logout from "./Logout";
import { useSelector } from "react-redux";
const UserDashboard = () => {
    let user = useSelector(store => store.user)
    return(
        <>
        {user? <div><h1>Welcome to users homepage: {user.username}</h1><Logout/></div>: <div><LoginForm/> <RegisterForm/></div>}     
        </>
    )
}
export default UserDashboard;