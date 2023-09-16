import React, { useEffect } from 'react';
import LoginForm from '../login/LoginForm';
import RegisterForm from '../register/RegisterForm';
import './navbar.css'
import Logo from '../../components/Logo';
import { useState } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import useAuth from '../../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import { allowedRoles } from '../../App';

const Navbar = () => {
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            var decoded = jwtDecode(token);
            setAuth({
                userId: decoded.id,
                roles: decoded.roles
            })
        }
    }, [])

    const handleLogout = () => {
        localStorage.clear();
        setLogin(true);
        setAuth({});
        navigate('/');
        toast.success('Logout successfully');
    }

    const NavLinkCss = ({ path, title }) => (
        <NavLink to={path} className='text-lg hover:text-color-button hover:border-b-2 hover:border-color-button hover:transition-all blur: transition-all ac'>{title}</NavLink>
    )

    let NavAuthorized = (
        <>
            <NavLinkCss path={'/courses'} title={'Courses'} />
            <NavLinkCss path={'/about'} title={'About'} />
            <NavLinkCss path={'/contact'} title={'Contact'} />
        </>
    )

    if (auth?.roles?.includes(allowedRoles.student)) {
        NavAuthorized = (
            <>
                <NavLinkCss path={'/courses'} title={'Courses'} />
                <NavLinkCss path={'/my-courses'} title={'My Courses'} />
                <NavLinkCss path={'/about'} title={'About'} />
                <NavLinkCss path={'/contact'} title={'Contact'} />
            </>
        )
    }

    if (auth?.roles?.includes(allowedRoles.admin)) {
        NavAuthorized = (
            <>
                <NavLinkCss path={'/admin/courses'} title={'Courses'} />
                <NavLinkCss path={'/admin/subjects'} title={'Subjects'} />
                <NavLinkCss path={'/admin/teachers'} title={'Teachers'} />
                <NavLinkCss path={'/admin/students'} title={'Students'} />
                <NavLinkCss path={'/admin/users'} title={'User'} />
            </>
        )
    }

    return (
        <div className='px-20 pt-6 py-16 flex justify-between'>
            <Logo />
            <div className="navbar__links mx-5">
                <NavLinkCss path={'/'} title={'Home'} />
                {NavAuthorized}
            </div>
            {auth?.userId ?
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
            <Modal open={login} footer={null} onCancel={() => { setLogin(false) }}>
                <div className='flex justify-center'>
                    <LoginForm handleExitLogin={() => { setLogin(false) }} />
                </div>
            </Modal>
            {register && <RegisterForm handleExitRegister={() => { setRegister(false) }} />}
        </div>
    )
}

export default Navbar