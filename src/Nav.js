import Recordgrid from "./Recordgrid";
import './Recordgrid.css'
import About from "./pages/About";
import './Nav.css'


import { NavLink, Switch, Route, Router, Routes } from 'react-router-dom';

const Navigation = () => (
<>
  
<div className="navbar">
  <ul>
    <li className="nav-item">
      <a href="#" className="button">
      <NavLink to='/'>Home</NavLink>
      </a>

    </li>
    <li className="nav-item">
      <a href="#" className="button">
      <NavLink to='/'>Browse All</NavLink>
      </a>

    </li>
    <li className="nav-item">
      <a href="#" className="button">
     <NavLink to='/about'>About</NavLink>
      </a>

    </li>
    <li className="nav-item">
      <a href="#" className="button">
      <NavLink to='/contactus'>Contact Us</NavLink>
      </a>

    </li>
    <li className="nav-item">
      <a href="#" className="button">
      <NavLink to='/addnew'>Add new</NavLink>
      </a>

    </li>
  </ul>

</div>
  



</>
  );


export default Navigation;