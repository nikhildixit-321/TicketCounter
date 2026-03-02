import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Related = ({ speciality, docId }) => {
    const { doctors } = useContext(AppContext)
    const navigate = useNavigate()
    const [relDoc, setRelDocs] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter(
                (doc) => doc.speciality === speciality && doc._id !== docId
            )
            setRelDocs(doctorsData)
        }
    }, [doctors, speciality, docId])

    if (relDoc.length === 0) return null

    return (
        <div className='py-10'>
            {/* Header */}
            <div className='text-center mb-8 animate-fade-up'>
                <p className='text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1'>Same Speciality</p>
                <h2 className='text-2xl font-bold text-gray-900'>
                    Related <span className='gradient-text'>Doctors</span>
                </h2>
                <p className='text-gray-400 text-sm mt-1'>Browse more doctors with the same speciality.</p>
            </div>

            {/* Doctor Cards */}
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                        className='doctor-card bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer shadow-sm animate-fade-up'
                        style={{ animationDelay: `${index * 0.07}s` }}
                    >
                        <div className='relative bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden'>
                            <img
                                className='w-full h-44 object-cover object-top transition-transform duration-500 hover:scale-110'
                                src={item.image}
                                alt={item.name}
                            />
                            <div className='absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full'>
                                <span className='w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse'></span>
                                <span className='text-xs font-semibold text-green-600'>Available</span>
                            </div>
                        </div>
                        <div className='p-4'>
                            <p className='text-gray-900 font-semibold text-sm truncate'>{item.name}</p>
                            <p className='text-indigo-500 text-xs font-medium mt-1 truncate'>{item.speciality}</p>
                            <div className='flex items-center justify-between mt-3'>
                                <span className='text-xs text-gray-400'>⭐ 4.9</span>
                                <span className='text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium'>Book →</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='text-center mt-8'>
                <button
                    onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                    className='btn-glow bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-3 rounded-full font-semibold text-sm shadow-lg shadow-indigo-200'
                >
                    View All Doctors →
                </button>
            </div>
        </div>
    )
}

export default Related