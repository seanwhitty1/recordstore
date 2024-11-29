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
    <div className='mb-70px float-left' id="logodiv">
      <img id="logo" src={logo} className='object-fill'/> 
    </div>
    <GenreSideBar className='grid-item-genreBar' />
    <Navigation />
    <div className="grid-item-main col-start-4 col-end-30"> 
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
