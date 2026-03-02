import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

const Header = () => {
  const navigate = useNavigate()
  const { t } = useLang()

  const scrollToSpeciality = () => {
    const el = document.getElementById('speciality')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('speciality')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }

  return (
    <div className='relative overflow-hidden bg-primary rounded-2xl px-8 md:px-16 my-4 min-h-[400px] flex items-center shadow-sm'>

      <div className='flex flex-col md:flex-row items-center w-full gap-10 py-10'>
        {/* Left */}
        <div className='md:w-1/2 flex flex-col gap-6 animate-fade-in'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight'>
            {t('header_title_1')} <br />
            {t('header_title_2')} <br />
            {t('header_title_3')}
          </h1>

          <div className='flex items-center gap-4 text-white/90 text-sm'>
            <img className='w-24' src={assets.group_profiles} alt="" />
            <p className='max-w-md'>{t('header_subtitle')}</p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4'>
            <button
              onClick={scrollToSpeciality}
              className='flex items-center justify-center gap-2 bg-white text-primary font-bold px-10 py-4 rounded-xl hover:bg-gray-50 transition-all'
            >
              {t('header_btn_book')}
              <img className='w-3' src={assets.arrow_icon} alt="" />
            </button>
            <button
              onClick={scrollToSpeciality}
              className='flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-10 py-4 rounded-xl hover:bg-white/10 transition-all'
            >
              {t('header_btn_explore')}
            </button>
          </div>
        </div>

        {/* Right - Doctor Image */}
        <div className='md:w-1/2 flex justify-center md:justify-end'>
          <img
            className='w-full max-w-sm rounded-xl'
            src={assets.header_img}
            alt="Doctor"
          />
        </div>
      </div>
    </div>
  )
}

export default Header
