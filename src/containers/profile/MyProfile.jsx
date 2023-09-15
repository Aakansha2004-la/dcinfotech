import React, { useEffect, useState } from 'react'
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid'
import { Button, DatePicker, Form, Image, Input, Modal, Select, Space, Spin, Upload, message } from 'antd';
import useAuth from '../../hooks/useAuth';
import { apiGetUserProfile } from '../../services/UserServices';
import { UploadOutlined } from '@ant-design/icons';
import { apiUpdateStudent } from '../../services/StudentServices';
import dayjs from 'dayjs';

const MyProfile = ({ user, profile, fetchProfile }) => {
    const [isOpenChangeAva, setIsOpenChangeAva] = useState(false);
    const [isOpenChangeProfile, setIsOpenChangeProfile] = useState(false);
    const [uploadFile, setUploadFile] = useState();
    const [isLoading, setIsLoading] = useState(false);

    console.log(profile);

    const url = uploadFile ? URL.createObjectURL(uploadFile) : null;

    const profiles = [
        <>
            <b>Full name: </b>
            <span>{profile?.full_name}</span>
        </>,
        <>
            <b>Email: </b>
            <span>{user?.email}</span>
        </>,
        <>
            <b>Gender: </b>
            <span>{profile?.gender}</span>
        </>,
        <>
            <b>Date of Birth: </b>
            <span>{profile?.dob}</span>
        </>,
        <>
            <b>Address: </b>
            <span>{profile?.address ?? 'Unknown'}</span>
        </>

    ]

    if (user?.roles?.find(role => role.authority === 'student')) {
        profiles.push(
            <>
                <b>Rank: </b>
                <span>{profile.rank ?? 'Unknown'}</span>
            </>,
            <>
                <b>Conduct: </b>
                <span>{profile.conduct ?? 'Unknown'}</span>
            </>
        )
    }

    const beforeUpload = (file) => {
        return new Promise((resolve, reject) => {
            if (file.type.startsWith('image')) {
                message.success('File is valid!');
                reject('Success');
            } else {
                message.error('File has to be image');
                resolve('File has to be image');
            }
        })
    }

    const onChangeImage = (file) => {
        if (file.file.status === 'removed') {
            setUploadFile(null);
        } else {
            if (file.file.type?.startsWith('image')) {
                console.log(file.file);
                setUploadFile(file.file);
            }
        }
    }

    const handleChangeAvatar = async () => {
        console.log(uploadFile);
        if (uploadFile) {
            setIsLoading(true);
            const url = await uploadImageFirebase(uploadFile);
            console.log(url);
            const response = await apiUpdateStudent({ id: profile.id, studentChange: { avatar: url } });
            setIsLoading(false);
            if (response.success) {
                message.success('Change avatar successfully!');
                fetchProfile();
                setIsOpenChangeAva(false);
            } else {
                message.error(response.data);
            }
        }
    }

    const uploadImageFirebase = async (imageUpload) => {
        const newName = `${imageUpload.name + v4()}`
        const imageRef = ref(storage, `images/${newName}`);
        return await uploadBytes(imageRef, imageUpload)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then(link => link)
    }

    const onFinish = async (value) => {
        const data = {
            ...value,
            dob: dayjs(value.dob).format('YYYY-MM-DD')
        }
        setIsLoading(true);
        const response = await apiUpdateStudent({ id: profile.id, studentChange: data });
        setIsLoading(false);
        if (response.success) {
            message.success('Edit successfully');
            fetchProfile();
            setIsOpenChangeProfile(false);
        } else {
            message.error(response.data);
        }
    }

    const validateDate = (value) => {
        console.log(value);
    }

    return (
        <>
            <h1 className='text-4xl font-semibold text-color-button mb-10' >My Profile</h1>
            <div className='flex w-full items-center'>
                <div className='basis-2/5 flex flex-col items-center mx-3'>
                    <Image
                        src={profile?.avatar}
                        className='rounded-2xl my-5'
                        width={250}
                    >
                    </Image>
                    <Button className='bg-color-button' type='primary' onClick={() => { setIsOpenChangeAva(true) }}>Change Avatar</Button>
                </div>
                <Space size={'large'} direction='vertical' className='basis-3/5 w-full mx-3'>
                    {profiles.map((p, i) => <div className='w-full border-b-2' key={i}>{p}</div>)}
                    <div className='flex justify-center'>
                        <Button className='bg-color-button' type='primary' onClick={() => { setIsOpenChangeProfile(true) }}>Edit Profile</Button>
                    </div>
                </Space>
            </div>
            <Modal title={'Change avatar'} open={isOpenChangeAva} onCancel={() => { setIsOpenChangeAva(false) }} footer={null}>
                <div className='flex flex-col'>
                    <div className='flex justify-center'>
                        <Image
                            src={url || profile?.avatar}
                            className='rounded-2xl my-5 mx-auto'
                            width={250}
                        >
                        </Image>
                    </div>

                    <Upload
                        maxCount={1}
                        beforeUpload={beforeUpload}
                        accept={'.png,.jpg'}
                        onChange={onChangeImage}
                        className='mb-5'
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    <Button
                        type={!isLoading && 'primary'}
                        className={!isLoading && 'bg-color-button'}
                        onClick={handleChangeAvatar}
                        size='large'
                    >
                        {isLoading ? <Spin /> : 'Change Avatar'}
                    </Button>
                </div>
            </Modal>
            <Modal title='Edit Profile' open={isOpenChangeProfile} onCancel={() => { setIsOpenChangeProfile(false) }} footer={null}>
                <Form
                    onFinish={onFinish}
                    style={{
                        maxWidth: 600,
                    }}
                    layout="vertical"
                >
                    <Form.Item
                        hasFeedback
                        label="Full Name"
                        name="full_name"
                        validateTrigger="onBlur"
                        rules={[
                            {
                                pattern: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                                message: 'Please enter your real full name',
                            },
                            {
                                required: true,
                            }
                        ]}
                        initialValue={profile?.full_name}
                    >
                        <Input placeholder="Example: Nguyen Quang Tu" />
                    </Form.Item>

                    {/* <Form.Item
                        hasFeedback
                        label="Email"
                        name="email"
                        validateTrigger="onBlur"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                            }
                        ]}
                        initialValue={user?.email}
                    >
                        <Input placeholder="Example: quangtu2301@gmail.com" />
                    </Form.Item> */}

                    <Form.Item
                        hasFeedback
                        label="Gender"
                        name="gender"
                        validateTrigger="onBlur"
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                        initialValue={profile?.gender}
                    >
                        <Select
                            style={{ width: 120 }}
                            options={[
                                { value: 'Male', label: 'Male' },
                                { value: 'Female', label: 'Female' },
                                { value: 'Unknown', label: 'Unknown' }
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Date of Birth"
                        name="dob"
                        validateTrigger="onBlur"
                        initialValue={dayjs(profile?.dob)}
                    >
                        <DatePicker onChange={validateDate} />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Address"
                        name="address"
                        validateTrigger="onBlur"
                        initialValue={profile?.address}
                    >
                        <Input placeholder="Example: Cau Giay, Ha noi" />
                    </Form.Item>

                    <Form.Item className='flex justify-end' >
                        <Space>
                            <Button htmlType="submit" loading={isLoading} type='primary' className='bg-color-button'>
                                Submit
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default MyProfile