import React from 'react';
import LoginForm from '../login/LoginForm';
import RegisterForm from '../register/RegisterForm';
import './navbar.css'
import Logo from '../../components/Logo';
import { useState } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        setLogin(true);
        navigate('/');
        toast.success('Logout successfully');
    }

    return (
        <div className='px-20 pt-6 py-16 flex justify-between'>
            <Logo />
            <div className="navbar__links mx-5">
                <NavLink to='/' className='text-lg hover:text-color-button hover:border-b-2 hover:border-color-button hover:transition-all blur: transition-all ac'>Home</NavLink>
                <NavLink to='/courses' className='text-lg hover:text-color-button hover:border-b-2 hover:border-color-button hover:transition-all blur: transition-all ac'>Courses</NavLink>
                <NavLink to='/about' className='text-lg hover:text-color-button hover:border-b-2 hover:border-color-button hover:transition-all blur: transition-all ac'>About</NavLink>
                <NavLink to='/contact' className='text-lg hover:text-color-button hover:border-b-2 hover:border-color-button hover:transition-all blur: transition-all ac'>Contact</NavLink>
            </div>
            {localStorage.getItem('token') ?
                <div className="navbar__sign">
                    <NavLink to='/profile' className='text-lg hover:text-color-button hover:border-b-2 hover:border-color-button hover:transition-all blur: transition-all ac'>My Profile</NavLink>
                    <button onClick={handleLogout} className='btn navbar__sign__register'>Log out</button>
                </div>
                :
                <div className="navbar__sign">
                    <p onClick={() => setLogin(true)} className='text-lg'>Log in</p>
                    <button onClick={() => setRegister(true)} className='btn navbar__sign__register'>Register</button>
                </div>
            }
            {login && <LoginForm handleExitLogin={() => { setLogin(false) }} />}
            {register && <RegisterForm handleExitRegister={() => { setRegister(false) }} />}
        </div>
    )
}

export default Navbar