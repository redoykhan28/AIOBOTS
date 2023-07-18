'use client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import logo from '../../public/Images/alien.png'
import { FaNapster, FaUserAlt } from 'react-icons/fa';
import { FaBilibili, FaCommentDots } from "react-icons/fa6";
import AOS from 'aos';
import 'aos/dist/aos.css';



export default function Home() {

  const [loop, setLoop] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [text, setText] = useState('')
  const [delta, setDelta] = useState(300 - Math.random() * 100)
  const period = 2000;

  const toRotate = ["AIOBOT", "A CHATBOT", "HERE TO HELP YOU"]

  useEffect(() => {
    let ticker = setInterval(() => {
      tick()
    }, delta);
    return () => { clearInterval(ticker) };
  }, [text])

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])


  const tick = () => {

    let i = loop % toRotate.length;
    let fulltext = toRotate[i]
    let updateText = deleting ? fulltext.substring(0, text.length - 1) : fulltext.substring(0, text.length + 1)
    setText(updateText);

    if (deleting) {
      setDelta(prevDelta => prevDelta / 2)
    }

    if (!deleting && updateText === fulltext) {
      setDeleting(true)
      setDelta(period)
    }

    else if (deleting && updateText === '') {

      setDeleting(false)
      setLoop(loop + 1)
      setDelta(500)
    }

  }
  return (
    <div className='bg-gradient-to-r from-[#f8845d] via-[#FDC296] to-[#FCE4A3] h-screen'>
      <div className='pt-20 mb-24'>
        <h1 className='md:text-5xl text-2xl text-center text-white'>HELLO</h1>
        <h1 className='md:text-5xl text-2xl text-center text-white font-semibold'>I'M <span> {text}</span></h1>
      </div>
      <div>
        <Image className='w-40 mx-auto animate-bounce ' src={logo} alt='LOGO'></Image>
      </div>
      <div data-aos="zoom-in" className='text-center my-20'>
        <Link href={'/bot'} className="btn lg:w-1/4 mx-auto bg-white text-black rounded-full transition transform hover:-translate-y-1 duration-300 ">Let's Start a Converation!</Link>
      </div>
      <footer className="footer footer-center roun lg:rounded-tl-full lg:rounded-tr-full mt-28 p-4 bg-base-300 text-base-content">
        <div className='w-11/12 mx-auto flex justify-between items-center'>
          <h1 className='text-2xl text-black'><FaBilibili /></h1>
          <Link href={'/bot'} className='btn btn-circle text-3xl btn-lg shadow-xl mt-[-60px] text-black transition transform hover:-translate-y-1 duration-300'><FaCommentDots /></Link>
          <h1 className='text-2xl text-black'><FaNapster /></h1>
        </div>
      </footer>
    </div>
  )
}
