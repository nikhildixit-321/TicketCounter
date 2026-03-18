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
    const handleSubmit = async () => {
        try {
            const formData = new FormData()
            // Step 1 & 2 & 3 data
            Object.keys(form).forEach(key => {
                if (form[key] && typeof form[key] !== 'object') {
                    formData.append(key, form[key])
                }
            })
            // Extra: ensure email is included (might need to get from context/localStorage)
            const userEmail = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).email;
            formData.append('email', userEmail)

            // Documents
            if (form.certificate) formData.append('certificate', form.certificate)
            if (form.idProof) formData.append('idProof', form.idProof)
            if (form.photo) formData.append('license', form.photo) // User mentioned license too

            const { data } = await axios.post(backendUrl + '/user/onboard-doctor', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            if (data) {
                toast.success("Application Submitted Successfully!")
                setSubmitted(true)
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Submission Failed")
        }
    }

    if (submitted) return (
        <div className='min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center p-4'>
            <div className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center animate-fade-in-scale'>
                <div className='text-7xl mb-5 animate-bounce'>🎉</div>
                <h1 className='text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-3'>
                    Application Submitted!
                </h1>
                <p className='text-gray-500 text-sm leading-relaxed mb-6'>
                    Your professional profile is under review. Our administrators will verify your credentials and approve your account within <b>24-48 hours</b>.
                </p>
                <div className='bg-teal-50/50 rounded-2xl p-4 mb-6 text-left border border-teal-100'>
                    <p className='text-xs font-bold text-teal-600 uppercase tracking-widest mb-3'>Verification Pipeline</p>
                    {[
                        { label: 'Document Verification', status: 'In Progress' },
                        { label: 'License Authentication', status: 'Pending' },
                        { label: 'Final Approval', status: 'Pending' }
                    ].map((s, idx) => (
                        <div key={idx} className='flex items-center justify-between py-1.5'>
                            <span className='text-sm text-gray-600'>{s.label}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.status === 'In Progress' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-400'}`}>
                                {s.status}
                            </span>
                        </div>
                    ))}
                </div>
                <button onClick={() => navigate('/')}
                    className='btn-primary w-full'>
                    Return to Home
                </button>
            </div>
        </div>
    )

    return (
        <div className='min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 py-10 px-4 relative overflow-hidden'>
             <div className='absolute top-0 -left-4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
             <div className='absolute top-0 -right-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob delay-200'></div>

            <div className='max-w-2xl mx-auto relative z-10'>
                {/* Header */}
                <div className='text-center mb-10 animate-fade-in-up'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 mb-4 shadow-xl shadow-teal-200'>
                        <span className='text-white text-3xl'>👨‍⚕️</span>
                    </div>
                    <h1 className='text-4xl font-bold text-gray-900 tracking-tight'>Professional Onboarding</h1>
                    <p className='text-gray-500 text-sm mt-3 font-medium'>Join our network of verified elite healthcare providers</p>
                </div>

                {/* Progress Steps */}
                <div className='flex items-center mb-10 px-2'>
                    {steps.map((s, i) => (
                        <div key={i} className='flex-1 flex flex-col items-center relative'>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 z-10
                                ${i < step ? 'bg-teal-500 text-white' :
                                  i === step ? 'bg-primary text-white shadow-xl shadow-teal-200 scale-110' :
                                  'bg-white border-2 border-gray-100 text-gray-300'}`}>
                                {i < step ? '✓' : i + 1}
                            </div>
                            <p className={`text-[10px] mt-3 font-bold uppercase tracking-widest transition-all duration-300 text-center
                                ${i === step ? 'text-primary' : i < step ? 'text-teal-400' : 'text-gray-300'}`}>
                                {s}
                            </p>
                            {i < steps.length - 1 && (
                                <div className={`absolute top-5 left-[60%] w-[80%] h-[2px] -z-0 rounded-full
                                    ${i < step ? 'bg-teal-500' : 'bg-gray-100'}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Form Card */}
                <div className='glass-card rounded-[2rem] overflow-hidden animate-fade-in-up'>
                    <div className='bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-5 flex items-center justify-between'>
                        <div>
                            <p className='text-white/70 text-[10px] font-bold uppercase tracking-widest'>Section {step + 1}</p>
                            <h2 className='text-white font-bold text-lg'>{steps[step]}</h2>
                        </div>
                        <div className='text-white/50 font-mono text-xl font-bold'>0{step + 1}</div>
                    </div>

                    <div className='p-8'>
                        {/* Step 1: Personal Info */}
                        {step === 0 && (
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                                {[
                                    { label: 'Full Name', key: 'fullName', placeholder: 'Dr. Ramesh Verma', type: 'text', span: 2 },
                                    { label: 'Date of Birth', key: 'dob', type: 'date' },
                                    { label: 'Gender', key: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
                                ].map((field) => (
                                    <div key={field.key} className={field.span ? 'col-span-2' : ''}>
                                        <label className='text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2'>{field.label}</label>
                                        {field.type === 'select' ? (
                                            <select value={form[field.key]} onChange={(e) => update(field.key, e.target.value)}
                                                className='w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm outline-none focus:border-primary focus:bg-white transition-all'>
                                                <option value=''>Select...</option>
                                                {field.options.map(opt => <option key={opt} value={opt.toLowerCase()}>{opt}</option>)}
                                            </select>
                                        ) : (
                                            <input type={field.type} placeholder={field.placeholder} value={form[field.key]}
                                                onChange={(e) => update(field.key, e.target.value)}
                                                className='w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm outline-none focus:border-primary focus:bg-white transition-all' />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Step 2: Professional */}
                        {step === 1 && (
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                                <div className='col-span-2'>
                                    <label className='text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3'>Clinical Speciality</label>
                                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                                        {specialities.map(s => (
                                            <button key={s} type='button' onClick={() => update('speciality', s)}
                                                className={`text-[10px] px-3 py-2.5 rounded-xl font-bold uppercase tracking-tighter transition-all
                                                    ${form.speciality === s ? 'bg-primary text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-teal-50 hover:text-primary'}`}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {[
                                    { label: 'Highest Medical Degree', key: 'degree', placeholder: 'MBBS, MD, MS...' },
                                    { label: 'Medical College', key: 'college', placeholder: 'AIIMS Delhi' },
                                    { label: 'Years of Experience', key: 'experience', placeholder: '5+' },
                                    { label: 'Medical Council Reg No.', key: 'regNumber', placeholder: 'MCI-XXXXX' },
                                ].map((f) => (
                                    <div key={f.key}>
                                        <label className='text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2'>{f.label}</label>
                                        <input type='text' placeholder={f.placeholder} value={form[f.key]}
                                            onChange={(e) => update(f.key, e.target.value)}
                                            className='w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm outline-none focus:border-primary focus:bg-white transition-all' />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Step 3: Location & Fees */}
                        {step === 2 && (
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                                {[
                                    { label: 'Clinic Address', key: 'address', placeholder: 'Full Address...', span: 2 },
                                    { label: 'City', key: 'city', placeholder: 'Mumbai' },
                                    { label: 'State', key: 'state', placeholder: 'Maharashtra' },
                                    { label: 'Consultation Fees (₹)', key: 'fees', placeholder: '500', type: 'number' },
                                ].map((f) => (
                                    <div key={f.key} className={f.span ? 'col-span-2' : ''}>
                                        <label className='text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2'>{f.label}</label>
                                        <input type={f.type || 'text'} placeholder={f.placeholder} value={form[f.key]}
                                            onChange={(e) => update(f.key, e.target.value)}
                                            className='w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm outline-none focus:border-primary focus:bg-white transition-all' />
                                    </div>
                                ))}
                                <div className='col-span-2'>
                                    <label className='text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3'>Active Consulting Days</label>
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
                                                    className={`w-12 h-12 rounded-xl text-xs font-bold flex items-center justify-center transition-all
                                                        ${selected ? 'bg-primary text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-teal-50'}`}>
                                                    {day[0]}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Documents */}
                        {step === 3 && (
                            <div className='flex flex-col gap-6'>
                                <div className='bg-amber-50/50 border border-amber-100 rounded-2xl p-5'>
                                    <div className='flex gap-3'>
                                        <span className='text-xl'>📋</span>
                                        <div>
                                            <p className='text-xs font-bold text-amber-700 uppercase tracking-widest mb-1'>Verification Protocol</p>
                                            <p className='text-[10px] text-amber-600 leading-relaxed font-medium'>
                                                Upload high-resolution scans only. Blurred or incomplete documents will result in application rejection. All files should be &lt; 5MB.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {[
                                    { label: 'Degree Certificate', key: 'certificate', icon: '🎓' },
                                    { label: 'Government ID (Aadhar/PAN)', key: 'idProof', icon: '🪪' },
                                    { label: 'Medical License / Photo', key: 'photo', icon: '📸' },
                                ].map((f) => (
                                    <div key={f.key}>
                                        <label className='text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2'>{f.label}</label>
                                        <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all
                                            ${form[f.key] ? 'border-primary bg-teal-50/30' : 'border-gray-100 bg-gray-50/30 hover:border-primary hover:bg-teal-50/30'}`}>
                                            <div className='w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-2xl'>{f.icon}</div>
                                            <div className='flex-1'>
                                                <p className='text-sm font-bold text-gray-700'>
                                                    {form[f.key] ? `✅ ${form[f.key].name}` : 'Tap to Upload Document'}
                                                </p>
                                                <p className='text-[10px] text-gray-400 font-bold'>MAX. 5MB — PDF, JPG, PNG</p>
                                            </div>
                                            <input type='file' className='hidden' onChange={(e) => update(f.key, e.target.files[0])} />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className='px-8 pb-8 flex gap-4'>
                        {step > 0 && (
                            <button onClick={handleBack}
                                className='px-8 py-4 border-2 border-gray-100 text-gray-400 rounded-2xl text-xs font-bold hover:bg-gray-50 transition-all uppercase tracking-widest'>
                                Previous
                            </button>
                        )}
                        {step < steps.length - 1 ? (
                            <button onClick={handleNext}
                                className='flex-1 btn-primary'>
                                Continue to Next Step
                            </button>
                        ) : (
                            <button onClick={handleSubmit}
                                className='flex-1 btn-primary'>
                                Finalize & Submit Application
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorOnboard
