
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Darnote from './assets/Darnote_logo.svg'
import "./CSS/SplashPage.css"

const NavBar = () => {
  return (
    <header className='dar-note-header'>
      <div className='main'>
        <div className='nav-bar'>
          <div className='logo'>
            <NavLink to="/" className="logo-link">
              <img src={Darnote} alt="Darnote logo" className='logo-image' />
            </NavLink>
          </div>
          <nav className='main-nav'>
            <ul className='nav-items-container'>
              <li className='nav-items'>
                <NavLink to='/login' exact={true} className="login-link" activeClassName='active'>
                  Log In
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
