import { useState } from 'react'

const appointments = [
    { id: 1, patient: 'Ravi Sharma', doctor: 'Dr. Meera Singh', speciality: 'Cardiologist', date: '28 Feb 2026', time: '10:30 AM', fees: 800, status: 'confirmed' },
    { id: 2, patient: 'Priya Patel', doctor: 'Dr. Anil Gupta', speciality: 'Dermatologist', date: '28 Feb 2026', time: '11:00 AM', fees: 600, status: 'pending' },
    { id: 3, patient: 'Arjun Verma', doctor: 'Dr. Sunita Rao', speciality: 'Neurologist', date: '28 Feb 2026', time: '12:30 PM', fees: 1200, status: 'confirmed' },
    { id: 4, patient: 'Kavya Nair', doctor: 'Dr. Rakesh Kumar', speciality: 'Pediatrician', date: '27 Feb 2026', time: '2:00 PM', fees: 500, status: 'cancelled' },
    { id: 5, patient: 'Amit Joshi', doctor: 'Dr. Deepa Shah', speciality: 'Gynecologist', date: '27 Feb 2026', time: '3:30 PM', fees: 900, status: 'completed' },
    { id: 6, patient: 'Sneha Gupta', doctor: 'Dr. Meera Singh', speciality: 'Cardiologist', date: '26 Feb 2026', time: '9:00 AM', fees: 800, status: 'completed' },
    { id: 7, patient: 'Raj Malhotra', doctor: 'Dr. Anil Gupta', speciality: 'Dermatologist', date: '26 Feb 2026', time: '11:30 AM', fees: 600, status: 'confirmed' },
]

const statusStyle = {
    confirmed: 'bg-green-100 text-green-600',
    pending: 'bg-amber-100 text-amber-600',
    cancelled: 'bg-red-100 text-red-500',
    completed: 'bg-indigo-100 text-indigo-600',
}

const AdminAppointments = () => {
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')

    const filtered = appointments.filter(a =>
        (filter === 'all' || a.status === filter) &&
        (a.patient.toLowerCase().includes(search.toLowerCase()) ||
            a.doctor.toLowerCase().includes(search.toLowerCase()))
    )

    const totalRevenue = appointments.filter(a => a.status === 'completed').reduce((s, a) => s + a.fees, 0)

    return (
        <div className='flex flex-col gap-6 animate-fade-up'>

            {/* Header */}
            <div>
                <h1 className='text-2xl font-bold text-gray-900'>Appointments</h1>
                <p className='text-gray-400 text-sm mt-0.5'>Manage all patient appointments</p>
            </div>

            {/* Summary Stats */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                {[
                    { label: 'Total', value: appointments.length, color: 'gray', icon: '📋' },
                    { label: 'Confirmed', value: appointments.filter(a => a.status === 'confirmed').length, color: 'green', icon: '✅' },
                    { label: 'Pending', value: appointments.filter(a => a.status === 'pending').length, color: 'amber', icon: '⏳' },
                    { label: 'Revenue', value: `₹${totalRevenue.toLocaleString()}`, color: 'indigo', icon: '💰' },
                ].map(({ label, value, color, icon }) => (
                    <div key={label} className={`bg-${color}-50 border border-${color}-100 rounded-2xl p-4`}>
                        <p className='text-xl mb-1'>{icon}</p>
                        <p className={`text-xl font-bold text-${color}-700`}>{value}</p>
                        <p className={`text-xs text-${color}-400 font-medium`}>{label}</p>
                    </div>
                ))}
            </div>

            {/* Filters + Search */}
            <div className='flex flex-col sm:flex-row gap-3'>
                <input
                    type='text'
                    placeholder='🔍 Search patient or doctor...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-100 bg-white text-sm outline-none focus:border-indigo-400 transition-all duration-300'
                />
                <div className='flex gap-2'>
                    {['all', 'confirmed', 'pending', 'cancelled', 'completed'].map((s) => (
                        <button key={s} onClick={() => setFilter(s)}
                            className={`flex-shrink-0 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200 capitalize
                ${filter === s ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-500 hover:border-indigo-300'}`}>
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className='bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-gray-50 border-b border-gray-100'>
                                {['Patient', 'Doctor', 'Date & Time', 'Fees', 'Status', 'Actions'].map(h => (
                                    <th key={h} className='text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide'>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-50'>
                            {filtered.map((apt, i) => (
                                <tr key={apt.id} className='hover:bg-gray-50 transition-colors duration-200 animate-fade-up' style={{ animationDelay: `${i * 0.05}s` }}>
                                    <td className='px-5 py-3.5'>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600'>
                                                {apt.patient[0]}
                                            </div>
                                            <span className='text-sm font-semibold text-gray-900'>{apt.patient}</span>
                                        </div>
                                    </td>
                                    <td className='px-5 py-3.5'>
                                        <p className='text-sm font-medium text-gray-900'>{apt.doctor}</p>
                                        <p className='text-xs text-indigo-500'>{apt.speciality}</p>
                                    </td>
                                    <td className='px-5 py-3.5'>
                                        <p className='text-sm text-gray-700'>{apt.date}</p>
                                        <p className='text-xs text-gray-400'>{apt.time}</p>
                                    </td>
                                    <td className='px-5 py-3.5'>
                                        <span className='text-sm font-bold text-gray-900'>₹{apt.fees}</span>
                                    </td>
                                    <td className='px-5 py-3.5'>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyle[apt.status]}`}>
                                            {apt.status}
                                        </span>
                                    </td>
                                    <td className='px-5 py-3.5'>
                                        <div className='flex items-center gap-2'>
                                            <button className='text-xs text-indigo-600 hover:underline font-medium'>View</button>
                                            <button className='text-xs text-red-400 hover:underline font-medium'>Cancel</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className='text-center py-12 text-gray-300'>
                        <p className='text-4xl mb-2'>📭</p>
                        <p className='text-sm font-medium'>No appointments found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminAppointments
