import LoginForm from "./forms/loginForm";
import RegisterForm from "./forms/registerForm";
const UserDashboard = () => {
    let user = false;

    return(
        <>
        {user? <h1>Welcome to users homepage</h1>: <LoginForm/>}
        <RegisterForm/>
        </>
    )
}

export default UserDashboard;