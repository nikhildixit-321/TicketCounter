import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>

<div className='text-center text-2xl pt-10 text-gray-500'>
      <p >ABOUT <span className='text-gray-700 font-medium '>us</span></p>
    </div>

    <div className='flex flex-col my-10 md:flex-row gap-12 '>
      <img src={assets.about_image} alt="" />
      <div className='flex flex-col justify-center gap=6 md:w-2/4 text-sm text-gray-600 '>
      <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
    <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
   <b className='text-gray-800 '>Our vision</b>
  <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>

      </div>
   
  </div>
    </div>
 
  )
}

export default About
