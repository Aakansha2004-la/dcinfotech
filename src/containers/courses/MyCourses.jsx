import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { apiGetEnrolledCourse } from '../../services/EnrollServices';
import { Empty, Spin } from 'antd';
import CourseBox from '../../components/CourseBox';

const MyCourses = () => {
    const { auth } = useAuth();
    const [courses, setCourses] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const getApi = async () => {
        setIsLoading(true);
        const response = await apiGetEnrolledCourse();
        setIsLoading(false);
        setCourses(response.data);
    }

    useEffect(() => {
        getApi();
    }, [])

    return (
        <div className='w-100%'>
            <h1 className='text-5xl font-extrabold ms-20 '>My Courses</h1>
            <div className='flex justify-center items-center rounded-xl w-11/12 my-20 mt-5 py-10 mx-auto'>
                {
                    isLoading ? <Spin size='large' /> : (
                        <div className='flex flex-wrap justify-start w-full px-auto'>
                            {
                                courses?.length > 0 ?
                                    courses.map((course, index) => <div className='mx-5 my-10'><CourseBox data={course.course} key={index} enroll_date={course.enroll_date} /></div>)
                                    :
                                    <Empty />
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MyCourses