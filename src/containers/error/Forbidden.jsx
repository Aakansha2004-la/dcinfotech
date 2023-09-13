import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Forbidden = () => {
    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/');
    }

    return (
        <div className='flex flex-col items-center my-10'>
            <h1 className='text-9xl my-5 text-red-900 font-extrabold '>403</h1>
            <h2 className='text-5xl my-5 text-red-900 font-semibold '>Access Forbidden</h2>
            <h3 className='text-2xl my-5 font-medium '>You are not allowed to go to this page</h3>
            <Button size='large' danger onClick={handleHome}>Go Home</Button>
        </div>
    )
}

export default Forbidden