import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

const SpecialityMenu = () => {
  const { t } = useLang()
  return (
    <div className='flex flex-col items-center gap-8 py-16 text-gray-800' id='speciality'>

      {/* Header */}
      <div className='text-center animate-fade-in'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
          {t('spec_title_1')} {t('spec_title_2')}
        </h2>
        <p className='mt-2 text-gray-500 text-sm max-w-md mx-auto'>
          {t('spec_subtitle')}
        </p>
      </div>

      {/* Speciality Cards */}
      <div className='flex sm:justify-center gap-6 pt-4 w-full overflow-x-auto pb-4'>
        {specialityData && specialityData.length > 0 ? (
          specialityData.map((item, index) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              key={index}
              to={`/doctors/${item.speciality}`}
              className='flex flex-col items-center gap-3 cursor-pointer flex-shrink-0 group'
            >
              <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-50 flex items-center justify-center border border-transparent transition-all group-hover:bg-white group-hover:border-primary group-hover:shadow-sm'>
                <img
                  src={item.image}
                  alt={item.speciality}
                  className='w-12 sm:w-14'
                />
              </div>
              <p className='text-sm font-medium text-gray-600 group-hover:text-primary transition-colors'>
                {item.speciality}
              </p>
            </Link>
          ))
        ) : (
          <p className='text-gray-400 text-sm'>No specialities available.</p>
        )}
      </div>
    </div>
  )
}

export default SpecialityMenu
