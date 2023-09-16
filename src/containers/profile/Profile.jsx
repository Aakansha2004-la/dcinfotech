import React, { useEffect, useState } from 'react'
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid'
import { Button, Image, Space, Spin } from 'antd';
import useAuth from '../../hooks/useAuth';
import { apiGetUserProfile } from '../../services/UserServices';
import MyProfile from './MyProfile';
import { NavLink, Route, Routes } from 'react-router-dom';

const Profile = () => {
    const { auth } = useAuth();
    const [user, setUser] = useState();
    const [profile, setProfile] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const getUserProfile = async () => {
        setIsLoading(true);
        const response = await apiGetUserProfile(auth?.userId);
        setIsLoading(false);
        console.log(response);
        setUser(response.data);
        setProfile(response.data.student ?? response.data.teacher ?? null);
    }

    useEffect(() => {
        getUserProfile();
    }, [])


    return (
        <div className='flex justify-center mx-auto h-screen w-10/12'>
            <Space direction='vertical' size={'large'} className='basis-1/4 shadow-xl rounded-2xl mx-2 p-10 h-5/6 flex flex-col items-start'>
                <NavLink className={'text-2xl'} to={'/profile'}>My Profile</NavLink>
                <NavLink Name={'text-2xl'} to={'/profile/change-username'}>Change Password</NavLink>
                <NavLink Name={'text-2xl'} to={'/profile/change-password'}>Change Password</NavLink>
                <NavLink Name={'text-2xl'} to={'/profile/feedback'}>Feedback</NavLink>
            </Space>
            <div className='basis-3/4 shadow-xl rounded-2xl mx-2 h-5/6 p-10'>
                {
                    isLoading ? <Spin size='large' /> : <MyProfile user={user} profile={profile} fetchProfile={getUserProfile} />
                }
            </div>
        </div>
    )
}

export default Profile