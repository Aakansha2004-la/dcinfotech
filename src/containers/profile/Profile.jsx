import React from 'react'

const profile
    = JSON.parse(localStorage.getItem('profile'))?.user.student || JSON.parse(localStorage.getItem('profile'))?.user.teacher;
const Profile = () => {
    return (
        <div className='flex justify-center my-20 items-center'>
            <h1 className='text-2xl font-bold mx-20'>Welcome {profile.full_name} to LMS</h1>
            <ul className='mx-20 text-lg'>
                <li>DOB: {profile.dob}</li>
                <li>Gender: {profile.gender}</li>
                <li>Rank: {profile.rank}</li>
                <li>Conduct: {profile.conduct}</li>
            </ul>
        </div>
    )
}

export default Profile