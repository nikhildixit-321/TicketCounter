import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import Related from '../components/Related'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
  const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const [docInfo, setDocInfo] = useState(null)
  const [docslots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [booked, setBooked] = useState(false)

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date()
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        timeSlots.push({ datetime: new Date(currentDate), time: formattedTime })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(() => { fetchDocInfo() }, [doctors, docId])
  useEffect(() => { getAvailableSlots() }, [docInfo])

  return docInfo && (
    <div className='py-8 animate-fade-up'>

      {/* Doctor Info Card */}
      <div className='flex flex-col sm:flex-row gap-6 mb-8'>

        {/* Doctor Image */}
        <div className='sm:w-64 flex-shrink-0'>
          <div className='relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 shadow-xl'>
            <img
              className='w-full h-64 sm:h-full object-cover object-top animate-float'
              src={docInfo.image}
              alt={docInfo.name}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
          </div>
        </div>

        {/* Doctor Details */}
        <div className='flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-lg flex flex-col justify-between'>
          <div>
            <div className='flex items-center gap-2 mb-1'>
              <h1 className='text-2xl font-bold text-gray-900'>{docInfo.name}</h1>
              <img className='w-5' src={assets.verified_icon} alt="verified" />
            </div>
            <div className='flex items-center gap-3 mt-1'>
              <p className='text-gray-500 text-sm'>{docInfo.degree} · {docInfo.speciality}</p>
              <span className='bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-0.5 rounded-full border border-indigo-100'>
                {docInfo.experience}
              </span>
            </div>

            {/* Stats */}
            <div className='flex gap-6 mt-5 mb-5'>
              {[
                { label: 'Rating', value: '4.9 ⭐' },
                { label: 'Patients', value: '1.2k+' },
                { label: 'Experience', value: docInfo.experience },
              ].map(({ label, value }) => (
                <div key={label} className='text-center'>
                  <p className='font-bold text-gray-900 text-sm'>{value}</p>
                  <p className='text-xs text-gray-400'>{label}</p>
                </div>
              ))}
            </div>

            <div className='border-t border-gray-100 pt-4'>
              <p className='flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1'>
                About <img src={assets.info_icon} alt="" className='w-4' />
              </p>
              <p className='text-sm text-gray-400 leading-6 line-clamp-3'>{docInfo.about}</p>
            </div>
          </div>

          <div className='mt-4 flex items-center justify-between bg-indigo-50 rounded-xl px-4 py-3'>
            <div>
              <p className='text-xs text-gray-400'>Appointment Fee</p>
              <p className='text-xl font-bold text-indigo-600'>{currencySymbol}{docInfo.fees}</p>
            </div>
            <div className='flex items-center gap-1.5 bg-green-100 text-green-600 text-xs font-semibold px-3 py-1.5 rounded-full'>
              <span className='w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse'></span>
              Available Today
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className='bg-white border border-gray-100 rounded-2xl p-6 shadow-lg mb-8'>
        <h2 className='text-lg font-bold text-gray-900 mb-5'>📅 Select Appointment Slot</h2>

        {/* Day Selector */}
        <div className='flex gap-3 overflow-x-auto pb-3 mb-5'>
          {docslots.length && docslots.map((item, index) => (
            <button
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`flex-shrink-0 flex flex-col items-center py-3 px-4 rounded-2xl font-medium text-sm transition-all duration-300
                ${slotIndex === index
                  ? 'bg-gradient-to-b from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 scale-105'
                  : 'bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-100'
                }`}
            >
              <span className='text-xs font-semibold'>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</span>
              <span className='text-lg font-bold'>{item[0] && item[0].datetime.getDate()}</span>
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <div className='flex flex-wrap gap-2 mb-6'>
          {docslots.length && docslots[slotIndex].map((item, index) => (
            <button
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300
                ${item.time === slotTime
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200 scale-105'
                  : 'bg-gray-50 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-100'
                }`}
            >
              {item.time.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <button
          onClick={() => { if (slotTime) setBooked(true) }}
          className={`btn-glow w-full py-4 rounded-2xl font-bold text-base transition-all duration-500
            ${booked
              ? 'bg-green-500 text-white'
              : slotTime
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          {booked ? '🎉 Appointment Booked! Check My Appointments' : slotTime ? '✅ Book Appointment' : 'Select a time slot first'}
        </button>
      </div>

      {/* Related Doctors */}
      <Related docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment
