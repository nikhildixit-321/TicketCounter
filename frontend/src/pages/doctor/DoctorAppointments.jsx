import { useState } from 'react'

const appointments = [
    { id: 1, patient: 'Ravi Sharma', age: 34, phone: '+91 9876543210', date: '28 Feb 2026', time: '10:30 AM', type: 'New Patient', complaint: 'Chest pain and shortness of breath', status: 'waiting', fees: 800 },
    { id: 2, patient: 'Priya Patel', age: 28, phone: '+91 9876543211', date: '28 Feb 2026', time: '11:00 AM', type: 'Follow-up', complaint: 'Post-surgery checkup', status: 'in-consultation', fees: 800 },
    { id: 3, patient: 'Arjun Verma', age: 45, phone: '+91 9876543212', date: '28 Feb 2026', time: '12:30 PM', type: 'Report Review', complaint: 'ECG report analysis', status: 'upcoming', fees: 800 },
    { id: 4, patient: 'Kavya Nair', age: 22, phone: '+91 9876543213', date: '28 Feb 2026', time: '2:00 PM', type: 'New Patient', complaint: 'Palpitations and dizziness', status: 'upcoming', fees: 800 },
    { id: 5, patient: 'Amit Joshi', age: 56, phone: '+91 9876543214', date: '27 Feb 2026', time: '10:00 AM', type: 'Follow-up', complaint: 'BP monitoring', status: 'completed', fees: 800 },
]

const statusStyle = {
    waiting: 'bg-amber-100 text-amber-600',
    'in-consultation': 'bg-green-100 text-green-600',
    upcoming: 'bg-indigo-100 text-indigo-600',
    completed: 'bg-gray-100 text-gray-500',
    cancelled: 'bg-red-100 text-red-500',
}

const DoctorAppointments = () => {
    const [selected, setSelected] = useState(null)
    const [filter, setFilter] = useState('all')

    const filtered = appointments.filter(a => filter === 'all' || a.status === filter)

    return (
        <div className='flex flex-col gap-5 animate-fade-up'>
            {/* Header */}
            <div>
                <h1 className='text-2xl font-bold text-gray-900'>My Appointments</h1>
                <p className='text-gray-400 text-sm mt-0.5'>Manage your patient schedule</p>
            </div>

            {/* Filters */}
            <div className='flex gap-2 overflow-x-auto pb-1'>
                {['all', 'waiting', 'in-consultation', 'upcoming', 'completed'].map(s => (
                    <button key={s} onClick={() => setFilter(s)}
                        className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 capitalize
              ${filter === s ? 'bg-teal-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-500 hover:border-teal-300'}`}>
                        {s.replace('-', ' ')}
                    </button>
                ))}
            </div>

            <div className='flex gap-5'>
                {/* List */}
                <div className='flex-1 flex flex-col gap-3'>
                    {filtered.map((apt, i) => (
                        <div
                            key={apt.id}
                            onClick={() => setSelected(apt)}
                            className={`bg-white border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md animate-fade-up
                ${selected?.id === apt.id ? 'border-teal-400 shadow-md shadow-teal-100' : 'border-gray-100'}`}
                            style={{ animationDelay: `${i * 0.06}s` }}
                        >
                            <div className='flex items-start justify-between'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 font-bold'>
                                        {apt.patient[0]}
                                    </div>
                                    <div>
                                        <p className='font-bold text-gray-900 text-sm'>{apt.patient}</p>
                                        <p className='text-xs text-gray-400'>{apt.age} yrs · {apt.type}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyle[apt.status]}`}>
                                    {apt.status.replace('-', ' ')}
                                </span>
                            </div>
                            <div className='flex items-center gap-4 mt-3 text-xs text-gray-400'>
                                <span>📅 {apt.date}</span>
                                <span>🕐 {apt.time}</span>
                                <span>💰 ₹{apt.fees}</span>
                            </div>
                            <p className='text-xs text-gray-500 mt-2 bg-gray-50 px-3 py-1.5 rounded-lg'>
                                📋 {apt.complaint}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Detail Panel */}
                {selected && (
                    <div className='w-72 flex-shrink-0 animate-fade-right'>
                        <div className='bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden sticky top-0'>
                            <div className='bg-gradient-to-r from-teal-500 to-emerald-500 p-5 text-white'>
                                <div className='w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold mb-3'>
                                    {selected.patient[0]}
                                </div>
                                <h3 className='font-bold text-lg'>{selected.patient}</h3>
                                <p className='text-teal-100 text-sm'>{selected.age} years · {selected.type}</p>
                                <span className={`mt-2 inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[selected.status]} bg-white/20 text-white`}>
                                    {selected.status.replace('-', ' ')}
                                </span>
                            </div>
                            <div className='p-4 flex flex-col gap-3'>
                                {[
                                    { icon: '📅', label: 'Date', value: selected.date },
                                    { icon: '🕐', label: 'Time', value: selected.time },
                                    { icon: '📞', label: 'Phone', value: selected.phone },
                                    { icon: '💰', label: 'Fees', value: `₹${selected.fees}` },
                                ].map(({ icon, label, value }) => (
                                    <div key={label} className='flex items-center gap-3 bg-gray-50 rounded-xl p-2.5'>
                                        <span className='text-sm'>{icon}</span>
                                        <div>
                                            <p className='text-xs text-gray-400'>{label}</p>
                                            <p className='text-sm font-semibold text-gray-900'>{value}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className='bg-amber-50 rounded-xl p-3'>
                                    <p className='text-xs text-amber-600 font-semibold mb-1'>Chief Complaint</p>
                                    <p className='text-xs text-gray-600'>{selected.complaint}</p>
                                </div>
                                <button className='w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:-translate-y-0.5 transition-all duration-300'>
                                    Start Consultation →
                                </button>
                                <button onClick={() => setSelected(null)} className='w-full border border-gray-200 text-gray-500 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all'>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DoctorAppointments
