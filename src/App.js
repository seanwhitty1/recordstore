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
  useEffect(() => {
  }, [token]);

  return (
    <>
    <div id="appWrapper">
    <AuthProvider>
    <Router>
    <div id='app' className='grid-container'>
    <img className="vinylImage offBlack" src={vinyl} /> 
    <GenreSideBar className='grid-item-genreBar' />
    <Navigation />
    <div className="main grid-item-main"> 
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
