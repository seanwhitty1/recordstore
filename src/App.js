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
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import  AuthProvider from './AuthProvider';


const App = () => {
const { token } = useAuth;
console.log("what is our token", token)

  useEffect(() => {
   // validateToken()
   console.log("run this everytime token is updated in the context of the app component",token)

   /**    <AuthProvider>
    <div id='app' className='grid-container'>
    <h1>{token}</h1>
    <Router>
    <img className="vinylImage offBlack" src={vinyl} /> 
    <GenreSideBar className='grid-item3' />
    <Navigation />
    <Main className='grid-item4'/>
    </Router>
    <Cart/>
    </div>
    <Footer/>
    </AuthProvider>
    </> */
    
  }, [token]);

  return (
    <>
    <h1>This is the homepage</h1>
    </>

  );
};

export default App;
