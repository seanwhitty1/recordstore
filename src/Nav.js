import './Recordgrid.css'
import './App.css'
import './Nav.css'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userIcon from './svg/user.svg'
import cartIcon  from './svg/shopping-cart.svg'
import Hamburger from 'hamburger-react'
import HamburgerMenu from './Hamburgermenu';
import { useState } from 'react';
import styles from "./index.css"

const Navigation = () => {
const dispatch = useDispatch()
const [isOpen, setOpen] = useState(false)

return(
<>
<nav>
<div>  
    <Hamburger  toggled={isOpen} toggle={setOpen} className='hidden' />
   
    {isOpen && <HamburgerMenu className="hamburger-menu "/>}
   
      <div className='nav-menu hidden max-lg:flex ml-50px'>
      <NavLink className="nav-link" to="/" onClick={() => dispatch({ type: "SELECTGENRE", payload: null})}>Home</NavLink>
        <NavLink className="nav-link" to="/browseall">Browse</NavLink>
        <NavLink className="nav-link " to="/magazine">Magazine</NavLink>
        <NavLink className="nav-link " to="/artwork">Artwork</NavLink>
        <NavLink className="nav-link" to="/contactus">Contact</NavLink>
        <div id="navbar-icons">
        <NavLink to="userdashboard"><a href=""><img className='userIcon'src={userIcon}></img></a></NavLink><NavLink to="/fullcart"><img className='cartIcon' src={cartIcon}></img></NavLink>
        </div>
      </div>
   
    </div>
    </nav>
</>
)};


export default Navigation;