import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const specialities = [
  'Gynecologist',
  'General physician',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const Doctor = () => {
  const navigate = useNavigate()
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const { doctors } = useContext(AppContext)

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }, [doctors, speciality])

  return (
    <div className='py-8'>

      {/* Header */}
      <div className='animate-fade-in mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Browse Specialists</h1>
        <p className='text-gray-500 text-sm mt-1'>Filter by speciality to find the right doctor for you.</p>
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-8'>

        {/* Sidebar Filter */}
        <div className='w-full sm:w-64 flex-shrink-0 animate-fade-in'>
          <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-4'>Speciality</p>
          <div className='flex flex-row sm:flex-col gap-2 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0'>
            {specialities.map((spec) => {
              const isActive = speciality === spec
              return (
                <button
                  key={spec}
                  onClick={() => {
                    isActive ? navigate('/doctors') : navigate(`/doctors/${spec}`)
                    scrollTo(0, 0)
                  }}
                  className={`flex-shrink-0 text-left px-5 py-3 rounded-xl text-sm font-bold transition-all border
                    ${isActive
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                >
                  {spec}
                </button>
              )
            })}
          </div>
        </div>

        {/* Doctor Cards */}
        <div className='flex-1'>
          {filterDoc.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-64 text-gray-400 animate-fade-in'>
              <p className='text-5xl mb-4'>🔍</p>
              <p className='text-lg font-bold'>No doctors found</p>
              <p className='text-sm mt-1'>Try a different speciality</p>
            </div>
          ) : (
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {filterDoc.map((item, index) => (
                <div
                  key={index}
                  onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                  className='simple-card overflow-hidden cursor-pointer group'
                >
                  <div className='bg-gray-50 overflow-hidden'>
                    <img
                      className='w-full h-44 object-cover object-top transition-transform duration-300 group-hover:scale-105'
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className='p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                      <span className='text-xs font-bold text-green-600'>Available</span>
                    </div>
                    <p className='text-gray-900 font-bold text-sm truncate'>{item.name}</p>
                    <p className='text-gray-500 text-xs mt-1 truncate'>{item.speciality}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctor
