'use client'
import React, { useEffect, useRef } from 'react';
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link';
import { FaPaperPlane, FaRightToBracket } from 'react-icons/fa6';
import img from '../../../public/Images/alien2.png'
import Loader from '../loader/Loader';

const Bot = () => {
    const [textMessage, setTextMessage] = useState('')
    const [chatLog, setChatLog] = useState([])
    const [loading, setLoading] = useState(false)
    const messageEndRef = useRef(null)

    const handleSubmit = (e) => {

        e.preventDefault()
        console.log(textMessage)

        setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: textMessage }]);

        sendMessage(textMessage)

        setTextMessage('')
    }

    useEffect(() => {
        messageEndRef.current?.scrollIntoView();
    }, [chatLog])

    const sendMessage = (message) => {
        const url = 'https://api.openai.com/v1/chat/completions';
        const headers = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        };
        const data = {
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": message }]
        }

        setLoading(true)
        axios.post(url, data, { headers: headers }).then(res => {
            console.log(res)
            setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: res.data.choices[0].message.content }])
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            console.log(error)
        })

    }
    return (
        <div className=''>
            <div className='w-10/12 h-[600px] mx-auto'>
                <div className="navbar bg-base-100 flex justify-between items-center sticky top-0 z-50">
                    <Link href={'/'} className=" text-3xl text-center p-6">AIOBOT</Link>
                    <Link className='text-2xl text-[#EB3C31] hover:text-black' href={'/'}><FaRightToBracket></FaRightToBracket></Link>
                </div>

                <div>
                    <div className='pb-28'>
                        {
                            chatLog?.map((message, index) =>
                                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className="chat p-4 chat-start">
                                        <div className={`${message.type === 'bot' ? 'block' : 'hidden'}`}>
                                            <div className="md:w-14 w-10  rounded-full">
                                                <Image src={img} alt="profile"></Image>
                                            </div>
                                        </div>
                                        <div className={`chat-bubble  ${message.type === 'user' ? 'bg-[#EB3C31] bg-gradient-to-r from-[#EB3C31] via-[#F35834] to-[#FB7238] text-white' : 'bg-[#E6E6E6] text-black'}`}>{message.message}</div>
                                    </div>
                                </div>
                            )}

                        {
                            loading &&
                            <div>
                                <Loader></Loader>
                            </div>
                        }

                        <div ref={messageEndRef}></div>
                    </div>

                    <div className="btm-nav">
                        <form onSubmit={handleSubmit}>
                            <div className='w-11/12 mx-auto flex justify-between items-center'>
                                <input type="text" placeholder="Type here" value={textMessage} onChange={(e => setTextMessage(e.target.value))} className="input input-bordered w-full mx-3" />
                                <button type='submit' className="btn   btn-md bg-gradient-to-r from-[#EB3C31] via-[#F35834] to-[#FB7238] disabled:opacity-100 text-white" disabled={!textMessage}><FaPaperPlane /> Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bot;