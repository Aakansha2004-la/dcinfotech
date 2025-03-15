import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate()

    const handleContact = () => {
        navigate('/contact');
    }

    return (
        <div id='about' className='flex justify-center mx-52 shadow-lg rounded-2xl overflow-hidden mb-28'>
            
            <div className='basis-3/5 h-96 p-10 px-20 bg-color-button text-white'>
                <h3 className='font-bold text-4xl mb-5'>About me</h3>
                <i className='text-lg'>This is my first LMS portal which can be used for training , learning ,implementing skills in various sectors.
                </i>
                <div className='flex justify-end mt-5'>
                    <button
                        onClick={handleContact}
                        className='rounded-full bg-purple-500 text-white px-5 py-2 hover:bg-color-bg hover:text-color-button hover:transition-all blur: transition-all'
                    >Contact me</button>
                </div>
            </div>
        </div>
    )
}

export default About