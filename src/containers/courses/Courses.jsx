import React, { useEffect, useState } from 'react'
import { Input, Modal } from 'antd';
import CourseBox from '../../components/CourseBox';
import { Pagination } from '@mui/material';
import { apiGetCourses } from '../../services/CourseServices';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { apiGetClasses } from '../../services/ClassServices';
import MultiSelectTeachers from '../../components/MultiSelectTeachers';
import { apiGetMostEnrolledCourse } from '../../services/EnrollServices';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import MultiSelectSubjects from '../../components/MultiSelectSubjects';
import { displayDateFormat, valueDateFormat } from '../common';


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

    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const getMostEnrolledCourse = async () => {
            const courseResponse = await apiGetMostEnrolledCourse();
            console.log(courseResponse);
            setHotCourse(courseResponse.data[0]);
        }
        getMostEnrolledCourse();
        return () => {
        }
    }, [])

    useEffect(() => {
        try {
            apiGetCourses('ASC', page, 4, search, startDate, endDate, teacherIds, subjectIds)
                .then((coursesResponse) => {
                    console.log(coursesResponse);
                    const meta = coursesResponse.data.meta;
                    console.log(meta);
                    setTotalPage(meta.pageCount);
                    setCourses(coursesResponse.data.data);
                })
                .catch((error) => {
                    toast.error(error);
                    return;
                })
        } catch (e) {
            toast.error(e + '');
        }

        return () => {
            console.log('Unmount Courses');
        }
    }, [page, search, startDate, endDate, teacherIds, subjectIds]);

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
                            className='w-11/12 my-3'
                        />
                        <RangePicker
                            onChange={handleOnchangeDate}
                            defaultValue={[dayjs('01/01/2020', displayDateFormat), dayjs('01/01/2030', displayDateFormat)]}
                            format={valueDateFormat}
                            className='w-11/12 my-3'
                        />
                        <MultiSelectTeachers
                            value={teacherIds}
                            onChange={onChangeTeachers}
                            className={'w-11/12 my-3'}
                        />
                        <MultiSelectSubjects
                            className={'w-11/12 my-3'}
                            mode={'multiple'}
                            value={subjectIds}
                            onChange={onChangeSubjects}
                        />
                    </div>
                    <div className='w-full'>
                        <h3 className='px-10 py-5 font-bold text-4xl text-white'>Hot Course</h3>
                        <div className='flex justify-center'>
                            {hotCourse && <CourseBox data={hotCourse} />}
                        </div>
                    </div>
                </div>
                <div className='basis-3/4 flex justify-center mt-10 relative'>
                    <div className='h-full w-full flex justify-center items-start'>
                        <div className='h-full mx-2 flex flex-wrap justify-center items-start' style={{ width: '89%' }}>
                            {courses.map((course, index) => <div className='mx-10'><CourseBox data={course} key={index} /></div>)}
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
            </div>
        </div>

    )
}

export default Courses