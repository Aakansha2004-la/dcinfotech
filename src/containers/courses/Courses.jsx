import React, { useEffect, useState } from 'react';
import { Input, DatePicker } from 'antd';
import CourseBox from '../../components/CourseBox';
import { Pagination } from '@mui/material';
import { apiGetCourses } from '../../services/CourseServices';
import dayjs from 'dayjs';
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
    const [loading, setLoading] = useState(false);

    const { auth } = useAuth();

    // Fetch the most enrolled course
    useEffect(() => {
        const getMostEnrolledCourse = async () => {
            try {
                const courseResponse = await apiGetMostEnrolledCourse();
                if (courseResponse.success) {
                    setHotCourse(courseResponse.data[0]);
                } else {
                    toast.error('Failed to fetch most enrolled course');
                }
            } catch (error) {
                console.error('Error fetching most enrolled course:', error);
                toast.error('An error occurred while fetching most enrolled course');
            }
        };

        getMostEnrolledCourse();
    }, []);

    // Fetch courses based on filters
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const coursesResponse = await apiGetCourses(
                    'ASC',
                    page,
                    4,
                    search,
                    startDate,
                    endDate,
                    teacherIds,
                    subjectIds
                );
                if (coursesResponse.success) {
                    const meta = coursesResponse.data?.meta || {};
                    setTotalPage(meta.pageCount || 0);
                    setCourses(coursesResponse.data?.data || []);
                } else {
                    toast.error('Failed to fetch courses');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
                toast.error('An error occurred while fetching courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [page, search, startDate, endDate, teacherIds, subjectIds]);

    // Handle pagination change
    const handleChange = (event, value) => {
        setPage(value);
    };

    // Handle search input change
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    // Handle date range change
    const handleOnchangeDate = (dates, [start, end]) => {
        if (dates) {
            setStartDate(start);
            setEndDate(end);
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    };

    // Handle teacher selection change
    const onChangeTeachers = (value) => {
        const teacherIds = value?.map((v) => v.value) || [];
        setTeacherIds(teacherIds);
    };

    // Handle subject selection change
    const onChangeSubjects = (value) => {
        const subjectIds = value?.map((v) => v.value) || [];
        setSubjectIds(subjectIds);
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="h-full w-5/6 bg-color-bg shadow-2xl rounded-2xl flex overflow-hidden">
                {/* Sidebar */}
                <div className="basis-1/3 w-96 bg-color-button">
                    <h3 className="pt-10 px-10 font-bold text-4xl text-white">Courses</h3>
                    <div className="flex flex-col items-center justify-center">
                        <Search
                            onChange={handleChangeSearch}
                            placeholder="Search what you wanna learn"
                            allowClear
                            className="w-11/12 my-3"
                        />
                        <RangePicker
                            onChange={handleOnchangeDate}
                            defaultValue={[dayjs('01/01/2020', displayDateFormat), dayjs('01/01/2030', displayDateFormat)]}
                            format={valueDateFormat}
                            className="w-11/12 my-3"
                        />
                        <MultiSelectTeachers
                            value={teacherIds}
                            onChange={onChangeTeachers}
                            className="w-11/12 my-3"
                        />
                        <MultiSelectSubjects
                            className="w-11/12 my-3"
                            mode="multiple"
                            value={subjectIds}
                            onChange={onChangeSubjects}
                        />
                    </div>
                    {/* Hot Course Section */}
                    <div className="w-full">
                        <h3 className="px-10 py-5 font-bold text-4xl text-white">Hot Course</h3>
                        <div className="flex justify-center">
                            {hotCourse && <CourseBox data={hotCourse} />}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="basis-3/4 flex justify-center mt-10 relative">
                    <div className="h-full w-full flex justify-center items-start">
                        {loading ? (
                            <div className="text-center my-20">Loading courses...</div>
                        ) : courses.length > 0 ? (
                            <div className="h-full mx-2 flex flex-wrap justify-center items-start" style={{ width: '89%' }}>
                                {courses.map((course, index) => (
                                    <div className="mx-10 my-5" key={index}>
                                        <CourseBox data={course} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center my-20">No courses found.</div>
                        )}
                    </div>
                    {/* Pagination */}
                    <Pagination
                        style={{ position: 'absolute', bottom: '0' }}
                        onChange={handleChange}
                        page={page}
                        className="pb-2"
                        count={totalPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Courses;