import { useNavigate } from 'react-router-dom'

const stats = [
    { icon: '👨‍⚕️', label: 'Total Doctors', value: 24, change: '+3 this month', color: 'indigo' },
    { icon: '🧑‍🤝‍🧑', label: 'Total Patients', value: 1284, change: '+128 this month', color: 'purple' },
    { icon: '📅', label: 'Appointments Today', value: 47, change: '12 pending', color: 'amber' },
    { icon: '💰', label: 'Revenue This Month', value: '₹1.84L', change: '+18% vs last month', color: 'green' },
]

const recentAppointments = [
    { patient: 'Ravi Sharma', doctor: 'Dr. Meera Singh', speciality: 'Cardiologist', time: '10:30 AM', status: 'confirmed' },
    { patient: 'Priya Patel', doctor: 'Dr. Anil Gupta', speciality: 'Dermatologist', time: '11:00 AM', status: 'pending' },
    { patient: 'Arjun Verma', doctor: 'Dr. Sunita Rao', speciality: 'Neurologist', time: '12:30 PM', status: 'confirmed' },
    { patient: 'Kavya Nair', doctor: 'Dr. Rakesh Kumar', speciality: 'Pediatrician', time: '2:00 PM', status: 'cancelled' },
    { patient: 'Amit Joshi', doctor: 'Dr. Deepa Shah', speciality: 'Gynecologist', time: '3:30 PM', status: 'confirmed' },
]

const topDoctors = [
    { name: 'Dr. Meera Singh', speciality: 'Cardiologist', patients: 142, rating: 4.9, earnings: '₹28,400' },
    { name: 'Dr. Anil Gupta', speciality: 'Dermatologist', patients: 118, rating: 4.8, earnings: '₹23,600' },
    { name: 'Dr. Sunita Rao', speciality: 'Neurologist', patients: 97, rating: 4.7, earnings: '₹19,400' },
]

const statusStyle = {
    confirmed: 'bg-green-100 text-green-600',
    pending: 'bg-amber-100 text-amber-600',
    cancelled: 'bg-red-100 text-red-500',
}

const AdminDashboard = () => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col gap-6 animate-fade-up'>

            {/* Welcome */}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>Good Morning, Admin 👋</h1>
                    <p className='text-gray-400 text-sm mt-0.5'>Here's what's happening at your hospital today.</p>
                </div>
                <button
                    onClick={() => navigate('/admin/doctors')}
                    className='btn-glow bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-200 hidden sm:block'
                >
                    + Add Doctor
                </button>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                {stats.map(({ icon, label, value, change, color }) => (
                    <div key={label} className={`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
                        <div className={`w-10 h-10 rounded-xl bg-${color}-50 flex items-center justify-center text-xl mb-4`}>
                            {icon}
                        </div>
                        <p className='text-2xl font-bold text-gray-900'>{value}</p>
                        <p className='text-xs text-gray-400 font-medium mt-0.5'>{label}</p>
                        <p className={`text-xs font-semibold text-${color}-500 mt-2`}>{change}</p>
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

                {/* Recent Appointments */}
                <div className='lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>
                    <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
                        <h2 className='font-bold text-gray-900'>Recent Appointments</h2>
                        <button onClick={() => navigate('/admin/appointments')} className='text-xs text-indigo-600 font-semibold hover:underline'>View All →</button>
                    </div>
                    <div className='divide-y divide-gray-50'>
                        {recentAppointments.map((apt, i) => (
                            <div key={i} className='flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors duration-200'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600'>
                                        {apt.patient[0]}
                                    </div>
                                    <div>
                                        <p className='text-sm font-semibold text-gray-900'>{apt.patient}</p>
                                        <p className='text-xs text-gray-400'>{apt.doctor} · {apt.speciality}</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-xs text-gray-500 mb-1'>{apt.time}</p>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyle[apt.status]}`}>
                                        {apt.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Doctors */}
                <div className='bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>
                    <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
                        <h2 className='font-bold text-gray-900'>Top Doctors</h2>
                        <button onClick={() => navigate('/admin/doctors')} className='text-xs text-indigo-600 font-semibold hover:underline'>View All →</button>
                    </div>
                    <div className='divide-y divide-gray-50'>
                        {topDoctors.map((doc, i) => (
                            <div key={i} className='px-5 py-3.5 hover:bg-gray-50 transition-colors duration-200'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold'>
                                        {doc.name.split(' ')[1][0]}
                                    </div>
                                    <div>
                                        <p className='text-sm font-semibold text-gray-900'>{doc.name}</p>
                                        <p className='text-xs text-indigo-500'>{doc.speciality}</p>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between text-xs text-gray-400'>
                                    <span>👥 {doc.patients} patients</span>
                                    <span>⭐ {doc.rating}</span>
                                    <span className='text-green-600 font-semibold'>{doc.earnings}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                {[
                    { icon: '➕', label: 'Add Doctor', action: () => navigate('/admin/doctors'), color: 'indigo' },
                    { icon: '📋', label: 'View Tasks', action: () => navigate('/admin/tasks'), color: 'purple' },
                    { icon: '📊', label: 'Appointments', action: () => navigate('/admin/appointments'), color: 'amber' },
                    { icon: '💳', label: 'Payments', action: () => { }, color: 'green' },
                ].map(({ icon, label, action, color }) => (
                    <button key={label} onClick={action}
                        className={`flex flex-col items-center gap-2 p-4 bg-${color}-50 border border-${color}-100 rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
                        <span className='text-2xl'>{icon}</span>
                        <span className={`text-xs font-semibold text-${color}-700`}>{label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default AdminDashboard
