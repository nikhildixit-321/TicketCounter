import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [focused, setFocused] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        navigate('/admin/dashboard')
    }

    return (
        <div className='min-h-screen bg-gray-950 flex items-center justify-center relative overflow-hidden'>
            {/* Decorative blobs */}
            <div className='absolute top-[-80px] left-[-80px] w-80 h-80 bg-indigo-600 opacity-10 rounded-full animate-blob'></div>
            <div className='absolute bottom-[-60px] right-[-60px] w-72 h-72 bg-purple-600 opacity-10 rounded-full animate-blob delay-300'></div>
            <div className='absolute inset-0 opacity-5'
                style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <form onSubmit={handleLogin} className='relative z-10 animate-fade-up w-full max-w-sm mx-4'>
                <div className='bg-gray-900 border border-white/10 rounded-3xl p-8 shadow-2xl'>

                    {/* Logo */}
                    <div className='flex flex-col items-center mb-8'>
                        <div className='w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4'>
                            <span className='text-white text-3xl'>🔧</span>
                        </div>
                        <h1 className='text-xl font-bold text-white'>Admin Portal</h1>
                        <p className='text-gray-500 text-sm mt-1'>TicketCounter Hospital Management</p>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div>
                            <label className='text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5'>Admin Email</label>
                            <input
                                type='email'
                                placeholder='admin@ticketcounter.com'
                                onFocus={() => setFocused('email')}
                                onBlur={() => setFocused('')}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-800 text-white text-sm outline-none placeholder-gray-600 transition-all duration-300
                  ${focused === 'email' ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' : 'border-transparent'}`}
                            />
                        </div>
                        <div>
                            <label className='text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1.5'>Password</label>
                            <input
                                type='password'
                                placeholder='••••••••'
                                onFocus={() => setFocused('password')}
                                onBlur={() => setFocused('')}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-800 text-white text-sm outline-none placeholder-gray-600 transition-all duration-300
                  ${focused === 'password' ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' : 'border-transparent'}`}
                            />
                        </div>

                        <button type='submit'
                            className='btn-glow w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold text-sm mt-2 shadow-lg shadow-indigo-500/30'>
                            🔓 Login to Admin Panel
                        </button>
                    </div>

                    <p className='text-center mt-6 text-gray-600 text-xs'>
                        Patient?{' '}
                        <span onClick={() => navigate('/login')} className='text-indigo-400 cursor-pointer hover:underline'>Go to Patient Login</span>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default AdminLogin
