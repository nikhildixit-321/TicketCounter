import { useNavigate } from 'react-router-dom'

const todayPatients = [
    { name: 'Ravi Sharma', age: 34, time: '10:30 AM', type: 'New Patient', status: 'waiting' },
    { name: 'Priya Patel', age: 28, time: '11:00 AM', type: 'Follow-up', status: 'in-consultation' },
    { name: 'Arjun Verma', age: 45, time: '12:30 PM', type: 'Report Review', status: 'upcoming' },
    { name: 'Kavya Nair', age: 22, time: '2:00 PM', type: 'New Patient', status: 'upcoming' },
]

const statusStyle = {
    waiting: 'bg-amber-100 text-amber-600',
    'in-consultation': 'bg-green-100 text-green-600',
    upcoming: 'bg-indigo-100 text-indigo-600',
}

const DoctorDashboard = () => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col gap-6 animate-fade-up'>

            {/* Welcome */}
            <div className='bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-5 text-white relative overflow-hidden'>
                <div className='absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full'></div>
                <div className='absolute bottom-[-30px] right-20 w-24 h-24 bg-white/5 rounded-full'></div>
                <p className='text-teal-200 text-xs font-semibold uppercase tracking-widest mb-1'>Good Morning</p>
                <h1 className='text-xl font-bold'>Dr. Meera Singh 👋</h1>
                <p className='text-teal-100 text-sm mt-1'>You have <b>{todayPatients.length} appointments</b> scheduled for today.</p>
                <div className='flex gap-4 mt-4'>
                    {[
                        { label: "Today's Patients", value: 4 },
                        { label: 'Pending Reports', value: 2 },
                        { label: 'Earnings Today', value: '₹3,200' },
                    ].map(({ label, value }) => (
                        <div key={label} className='bg-white/15 rounded-xl px-3 py-2'>
                            <p className='text-lg font-bold'>{value}</p>
                            <p className='text-teal-200 text-xs'>{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats row */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                {[
                    { icon: '👥', label: 'Total Patients', value: 142, color: 'teal' },
                    { icon: '⭐', label: 'Avg Rating', value: '4.9', color: 'amber' },
                    { icon: '💰', label: 'This Month', value: '₹28,400', color: 'green' },
                    { icon: '📅', label: 'This Week', value: 18, color: 'indigo' },
                ].map(({ icon, label, value, color }) => (
                    <div key={label} className={`bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:-translate-y-1 transition-all duration-300`}>
                        <p className='text-xl mb-2'>{icon}</p>
                        <p className={`text-xl font-bold text-${color}-600`}>{value}</p>
                        <p className='text-xs text-gray-400 font-medium'>{label}</p>
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {/* Today's Appointments */}
                <div className='bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>
                    <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
                        <h2 className='font-bold text-gray-900'>Today's Appointments</h2>
                        <button onClick={() => navigate('/doctor/appointments')} className='text-xs text-teal-600 font-semibold hover:underline'>View All →</button>
                    </div>
                    <div className='divide-y divide-gray-50'>
                        {todayPatients.map((p, i) => (
                            <div key={i} className='flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors duration-200'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-sm font-bold text-teal-600'>
                                        {p.name[0]}
                                    </div>
                                    <div>
                                        <p className='text-sm font-semibold text-gray-900'>{p.name}</p>
                                        <p className='text-xs text-gray-400'>{p.age} yrs · {p.type}</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-xs text-gray-500 mb-1'>{p.time}</p>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyle[p.status]}`}>
                                        {p.status.replace('-', ' ')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Schedule / Availability */}
                <div className='bg-white border border-gray-100 rounded-2xl shadow-sm p-5'>
                    <h2 className='font-bold text-gray-900 mb-4'>Your Schedule</h2>
                    <div className='flex gap-2 mb-4'>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                            <div key={day} className={`flex-1 flex flex-col items-center py-2 rounded-xl text-xs font-semibold
                ${i === 4 ? 'bg-gradient-to-b from-teal-500 to-emerald-500 text-white shadow-md' : 'bg-gray-50 text-gray-500'}`}>
                                <p>{day}</p>
                                <p className='text-lg mt-1'>{26 + i}</p>
                            </div>
                        ))}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1'>Today's Slots</p>
                        {['10:30 AM', '11:00 AM', '12:30 PM', '2:00 PM', '3:30 PM', '4:00 PM'].map((time, i) => (
                            <div key={time} className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs
                ${i < 2 ? 'bg-teal-50 border border-teal-100' : 'bg-gray-50 border border-gray-100'}`}>
                                <span className='font-medium text-gray-700'>{time}</span>
                                <span className={`font-semibold px-2 py-0.5 rounded-full
                  ${i === 1 ? 'bg-green-100 text-green-600' :
                                        i < 4 ? 'bg-teal-100 text-teal-600' :
                                            'bg-gray-200 text-gray-400'}`}>
                                    {i === 1 ? 'Active' : i < 4 ? 'Booked' : 'Open'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard
