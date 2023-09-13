import React, { useEffect, useRef, useState } from 'react';
import { Alert, Form, Input, Select, DatePicker, message, Upload, Button, Space } from 'antd';
import { apiGetAllSubjects } from '../../../services/SubjectServices';
import { apiGetAllTeachers } from '../../../services/TeacherServices';
import dayjs from 'dayjs';
import { UploadOutlined } from '@ant-design/icons';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '../../../firebase';
import { apiCreateCourse } from '../../../services/CourseServices';
import { useNavigate } from 'react-router-dom';


const { RangePicker } = DatePicker

const UpdateCourseForm = ({ course }) => {
    const [subjectList, setSubjectList] = useState();
    const [teacherList, setTeacherList] = useState();
    const [courseTime, setCourseTime] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();

    const oldData = course.record;
    console.log(oldData);

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
        return (() => console.log('Unmount'))
    }, [])


    const handleOnchangeDate = (date, dateString) => {
        setCourseTime(dateString)
    }

    const uploadImage = async (imageUpload) => {
        const newName = `${imageUpload.name + v4()}`
        const imageRef = ref(storage, `images/${newName}`);
        let url = '';
        url = await uploadBytes(imageRef, imageUpload)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then(link => link)
        return url;
    }


    const onFinish = async (value) => {
        console.log(value);
        setIsLoading(true);
        const data = {
            name: value.name,
            subject_id: value.subject_id,
            teacher_id: value.teacher_id,
            start_at: courseTime[0],
            end_at: courseTime[1],
            image: await uploadImage(value.image.file),
        }
        console.log(data);
        const response = await apiCreateCourse(data);
        setIsLoading(false);
        message.success('Add successfully');
        form.resetFields();
        console.log(response);
    }



    return (
        <Form
            form={form}
            onFinish={onFinish}
            name="trigger"
            style={{
                maxWidth: 600,
            }}
            layout="vertical"
        >

            <Form.Item
                hasFeedback
                label="Course Name"
                name="name"
                validateTrigger="onBlur"
                rules={[
                    {
                        pattern: /^[A-Z]{3,10}\d+$/,
                        message: 'Course name include UPPERCASE + number',
                    },
                    {
                        required: true,
                    }
                ]}
            >
                <Input placeholder="Example: PRO1" defaultValue={oldData.name} />
            </Form.Item>

            <Form.Item
                hasFeedback
                label="Course Subject"
                name="subject_id"
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
                    options={subjectList}
                    defaultValue={oldData.subject}
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                label="Course Teacher"
                name="teacher_id"
            >
                <Select
                    allowClear
                    placeholder="Select a teacher"
                    options={teacherList}
                    defaultValue={oldData.teacher}
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
                    format={'YYYY-MM-DD'}
                    defaultValue={[dayjs(oldData.start_at, 'DD/MM/YYYY'), dayjs(oldData.end_at, 'DD/MM/YYYY')]}
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                label="Course image"
                name="image"
            >
                <Upload
                    maxCount={1}
                    beforeUpload={(file) => {
                        console.log(file);
                        return new Promise((resolve, reject) => {
                            if (file.type.startsWith('image')) {
                                message.success('File is valid!');
                                reject('Success');
                            } else {
                                message.error('File has to be image');
                                resolve('File has to be image');
                            }
                        })
                    }}
                    accept={'.png,.jpg'}
                >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item className='flex justify-end' >
                <Space>
                    <Button
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Clear
                    </Button>
                    <Button htmlType="submit" loading={isLoading}>
                        Submit
                    </Button>
                </Space>

            </Form.Item>

        </Form >
    )
}

export default UpdateCourseForm