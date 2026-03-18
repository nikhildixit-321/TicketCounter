import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useLang } from '../context/LanguageContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const { t } = useLang()

  return (
    <div className='flex flex-col items-center gap-8 my-16 text-gray-900'>

      {/* Header */}
      <div className='text-center animate-fade-in'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
          {t('top_title_1')} {t('top_title_2')}
        </h2>
        <p className='mt-2 text-gray-500 text-sm max-w-md mx-auto'>{t('top_subtitle')}</p>
      </div>

      {/* Doctor Cards Grid */}
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-4'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            className='simple-card overflow-hidden cursor-pointer group'
          >
            {/* Image */}
            <div className='bg-gray-50 overflow-hidden'>
              <img
                className='w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-105'
                src={item.profile_pic || 'https://via.placeholder.com/300x400?text=Doctor'}
                alt={item.name}
              />
            </div>

            {/* Info */}
            <div className='p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                <span className='text-xs font-medium text-green-600'>{t('top_available')}</span>
              </div>
              <p className='text-gray-900 font-bold text-sm truncate'>{item.name}</p>
              <p className='text-gray-500 text-xs mt-1 truncate'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
        className='btn-primary mt-4'
      >
        {t('top_view_all')}
      </button>
    </div>
  )
}

export default TopDoctors
