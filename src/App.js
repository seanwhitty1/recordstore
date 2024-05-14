
import './App.css';
import './index.css'
import GenreSideBar from './GenreSideBar';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Main from './Main';
import Navigation from './Nav';

const App = () => {

  return (
    <>
    <div id='app' className='grid-container'>
    <Router>
    <GenreSideBar className='grid-item3' />
    <Navigation />
    <Main className='grid-item4'/>
    </Router>
    </div>
    </>
  );
};





export default App;
