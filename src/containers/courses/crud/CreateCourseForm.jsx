import React, { useEffect, useRef, useState } from 'react';
import { Alert, Form, Input, Select, DatePicker, message, Upload, Button } from 'antd';
import { apiGetAllSubjects } from '../../../services/SubjectServices';
import { apiGetAllTeachers } from '../../../services/TeacherServices';
import dayjs from 'dayjs';
import { UploadOutlined } from '@ant-design/icons';


const { RangePicker } = DatePicker

const CreateCourseForm = () => {
    const [courseName, setCourseName] = useState('');
    // const courseName = useRef();
    const [subjectId, setSubjectId] = useState(0);
    const [teacherId, setTeacherId] = useState(0);
    const [subjectList, setSubjectList] = useState();
    const [teacherList, setTeacherList] = useState();
    const [startTime, setStartTime] = useState();



    useEffect(() => {
        const getAllSubjects = async () => {
            const subjectsResponse = await apiGetAllSubjects();
            console.log('subjects: ' + JSON.stringify(subjectsResponse.data));
            const subjects = subjectsResponse.data.map((sub) => ({
                value: sub.id,
                label: sub.name
            }))
            setSubjectList(subjects);
        }
        const getAllTeachers = async () => {
            const teachersResponse = await apiGetAllTeachers();
            console.log('Teachers: ' + JSON.stringify(teachersResponse.data));
            const teachers = teachersResponse.data.map((sub) => ({
                value: sub.id,
                label: sub.full_name
            }))
            setTeacherList(teachers);
        }
        getAllSubjects();
        getAllTeachers();
    }, [])

    const onChangeSubject = (value) => {
        const subjectId = value;
        setSubjectId(subjectId);
        console.log(subjectId);
        console.log(courseName.current)
    }

    const onChangeTeacher = (value) => {
        const teacherId = value;
        setTeacherId(teacherId);
        console.log(teacherId);
    }

    // const filterOption = (input, option) =>
    //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const handleOnchangeDate = (date, [start, end]) => {
        console.log(`${start} to ${end}`);
    }

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                console.log(info);
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Form
            name="trigger"
            style={{
                maxWidth: 600,
            }}
            layout="vertical"
        >

            <Form.Item
                hasFeedback
                label="Course Name"
                name="course_name"
                validateTrigger="onBlur"
                rules={[
                    {
                        pattern: /^[A-Z]{3,5}\d+$/,
                        message: 'Course name starts with Uppercase of subjects and number',
                    },
                    {
                        required: true,
                    }
                ]}
            >
                <Input placeholder="Example: PRO1" onChange={(e) => { setCourseName(e.target.value) }} />
            </Form.Item>

            <Form.Item
                hasFeedback
                label="Course Subject"
                name="course_subject"
                validateTrigger="onBlur"
                rules={[
                    {
                        required: true,
                        message: 'Course subject is required',
                    },
                ]}
            >
                <Select
                    placeholder="Select a subject"
                    onChange={onChangeSubject}
                    options={subjectList}
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                label="Course Teacher"
                name="course_teacher"
            >
                <Select
                    allowClear
                    placeholder="Select a teacher"
                    onChange={onChangeTeacher}
                    options={teacherList}
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                label="Course Time"
                name="course_time"
                validateTrigger="onBlur"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <RangePicker
                    style={{ width: '100%' }}
                    onChange={handleOnchangeDate}
                    defaultValue={[dayjs('01/01/2020', 'DD/MM/YYYY'), dayjs('01/01/2030', 'DD/MM/YYYY')]}
                    format={'YYYY-MM-DD'}
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                label="Course image"
                name="course_image"
                validateTrigger="onBlur"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item className='flex justify-end' >
                <Button htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

        </Form >
    )
}

export default CreateCourseForm