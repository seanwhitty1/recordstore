
import './App.css'
import React, { useEffect} from "react";
import { NavLink } from 'react-router-dom';
import userIcon from './svg/user.svg'
import cartIcon  from './svg/shopping-cart.svg'
import { useDispatch } from 'react-redux';
import './Nav.css'

function HamburgerMenu(){
    const dispatch = useDispatch()

    useEffect(() => { 
    },[]) 
        return(
         <>  
        <nav>
      <div class="hamburger-menu">
      <ul>
      <li className='hamburger-list-item'><NavLink className="nav-link" to="/" onClick={() => dispatch({ type: "SELECTGENRE", payload: null})}>Home</NavLink></li>
      <li className='hamburger-list-item'><NavLink className="nav-link" to="/browseall">Browse</NavLink></li>    
      <li className='hamburger-list-item'> <NavLink className="nav-link" to="/magazine">Magazine</NavLink></li>  
      <li className='hamburger-list-item'> <NavLink className="nav-link" to="/artwork">Artwork</NavLink></li>  
      <li className='hamburger-list-item'> <NavLink className="nav-link" to="/contactus">Contact</NavLink></li>  
      <li className='hamburger-list-item'><NavLink to="userdashboard"><a href=""><img className='userIcon'src={userIcon}></img></a></NavLink></li>
      <li className='hamburger-list-item'><NavLink to="/fullcart"><img className='cartIcon' src={cartIcon}></img></NavLink></li>  
        </ul> 
      </div>
    </nav>
     </>  )
         
    }
    
export default HamburgerMenu;