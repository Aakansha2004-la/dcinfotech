import { Button, Modal, Space, Spin, message } from 'antd';
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import { apiEnrollCourse } from '../services/EnrollServices';
import dayjs from 'dayjs';

const CourseBox = ({ data, enroll_date }) => {
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { auth } = useAuth();

    console.log(data);

    const course = {
        ...data,
        startAt: dayjs(data.start_at).format('DD/MM/YYYY'),
        endAt: dayjs(data.end_at).format('DD/MM/YYYY'),
    }


    const openDetail = () => {
        console.log(JSON.stringify(auth));
        setIsOpenDetail(true);
    }

    const handleRegister = async () => {
        setIsLoading(true);
        const response = await apiEnrollCourse(course.id);
        setIsLoading(false);
        if (response.success) {
            message.success('Register successfully');
            setIsOpenDetail(false);
        } else {
            message.error(response.data);
        }
    }

    const CourseDetail = () => (
        <>
            <h1 className='text-4xl font-extrabold'>{course.name}</h1>
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
                <Button
                    onClick={handleRegister}
                    size='large'
                    type={!isLoading && 'primary'}
                    className={!isLoading && 'bg-color-button'}
                >
                    {isLoading ? <Spin /> : 'Register'}
                </Button>
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
                    {
                        enroll_date &&
                        <div className='flex justify-center border-t-2 py-2'>
                            <b>
                                Enrolled:  {dayjs(enroll_date).format('DD/MM/YYYY')}
                            </b>

                        </div>
                    }

                </div >
                <Modal open={isOpenDetail} onCancel={() => { setIsOpenDetail(false) }} footer={null} width={800}>
                    <CourseDetail />
                </Modal>
            </>

        )
    }
}

export default CourseBox