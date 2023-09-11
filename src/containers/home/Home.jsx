import React from 'react'
import Header from '../header/Header'
import Features from '../features/Features'
import TrendingCourses from '../trending/TrendingCourses'
import About from '../about/About'
import Contact from '../contact/Contact'

const Home = () => {
    return (
        <>
            <Header />
            <Features />
            <TrendingCourses />
            <About />
            <Contact />
        </>
    )
}

export default Home