import React from 'react'

const About = () => {
    return (
        <div className='flex justify-center mx-52 shadow-lg rounded-2xl overflow-hidden'>
            <div className='basis-2/5 flex justify-center items-center h-96  p-10 px-20 overflow-hidden'>
                <div className='w-5/6 h-full rounded-full overflow-hidden border-8 border-color-button'>
                    <img src='./image/about.png' className='object-cover'></img>
                </div>
            </div>
            <div className='basis-3/5 h-96 p-10 px-20 bg-color-button text-gray-100'>
                <h3 className='font-bold text-4xl mb-5'>About me</h3>
                <i className='text-lg'>LMS starts as my pracitice project when I joined Tinasoft for my intership. Luckily, my mentor found me potential,
                    then he taught me which to start, where to learn and who to study. Therefore, my skills were improved day by day.
                    LMS has been built by all of dedications and hard-work, please enjoy your experience here.
                </i>
                <div className='flex justify-end mt-5'>
                    <button className='rounded-full bg-slate-500 text-slate-100 px-5 py-2 hover:bg-color-bg hover:text-color-button'>Contact me</button>
                </div>
            </div>
        </div>
    )
}

export default About