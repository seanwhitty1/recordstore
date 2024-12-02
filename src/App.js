import './App.css';

import GenreSideBar from './GenreSideBar';
import {BrowserRouter as Router} from "react-router-dom";
import Main from './Main';
import Navigation from './Nav';
import Cart from './Cart';
import vinyl  from './svg/vinyl-record-svgrepo-com.svg'
import logo from './svg/logo3.svg'
import Footer from './Footer';
import  AuthProvider from './AuthProvider';
import styles from "./index.css"


const App = () => {
  return (
    <>
    <div id="appWrapper">
    <AuthProvider>
    <Router>
    <div id='app' className='grid-container'>
    <div className="w-100px" id="vinyldiv" >
    <img className='offBlack size-100px' src={vinyl} /> 
    </div>
    <div className='mb-70px float-left col-start-1 col-span-9 md:w-100 md:bg-red-200' id="logodiv">
      <img id="logo" src={logo} className='object-fill'/> 
    </div>
    <GenreSideBar className=''/>
    <div className="grid-item-navbar col-start-6 col-span-20">
    <Navigation />
    </div>
    <div className="grid-item-main col-start-4 lg:col-start-7 lg:col-span-20"> 
   
    <Main/>
    </div>
    <Cart/>
    </div>
    </Router>
    <Footer/>
    </AuthProvider>
    </div>  
    </>
  );
};

export default App;
