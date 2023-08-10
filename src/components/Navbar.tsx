import React from 'react';
import { Link } from 'react-router-dom';
import logo from './icon.png';
import logo_acforce from '../assets/logo.svg';

function Navbar() {
  return (
    <>
        <div className="navbar">
          <Link to="/">
            {/*<img src={logo} alt='logo'/>*/}
            <img src={logo_acforce} alt='logo'/>
          </Link>
        </div>
    </>
  )
}

export default Navbar