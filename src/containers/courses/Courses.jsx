import React, { useEffect, useState } from 'react'
import { Input } from 'antd';
import CourseBox from '../../components/CourseBox';
import { Pagination } from '@mui/material';
import { apiGetCourses } from '../../services/CourseServices';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { apiGetClasses } from '../../services/ClassServices';
import MultiSelectTeachers from '../../components/MultiSelectTeachers';
import MultiSelectSubjects from '../../components/MultiSelectSubjects';
import { apiGetMostEnrolledCourse } from '../../services/EnrollServices';
import { toast } from 'react-toastify';


const { RangePicker } = DatePicker;

const { Search } = Input;

const Courses = () => {

    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [teacherIds, setTeacherIds] = useState([]);
    const [subjectIds, setSubjectIds] = useState([]);

    const [hotCourse, setHotCourse] = useState(null);



    useEffect(() => {
        const getMostEnrolledCourse = async () => {
            const courseResponse = await apiGetMostEnrolledCourse();
            console.log(courseResponse);
            const hotCourseData = {
                ...courseResponse.data[0],
                startAt: dayjs(courseResponse.data[0].start_at).format('DD/MM/YYYY'),
                endAt: dayjs(courseResponse.data[0].end_at).format('DD/MM/YYYY'),
            }
            setHotCourse(hotCourseData);
        }
        getMostEnrolledCourse();
        return () => {
        }
    }, [])

    useEffect(() => {
        apiGetCourses('ASC', page, 4, search, startDate, endDate, teacherIds, subjectIds)
            .then((coursesResponse) => {
                console.log(coursesResponse);
                const meta = coursesResponse.data.meta;
                console.log(meta);
                setTotalPage(meta.pageCount);
                const get = coursesResponse.data.data?.map(course => {
                    return {
                        ...course,
                        startAt: dayjs(course.start_at).format('DD/MM/YYYY'),
                        endAt: dayjs(course.end_at).format('DD/MM/YYYY'),
                    }
                });
                // console.log(Array.isArray(get));
                setCourses(get);
            })
            .catch((error) => {
                toast.error(error);
                return;
            })
        return () => {
            console.log('Unmount Courses');
        }
    }, [page, search, startDate, endDate, teacherIds, subjectIds]);
    // const getCourse = async () => {



    //     //     const coursesResponse = await apiGetCourses('ASC', page, 4, search, startDate, endDate, teacherIds, subjectIds);
    //     //     console.log(coursesResponse);
    //     //     const meta = coursesResponse.data.meta;
    //     //     console.log(meta);
    //     //     setTotalPage(meta.pageCount);
    //     //     const get = coursesResponse.data.data?.map(course => {
    //     //         return {
    //     //             ...course,
    //     //             startAt: dayjs(course.start_at).format('DD/MM/YYYY'),
    //     //             endAt: dayjs(course.end_at).format('DD/MM/YYYY'),
    //     //         }
    //     //     });
    //     //     // console.log(Array.isArray(get));
    //     //     setCourses(get);
    //     //     return () => {
    //     //         console.log('Unmount Courses');
    //     //     }
    //     // }
    //     // getCourse();
    // }, [page, search, startDate, endDate, teacherIds, subjectIds])

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleChangeSearch = (e) => {
        // console.log(e.target.value);
        setSearch(e.target.value);
        console.log(search);
    }

    const handleOnchangeDate = (dates, [start, end]) => {
        if (dates) {
            setStartDate(start);
            setEndDate(end)
        } else {
            setStartDate('2020-01-01');
            setEndDate('2030-01-01')
        }
    }

    const getClasses = async () => {
        const res = await apiGetClasses();
        console.log(res);
    }

    const onChangeTeachers = (value) => {
        const teacherIds = value.map(v => v.value)
        setTeacherIds(teacherIds);
        console.log(teacherIds);
    }

    const onChangeSubjects = (value) => {
        const subjectIds = value.map(v => v.value)
        setSubjectIds(subjectIds);
        console.log(subjectIds);
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='h-full w-5/6 bg-color-bg shadow-2xl rounded-2xl flex overflow-hidden'>
                <div className='basis-1/3 w-96 bg-color-button'>
                    <h3 className='pt-10 px-10 font-bold text-4xl text-white'>Courses</h3>
                    <div className='flex flex-col items-center justify-center'>
                        <Search
                            onChange={handleChangeSearch}
                            placeholder="Search what you wanna learn"
                            allowClear
                            style={{ width: '90%', marginBlock: '15px' }} />
                        <RangePicker
                            onChange={handleOnchangeDate}
                            style={{ width: '90%', marginBlock: '15px' }}
                            defaultValue={[dayjs('01/01/2020', 'DD/MM/YYYY'), dayjs('01/01/2030', 'DD/MM/YYYY')]}
                            format={'YYYY-MM-DD'}
                        />
                        <MultiSelectTeachers
                            value={teacherIds}
                            onChange={onChangeTeachers}
                        />
                        <MultiSelectSubjects
                            value={subjectIds}
                            onChange={onChangeSubjects}
                        />
                    </div>
                    <div className='w-full'>
                        <h3 className='px-10 py-5 font-bold text-4xl text-white'>Hot Course</h3>
                        <div className='flex justify-center'>
                            {hotCourse && <CourseBox course={hotCourse} />}
                        </div>
                    </div>
                </div>
                <div className='basis-3/4 flex justify-center mt-10 relative'>
                    <div className='h-full w-full flex justify-center items-start'>
                        <div className='h-full mx-2 flex flex-wrap justify-center items-start' style={{ width: '89%' }}>
                            {courses.map((course, index) => <CourseBox course={course} key={index} />)}
                        </div>
                    </div>
                    <Pagination
                        style={{ position: 'absolute', bottom: '0' }}
                        onChange={handleChange}
                        page={page}
                        className='pb-2'
                        count={totalPage}
                    />
                </div>
                <div></div>
            </div>
        </div>

    )
}

export default Courses