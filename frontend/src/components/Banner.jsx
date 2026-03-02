import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

const Banner = () => {
  const navigate = useNavigate()
  const { t } = useLang()

  return (
    <div className='bg-primary rounded-2xl my-20 px-8 sm:px-12 md:px-16 lg:px-20 py-16 flex flex-col md:flex-row items-center gap-10 shadow-sm'>

      {/* Left */}
      <div className='flex-1 animate-fade-in'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight'>
          {t('banner_title_1')} <br />
          {t('banner_title_2')}
        </h2>
        <p className='text-white/80 mt-4 text-sm max-w-sm'>{t('banner_subtitle')}</p>

        <div className='flex flex-wrap gap-4 mt-8'>
          <button
            onClick={() => { navigate('/login'); scrollTo(0, 0) }}
            className='bg-white text-primary font-bold px-10 py-4 rounded-xl hover:bg-gray-50 transition-all'
          >
            {t('banner_btn_book')}
          </button>
          <button
            onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
            className='border-2 border-white/30 text-white font-bold px-10 py-4 rounded-xl hover:bg-white/10 transition-all'
          >
            {t('banner_btn_explore')}
          </button>
        </div>
      </div>

      {/* Right */}
      <div className='md:w-1/3 flex justify-center'>
        <img
          className='w-full max-w-[280px] rounded-2xl shadow-lg'
          src={assets.appointment_img}
          alt="Appointment"
        />
      </div>
    </div>
  )
}

export default Banner
