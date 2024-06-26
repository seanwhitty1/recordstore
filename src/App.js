
import './App.css';
import './index.css'
import GenreSideBar from './GenreSideBar';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Main from './Main';
import Navigation from './Nav';
import Cart from './Cart';
import vinyl  from './svg/vinyl-record-svgrepo-com.svg'
import Footer from './Footer';
import axios from 'axios';
import { baseURL } from './helpers';

let token = localStorage.getItem("token")
if(token){
  console.log("there is a token", token)

  let user = await axios.get(`http://127.0.0.1:3001/users/auth/token/${token}`)
  console.log("user decoded payload is", user)
  //if token is true, lets add it to the app storage. 
  let token = req.params
  console.log("inside our app component and token is ", token)
  //here we will send axios to route - get logged in user, 
  //will return user object and update the store.user
  //store.user will be used to populate the app with user info where applicable. 

}

const App = () => {
  return (
    <>
    <div id='app' className='grid-container'>
    <Router>
    <img className="vinylImage offBlack" src={vinyl} /> 
    <GenreSideBar className='grid-item3' />
    <Navigation />
    <Main className='grid-item4'/>
    </Router>
    <Cart/>
    </div>
    <Footer/>
    </>
  );
};





export default App;
