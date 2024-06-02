import LoginForm from "./forms/loginForm";
import RegisterForm from "./forms/registerForm";
import { useSelector } from "react-redux";
const UserDashboard = () => {
    let user = useSelector(store => store.token)
    

    return(
        <>
        {user? <h1>Welcome to users homepage</h1>: <div><LoginForm/> <RegisterForm/></div>}
       
        </>
    )
}

export default UserDashboard;