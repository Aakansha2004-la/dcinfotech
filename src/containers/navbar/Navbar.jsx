import React from 'react';

import './navbar.css'
import Logo from '../../components/Logo';
const Navbar = () => {
    return (
        <div className='px-20 pt-6 py-16 flex justify-between'>
            <Logo />
            <div className="navbar__links mx-5">
                <p><a href='#' className='text-lg'>Home</a></p>
                <p><a href='#' className='text-lg'>Course</a></p>
                <p><a href='#' className='text-lg'>About</a></p>
                <p><a href='#' className='text-lg'>Contact</a></p>
            </div>
            <div className="navbar__sign">
                <p><a href='#' className='text-lg'>Log in</a></p>
                <button className='btn navbar__sign__register'>Register</button>
            </div>
        </div>
    )
}

export default Navbar