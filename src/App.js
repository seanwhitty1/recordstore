import logo from './logo.svg';
import './App.css';
import Recordgrid from './Recordgrid';
import About from './pages/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { NavLink, Switch} from 'react-router-dom';
import Main from './Main';
import Navigation from './Nav';


const App = () => {
  return (

    <>
    <Router>
    <div className='App'>
    <h1 className='header'>Sean's Record Hut</h1>
    <Navigation/>
    <Main />
  
    </div>
    </Router>

    </>
  );
};





export default App;
