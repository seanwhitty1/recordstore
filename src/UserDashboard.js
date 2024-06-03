import LoginForm from "./forms/loginForm";
import RegisterForm from "./forms/registerForm";
import { useSelector } from "react-redux";
const UserDashboard = () => {
    let user = useSelector(store => store.user)
    if(user){
        console.log("inside user dashboard", user)

    }

    

    return(
        <>
        {user? <h1>Welcome to users homepage: {user.username}</h1>: <div><LoginForm/> <RegisterForm/></div>}
       
        </>
    )
}

export default UserDashboard;