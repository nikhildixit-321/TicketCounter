import { useState } from 'react'

const initialDoctors = [
    { id: 1, name: 'Dr. Meera Singh', speciality: 'Cardiologist', experience: '8 yrs', fees: 800, patients: 142, rating: 4.9, status: 'active', email: 'meera@hospital.com', phone: '+91 9876543210' },
    { id: 2, name: 'Dr. Anil Gupta', speciality: 'Dermatologist', experience: '5 yrs', fees: 600, patients: 118, rating: 4.8, status: 'active', email: 'anil@hospital.com', phone: '+91 9876543211' },
    { id: 3, name: 'Dr. Sunita Rao', speciality: 'Neurologist', experience: '12 yrs', fees: 1200, patients: 97, rating: 4.7, status: 'active', email: 'sunita@hospital.com', phone: '+91 9876543212' },
    { id: 4, name: 'Dr. Rakesh Kumar', speciality: 'Pediatrician', experience: '6 yrs', fees: 500, patients: 203, rating: 4.6, status: 'inactive', email: 'rakesh@hospital.com', phone: '+91 9876543213' },
    { id: 5, name: 'Dr. Deepa Shah', speciality: 'Gynecologist', experience: '10 yrs', fees: 900, patients: 156, rating: 4.9, status: 'active', email: 'deepa@hospital.com', phone: '+91 9876543214' },
]

const specialities = ['Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'Gynecologist', 'General Physician', 'Gastroenterologist']

const AdminDoctors = () => {
    const [doctors, setDoctors] = useState(initialDoctors)
    const [showAdd, setShowAdd] = useState(false)
    const [search, setSearch] = useState('')
    const [filterSpec, setFilterSpec] = useState('All')
    const [form, setForm] = useState({ name: '', speciality: '', experience: '', fees: '', email: '', phone: '' })

    const filtered = doctors.filter(d =>
        (filterSpec === 'All' || d.speciality === filterSpec) &&
        (d.name.toLowerCase().includes(search.toLowerCase()) || d.speciality.toLowerCase().includes(search.toLowerCase()))
    )

    const handleAdd = (e) => {
        e.preventDefault()
        const newDoc = { ...form, id: Date.now(), patients: 0, rating: 0, status: 'active', fees: Number(form.fees) }
        setDoctors(prev => [newDoc, ...prev])
        setForm({ name: '', speciality: '', experience: '', fees: '', email: '', phone: '' })
        setShowAdd(false)
    }

    const toggleStatus = (id) => {
        setDoctors(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'active' ? 'inactive' : 'active' } : d))
    }

    const removeDoctor = (id) => {
        setDoctors(prev => prev.filter(d => d.id !== id))
    }

    return (
        <div className='flex flex-col gap-6 animate-fade-up'>

            {/* Header */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>Manage Doctors</h1>
                    <p className='text-gray-400 text-sm mt-0.5'>{doctors.length} doctors registered</p>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className='btn-glow bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-200 w-fit'
                >
                    + Add New Doctor
                </button>
            </div>

            {/* Filters */}
            <div className='flex flex-col sm:flex-row gap-3'>
                <input
                    type='text'
                    placeholder='🔍 Search by name or speciality...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-100 bg-white text-sm outline-none focus:border-indigo-400 transition-all duration-300'
                />
                <div className='flex gap-2 overflow-x-auto pb-1'>
                    {['All', ...specialities].map((s) => (
                        <button key={s} onClick={() => setFilterSpec(s)}
                            className={`flex-shrink-0 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200
                ${filterSpec === s ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600'}`}>
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Doctor Cards Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                {filtered.map((doc, i) => (
                    <div key={doc.id}
                        className='bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-up'
                        style={{ animationDelay: `${i * 0.06}s` }}
                    >
                        {/* Top */}
                        <div className='flex items-start justify-between mb-4'>
                            <div className='flex items-center gap-3'>
                                <div className='w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md'>
                                    {doc.name.split(' ')[1][0]}
                                </div>
                                <div>
                                    <p className='font-bold text-gray-900 text-sm'>{doc.name}</p>
                                    <p className='text-indigo-500 text-xs font-medium'>{doc.speciality}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleStatus(doc.id)}
                                className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300
                  ${doc.status === 'active' ? 'bg-green-100 text-green-600 hover:bg-red-100 hover:text-red-600' : 'bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-600'}`}>
                                {doc.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                            </button>
                        </div>

                        {/* Info Grid */}
                        <div className='grid grid-cols-3 gap-2 mb-4'>
                            {[
                                { label: 'Experience', value: doc.experience },
                                { label: 'Fees', value: `₹${doc.fees}` },
                                { label: 'Patients', value: doc.patients },
                            ].map(({ label, value }) => (
                                <div key={label} className='bg-gray-50 rounded-xl p-2 text-center'>
                                    <p className='text-sm font-bold text-gray-900'>{value}</p>
                                    <p className='text-xs text-gray-400'>{label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Contact */}
                        <div className='flex flex-col gap-1 mb-4 text-xs text-gray-400'>
                            <p>📧 {doc.email}</p>
                            <p>📞 {doc.phone}</p>
                        </div>

                        {/* Rating */}
                        <div className='flex items-center justify-between border-t border-gray-100 pt-3'>
                            <div className='flex items-center gap-1'>
                                <span className='text-yellow-400 text-sm'>⭐</span>
                                <span className='text-sm font-bold text-gray-900'>{doc.rating}</span>
                                <span className='text-xs text-gray-400'>rating</span>
                            </div>
                            <button
                                onClick={() => removeDoctor(doc.id)}
                                className='text-xs text-red-400 hover:text-red-600 font-semibold hover:bg-red-50 px-3 py-1 rounded-lg transition-all duration-200'
                            >
                                🗑 Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Doctor Modal */}
            {showAdd && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
                    onClick={() => setShowAdd(false)}>
                    <div className='bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-fade-up'
                        onClick={(e) => e.stopPropagation()}>
                        <div className='p-6 border-b border-gray-100 flex items-center justify-between'>
                            <div>
                                <h2 className='font-bold text-gray-900 text-lg'>Add New Doctor</h2>
                                <p className='text-gray-400 text-xs mt-0.5'>Fill in the doctor's information</p>
                            </div>
                            <button onClick={() => setShowAdd(false)} className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-500 transition-all'>✕</button>
                        </div>
                        <form onSubmit={handleAdd} className='p-6 flex flex-col gap-4'>
                            <div className='grid grid-cols-2 gap-3'>
                                {[
                                    { label: 'Full Name', key: 'name', placeholder: 'Dr. Ramesh Verma', type: 'text' },
                                    { label: 'Email', key: 'email', placeholder: 'doctor@hospital.com', type: 'email' },
                                    { label: 'Phone', key: 'phone', placeholder: '+91 9876543210', type: 'text' },
                                    { label: 'Experience', key: 'experience', placeholder: '5 yrs', type: 'text' },
                                    { label: 'Fees (₹)', key: 'fees', placeholder: '500', type: 'number' },
                                ].map(({ label, key, placeholder, type }) => (
                                    <div key={key} className={key === 'name' || key === 'email' ? 'col-span-2' : ''}>
                                        <label className='text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1'>{label}</label>
                                        <input
                                            type={type}
                                            placeholder={placeholder}
                                            value={form[key]}
                                            onChange={(e) => setForm(p => ({ ...p, [key]: e.target.value }))}
                                            className='w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm outline-none focus:border-indigo-400 transition-all duration-300'
                                            required
                                        />
                                    </div>
                                ))}
                                <div className='col-span-2'>
                                    <label className='text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1'>Speciality</label>
                                    <select
                                        value={form.speciality}
                                        onChange={(e) => setForm(p => ({ ...p, speciality: e.target.value }))}
                                        className='w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm outline-none focus:border-indigo-400 transition-all duration-300'
                                        required
                                    >
                                        <option value=''>Select speciality...</option>
                                        {specialities.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className='flex gap-3 mt-2'>
                                <button type='submit' className='btn-glow flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-sm'>
                                    ✅ Add Doctor
                                </button>
                                <button type='button' onClick={() => setShowAdd(false)} className='px-5 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-all'>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDoctors
