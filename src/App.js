
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
import bcryptjs from 'bcryptjs'



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
