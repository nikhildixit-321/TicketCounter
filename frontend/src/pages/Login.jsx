import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets_frontend/assets'
import { GoogleLogin } from '@react-oauth/google'

const Login = () => {
  const [state, setState] = useState('Sign up')
  const [role, setRole] = useState('user') 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState(false)
  
  const navigate = useNavigate()
  const { t } = useLang()
  const { backendUrl, setToken, token } = useContext(AppContext)

  const [coords, setCoords] = useState(null)
  const [address_str, setAddressStr] = useState('')

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCoords({ long: pos.coords.longitude, lat: pos.coords.latitude })
        toast.success("Location Captured!")
      }, () => toast.error("Could not get location"))
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Sign up') {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('phone', phone)
        formData.append('role', role)
        if (coords) {
            formData.append('longitude', coords.long)
            formData.append('latitude', coords.lat)
        }
        formData.append('address', address_str)
        if (image) formData.append('image', image)
        const { data } = await axios.post(backendUrl + '/user/signup', formData)
        if (data) {
          toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} account created successfully!`)
          
          if (role === 'doctor') {
            // Auto-signin for doctor to start onboarding
            const res = await axios.post(backendUrl + '/user/signin', { email, password })
            if (res.data.token) {
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('role', res.data.user.role)
              setToken(res.data.token)
              navigate('/doctor/onboard')
            }
          } else {
            setState('Login')
          }
        }
      } else {
        const { data } = await axios.post(backendUrl + '/user/signin', { email, password })
        if (data.token) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('role', data.user.role)
          setToken(data.token)
          toast.success("Login Successful!")
          
          // Redirection logic
          if (data.user.role === 'admin') navigate('/admin/dashboard')
          else if (data.user.role === 'doctor') {
             if (data.user.status === 'pending' && !data.user.degree) navigate('/doctor/onboard')
             else navigate('/doctor/dashboard')
          }
          else navigate('/')
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      if (!credential) throw new Error("No credential returned from Google");
      const { data } = await axios.post(backendUrl + '/user/google', { token: credential, role, phone });
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        setToken(data.token);
        toast.success("Login Successful!");
        
        if (data.user.role === 'admin') navigate('/admin/dashboard')
        else if (data.user.role === 'doctor') {
           if (data.user.status === 'pending' && !data.user.degree) navigate('/doctor/onboard')
           else navigate('/doctor/dashboard')
        }
        else navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Google Login Failed");
    }
  }

  useEffect(() => {
    if (token) {
       const userRole = localStorage.getItem('role')
       if (userRole === 'admin') navigate('/admin/dashboard')
       else navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-screen w-full flex flex-col md:flex-row bg-white'>
      
      {/* Left: Brand & Hero Panel (Split Screen) */}
      <div className='md:w-1/2 bg-[#f0f8ff] relative overflow-hidden flex flex-col justify-center items-center p-12'>
        <div className='absolute top-8 left-8 flex items-center gap-2'>
           <img src={assets.logo} className='w-40' alt="" />
        </div>

        {/* Floating Background Effects */}
        <div className='absolute top-20 right-10 w-4 h-4 bg-blue-400 rotate-45 opacity-20'></div>
        <div className='absolute bottom-20 left-10 w-6 h-6 border-4 border-blue-100 rounded-full opacity-40'></div>

        {/* Main Hero Doctor Image */}
        <div className='relative z-10 w-full max-w-lg mt-12 group'>
           <div className='absolute -inset-4 bg-gradient-to-tr from-blue-400 to-cyan-300 rounded-[3rem] opacity-20 blur-2xl group-hover:scale-105 transition-all duration-700'></div>
           <img src={assets.doctor_hero} className='relative w-full rounded-[3rem] shadow-2xl z-10 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700' alt="Medical Professional" />
           
           {/* Draggable-style Floating Badges */}
           <div className='absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-float-medium border border-blue-50'>
              <div className='w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center text-xl'>✨</div>
              <div>
                 <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Patient Trust</p>
                 <p className='text-sm font-black text-slate-800 tracking-tight'>98% Recovery Rate</p>
              </div>
           </div>

           <div className='absolute top-1/2 -right-8 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-float-slow border border-blue-50'>
              <div className='w-10 h-10 bg-cyan-400 text-white rounded-xl flex items-center justify-center text-xl'>🛡️</div>
              <div>
                 <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Verification</p>
                 <p className='text-sm font-black text-slate-800 tracking-tight'>Certified Specialists</p>
              </div>
           </div>
        </div>

        {/* Abstract Background Curve */}
        <svg className='absolute bottom-0 left-0 w-full text-white' viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,160C960,149,1056,171,1152,176C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Right: Authentication Form Panel */}
      <div className='md:w-1/2 flex items-center justify-center p-8 bg-white relative overflow-hidden'>
        <div className='w-full max-w-md h-full flex flex-col justify-center animate-fade-in'>
          
          {/* Scrollable Form Rectangle */}
          <div className='max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar space-y-8 py-4'>
            <div className='space-y-4'>
              <h2 className='text-3xl font-extrabold text-blue-900 tracking-tight leading-none'>
                 Let's protect yourself and those around you by registering 💉
              </h2>
              <div className='h-1 w-20 bg-blue-100 rounded-full'></div>
            </div>

            <div className='space-y-6'>
              {/* Identity Switcher Style from Image */}
              <div className='space-y-3'>
                 <p className='text-[9px] font-black text-slate-400 uppercase tracking-widest'>I am logging in as</p>
                 <div className='flex gap-4'>
                    {['user', 'doctor'].map((r) => (
                       <button key={r} onClick={() => setRole(r)}
                          className={`flex-1 py-4 px-6 rounded-2xl border-2 flex items-center gap-3 transition-all
                          ${role === r ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-blue-200'}`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                             ${role === r ? 'border-blue-500 bg-white' : 'border-slate-200 bg-white'}`}>
                             {role === r && <div className='w-2 h-2 rounded-full bg-blue-500'></div>}
                          </div>
                          <span className='capitalize font-bold text-sm tracking-tight'>{r === 'user' ? 'Patient' : 'Clinician'}</span>
                       </button>
                    ))}
                 </div>
              </div>

              <form onSubmit={onSubmitHandler} className='space-y-5'>
                 {state === 'Sign up' && (
                    <div className='space-y-4'>
                       <div className='flex items-center gap-4 bg-slate-50/50 p-4 rounded-3xl border-2 border-dashed border-slate-100 group hover:border-blue-200 transition-all'>
                          <label htmlFor="image" className='cursor-pointer relative shrink-0'>
                             <img className='w-12 h-12 rounded-2xl object-cover ring-4 ring-white shadow-xl' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                          </label>
                          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                          <div className='flex-1'>
                             <p className='text-[8px] font-black text-slate-400 uppercase tracking-widest'>Identity Upload</p>
                             <input className='w-full bg-transparent text-sm font-bold text-slate-800 outline-none placeholder:text-slate-300' 
                               placeholder='Legal Full Name' type='text' onChange={(e) => setName(e.target.value)} value={name} required />
                          </div>
                       </div>

                       <div className='grid grid-cols-1 gap-4'>
                          <div className='space-y-1.5'>
                             <p className='text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1'>Contact Number</p>
                             <div className='flex gap-2 items-center bg-[#f8fbff] rounded-2xl border border-slate-100 p-1.5 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all'>
                                <div className='bg-white px-3 py-2.5 rounded-xl border border-slate-100 text-xs font-bold text-slate-600 flex items-center gap-2'>
                                   🇮🇳 <span className='text-slate-300'>+91</span>
                                </div>
                                <input className='flex-1 bg-transparent px-2 py-2 text-sm font-bold text-slate-800 outline-none placeholder:text-slate-300' 
                                  placeholder='Mobile digits' type='tel' onChange={(e) => setPhone(e.target.value)} value={phone} required />
                             </div>
                          </div>

                          {role === 'user' && (
                             <div className='space-y-1.5'>
                                <p className='text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1'>Location Matrix</p>
                                <div className='flex items-center gap-2'>
                                   <input className='flex-1 px-5 py-3.5 rounded-2xl border border-slate-100 bg-[#f8fbff] text-sm font-bold text-slate-800 outline-none focus:border-blue-400 transition-all placeholder:text-slate-300' 
                                      placeholder='Address Details' type='text' onChange={(e) => setAddressStr(e.target.value)} value={address_str} />
                                   <button type='button' onClick={getMyLocation} className='p-3.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20'>
                                      {coords ? '📍' : '🎯'}
                                   </button>
                                </div>
                             </div>
                          )}
                       </div>
                    </div>
                 )}

                 <div className='space-y-4'>
                    <div className='relative group'>
                       <p className='text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5'>Secure Email</p>
                       <input className='w-full px-5 py-4 rounded-2xl border border-slate-100 bg-[#f8fbff] text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all placeholder:text-slate-300' 
                          placeholder='Official Portal ID' type='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>
                    <div className='relative group'>
                       <p className='text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5'>Password Cluster</p>
                       <input className='w-full px-5 py-4 rounded-2xl border border-slate-100 bg-[#f8fbff] text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 transition-all placeholder:text-slate-300' 
                          placeholder='Security Key' type='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </div>
                 </div>

                 <button type='submit' className='w-full py-5 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:-translate-y-1 hover:shadow-blue-600/40 active:scale-95 transition-all duration-300 mt-4'>
                    {state === 'Sign up' ? 'Initialize Verification' : 'Authorize Entrance'}
                 </button>
              </form>

              <div className='space-y-6 pt-2 pb-8'>
                 <div className='flex items-center gap-4 text-slate-100'>
                    <hr className='flex-1 border-slate-100' />
                    <span className='text-[9px] font-black text-slate-300 uppercase tracking-widest uppercase'>Alternative Channel</span>
                    <hr className='flex-1 border-slate-100' />
                 </div>
                 
                 <div className='flex justify-center'>
                    <GoogleLogin
                       onSuccess={handleGoogleSuccess}
                       onError={() => toast.error('Google Auth Failed')}
                       theme="outline" size='large' shape="pill" width='100%'
                    />
                 </div>

                 <div className='text-center'>
                    <p className='text-sm text-slate-500 font-medium'>
                       {state === 'Sign up' ? 'Member already?' : 'New to Registry?'} 
                       <button onClick={() => setState(state === 'Sign up' ? 'Login' : 'Sign up')} className='ml-2 text-blue-600 font-black hover:underline decoration-blue-100 underline-offset-4'>
                          {state === 'Sign up' ? 'Log In Now' : 'Join Network'}
                       </button>
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
