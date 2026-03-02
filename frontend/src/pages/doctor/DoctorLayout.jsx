import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'

const navItems = [
    { to: '/doctor/dashboard', icon: '📊', label: 'Dashboard' },
    { to: '/doctor/appointments', icon: '📅', label: 'Appointments' },
]

const DoctorLayout = () => {
    const navigate = useNavigate()

    return (
        <div className='flex h-screen bg-gray-50 overflow-hidden'>
            {/* Sidebar */}
            <aside className='w-56 flex-shrink-0 bg-gradient-to-b from-teal-900 to-emerald-950 flex flex-col shadow-2xl'>
                <div className='flex items-center gap-3 px-4 py-5 border-b border-white/10'>
                    <div className='w-9 h-9 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg'>
                        <span className='text-white text-lg'>⚕</span>
                    </div>
                    <div>
                        <p className='text-white font-bold text-sm'>Dr. Portal</p>
                        <p className='text-teal-400 text-xs'>TicketCounter</p>
                    </div>
                </div>

                {/* Doctor card */}
                <div className='mx-3 mt-4 p-3 bg-white/10 rounded-2xl border border-white/10'>
                    <div className='flex items-center gap-2'>
                        <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold'>M</div>
                        <div>
                            <p className='text-white text-xs font-bold'>Dr. Meera Singh</p>
                            <p className='text-teal-300 text-xs'>Cardiologist</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-1.5 mt-3'>
                        <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
                        <span className='text-xs text-green-400 font-medium'>Available Today</span>
                    </div>
                </div>

                <nav className='flex-1 p-3 flex flex-col gap-1 mt-2'>
                    {navItems.map(({ to, icon, label }) => (
                        <NavLink key={to} to={to}>
                            {({ isActive }) => (
                                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
                  ${isActive ? 'bg-white/20 text-white' : 'text-teal-300 hover:bg-white/10 hover:text-white'}`}>
                                    <span className='text-lg'>{icon}</span>
                                    <span className='text-sm font-medium'>{label}</span>
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className='p-3 border-t border-white/10'>
                    <button onClick={() => navigate('/doctor/login')}
                        className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-teal-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 w-full'>
                        <span className='text-lg'>🚪</span>
                        <span className='text-sm font-medium'>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className='flex-1 flex flex-col overflow-hidden'>
                <header className='bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shadow-sm'>
                    <div>
                        <p className='text-sm font-bold text-gray-900'>Doctor Dashboard</p>
                        <p className='text-xs text-gray-400'>Friday, 28 Feb 2026</p>
                    </div>
                    <div className='flex items-center gap-2 bg-teal-50 rounded-xl px-3 py-2'>
                        <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold'>M</div>
                        <p className='text-xs font-semibold text-gray-900'>Dr. Meera</p>
                    </div>
                </header>
                <main className='flex-1 overflow-y-auto p-6'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DoctorLayout
