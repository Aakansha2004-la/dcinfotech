import React from 'react'

const CourseBox = ({ course }) => {
    if (course !== undefined) {
        return (
            <div className='rounded-lg shadow-xl w-72 m-10 mt-0 overflow-hidden hover:cursor-pointer hover:w-80 hover:bg-color-button hover:text-gray-100 hover:transition-all blur: transition-all'>
                <div>
                    <img className='w-full h-44 object-cover' src={course.image}></img>
                </div>
                <div className='flex flex-col justify-center pt-3 ps-3 pb-4'>
                    <a href='#' className='font-bold text-lg'>{course.name}</a>
                    <p>{course.subject.name ?? 'Khong co'} - {course.teacher?.full_name ?? 'None'}</p>
                    <i>{course.startAt} - {course.endAt}</i>
                </div>
            </div >
        )
    }
}

export default CourseBox