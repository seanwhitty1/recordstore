import './Recordgrid.css'
import './App.css'
import './Nav.css'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userIcon from './svg/user.svg'
import cartIcon  from './svg/shopping-cart.svg'
const Navigation = () => {
const dispatch = useDispatch()

return(
<>
<div className="container grid-item-navbar">
    <nav>

      <div class="logo"><p className='siteTitle'>Seans Record Shack</p></div>
      <div class="nav-menu">
      <NavLink className="nav-link" to="/" id="homeButton" onClick={() => dispatch({ type: "SELECTGENRE", payload: null})}>Home</NavLink>
        <NavLink className="nav-link" to="/addnew">Add</NavLink>
        <NavLink className="nav-link" to="/browseall">Browse</NavLink>
        <NavLink className="nav-link" to="/contactus">Contact</NavLink>
        <NavLink className="nav-link" to="/about">About</NavLink>
        <div id="navbar-icons">
        <NavLink to="userdashboard"><a href=""><img className='userIcon'src={userIcon}></img></a></NavLink><NavLink to="/fullcart"><img className='cartIcon' src={cartIcon}></img></NavLink>
        </div>
      </div>



    </nav>
    </div>





</>
)};


export default Navigation;