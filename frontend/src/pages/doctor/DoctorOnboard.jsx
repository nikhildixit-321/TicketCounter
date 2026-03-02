import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const steps = ['Personal Info', 'Professional Details', 'Location & Fees', 'Upload Documents']

const specialities = ['Cardiologist', 'Dermatologist', 'Neurologist', 'Pediatrician', 'Gynecologist', 'General Physician', 'Gastroenterologist', 'Orthopedic', 'Psychiatrist', 'ENT Specialist']

const DoctorOnboard = () => {
    const [step, setStep] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate()

    const [form, setForm] = useState({
        // Step 1
        fullName: '', email: '', phone: '', dob: '', gender: '',
        // Step 2
        speciality: '', degree: '', college: '', experience: '', regNumber: '',
        // Step 3
        city: '', state: '', address: '', fees: '', availability: '',
        // Step 4
        certificate: null, idProof: null, photo: null,
    })

    const update = (key, val) => setForm(p => ({ ...p, [key]: val }))

    const handleNext = () => { if (step < steps.length - 1) setStep(s => s + 1) }
    const handleBack = () => { if (step > 0) setStep(s => s - 1) }
    const handleSubmit = () => setSubmitted(true)

    if (submitted) return (
        <div className='min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center'>
            <div className='bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full mx-4 text-center animate-fade-up'>
                <div className='text-7xl mb-5'>🎉</div>
                <h1 className='text-2xl font-bold text-gray-900 mb-3'>Application Submitted!</h1>
                <p className='text-gray-400 text-sm leading-7 mb-6'>
                    Your registration is under review. Our team will verify your certificates and approve your profile within <b>24-48 hours</b>.
                </p>
                <div className='bg-teal-50 rounded-2xl p-4 mb-6 text-left'>
                    <p className='text-xs font-semibold text-teal-600 uppercase tracking-wide mb-2'>What happens next?</p>
                    {['✅ Certificate verification', '📧 Email confirmation sent', '👤 Profile goes live', '📅 Patients can book you'].map(s => (
                        <p key={s} className='text-sm text-gray-600 py-1'>{s}</p>
                    ))}
                </div>
                <button onClick={() => navigate('/doctor/login')}
                    className='w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-xl font-semibold text-sm'>
                    Go to Doctor Login →
                </button>
            </div>
        </div>
    )

    return (
        <div className='min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 py-10 px-4'>
            <div className='max-w-2xl mx-auto'>

                {/* Header */}
                <div className='text-center mb-8 animate-fade-up'>
                    <div className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 mb-4 shadow-lg'>
                        <span className='text-white text-2xl'>👨‍⚕️</span>
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900'>Doctor Registration</h1>
                    <p className='text-gray-400 text-sm mt-1'>Join TicketCounter as a verified healthcare provider</p>
                </div>

                {/* Progress Steps */}
                <div className='flex items-center mb-8'>
                    {steps.map((s, i) => (
                        <div key={i} className='flex-1 flex flex-col items-center'>
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500
                ${i < step ? 'bg-teal-500 text-white' :
                                    i === step ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-200 scale-110' :
                                        'bg-gray-100 text-gray-400'}`}>
                                {i < step ? '✓' : i + 1}
                            </div>
                            <p className={`text-xs mt-2 font-medium transition-all duration-300 text-center hidden sm:block
                ${i === step ? 'text-teal-600' : i < step ? 'text-teal-400' : 'text-gray-300'}`}>
                                {s}
                            </p>
                            {i < steps.length - 1 && (
                                <div className={`h-0.5 w-full mt-4 transition-all duration-500 absolute hidden sm:block`}
                                    style={{ width: '100%' }} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Form Card */}
                <div className='bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-fade-up'>
                    <div className='bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-4'>
                        <p className='text-white font-bold text-sm'>Step {step + 1}: {steps[step]}</p>
                        <div className='mt-2 bg-white/20 rounded-full h-1.5'>
                            <div className='bg-white rounded-full h-1.5 transition-all duration-500' style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
                        </div>
                    </div>

                    <div className='p-6'>
                        {/* Step 1: Personal Info */}
                        {step === 0 && (
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                {[
                                    { label: 'Full Name', key: 'fullName', placeholder: 'Dr. Ramesh Verma', type: 'text', span: 2 },
                                    { label: 'Email', key: 'email', placeholder: 'doctor@gmail.com', type: 'email' },
                                    { label: 'Phone', key: 'phone', placeholder: '+91 9876543210', type: 'tel' },
                                    { label: 'Date of Birth', key: 'dob', type: 'date' },
                                ].map(({ label, key, placeholder, type, span }) => (
                                    <div key={key} className={span ? 'col-span-2' : ''}>
                                        <label className='text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5'>{label}</label>
                                        <input type={type} placeholder={placeholder} value={form[key]}
                                            onChange={(e) => update(key, e.target.value)}
                                            className='w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm outline-none focus:border-teal-400 transition-all duration-300' />
                                    </div>
                                ))}
                                <div>
                                    <label className='text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5'>Gender</label>
                                    <select value={form.gender} onChange={(e) => update('gender', e.target.value)}
                                        className='w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm outline-none focus:border-teal-400 transition-all duration-300'>
                                        <option value=''>Select...</option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                        <option value='other'>Other</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Professional */}
                        {step === 1 && (
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='col-span-2'>
                                    <label className='text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5'>Speciality</label>
                                    <div className='flex flex-wrap gap-2'>
                                        {specialities.map(s => (
                                            <button key={s} type='button' onClick={() => update('speciality', s)}
                                                className={`text-xs px-3 py-2 rounded-xl font-semibold transition-all duration-200
                          ${form.speciality === s ? 'bg-teal-500 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-teal-50 hover:text-teal-600'}`}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {[
                                    { label: 'Medical Degree', key: 'degree', placeholder: 'MBBS, MD, MS...', type: 'text' },
                                    { label: 'Medical College', key: 'college', placeholder: 'AIIMS Delhi', type: 'text' },
                                    { label: 'Experience', key: 'experience', placeholder: '5 years', type: 'text' },
                                    { label: 'Registration No.', key: 'regNumber', placeholder: 'MCI-XXXXX', type: 'text' },
                                ].map(({ label, key, placeholder, type }) => (
                                    <div key={key}>
                                        <label className='text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5'>{label}</label>
                                        <input type={type} placeholder={placeholder} value={form[key]}
                                            onChange={(e) => update(key, e.target.value)}
                                            className='w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm outline-none focus:border-teal-400 transition-all duration-300' />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Step 3: Location & Fees */}
                        {step === 2 && (
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                {[
                                    { label: 'City', key: 'city', placeholder: 'Mumbai', type: 'text' },
                                    { label: 'State', key: 'state', placeholder: 'Maharashtra', type: 'text' },
                                    { label: 'Clinic Address', key: 'address', placeholder: 'Full address...', type: 'text', span: 2 },
                                    { label: 'Consultation Fees (₹)', key: 'fees', placeholder: '500', type: 'number' },
                                ].map(({ label, key, placeholder, type, span }) => (
                                    <div key={key} className={span ? 'col-span-2' : ''}>
                                        <label className='text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5'>{label}</label>
                                        <input type={type} placeholder={placeholder} value={form[key]}
                                            onChange={(e) => update(key, e.target.value)}
                                            className='w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm outline-none focus:border-teal-400 transition-all duration-300' />
                                    </div>
                                ))}
                                <div className='col-span-2'>
                                    <label className='text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2'>Available Days</label>
                                    <div className='flex flex-wrap gap-2'>
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                                            const selected = form.availability?.includes(day)
                                            return (
                                                <button key={day} type='button'
                                                    onClick={() => {
                                                        const days = form.availability ? form.availability.split(',') : []
                                                        const updated = selected ? days.filter(d => d !== day) : [...days, day]
                                                        update('availability', updated.join(','))
                                                    }}
                                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                            ${selected ? 'bg-teal-500 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-teal-50'}`}>
                                                    {day}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Documents */}
                        {step === 3 && (
                            <div className='flex flex-col gap-5'>
                                <div className='bg-amber-50 border border-amber-200 rounded-2xl p-4'>
                                    <p className='text-sm font-semibold text-amber-700 mb-1'>📋 Documents Required</p>
                                    <p className='text-xs text-amber-600'>All documents must be valid and clearly visible. Accepted formats: PDF, JPG, PNG (max 5MB)</p>
                                </div>
                                {[
                                    { label: 'Medical Certificate / Degree', key: 'certificate', icon: '🎓' },
                                    { label: 'Government ID Proof', key: 'idProof', icon: '🪪' },
                                    { label: 'Profile Photo', key: 'photo', icon: '📸' },
                                ].map(({ label, key, icon }) => (
                                    <div key={key}>
                                        <label className='text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2'>{label}</label>
                                        <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300
                      ${form[key] ? 'border-teal-400 bg-teal-50' : 'border-gray-200 bg-gray-50 hover:border-teal-300 hover:bg-teal-50'}`}>
                                            <span className='text-2xl'>{icon}</span>
                                            <div>
                                                <p className='text-sm font-semibold text-gray-700'>
                                                    {form[key] ? '✅ File selected' : 'Click to upload'}
                                                </p>
                                                <p className='text-xs text-gray-400'>PDF, JPG, PNG — max 5MB</p>
                                            </div>
                                            <input type='file' className='hidden' onChange={(e) => update(key, e.target.files[0])} />
                                        </label>
                                    </div>
                                ))}

                                <div className='bg-indigo-50 border border-indigo-100 rounded-2xl p-4'>
                                    <p className='text-xs text-indigo-700 font-semibold mb-1'>✅ Declaration</p>
                                    <label className='flex items-start gap-2 cursor-pointer'>
                                        <input type='checkbox' required className='mt-0.5' />
                                        <p className='text-xs text-gray-500 leading-5'>
                                            I declare that all information provided is accurate and my medical registration is valid. I agree to TicketCounter's terms of service.
                                        </p>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className='px-6 pb-6 flex gap-3'>
                        {step > 0 && (
                            <button onClick={handleBack}
                                className='px-6 py-3 border border-gray-200 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all duration-300'>
                                ← Back
                            </button>
                        )}
                        {step < steps.length - 1 ? (
                            <button onClick={handleNext}
                                className='flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-teal-200 hover:-translate-y-0.5 transition-all duration-300'>
                                Next Step →
                            </button>
                        ) : (
                            <button onClick={handleSubmit}
                                className='flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-teal-200 hover:-translate-y-0.5 transition-all duration-300'>
                                🚀 Submit Application
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorOnboard
