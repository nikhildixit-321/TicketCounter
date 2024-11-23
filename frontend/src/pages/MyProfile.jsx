import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
const MyProfile = () => {
  const [userData, setUserData]= useState({
    name:"nikhil dixit",
    image:assets.profile_pic,
    email:'nikhil dixit',
    phone:'+91 7007301900',
    address: {
      line1:"",
      line2:""
    },
    gender:"male",
    dob:"2000-01-20"
  })
  const [isEdit,setEdit]= useState(false)
  return (
    <div className='max-w-lg flex '>
      <img src={userData.image} alt="" />
{
  isEdit?
  <input value={userData.name} onChange={(e)=>{setUserData(prev =>({...prev,name:e.target.value}))}} type="text" />:<p>{userData.name}</p>
}
<hr/>
<div>
  <p>CONTACT INFORMATION</p>
  <div>
    <p>emailid</p>
  <p>{userData.email}</p>
  <p>phone:</p>
  {
  isEdit?
  <input value={userData.phone} onChange={(e)=>{setUserData(prev =>({...prev,phone:e.target.value}))}} type="text" />:<p>{userData.phone}</p>
}
{/* <p>Address:</p>
{
  isEdit?
 <p>
  <input onChange={(e)=>setUserData(prev => ({...prev,address:{...prev.address,line1:e.target.value}}))} value={userData.address.line1} type='text'/>
  <br/>
  <input onChange={(e)=>setUserData(prev => ({...prev,address:{...prev.address,line2:e.target.value}}))}  value={userData.address.line2} type='text'/>
 </p>:
 <p>{userData.address.line1}
 <br/>
 {useState.address.line2}</p>

} */}
  </div>
 <div>
  <p>
    BASIC INFORMATION
  </p>
  <div>
    <p>gender:</p>
    {
  isEdit?
 <select onChange={(e)=> setUserData(prev=>({...prev,gender:e.target.value}))}><option value="male">male</option>
 <option value="female">female</option></select>:<p>{userData.gender}</p>
}
<p>birthday:</p>
{
  isEdit? <input onChange={(e)=> setUserData(prev => ({...prev,dob:e.target.value}))} value={userData.dob} type='date'/>:
  <p>{userData.dob}</p>
}
  </div>
 </div>
 {
  isEdit?
  <button  onClick={()=>{setEdit(false)}}>save INFORMATION</button>:<button onClick={()=>{setEdit(true)}}>edit</button>
 }
</div>
    </div>
  )
}

export default MyProfile
