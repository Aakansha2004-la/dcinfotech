import React from 'react'
import './features.css'

const features = [
    {
        id: 1,
        name: '100 Online Courses',
        des: 'Enjoy & Develop your skills'
    },
    {
        id: 2,
        name: 'Expert Instructors',
        des: 'Enjoy & Develop your skills'
    },
    {
        id: 3,
        name: 'Life Time Access',
        des: 'Learn anytime, anywhere'
    },
    {
        id: 4,
        name: '90% Student success',
        des: 'Enjoy & Develop your skills'
    }
]

const Feature = ({ feature }) => {
    return (
        <div className="p-8 bg-white rounded-lg drop-shadow-xl h-20 flex items-center">
            <div>
                <h3 className='font-bold'>{feature.name}</h3>
                <p>{feature.des}</p>
            </div>
        </div>
    )
}

const Features = () => {
    return (
        <div className='bg-color-button flex justify-around items-center h-44'>
            {features.map(feature => {
                return <Feature feature={feature} key={feature.id} />
            })}
        </div>
    )
}

export default Features