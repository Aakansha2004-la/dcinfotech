import React, { useState } from 'react'
import { UserOutlined, LockOutlined, CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import './login.css'
import { toast } from 'react-toastify';
import { apiLogin } from '../../services/AuthServices';
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const LoginForm = ({ handleExitLogin }) => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.log('auth' + JSON.stringify(auth));


  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Username and password are required');
      return;
    }
    let res = await apiLogin(username, password);
    console.log(JSON.stringify(res.data));
    if (res.success) {
      console.log('Hello' + JSON.stringify(res.data));
      const data = res.data;
      toast.success('Login successfully');
      const userId = data.user.id;
      const roles = data.user.roles.map(role => role.authority);
      setAuth({ userId, roles });
      localStorage.setItem('token', res.data.access_token);
      navigate('/');
      handleExitLogin && handleExitLogin();
    } else {
      toast.error(res.data);
    }
  }

  return (
    <div className='my-12 h-4/6 w-3/4 rounded-xl flex flex-col items-center justify-start'>
      <h3 className='font-bold text-3xl text-color-text mb-5'>Login</h3>
      <p className='pb-10'>Become a part of our community!</p>
      <div className='w-full flex flex-col'>
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
        <div className='flex justify-center'>
          <button
            className='w-1/3 h-full p-4 rounded-md bg-color-button text-white text-lg font-bold drop-shadow-lg hover:bg-slate-400 hover:transition-all blur:transition-all'
            onClick={handleLogin}
          >
            <i class="fa-solid fa-sync fa-spin"></i>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm