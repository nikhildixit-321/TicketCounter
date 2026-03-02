import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'

const navItems = [
    { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { to: '/admin/doctors', icon: '👨‍⚕️', label: 'Doctors' },
    { to: '/admin/appointments', icon: '📅', label: 'Appointments' },
    { to: '/admin/tasks', icon: '✅', label: 'Task Manager' },
]

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='flex h-screen bg-gray-50 overflow-hidden'>

            {/* Sidebar */}
            <aside className={`${collapsed ? 'w-16' : 'w-60'} flex-shrink-0 bg-gray-950 flex flex-col transition-all duration-300 shadow-2xl`}>
                {/* Logo */}
                <div className='flex items-center gap-3 px-4 py-5 border-b border-white/10'>
                    <div className='w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg'>
                        <span className='text-white text-lg'>⚕</span>
                    </div>
                    {!collapsed && (
                        <div>
                            <p className='text-white font-bold text-sm'>TicketCounter</p>
                            <p className='text-indigo-400 text-xs'>Admin Panel</p>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav className='flex-1 p-3 flex flex-col gap-1 mt-2'>
                    {navItems.map(({ to, icon, label }) => (
                        <NavLink key={to} to={to}>
                            {({ isActive }) => (
                                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
                  ${isActive
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}>
                                    <span className='text-lg flex-shrink-0'>{icon}</span>
                                    {!collapsed && <span className='text-sm font-medium'>{label}</span>}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom */}
                <div className='p-3 border-t border-white/10'>
                    <button
                        onClick={() => navigate('/admin/login')}
                        className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 w-full'
                    >
                        <span className='text-lg'>🚪</span>
                        {!collapsed && <span className='text-sm font-medium'>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className='flex-1 flex flex-col overflow-hidden'>

                {/* Topbar */}
                <header className='bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shadow-sm'>
                    <div className='flex items-center gap-3'>
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className='w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-200'
                        >
                            {collapsed ? '→' : '←'}
                        </button>
                        <div>
                            <p className='text-sm font-bold text-gray-900'>Admin Dashboard</p>
                            <p className='text-xs text-gray-400'>Hospital Management System</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='relative'>
                            <button className='w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-indigo-100 hover:text-indigo-600 transition-all'>
                                🔔
                            </button>
                            <span className='absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center'>3</span>
                        </div>
                        <div className='flex items-center gap-2 bg-indigo-50 rounded-xl px-3 py-2'>
                            <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold'>A</div>
                            <div>
                                <p className='text-xs font-semibold text-gray-900'>Admin</p>
                                <p className='text-xs text-gray-400'>Super User</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className='flex-1 overflow-y-auto p-6'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
