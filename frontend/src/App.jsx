import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import About from './pages/About'

import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Login from './pages/Login'
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Home/>
     <Routes>
      <Route path='/' element ={<Home/>} />
      <Route path='/doctors' element ={<Doctor/>} />
      <Route path='/doctors/:speciallity' element ={<Doctor/>} />
      <Route path='/login' element ={<Login/>} />
      <Route path='/about' element ={<About/>} />
      <Route path='/contact' element ={<Contact/>} />
      <Route path='/my-profile' element ={<MyProfile/>} />
      <Route path='/my-appointment' element ={<MyAppointment/>} />
      <Route path='/my-appointment/:docId' element ={<Appointment/>} />

     </Routes>
    </div>
  )
}

export default App
