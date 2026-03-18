import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_frontend/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const steps = ['Identity Verification', 'Medical Credentials', 'Practice Locations', 'Official Documents']

const specialities = [
    'Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 
    'Gynecologist', 'General Physician', 'Gastroenterologist', 
    'Orthopedic', 'Psychiatrist', 'ENT Specialist'
]

const DoctorOnboard = () => {
    const { backendUrl, token } = useContext(AppContext)
    const [step, setStep] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate()

    const [form, setForm] = useState({
        // Step 1: Basic
        fullName: '', dob: '', gender: '', adharNumber: '',
        // Step 2: Professional
        speciality: '', degree: '', college: '', experience: '', regNumber: '',
        // Step 3: Locations & Fees
        city: '', state: '', address: '', fees: '', 
        clinicName: '', clinicTiming: '', availability: '',
        homeCoords: null, clinicCoords: null,
        // Step 4: Documents
        certificate: null, idProof: null, photo: null,
    })

    const update = (key, val) => setForm(p => ({ ...p, [key]: val }))

    const getCoords = (type) => {
        if (!navigator.geolocation) return toast.error("Geolocation not supported")
        navigator.geolocation.getCurrentPosition((pos) => {
            const coords = { lat: pos.coords.latitude, long: pos.coords.longitude }
            update(type === 'home' ? 'homeCoords' : 'clinicCoords', coords)
            toast.success(`${type === 'home' ? 'Home' : 'Clinic'} location synced!`)
        }, (err) => {
            toast.error("Location access denied. Please enable GPS.")
        })
    }

    const handleNext = () => { if (step < steps.length - 1) setStep(s => s + 1) }
    const handleBack = () => { if (step > 0) setStep(s => s - 1) }

    const handleSubmit = async () => {
        try {
            const formData = new FormData()
            
            // Basic & Professional Info
            Object.keys(form).forEach(key => {
                if (form[key] && typeof form[key] !== 'object') {
                    formData.append(key, form[key])
                }
            })

            // Email from Token
            const userEmail = JSON.parse(atob(token.split('.')[1])).email
            formData.append('email', userEmail)

            // Coordinates
            if (form.homeCoords) {
                formData.append('home_lat', form.homeCoords.lat)
                formData.append('home_long', form.homeCoords.long)
            }
            if (form.clinicCoords) {
                formData.append('clinic_lat', form.clinicCoords.lat)
                formData.append('clinic_long', form.clinicCoords.long)
            }

            // Documents
            if (form.certificate) formData.append('certificate', form.certificate)
            if (form.idProof) formData.append('idProof', form.idProof)
            if (form.photo) formData.append('license', form.photo)

            const { data } = await axios.post(backendUrl + '/user/onboard-doctor', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            if (data) {
                toast.success("Professional Profile Submitted!")
                setSubmitted(true)
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Submission Failed")
        }
    }

    if (submitted) return (
        <div className='min-h-screen bg-slate-50 flex items-center justify-center p-4'>
            <div className='bg-white border-4 border-slate-900 shadow-[20px_20px_0px_rgba(0,0,0,0.1)] rounded-sm p-12 max-w-md w-full text-center'>
                <div className='text-6xl mb-6'>📨</div>
                <h1 className='text-3xl font-black text-slate-800 uppercase tracking-tighter mb-4 leading-none'>
                    Registry Entry Pending
                </h1>
                <p className='text-slate-500 text-[10px] font-black leading-relaxed mb-8 uppercase tracking-widest'>
                    Your credentials have been submitted to the National Medical Board for verification. You will be notified once authorization is granted.
                </p>
                <button onClick={() => navigate('/')}
                    className='w-full py-5 bg-slate-900 text-white font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all'>
                    RETURN TO PORTAL
                </button>
            </div>
        </div>
    )

    return (
        <div className='min-h-screen bg-slate-100 py-12 px-4 flex items-center justify-center'>
            <div className='max-w-5xl w-full'>
                {/* Header */}
                <div className='mb-12 border-l-8 border-blue-600 pl-8'>
                    <h1 className='text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none'>Doctor Onboarding</h1>
                    <p className='text-slate-400 text-[10px] mt-3 font-black uppercase tracking-[0.4em]'>Professional Medical Accreditation Network</p>
                </div>

                {/* Main Workflow Multi-Step Card */}
                <div className='bg-white border-2 border-slate-800 shadow-[30px_30px_0px_rgba(0,0,0,0.05)] rounded-sm overflow-hidden flex flex-col md:flex-row min-h-[650px]'>
                    
                    {/* Sidebar Progress */}
                    <div className='md:w-72 bg-slate-900 p-10 flex flex-col gap-10'>
                        {steps.map((s, i) => (
                            <div key={i} className='flex items-center gap-5 group'>
                                <div className={`w-10 h-10 flex items-center justify-center font-black text-xs transition-all
                                    ${i < step ? 'bg-blue-500 text-white' : i === step ? 'bg-white text-slate-900 scale-110 shadow-xl' : 'border-2 border-slate-700 text-slate-600'}`}>
                                    {i < step ? '✓' : i + 1}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest transition-all
                                    ${i === step ? 'text-white' : i < step ? 'text-blue-400' : 'text-slate-600'}`}>
                                    {s}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Form Component */}
                    <div className='flex-1 p-12 flex flex-col bg-white'>
                        <div className='flex-1'>
                            <div className='mb-10 pb-5 border-b-2 border-slate-50 flex items-center justify-between'>
                                <div>
                                    <h2 className='text-3xl font-black text-slate-800 uppercase tracking-tighter leading-none'>{steps[step]}</h2>
                                    <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2'>Section Node: DATA_ENTRY_0{step + 1}</p>
                                </div>
                                <div className='w-14 h-14 border-2 border-slate-100 rounded-lg flex items-center justify-center text-2xl font-black text-slate-200'>0{step + 1}</div>
                            </div>

                            {/* STAGES */}
                            {step === 0 && (
                                <div className='grid grid-cols-2 gap-8 animate-fade-in'>
                                    <div className='col-span-2'>
                                        <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2'>Legal Professional Name</label>
                                        <input type='text' placeholder='DR. NIKHIL DIXIT' value={form.fullName} onChange={(e) => update('fullName', e.target.value)}
                                            className='w-full px-6 py-4 border-2 border-slate-100 focus:border-slate-900 outline-none font-black text-sm bg-slate-50/50 transition-all uppercase' />
                                    </div>
                                    <div className='col-span-2'>
                                        <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2'>Govt Identification (Aadhaar Number)</label>
                                        <input type='text' placeholder='1234 5678 9012' value={form.adharNumber} onChange={(e) => update('adharNumber', e.target.value)}
                                            className='w-full px-6 py-4 border-2 border-slate-100 focus:border-slate-900 outline-none font-black text-sm bg-slate-50/50 transition-all font-mono' />
                                    </div>
                                    <div>
                                        <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2'>Date of Official Birth</label>
                                        <input type='date' value={form.dob} onChange={(e) => update('dob', e.target.value)}
                                            className='w-full px-6 py-4 border-2 border-slate-100 focus:border-slate-900 outline-none font-black text-sm uppercase' />
                                    </div>
                                    <div>
                                        <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2'>Gender Designation</label>
                                        <select value={form.gender} onChange={(e) => update('gender', e.target.value)}
                                            className='w-full px-6 py-4 border-2 border-slate-100 focus:border-slate-900 outline-none font-black text-sm bg-white uppercase'>
                                            <option value=''>SELECT...</option>
                                            <option value='male'>MALE</option>
                                            <option value='female'>FEMALE</option>
                                            <option value='other'>OTHER</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {step === 1 && (
                                <div className='space-y-8 animate-fade-in'>
                                    <div>
                                        <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3'>Primary Specialization Track</label>
                                        <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                                            {specialities.map(s => (
                                                <button key={s} onClick={() => update('speciality', s)}
                                                    className={`py-3 px-4 border-2 text-[10px] font-black uppercase tracking-widest transition-all
                                                        ${form.speciality === s ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'}`}>
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <div>
                                            <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2'>Highest Medical Degree</label>
                                            <input type='text' placeholder='MD, MBBS, MS' value={form.degree} onChange={(e) => update('degree', e.target.value)}
                                                className='w-full px-6 py-4 border-2 border-slate-100 focus:border-slate-900 outline-none font-black text-sm uppercase' />
                                        </div>
                                        <div>
                                            <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2'>MCI / State Council Reg No.</label>
                                            <input type='text' placeholder='REG-XXXX-XXXX' value={form.regNumber} onChange={(e) => update('regNumber', e.target.value)}
                                                className='w-full px-6 py-4 border-2 border-slate-100 focus:border-slate-900 outline-none font-black text-sm font-mono' />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className='space-y-8 animate-fade-in'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        <div className='col-span-2 bg-[#f0f7ff] p-6 border-2 border-blue-100 flex items-center justify-between'>
                                            <div className='flex items-center gap-5'>
                                                <div className='w-12 h-12 bg-blue-600 rounded-sm flex items-center justify-center text-white text-2xl shadow-lg'>🏠</div>
                                                <div>
                                                    <p className='text-[10px] font-black text-blue-400 uppercase tracking-widest'>Home Matrix Sync</p>
                                                    <p className='text-xs font-black text-blue-900'>{form.homeCoords ? `LOC: ${form.homeCoords.lat.toFixed(6)}, ${form.homeCoords.long.toFixed(6)}` : 'Wait for Satellite Lock'}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => getCoords('home')} className='py-3 px-6 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20'>LOG CURRENT HOME</button>
                                        </div>

                                        <div className='col-span-2 bg-[#f0fff7] p-6 border-2 border-emerald-100 flex items-center justify-between'>
                                            <div className='flex items-center gap-5'>
                                                <div className='w-12 h-12 bg-emerald-500 rounded-sm flex items-center justify-center text-white text-2xl shadow-lg'>🏥</div>
                                                <div>
                                                    <p className='text-[10px] font-black text-emerald-400 uppercase tracking-widest'>Clinic / Office Matrix</p>
                                                    <p className='text-xs font-black text-emerald-900'>{form.clinicCoords ? `LOC: ${form.clinicCoords.lat.toFixed(6)}, ${form.clinicCoords.long.toFixed(6)}` : 'Navigate to Office and Sync'}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => getCoords('clinic')} className='py-3 px-6 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20'>LOG CLINIC LOCATION</button>
                                        </div>

                                        <div className='col-span-2'>
                                            <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2'>Full Practice / Clinic Name</label>
                                            <input type='text' placeholder='CITY MATERNITY & DENTAL CLINIC' value={form.clinicName} onChange={(e) => update('clinicName', e.target.value)}
                                                className='w-full px-6 py-4 border-2 border-slate-100 focus:border-slate-900 outline-none font-black text-sm uppercase' />
                                        </div>
                                        <div>
                                            <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2'>Standard Consultation Fee (₹)</label>
                                            <input type='number' placeholder='1000' value={form.fees} onChange={(e) => update('fees', e.target.value)}
                                                className='w-full px-6 py-4 border-2 border-slate-100 focus:border-slate-900 outline-none font-black text-sm' />
                                        </div>
                                        <div>
                                            <label className='text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2'>Operating Hours</label>
                                            <input type='text' placeholder='10:00 AM - 08:00 PM' value={form.clinicTiming} onChange={(e) => update('clinicTiming', e.target.value)}
                                                className='w-full px-6 py-4 border-2 border-slate-100 focus:border-slate-900 outline-none font-black text-sm uppercase' />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className='space-y-6 animate-fade-in'>
                                    <div className='bg-slate-900 text-white p-6 rounded-sm flex items-start gap-5 mb-8'>
                                        <div className='text-3xl'>⚠️</div>
                                        <div>
                                            <p className='text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1'>Verification Protocol</p>
                                            <p className='text-[10px] font-bold text-slate-400 uppercase leading-none'>Upload ultra-HD scans only. Documents are verified by automated Gov-gateways.</p>
                                        </div>
                                    </div>
                                    {[
                                        { label: 'Official Degree Certificates (Scanned PDF/JPG)', key: 'certificate', icon: '📜' },
                                        { label: 'Government Photo ID (Aadhaar/Identity)', key: 'idProof', icon: '🪪' },
                                        { label: 'Medical Council License / Profile Photo', key: 'photo', icon: '🩺' },
                                    ].map((f) => (
                                        <label key={f.key} className='flex items-center gap-6 p-6 border-2 border-slate-100 hover:border-slate-900 cursor-pointer transition-all bg-slate-50/50 group'>
                                            <div className='w-16 h-16 bg-white border-2 border-slate-100 flex items-center justify-center text-3xl shadow-sm z-10 group-hover:scale-110 transition-transform'>{f.icon}</div>
                                            <div className='flex-1'>
                                                <p className='text-[11px] font-black text-slate-800 uppercase tracking-widest leading-none mb-2'>{f.label}</p>
                                                <p className='text-[10px] font-black text-slate-400 uppercase tracking-tighter'>
                                                    {form[f.key] ? `✅ PAYLOAD_ATTACHED: ${form[f.key].name.toUpperCase()}` : 'Select Document Payload'}
                                                </p>
                                            </div>
                                            <input type='file' className='hidden' onChange={(e) => update(f.key, e.target.files[0])} />
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* NAV CONTROL INTERFACE */}
                        <div className='mt-12 flex gap-6 pt-10 border-t-2 border-slate-50'>
                            {step > 0 && (
                                <button onClick={handleBack} className='px-12 py-5 border-4 border-slate-900 font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all'>BACK</button>
                            )}
                            <button onClick={step === steps.length - 1 ? handleSubmit : handleNext} 
                                className='flex-1 py-5 bg-slate-900 text-white font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 active:scale-95'>
                                {step === steps.length - 1 ? 'AUTHORIZE & SUBMIT ENTRY' : 'CONTINUE TO SECTION: ' + (step + 2)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorOnboard
