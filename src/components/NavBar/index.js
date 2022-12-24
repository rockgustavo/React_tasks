import { NavLink } from 'react-router-dom';

import './style.css';

const NavBar = () => {
  return (
    <nav className='nav-bar'>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
        </ul>
    </nav>
  )
}

export default NavBar