import React from 'react'
import CourseBox from '../../components/CourseBox'

const courses = [
    {
        id: 1,
        name: 'Math 1',
        subject: 'Math',
        teacher: 'Teacher',
        startAt: '2023/09/06',
        endAt: '2024/09/06',
        image: './image/math.jpg'
    },
    {
        id: 2,
        name: 'Math 2',
        subject: 'Math',
        teacher: 'Teacher',
        startAt: '2023/09/06',
        endAt: '2024/09/06',
        image: './image/math2.jpg'
    },
    {
        id: 3,
        name: 'Math 3',
        subject: 'Math',
        teacher: 'Teacher',
        startAt: '2023/09/06',
        endAt: '2024/09/06',
        image: './image/math3.jpg'
    },
]

const TrendingCourses = () => {
    return (
        <div className='flex-col justify-center items-center'>
            <h3 className='font-bold text-4xl my-20 text-center'>Most Trending Course</h3>
            <div className='mb-20 flex flex-row justify-center items-center'>
                {courses.map(course => {
                    return <CourseBox course={course} key={course.id} />
                })}
            </div>
        </div>
    )
}

export default TrendingCourses