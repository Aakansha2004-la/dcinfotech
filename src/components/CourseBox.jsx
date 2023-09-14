import { Button, Modal, Space } from 'antd';
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';

const CourseBox = ({ course }) => {
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const { auth } = useAuth();

    const openDetail = () => {
        console.log(JSON.stringify(auth));
        setIsOpenDetail(true);
    }

    const CourseDetail = () => (
        <>
            <h1 className='text-4xl font-extrabold mb-5'>{course.name}</h1>
            <div className='flex'>
                <div className='basis-1/2 rounded-xl overflow-hidden mx-2'>
                    <img className='object-cover h-full' src={course.image}></img>
                </div>
                <div className='basis-1/2 mx-2'>
                    <Space direction='vertical'>
                        <h1 className='text-xl'>Subject: <span className='font-semibold'>{course.subject.name}</span></h1>
                        <h1 className='text-xl'>Teacher: <span className='font-semibold'>{course.teacher.full_name ?? 'None'}</span></h1>
                        <h1 className='text-xl'>From: <span className='font-semibold'>{course.startAt}</span></h1>
                        <h1 className='text-xl'>To: <span className='font-semibold'>{course.endAt}</span></h1>
                        <h1 className='text-xl'>Desription: </h1>
                        <span className='text-lg'>{course.description}</span>
                    </Space>
                </div>
            </div>
            <div className='flex justify-center mt-5'>
                <Button size='large' type='primary' className='bg-color-button'>Register</Button>
            </div>
        </>
    )


    if (course !== undefined) {
        return (
            <>
                <div
                    className='
                    rounded-lg
                    shadow-xl
                    w-72
                    m-10 mt-0
                    overflow-hidden
                    hover:cursor-pointer
                    hover:w-80
                    hover:bg-color-button
                    hover:text-gray-100
                    hover:transition-all
                    blur: transition-all'
                    onClick={openDetail}
                >
                    <div>
                        <img className='w-full h-44 object-cover' src={course.image}></img>
                    </div>
                    <div className='flex flex-col justify-center pt-3 ps-3 pb-4'>
                        <a href='#' className='font-bold text-lg'>{course.name}</a>
                        <p>{course.subject.name ?? 'Khong co'} - {course.teacher?.full_name ?? 'None'}</p>
                        <i>{course.startAt} - {course.endAt}</i>
                    </div>

                </div >
                <Modal open={isOpenDetail} onCancel={() => { setIsOpenDetail(false) }} footer={null} width={800}>
                    <CourseDetail />
                </Modal>
            </>

        )
    }
}

export default CourseBox