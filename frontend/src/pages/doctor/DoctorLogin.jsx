import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [focused, setFocused] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        navigate('/doctor/dashboard')
    }

    const handleGoogle = () => alert('Google Login — backend se connect hoga!')

    return (
        <div className='min-h-screen flex items-center justify-center relative overflow-hidden' style={{ background: 'linear-gradient(135deg, #0f2027, #134e4a, #0f766e)' }}>
            <div className='absolute top-[-80px] left-[-80px] w-80 h-80 bg-teal-500 opacity-10 rounded-full animate-blob'></div>
            <div className='absolute bottom-[-60px] right-[-60px] w-72 h-72 bg-emerald-400 opacity-10 rounded-full animate-blob delay-300'></div>
            <div className='absolute inset-0 opacity-5' style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className='relative z-10 animate-fade-up w-full max-w-sm mx-4'>
                <div className='bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl'>

                    <div className='flex flex-col items-center mb-7'>
                        <div className='w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mb-4'>
                            <span className='text-white text-3xl'>👨‍⚕️</span>
                        </div>
                        <h1 className='text-xl font-bold text-white'>Doctor Portal</h1>
                        <p className='text-gray-500 text-sm mt-1'>Sign in to manage your patients</p>
                    </div>

                    {/* Google */}
                    <button onClick={handleGoogle}
                        className='flex items-center justify-center gap-3 w-full border border-white/10 rounded-xl py-3 text-sm font-semibold text-gray-400 hover:border-teal-400/50 hover:text-teal-300 hover:bg-teal-500/10 transition-all duration-300 mb-4'>
                        <svg className='w-4 h-4' viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className='flex items-center gap-3 mb-4'>
                        <div className='flex-1 h-px bg-white/10'></div>
                        <span className='text-xs text-gray-600'>or email</span>
                        <div className='flex-1 h-px bg-white/10'></div>
                    </div>

                    <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                        {[
                            { id: 'email', label: 'Doctor Email', type: 'email', placeholder: 'doctor@hospital.com', val: email, set: setEmail },
                            { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••', val: password, set: setPassword },
                        ].map(({ id, label, type, placeholder, val, set }) => (
                            <div key={id}>
                                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5'>{label}</label>
                                <input type={type} placeholder={placeholder} value={val}
                                    onFocus={() => setFocused(id)} onBlur={() => setFocused('')}
                                    onChange={(e) => set(e.target.value)} required
                                    className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-800 text-white text-sm outline-none placeholder-gray-600 transition-all duration-300
                    ${focused === id ? 'border-teal-500 shadow-lg shadow-teal-500/20' : 'border-transparent'}`}
                                />
                            </div>
                        ))}
                        <button type='submit' className='w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3.5 rounded-xl font-bold text-sm mt-1 shadow-lg shadow-teal-500/30 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300'>
                            🔓 Sign In
                        </button>
                    </form>

                    <div className='flex flex-col items-center gap-2 mt-5 text-xs text-gray-500'>
                        <p>New doctor? <span onClick={() => navigate('/doctor/onboard')} className='text-teal-400 cursor-pointer hover:underline font-semibold'>Register here</span></p>
                        <p>Patient? <span onClick={() => navigate('/login')} className='text-teal-400 cursor-pointer hover:underline'>Patient login</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorLogin
