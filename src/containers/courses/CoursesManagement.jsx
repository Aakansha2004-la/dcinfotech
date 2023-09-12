import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { apiGetCourses } from '../../services/CourseServices';
import { Button, Modal, Pagination, Space, Table } from 'antd';
import { showDeleteConfirm } from '../../components/crud/crud';
import CreateCourseForm from './crud/CreateCourseForm';

const CoursesManagement = () => {

    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [teacherIds, setTeacherIds] = useState([]);
    const [subjectIds, setSubjectIds] = useState([]);
    const [pageSize, setPageSize] = useState(5);

    const [isOpenCreate, setIsOpenCreate] = useState(false);

    console.log('Lai render a');

    useEffect(() => {
        try {
            apiGetCourses('ASC', page, pageSize, search, startDate, endDate, teacherIds, subjectIds)
                .then((coursesResponse) => {
                    console.log(coursesResponse);
                    const meta = coursesResponse.data.meta;
                    console.log(meta);
                    setTotal(meta.itemCount);
                    const get = coursesResponse.data.data?.map(course => {
                        return {
                            ...course,
                            start_at: dayjs(course.start_at).format('DD/MM/YYYY'),
                            end_at: dayjs(course.end_at).format('DD/MM/YYYY'),
                        }
                    });
                    // console.log(Array.isArray(get));
                    setCourses(get);
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
    }, [pageSize, page, search, startDate, endDate, teacherIds, subjectIds]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 100
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            sorter: (a, b) => a.subject.localeCompare(b.subject),
        },
        {
            title: 'Teacher',
            key: 'teacher',
            dataIndex: 'teacher',
            sorter: (a, b) => a.teacher.localeCompare(b.teacher),
        },
        {
            title: 'Start Time',
            key: 'start_at',
            dataIndex: 'start_at',
        },
        {
            title: 'End Time',
            key: 'end_at',
            dataIndex: 'end_at',
        },
        {
            title: 'Image',
            key: 'image',
            dataIndex: 'image',
            ellipsis: true,

        },
        {
            title: 'Created at',
            key: 'created',
            dataIndex: 'created',
        },
        {
            title: 'Updated at',
            key: 'updated',
            dataIndex: 'updated',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        onClick={() => { handleEditCourse({ record }) }}
                        type='default'
                    >Edit</Button>
                    <Button
                        onClick={() => { deleteConfirmCourse(record) }}
                        danger
                    >Delete</Button>
                </Space>
            ),
            width: 200
        },
    ];

    const handleEditCourse = ({ record }) => {
        console.log(record);
    }

    const deleteConfirmCourse = (course) => {
        const content = (
            <div>
                <p><b>Name: {course.name}</b></p>
                <p>Subject: {course.subject}</p>
                <p>Teacher: {course.teacher}</p>
                <p><i>From {course.start_at} to {course.end_at}</i></p>
            </div>
        )
        showDeleteConfirm('Do you want to delete this course?', content)
    }

    const data = courses?.map(course => (
        {
            ...course,
            subject: course.subject.name,
            teacher: course?.teacher.full_name,
            created: dayjs(course.created).format('DD/MM/YYYY'),
            updated: dayjs(course.updated).format('DD/MM/YYYY'),
        }
    ))

    const onShowSizeChange = (current, newPageSize) => {
        setPageSize(newPageSize);
    }

    const handlePageChange = (currentPage) => {
        setPage(currentPage);
    }


    return (
        <div className='mx-20'>
            <div className='flex justify-between'>
                <h3 className='font-bold text-4xl mb-10'>Courses Management</h3>
                <Button size='large' type='dashed' onClick={() => { setIsOpenCreate(true) }}>Add New Course</Button>
            </div>
            <div>
                <Table columns={columns} dataSource={data} pagination={false} />
                <div className='flex justify-center my-10 w-full'>
                    <Pagination
                        showSizeChanger
                        defaultCurrent={1}
                        defaultPageSize={5}
                        onShowSizeChange={onShowSizeChange}
                        total={total}
                        pageSizeOptions={[5, 10, 15, 20]}
                        onChange={handlePageChange}
                    />
                </div>
                <Modal style={{ top: 50 }} footer={null} title={'Create New Course'} open={isOpenCreate} onCancel={() => { setIsOpenCreate(false) }}>
                    <div>
                        <CreateCourseForm />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default CoursesManagement