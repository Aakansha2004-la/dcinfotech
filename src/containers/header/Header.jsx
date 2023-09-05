import React from 'react'
import './header.css'
import { Input } from 'antd';
const { Search } = Input;

const Header = () => {
    const onSearch = (value) => console.log(value);

    return (
        <div className='flex flex-row justify-between items-center px-40'>
            <div className="basis-1/2">
                <h1 className='mb-5 text-4xl font-extrabold leading-none tracking-normal md:text-5xl lg:text-6xl'>Learning is Earning</h1>
                <h2 className='mb-6 text-2xl font-extrabold'>Finding the best courses & Upgragde your skills</h2>
                <p className='mb-6 w-11/12'>
                    My LMS is a modern online learning management platform,
                    with a user-friendly interface, course customization,
                    integrated tracking and assessment tools, and industry-leading information security.
                </p>
                <Search
                    placeholder="Search what you want to learn..."
                    allowClear
                    onSearch={onSearch}
                    style={{
                        width: 600,
                    }}
                    className='mb-5'
                />
            </div>
            <div className="basis-1/2 flex justify-center">
                <img className='w-full' src='./image/header_pic2.png' alt='header-picture'></img>
            </div>
        </div>
    )
}

export default Header