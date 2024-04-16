import Recordgrid from "./Recordgrid";
import './Recordgrid.css'
import './App.css'
import './Nav.css'

/**<div className="grid-item-header">
<h1>Sean's Record Hut</h1>

<div className='grid-item-navbar navbar'>




  



  <ul>
    <li className="nav-item">
      <a href="#" className="button">
      <NavLink to='/' >Home</NavLink>
      </a>

    </li>
    <li className="nav-item">
      <a href="#" className="button">
      <NavLink to='/browseall'>Browse All</NavLink>
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
 
  </ul>

</div>
  
</div> */

import { NavLink, Switch, Route, Router, Routes } from 'react-router-dom';

const Navigation = () => (
<>
<div className="container grid-item-navbar">

    <nav>
      <div class="logo">Seans Record Shack</div>
      <div class="nav-menu">
      <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/addnew">Add</NavLink>
        <NavLink className="nav-link" to="/browseall">Browse</NavLink>
        <NavLink className="nav-link" to="/contactus">Contact</NavLink>
        <NavLink className="nav-link" to="/about">About</NavLink>
  
      </div>

    </nav>
    </div>





</>
  );


export default Navigation;