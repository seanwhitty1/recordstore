import './App.css';

import GenreSideBar from './GenreSideBar';
import {BrowserRouter as Router} from "react-router-dom";
import Main from './Main';
import { useState, useEffect} from 'react';
import Navigation from './Nav';
import Cart from './Cart';
import vinyl  from './svg/vinyl-record-svgrepo-com.svg'
import logo from './svg/logo3.svg'
import Footer from './Footer';
import  AuthProvider from './AuthProvider';
import styles from "./index.css"



const App = () => {
  const [scrollYPosition, setScrollYPosition] = useState(0);

  const handleScroll = () => {
    const newScrollYPosition = window.pageYOffset;
    setScrollYPosition(newScrollYPosition);
};

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
      window.removeEventListener('scroll', handleScroll);
  };

},[])


  return (
    <>
    <div id="appWrapper">
    <AuthProvider>
    <Router>
    <div id='app' className='grid-container'>
    <div className=" col-span-2 md:col-span-4" id="vinyldiv"><img className='offBlack' src={vinyl} /> </div>
    <div className='mb-70px float-left col-start-1 col-span-9 lg:col-span-8' id="logodiv">
      <img id="logo" src={logo} className='object-fill'/> 
    </div>
    <GenreSideBar/>
    <Navigation/>
    <Main/>
    <Cart/>
    <Footer/>
    </div>
    </Router>
    </AuthProvider>
    </div>  
    </>
  );
};

export default App;
