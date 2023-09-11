import React from 'react'
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, GithubOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const { TextArea } = Input;


const Contact = () => {
    return (
        <div id='contact' className='bg-color-button h-96 flex justify-center items-center mb-20'>
            <div className='h-5/6 w-1/2 bg-color-bg rounded-xl drop-shadow-lg flex overflow-hidden'>
                <div className='basis-2/6 flex flex-col bg-slate-500'>
                    <h3 className='basis-1/4 font-bold text-3xl ps-8 pt-5 text-white'>Contact</h3>
                    <div className='basis-3/4 h-fit flex flex-col items-center'>
                        <div className='w-full flex align-top mb-5' >
                            <PhoneOutlined style={{ color: 'white', fontSize: '24px', marginLeft: '30px', marginRight: '20px' }} />
                            <p className='text-white me-5'>
                                <b>Phone: </b>
                                0965037791
                            </p>
                        </div>
                        <div className='w-full flex align-top mb-5' >
                            <MailOutlined style={{ color: 'white', fontSize: '24px', marginLeft: '30px', marginRight: '20px' }} />
                            <p className='text-white me-5'>
                                <b>Mail: </b>
                                quangtu2301@gmail.com
                            </p>
                        </div>
                        <div className='w-full flex align-top mb-5' >
                            <GithubOutlined style={{ color: 'white', fontSize: '24px', marginLeft: '30px', marginRight: '20px' }} />
                            <p className='text-white me-5'>
                                <b>Github: </b>
                                <a href='https://github.com/tuwang2301'>tuwang2301</a>
                            </p>
                        </div>
                        <div className='w-full flex align-top mb-5' >
                            <EnvironmentOutlined style={{ color: 'white', fontSize: '24px', marginLeft: '30px', marginRight: '20px' }} />
                            <p className='text-white me-5'>
                                <b>Address: </b>
                                Hanoi, Vietnam
                            </p>
                        </div>

                    </div>
                </div>
                <div className='basis-3/5 p-10 pt-15'>
                    <Input id='full-name' style={{ width: '100%', marginBottom: '5px' }} placeholder="Full name" prefix={<UserOutlined />} />
                    <Input id='email' style={{ width: '100%', marginBottom: '5px' }} placeholder="Email" prefix={<MailOutlined />} />
                    <TextArea
                        showCount
                        maxLength={300}
                        style={{
                            height: 120,
                            resize: 'none',
                        }}
                        placeholder="Message"
                    />
                    <div className='flex justify-center mt-5'>
                        <button className='rounded-full bg-slate-500 text-slate-100 px-5 py-2 hover:bg-color-bg hover:text-color-button hover:transition-all blur: transition-all'>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact