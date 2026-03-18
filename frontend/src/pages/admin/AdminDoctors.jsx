import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'

const specialities = ['Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'Gynecologist', 'General Physician', 'Gastroenterologist']

const AdminDoctors = () => {
    const { backendUrl } = useContext(AppContext)
    const [doctors, setDoctors] = useState([])
    const [pendingDoctors, setPendingDoctors] = useState([])
    const [tab, setTab] = useState('approved') // 'approved' or 'pending'
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchDoctors = async () => {
        setLoading(true)
        try {
            const resAll = await axios.get(backendUrl + '/user/all-doctors')
            const resPending = await axios.get(backendUrl + '/user/admin/pending-doctors')
            setDoctors(resAll.data)
            setPendingDoctors(resPending.data)
        } catch (error) {
            toast.error("Failed to fetch doctors")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDoctors()
    }, [])

    const handleApprove = async (id, status) => {
        try {
            await axios.post(backendUrl + '/user/admin/approve-doctor', { userId: id, status })
            toast.success(`Doctor ${status.charAt(0).toUpperCase() + status.slice(1)}ed!`)
            fetchDoctors()
        } catch (error) {
            toast.error("Action failed")
        }
    }

    const currentList = tab === 'approved' ? doctors : pendingDoctors
    const filtered = currentList.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) || 
        d.speciality?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className='flex flex-col gap-8 animate-fade-in-up'>
            {/* Header Section */}
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
                <div className='space-y-1'>
                    <h1 className='text-4xl font-black tracking-tight text-gray-900'>Medical Staff</h1>
                    <p className='text-gray-400 font-medium'>Manage verification and roles for all registered healthcare providers</p>
                </div>
                
                <div className='flex bg-gray-100/50 p-1.5 rounded-2xl border border-gray-200/50 backdrop-blur-sm'>
                    <button onClick={() => setTab('approved')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2
                        ${tab === 'approved' ? 'bg-white text-primary shadow-xl shadow-teal-100 ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}>
                        Verified Professionals <span className='bg-primary/10 text-primary px-2 py-0.5 rounded-md'>{doctors.length}</span>
                    </button>
                    <button onClick={() => setTab('pending')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2
                        ${tab === 'pending' ? 'bg-white text-orange-600 shadow-xl shadow-orange-100 ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}>
                        Verification Queue <span className='bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md animate-pulse'>{pendingDoctors.length}</span>
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className='relative group'>
                <div className='absolute inset-y-0 left-5 flex items-center pointer-events-none'>
                    <svg className='w-5 h-5 text-gray-300 group-focus-within:text-primary transition-colors' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input type='text' placeholder='Quick search by clinic, name or speciality...' value={search} onChange={(e) => setSearch(e.target.value)}
                    className='w-full pl-14 pr-6 py-5 rounded-3xl border border-gray-100 bg-white/50 backdrop-blur-xl text-gray-700 font-medium placeholder:text-gray-300 outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-sm' />
            </div>

            {/* Content Area */}
            {loading ? (
                <div className='flex flex-col items-center justify-center py-20 grayscale opacity-50'>
                    <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
                    <p className='mt-4 font-bold text-gray-400 uppercase tracking-widest text-xs'>Sychronizing Registry...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className='bg-white/50 border border-dashed border-gray-200 rounded-[2.5rem] py-24 flex flex-col items-center justify-center text-center'>
                    <div className='w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-3xl mb-6'>📂</div>
                    <h3 className='text-xl font-bold text-gray-900'>No Records Found</h3>
                    <p className='text-gray-400 mt-2 max-w-xs mx-auto'>Try adjusting your search filters or check your connection</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {filtered.map((doc) => (
                        <div key={doc._id} className='glass-card group rounded-[2.5rem] p-6 flex flex-col gap-6 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-teal-100 hover:-translate-y-2 border-white/40'>
                            {/* Role Badge */}
                            <div className='absolute top-0 right-0 px-6 py-2 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] rounded-bl-3xl border-l border-b border-gray-100 group-hover:bg-primary group-hover:text-white transition-colors'>
                                {doc.speciality || 'General'}
                            </div>

                            <div className='flex items-center gap-5'>
                                <div className='relative'>
                                    <img src={doc.profile_pic || 'https://via.placeholder.com/100'} alt={doc.name} 
                                        className='w-20 h-20 rounded-3xl object-cover ring-4 ring-white shadow-xl' />
                                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-lg border-4 border-white flex items-center justify-center text-[10px] shadow-lg
                                        ${doc.status === 'approved' ? 'bg-emerald-500' : doc.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'}`}>
                                        <span className='text-white font-bold'>✓</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className='text-xl font-black text-gray-900 group-hover:text-primary transition-colors'>{doc.name}</h4>
                                    <div className='flex items-center gap-2 mt-1.5'>
                                        <div className='flex text-amber-400 text-xs'>★★★★★</div>
                                        <span className='text-[10px] font-black text-gray-400'>4.9 REVIEWS</span>
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-3'>
                                <div className='bg-gray-50/50 p-4 rounded-2xl border border-gray-100'>
                                    <p className='text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1'>Fees / Visit</p>
                                    <p className='text-lg font-black text-gray-900 tracking-tight'>₹{doc.fees || '0'}</p>
                                </div>
                                <div className='bg-gray-50/50 p-4 rounded-2xl border border-gray-100'>
                                    <p className='text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1'>Experience</p>
                                    <p className='text-lg font-black text-gray-900 tracking-tight'>{doc.experience || 'NEW'}</p>
                                </div>
                            </div>

                            <div className='space-y-3 opacity-80'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 text-sm'>🎓</div>
                                    <div>
                                        <p className='text-[10px] font-bold text-gray-400 uppercase'>Medical Qualifications</p>
                                        <p className='text-xs font-bold text-gray-700'>{doc.degree || 'Pending Verification'}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm'>📍</div>
                                    <div>
                                        <p className='text-[10px] font-bold text-gray-400 uppercase'>Clinic Location</p>
                                        <p className='text-xs font-bold text-gray-700 truncate max-w-[180px]'>{doc.city || 'Remote Consult'}</p>
                                    </div>
                                </div>
                            </div>

                            {tab === 'pending' ? (
                                <div className='flex gap-3 mt-4'>
                                    <button onClick={() => handleApprove(doc._id, 'approved')}
                                        className='flex-1 py-4 bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-600 hover:scale-[1.02] transition-all'>
                                        Approve Profile
                                    </button>
                                    <button onClick={() => handleApprove(doc._id, 'rejected')}
                                        className='px-6 py-4 bg-rose-50 text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all'>
                                        Reject
                                    </button>
                                </div>
                            ) : (
                                <div className='flex gap-2 mt-4'>
                                     <button className='flex-1 py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:translate-y-[-2px] transition-all'>
                                        View Full Profile
                                    </button>
                                    <button onClick={() => handleApprove(doc._id, 'pending')}
                                        className='px-5 py-4 bg-amber-50 text-amber-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-100 transition-all'>
                                        Susp.
                                    </button>
                                </div>
                            )}

                            {/* Verification Doc Link */}
                            {tab === 'pending' && doc.certificate && (
                                <a href={doc.certificate} target='_blank' rel='noreferrer' 
                                    className='mt-2 block text-center text-[10px] font-bold text-primary hover:underline'>
                                    📎 View Medical Certificate
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminDoctors
