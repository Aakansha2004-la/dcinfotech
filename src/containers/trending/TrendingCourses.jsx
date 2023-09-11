import React, { useEffect, useState } from 'react'
import CourseBox from '../../components/CourseBox'
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { apiGetCourses } from '../../services/CourseServices';
import { apiGetMostEnrolledCourse } from '../../services/EnrollServices';



const TrendingCourses = () => {

    const [hotCourses, setHotCourses] = useState(null);
    console.log(hotCourses);

    useEffect(() => {
        const getMostEnrolledCourse = async () => {
            const coursesResponse = await apiGetMostEnrolledCourse();
            const hotCourseData = coursesResponse.data.map(course => {
                return {
                    ...course,
                    startAt: dayjs(course.start_at).format('DD/MM/YYYY'),
                    endAt: dayjs(course.end_at).format('DD/MM/YYYY'),
                }
            })
            setHotCourses(hotCourseData);
        }
        getMostEnrolledCourse();
        return () => {
        }
    }, [])


    return (
        <div id='trending_course' className='flex-col justify-center items-center'>
            <h3 className='font-bold text-4xl my-20 text-center'>Most Trending Course</h3>
            <div className='mb-20 flex flex-row justify-center items-center'>
                {hotCourses && hotCourses?.map(course => {
                    return <CourseBox course={course} key={course.id} />
                })}
            </div>
        </div>
    )
}

export default TrendingCourses