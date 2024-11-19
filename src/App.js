import './App.css';
import './index.css'
import GenreSideBar from './GenreSideBar';
import {BrowserRouter as Router} from "react-router-dom";
import Main from './Main';
import Navigation from './Nav';
import Cart from './Cart';
import vinyl  from './svg/vinyl-record-svgrepo-com.svg'
import logo from './svg/logo3.svg'
import Footer from './Footer';
import  AuthProvider from './AuthProvider';


const App = () => {
  return (
    <>
    <div id="appWrapper">
    <AuthProvider>
    <Router>
    <div id='app' className='grid-container'>
    <img className="offBlack" id="vinylLogo" src={vinyl} /> 
    <img id="logo" src={logo} /> 
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
