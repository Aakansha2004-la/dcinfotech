import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Forbidden = ({ message = "You are not allowed to go to this page" }) => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
    };

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-9xl my-5 text-red-900 font-extrabold">403</h1>
            <h2 className="text-5xl my-5 text-red-900 font-semibold">Access Forbidden</h2>
            <h3 className="text-2xl my-5 font-medium">{message}</h3>
            <div className="flex space-x-4">
                <Button size="large" danger onClick={handleBack} className="mr-2">
                    Go Back
                </Button>
                <Button size="large" danger onClick={handleHome}>
                    Go Home
                </Button>
            </div>
        </div>
    );
};

export default Forbidden;