import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets_frontend/assets'

const Login = () => {
  const [state, setState] = useState('Sign up')
  const [role, setRole] = useState('user') // 'user', 'doctor', 'admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState(false)

  const navigate = useNavigate()
  const { t } = useLang()
  const { backendUrl, setToken, token } = useContext(AppContext)

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
        if (image) formData.append('image', image)

        const { data } = await axios.post(backendUrl + '/user/signup', formData)
        if (data) {
          toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} account created! Please login.`)
          setState('Login')
        }
      } else {
        const { data } = await axios.post(backendUrl + '/user/signin', { email, password })
        if (data.token) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success("Login Successful!")
        } else {
          toast.error(data.error || "Login Failed")
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  const handleGoogleLogin = () => {
    alert('Google Login — Backend se connect hoga!')
  }

  return (
    <div className='min-h-[90vh] flex items-center justify-center py-10 px-4'>

      <div className='animate-fade-in w-full max-w-md'>
        <div className='bg-white border border-gray-200 shadow-xl rounded-2xl p-8 flex flex-col gap-6'>

          {/* Header */}
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-900'>
              {state === 'Sign up' ? t('login_create') : t('login_welcome')}
            </h1>
            <p className='text-gray-500 text-sm mt-1 capitalize'>
              {role} portal
            </p>
          </div>

          {/* Role Switcher */}
          <div className='flex bg-gray-100 rounded-xl p-1 gap-1'>
            {['user', 'doctor', 'admin'].map((r) => (
              <button key={r} type='button' onClick={() => setRole(r)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all capitalize
                  ${role === r ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {r}
              </button>
            ))}
          </div>

          {/* Tab Switcher (Signup / Login) */}
          <div className='flex border-b border-gray-100'>
            {['Sign up', 'Login'].map((tab) => (
              <button key={tab} type='button' onClick={() => setState(tab)}
                className={`flex-1 py-3 text-sm font-bold transition-all border-b-2
                  ${state === tab ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Google Login (Only for patients/users) */}
          {role === 'user' && state === 'Login' && (
            <button
              type='button'
              onClick={handleGoogleLogin}
              className='flex items-center justify-center gap-3 w-full border border-gray-300 rounded-xl py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all'
            >
              <svg className='w-5 h-5' viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {t('login_google')}
            </button>
          )}

          {/* Form */}
          <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
            {state === 'Sign up' && (
              <>
                <div className='flex flex-col items-center mb-2'>
                  <label htmlFor="image" className='cursor-pointer relative group'>
                    <img className='w-20 h-20 rounded-full object-cover border-2 border-gray-100 group-hover:opacity-75 transition-opacity'
                      src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-full'>
                      <span className='text-[10px] text-white font-bold'>Upload</span>
                    </div>
                  </label>
                  <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                  <p className='text-xs text-gray-400 mt-2 font-bold'>Upload Profile Picture</p>
                </div>
                <div>
                  <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>{t('login_name')}</label>
                  <input
                    className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-sm focus:border-primary focus:bg-white outline-none transition-all'
                    type='text' placeholder='Full Name'
                    onChange={(e) => setName(e.target.value)} value={name} required
                  />
                </div>
                <div>
                  <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>Phone Number</label>
                  <input
                    className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-sm focus:border-primary focus:bg-white outline-none transition-all'
                    type='tel' placeholder='7007301900'
                    onChange={(e) => setPhone(e.target.value)} value={phone} required
                  />
                </div>
              </>
            )}
            <div>
              <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>{t('login_email')}</label>
              <input
                className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-sm focus:border-primary focus:bg-white outline-none transition-all'
                type='email' placeholder='you@example.com'
                onChange={(e) => setEmail(e.target.value)} value={email} required
              />
            </div>
            <div>
              <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>{t('login_password')}</label>
              <input
                className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-sm focus:border-primary focus:bg-white outline-none transition-all'
                type='password' placeholder='••••••••'
                onChange={(e) => setPassword(e.target.value)} value={password} required
              />
            </div>

            {state === 'Login' && (
              <p className='text-xs text-right text-primary font-bold cursor-pointer hover:underline'>{t('login_forgot')}</p>
            )}

            <button type='submit' className='btn-primary w-full py-4 mt-2 font-bold'>
              {state === 'Sign up' ? `Create ${role} Account` : `Sign in as ${role}`}
            </button>
          </form>

          <p className='text-center text-sm text-gray-500'>
            {state === 'Sign up' ? (
              <>Already have an account?{' '}
                <span onClick={() => setState('Login')} className='text-primary font-bold cursor-pointer hover:underline'>Login here</span>
              </>
            ) : (
              <>New here?{' '}
                <span onClick={() => setState('Sign up')} className='text-primary font-bold cursor-pointer hover:underline'>Create account</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

