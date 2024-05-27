import './Recordgrid.css'
import './App.css'
import './Nav.css'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Navigation = () => {
const dispatch = useDispatch()

return(
<>
<div className="container grid-item-navbar">
    <nav>

      <div class="logo">Seans Record Shack</div>
      <div class="nav-menu">
      <NavLink className="nav-link" to="/" id="homeButton" onClick={() => dispatch({ type: "SELECTGENRE", payload: null})}>Home</NavLink>
        <NavLink className="nav-link" to="/addnew">Add</NavLink>
        <NavLink className="nav-link" to="/browseall">Browse</NavLink>
        <NavLink className="nav-link" to="/contactus">Contact</NavLink>
        <NavLink className="nav-link" to="/about">About</NavLink>
      </div>

    </nav>
    </div>





</>
)};


export default Navigation;