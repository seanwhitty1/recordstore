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
<div className='col-start-3 hidden max-lg:flex'>
<Hamburger toggled={isOpen} toggle={setOpen}/>
</div>
<div className="grid-item-navbar row-start-1 col-start-6 col-span-18">
<nav>
    {isOpen && <HamburgerMenu className="hamburger-menu"/>}
      <div className='nav-menu flex max-lg:hidden'>
      <NavLink className="nav-link" to="/" onClick={() => dispatch({ type: "SELECTGENRE", payload: null})}>Home</NavLink>
        <NavLink className="nav-link" to="/browseall">Browse</NavLink>
        <NavLink className="nav-link " to="/magazine">Magazine</NavLink>
        <NavLink className="nav-link" to="/artwork">Artwork</NavLink>
        <NavLink className="nav-link" to="/contactus">Contact</NavLink>
        <div id="navbar-icons">
        <NavLink to="userdashboard"><a href=""><img className='userIcon'src={userIcon}></img></a></NavLink><NavLink to="/fullcart"><img className='cartIcon' src={cartIcon}></img></NavLink>
        </div>
      </div>
    </nav>
    </div>
</>
)};


export default Navigation;