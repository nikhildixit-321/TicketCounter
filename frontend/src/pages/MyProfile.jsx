import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
const MyProfile = () => {
  const [userData, setUserData]= useState({
    name:"nikhil dixit",
    image:assets.profile_pic,
    email:'nikhil dixit',
    phone:'+91 7007301900',
   
    gender:"male",
    dob:"2000-01-20"
  })
  const [isEdit,setEdit]= useState(false)
  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm '>
      <img className='w-36 rounded' src={userData.image} alt="" />
{
  isEdit?
  <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 ' value={userData.name} onChange={(e)=>{setUserData(prev =>({...prev,name:e.target.value}))}} type="text" />:<p className='font-medium text-3xl text-netural-800 mt-4'>{userData.name}</p>
}
<hr className='bg-zinc-400 h-[1px] border-none'/>
<div className=''>
  <p className='text-netural-500 underline mt-3'>CONTACT INFORMATION</p>
  <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-nautral-700 '>
    <p className='font-medium '>emailid</p>
  <p className='text-blue-500'>{userData.email}</p>
  <p className='font-medium'>phone:</p>
  {
  isEdit?
  <input className='bg-gray-100 max-w-52' value={userData.phone} onChange={(e)=>{setUserData(prev =>({...prev,phone:e.target.value}))}} type="text" />:<p className='text-blue-400'>{userData.phone}</p>
}

  </div>
 <div>
  <p className='text-netural-500 underline mt-3'>
    BASIC INFORMATION
  </p>
  <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700' >
    <p className='font-medium '>gender:</p>
    {
  isEdit?
 <select className='maax-w-20 bg-gray-100' onChange={(e)=> setUserData(prev=>({...prev,gender:e.target.value}))}><option value="male">male</option>
 <option value="female">female</option></select>:<p className='text-gray-400'>{userData.gender}</p>
}
<p className='font-medium'>birthday:</p>
{
  isEdit? <input className='max-w-28 bg-gray-100 ' onChange={(e)=> setUserData(prev => ({...prev,dob:e.target.value}))} value={userData.dob} type='date'/>:
  <p className='text-gray-400'>{userData.dob}</p>
}
  </div>
 </div>
 <div className='mt-10'>
 {
  isEdit?
  <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all '  onClick={()=>{setEdit(false)}}>save INFORMATION</button>:<button className='border border-primary px-8 py-2 rounded-full  hover:bg-primary hover:text-white transition-all'  onClick={()=>{setEdit(true)}}>edit</button>
 }
 </div>
 
</div>
    </div>
  )
}

export default MyProfile
