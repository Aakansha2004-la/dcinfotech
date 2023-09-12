import React, { useState } from 'react'
import { UserOutlined, LockOutlined, CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import './login.css'
import { toast } from 'react-toastify';
import { apiLogin } from '../../services/AuthServices';
import { useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm';

const LoginPage = () => {

    return (
        <div className="mx-36 my-12 h-96 flex items-center justify-center">
            <div className='shadow-2xl w-full basis-2/3 bg-slate-100 rounded-xl flex items-center justify-center'>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage