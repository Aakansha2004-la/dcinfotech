import React, { useEffect, useState } from 'react';
import CourseBox from '../../components/CourseBox';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { apiGetMostEnrolledCourse } from '../../services/EnrollServices';

const TrendingCourses = () => {
    const [hotCourses, setHotCourses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMostEnrolledCourse = async () => {
            try {
                const coursesResponse = await apiGetMostEnrolledCourse();
                if (coursesResponse && coursesResponse.data) {
                    const hotCourseData = coursesResponse.data.map(course => ({
                        ...course,
                        startAt: dayjs(course.start_at).format('DD/MM/YYYY'),
                        endAt: dayjs(course.end_at).format('DD/MM/YYYY'),
                    }));
                    setHotCourses(hotCourseData);
                } else {
                    throw new Error('Invalid response structure');
                }
            } catch (error) {
                console.error('Error fetching most enrolled courses:', error);
                setError('Failed to load trending courses. Please try again later.');
                toast.error('Failed to load trending courses. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        getMostEnrolledCourse();
    }, []);

    if (loading) {
        return <div className="text-center my-20">Loading trending courses...</div>;
    }

    if (error) {
        return <div className="text-center my-20 text-red-500">{error}</div>;
    }

    return (
        <div id='trending_course' className='flex-col justify-center items-center'>
            <h3 className='font-bold text-4xl my-20 text-center'>Most Trending Courses</h3>
            <div className='mb-20 flex flex-row justify-center items-center flex-wrap'>
                {hotCourses && hotCourses.map(course => (
                    <div className='mx-10 my-5' key={course.id}>
                        <CourseBox data={course} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingCourses;