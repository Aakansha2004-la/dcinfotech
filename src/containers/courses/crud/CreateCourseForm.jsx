import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, message, Upload, Button, Space } from 'antd';
import { apiGetAllSubjects } from '../../../services/SubjectServices';
import { apiGetAllTeachers } from '../../../services/TeacherServices';
import dayjs from 'dayjs';
import { UploadOutlined } from '@ant-design/icons';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '../../../firebase';
import { apiCreateCourse } from '../../../services/CourseServices';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

const { RangePicker } = DatePicker;

const CreateCourseForm = ({ onClose, fetchCourses }) => {
    const [subjectList, setSubjectList] = useState([]);
    const [teacherList, setTeacherList] = useState([]);
    const [courseTime, setCourseTime] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const getAllSubjects = async () => {
            try {
                const subjectsResponse = await apiGetAllSubjects();
                if (subjectsResponse.success) {
                    const subjects = subjectsResponse.data?.map((sub) => ({
                        value: sub.id,
                        label: sub.name,
                    })) || [];
                    setSubjectList(subjects);
                } else {
                    console.error('Failed to fetch subjects:', subjectsResponse.message);
                }
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        const getAllTeachers = async () => {
            try {
                const teachersResponse = await apiGetAllTeachers();
                if (teachersResponse.success) {
                    const teachers = teachersResponse.data?.map((sub) => ({
                        value: sub.id,
                        label: sub.full_name,
                    })) || [];
                    setTeacherList(teachers);
                } else {
                    console.error('Failed to fetch teachers:', teachersResponse.message);
                }
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        getAllSubjects();
        getAllTeachers();
    }, []);

    const handleOnchangeDate = (date, dateString) => {
        if (dateString && dateString.length === 2) {
            setCourseTime(dateString);
        } else {
            setCourseTime([]);
        }
    };

    const uploadImage = async (imageUpload) => {
        try {
            const newName = `${imageUpload.name + v4()}`;
            const imageRef = ref(storage, `images/${newName}`);
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);
            return url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        }
    };

    const onFinish = async (value) => {
        setIsLoading(true);
        try {
            const imageUrl = await uploadImage(value.image.file);
            const data = {
                name: value.name,
                subject_id: value.subject_id,
                teacher_id: value.teacher_id,
                start_at: courseTime[0],
                end_at: courseTime[1],
                description: value.description,
                image: imageUrl,
            };
            const response = await apiCreateCourse(data);
            if (response.success) {
                message.success('Course created successfully');
                form.resetFields();
                onClose();
                fetchCourses();
                navigate('/admin/courses');
            } else {
                message.error(response.data || 'Failed to create course');
            }
        } catch (error) {
            console.error('Error creating course:', error);
            message.error('An error occurred while creating the course');
        } finally {
            setIsLoading(false);
        }
    };

    const beforeUpload = (file) => {
        return new Promise((resolve, reject) => {
            if (file.type.startsWith('image')) {
                message.success('File is valid!');
                resolve(file);
            } else {
                message.error('File has to be an image');
                reject('File has to be an image');
            }
        });
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            name="trigger"
            style={{ maxWidth: 600 }}
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
                        message: 'Course name must include UPPERCASE letters and numbers',
                    },
                    { required: true },
                ]}
            >
                <Input placeholder="Example: PRO1" />
            </Form.Item>

            <Form.Item
                hasFeedback
                label="Course Subject"
                name="subject_id"
                validateTrigger="onBlur"
                rules={[{ required: true, message: 'Course subject is required' }]}
            >
                <Select placeholder="Select a subject" options={subjectList} />
            </Form.Item>

            <Form.Item
                hasFeedback
                label="Course Teacher"
                name="teacher_id"
            >
                <Select allowClear placeholder="Select a teacher" options={teacherList} />
            </Form.Item>

            <Form.Item
                hasFeedback
                label="Course Time"
                name="course_time"
                validateTrigger="onBlur"
                rules={[{ required: true }]}
            >
                <RangePicker
                    style={{ width: '100%' }}
                    onChange={handleOnchangeDate}
                    format={'YYYY-MM-DD'}
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                label="Description"
                name="description"
            >
                <TextArea rows={3} maxLength={200} placeholder="Max 200 words" />
            </Form.Item>

            <Form.Item
                hasFeedback
                label="Course Image"
                name="image"
                validateTrigger="onBlur"
                rules={[{ required: true }]}
            >
                <Upload
                    maxCount={1}
                    beforeUpload={beforeUpload}
                    accept=".png,.jpg"
                >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item className="flex justify-end">
                <Space>
                    <Button onClick={() => form.resetFields()}>Clear</Button>
                    <Button htmlType="submit" loading={isLoading} type="primary" className="bg-color-button">
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default CreateCourseForm;