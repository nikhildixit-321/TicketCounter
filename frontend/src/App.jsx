import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
// ── Patient Pages ──
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// ── Admin Pages ──
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDoctors from './pages/admin/AdminDoctors'
import AdminAppointments from './pages/admin/AdminAppointments'
import TaskManager from './pages/admin/TaskManager'
import AdminLayout from './pages/admin/AdminLayout'

// ── Doctor Pages ──
import DoctorLogin from './pages/doctor/DoctorLogin'
import DoctorOnboard from './pages/doctor/DoctorOnboard'
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import DoctorAppointments from './pages/doctor/DoctorAppointments'
import DoctorLayout from './pages/doctor/DoctorLayout'

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AppContext)
  if (!token) {
    return <Navigate to='/login' />
  }
  return children
}

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>

        {/* ──────── PATIENT ROUTES ──────── */}
        <Route path='/' element={
          <ProtectedRoute>
            <div className='min-h-screen bg-gray-50'>
              <Navbar />
              <div className='mx-4 sm:mx-[10%]'>
                <Home />
              </div>
              <Footer />
            </div>
          </ProtectedRoute>
        } />

        <Route path='/login' element={
          <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='mx-4 sm:mx-[10%]'>
              <Login />
            </div>
            <Footer />
          </div>
        } />

        {/* Patient pages with layout */}
        {[
          { path: '/doctors', element: <Doctor /> },
          { path: '/doctors/:speciality', element: <Doctor /> },
          { path: '/about', element: <About /> },
          { path: '/contact', element: <Contact /> },
          { path: '/my-profile', element: <MyProfile /> },
          { path: '/my-appointment', element: <MyAppointment /> },
          { path: '/appointment/:docId', element: <Appointment /> },
        ].map(({ path, element }) => (
          <Route key={path} path={path} element={
            <ProtectedRoute>
              <div className='min-h-screen bg-gray-50'>
                <Navbar />
                <div className='mx-4 sm:mx-[10%]'>
                  {element}
                </div>
                <Footer />
              </div>
            </ProtectedRoute>
          } />
        ))}

        {/* ──────── ADMIN ROUTES ──────── */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='doctors' element={<AdminDoctors />} />
          <Route path='appointments' element={<AdminAppointments />} />
          <Route path='tasks' element={<TaskManager />} />
        </Route>

        {/* ──────── DOCTOR ROUTES ──────── */}
        <Route path='/doctor/login' element={<DoctorLogin />} />
        <Route path='/doctor/onboard' element={<DoctorOnboard />} />
        <Route path='/doctor' element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path='dashboard' element={<DoctorDashboard />} />
          <Route path='appointments' element={<DoctorAppointments />} />
        </Route>

      </Routes>
    </>
  )
}

export default App

