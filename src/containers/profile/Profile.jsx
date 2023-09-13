import React, { useEffect, useState } from 'react'
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid'
import { Button } from 'antd';

const Profile = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);

    const imageListRef = ref(storage, 'images/');
    console.log(imageUpload);

    const uploadImage = () => {
        if (imageUpload === null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(url => {
                setImageList(pre => [...pre, url]);
            })
        })
    };

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    console.log(url);
                    setImageList(pre => [...pre, url])
                })
            })
        })
    }, [])

    return (
        <div className='flex justify-center my-20 items-center'>
            <input
                type="file"
                onChange={(e) => { setImageUpload(e.target.files[0]) }}
            />
            <Button onClick={uploadImage}>Upload File</Button>
            <div className='flex flex-col overflow-scroll w-52 h-60'>
                {imageList.map(url => {
                    return <img src={url} />
                })}
            </div>

        </div>
    )
}

export default Profile