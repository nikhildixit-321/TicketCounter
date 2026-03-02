import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointment = () => {
  const { doctors } = useContext(AppContext)

  return (
    <div className='py-10 animate-fade-up'>

      {/* Header */}
      <div className='mb-8'>
        <p className='text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1'>Dashboard</p>
        <h1 className='text-3xl font-bold text-gray-900'>My <span className='gradient-text'>Appointments</span></h1>
        <p className='text-gray-400 text-sm mt-1'>Manage and track all your upcoming appointments.</p>
      </div>

      {/* Stats Row */}
      <div className='grid grid-cols-3 gap-4 mb-10'>
        {[
          { icon: '📅', label: 'Total', value: 3, color: 'indigo' },
          { icon: '⏳', label: 'Upcoming', value: 2, color: 'amber' },
          { icon: '✅', label: 'Completed', value: 1, color: 'green' },
        ].map(({ icon, label, value, color }) => (
          <div key={label} className={`bg-${color}-50 border border-${color}-100 rounded-2xl p-4 text-center hover:-translate-y-1 transition-all duration-300`}>
            <p className='text-2xl mb-1'>{icon}</p>
            <p className={`text-xl font-bold text-${color}-600`}>{value}</p>
            <p className={`text-xs text-${color}-400 font-medium`}>{label}</p>
          </div>
        ))}
      </div>

      {/* Appointment Cards */}
      <div className='flex flex-col gap-4'>
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className='bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-400 overflow-hidden animate-fade-up'
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className='flex flex-col sm:flex-row gap-0'>

              {/* Doctor Image */}
              <div className='sm:w-32 h-32 sm:h-auto bg-gradient-to-br from-indigo-50 to-purple-50 flex-shrink-0 overflow-hidden'>
                <img
                  className='w-full h-full object-cover object-top'
                  src={item.image}
                  alt={item.name}
                />
              </div>

              {/* Info */}
              <div className='flex-1 p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
                <div className='flex flex-col gap-1'>
                  <p className='text-gray-900 font-bold text-base'>{item.name}</p>
                  <p className='text-indigo-500 text-sm font-medium'>{item.speciality}</p>

                  <div className='flex items-center gap-4 mt-2 text-xs text-gray-400'>
                    <span className='flex items-center gap-1'>
                      <span>📍</span> Online Consultation
                    </span>
                    <span className='flex items-center gap-1'>
                      <span>📆</span> 25 Nov, 2024
                    </span>
                    <span className='flex items-center gap-1'>
                      <span>🕐</span> 8:30 PM
                    </span>
                  </div>

                  <div className='mt-2'>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full
                      ${index === 0 ? 'bg-green-100 text-green-600' :
                        index === 1 ? 'bg-amber-100 text-amber-600' :
                          'bg-indigo-100 text-indigo-600'}`}>
                      {index === 0 ? '✅ Confirmed' : index === 1 ? '⏳ Pending' : '📋 Scheduled'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col gap-2 sm:items-end w-full sm:w-auto'>
                  <button className='btn-glow w-full sm:w-36 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-indigo-200'>
                    💳 Pay Online
                  </button>
                  <button className='w-full sm:w-36 border border-red-200 text-red-400 py-2.5 rounded-xl text-xs font-semibold hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300'>
                    ✕ Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointment
