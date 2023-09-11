import React from 'react'
import { UserOutlined, LockOutlined, CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import './register.css'

const RegisterForm = ({ handleExitRegister }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 shadow-2xl ">
      <div className='bg-slate-100 h-4/6 w-2/5 rounded-xl flex flex-col items-center justify-start relative slide-in-top transition-opacity: ease-linear'>
        <CloseOutlined onClick={handleExitRegister} style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '24px', cursor: 'pointer' }} />
        <h3 className='font-bold text-3xl text-color-text my-12 mb-5'>Register</h3>
        <p className='pb-10'>Become a part of our community!</p>
        <form className='w-4/5 flex flex-col'>
          <Input style={{ height: '50px', marginBottom: '16px' }} size="large" placeholder="Username or Email" prefix={<UserOutlined />} />
          <Input.Password style={{ height: '50px', marginBottom: '16px' }} size='large' placeholder="Password" prefix={<LockOutlined />} />
          <div className='mb-10'>
            <input id='remember' type='checkbox' className='rounded-sm text-black' />
            <label htmlFor='remember'>  Remember password</label>
          </div>
          <div className='flex justify-center'>
            <button className='w-1/4 h-full p-4 rounded-md bg-color-button text-white text-lg font-bold drop-shadow-lg hover:bg-slate-400 hover:transition-all blur:transition-all'>Register</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default RegisterForm