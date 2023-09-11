import React, { useState } from 'react'
import { UserOutlined, LockOutlined, CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import './login.css'
import { toast } from 'react-toastify';
import { apiLogin } from '../../services/AuthServices';
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    console.log(`username: ${username}, pw: ${password}`);

    const handleLogin = async () => {
        if (!username || !password) {
            toast.error('Username and password are required');
            return;
        }
        let res = await apiLogin(username, password);
        console.log(JSON.stringify(res.data));
        if (res.success) {
            console.log(JSON.stringify(res.success));
            toast.success('Login successfully');
            localStorage.setItem('profile', JSON.stringify(res.data));
            localStorage.setItem('token', res.data.access_token);
            navigate('/')
        } else {
            toast.error(res.data);
        }
    }

    return (
        <div className="mx-36 my-12 h-96 flex items-center justify-center">
            <div className='shadow-2xl basis-1/2 bg-slate-100 rounded-xl flex flex-col items-center justify-start relative'>
                <h3 className='font-bold text-3xl text-color-text my-12 mb-5'>Login</h3>
                <p className='pb-10'>Become a part of our community!</p>
                <div className='w-4/5 flex flex-col'>
                    <Input
                        style={{ height: '50px', marginBottom: '16px' }}
                        size="large"
                        placeholder="Username or Email"
                        prefix={<UserOutlined />}
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                    <Input.Password
                        style={{ height: '50px', marginBottom: '16px' }}
                        size='large'
                        placeholder="Password"
                        prefix={<LockOutlined />}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <div className='mb-10'>
                        <input id='remember' type='checkbox' className='rounded-sm text-black' />
                        <label htmlFor='remember'>  Remember password</label>
                    </div>
                    <div className='flex justify-center pb-10'>
                        <button
                            className='w-1/3 h-full p-4 rounded-md bg-color-button text-white text-lg font-bold drop-shadow-lg hover:bg-slate-400 hover:transition-all blur:transition-all'
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage