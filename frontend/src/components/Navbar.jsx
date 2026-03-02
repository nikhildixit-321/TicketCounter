import { useState, useEffect, useContext } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { lang, setLang, t } = useLang()
  const { token, setToken } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/login')
  }

  const navLinks = [
    { to: '/', label: t('nav_home') },
    { to: '/doctors', label: t('nav_all_doctors') },
    { to: '/about', label: t('nav_about') },
    { to: '/contact', label: t('nav_contact') },
  ]

  const mobileLinks = [
    { to: '/', label: `🏠 ${t('nav_home')}` },
    { to: '/doctors', label: `👨‍⚕️ ${t('nav_all_doctors')}` },
    { to: '/about', label: `ℹ️ ${t('nav_about')}` },
    { to: '/contact', label: `📞 ${t('nav_contact')}` },
  ]

  // Language Toggle Button
  const LangToggle = ({ mobile = false }) => (
    <button
      onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
      className={`flex items-center gap-1.5 font-semibold transition-all duration-300 rounded-full border-2
        ${mobile
          ? 'px-4 py-2.5 text-sm w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50'
          : 'px-3 py-1.5 text-xs border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400'
        }`}
      title={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
    >
      <span className='text-base leading-none'>🌐</span>
      <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
    </button>
  )

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-fixed' : 'bg-white'}`}>
      <div className='mx-4 sm:mx-[10%] flex items-center justify-between py-4'>

        {/* Logo */}
        <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer'>
          <img className='w-32' src={assets.logo} alt="logo" />
        </div>

        {/* Desktop Nav */}
        <ul className='hidden md:flex items-center gap-2 font-medium'>
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to}>
              {({ isActive }) => (
                <li className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 cursor-pointer
                  ${isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}>
                  {label}
                </li>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Right side */}
        <div className='flex items-center gap-3'>

          {/* 🌐 Language Toggle */}
          <LangToggle />

          {token ? (
            <div className='relative group flex items-center gap-2 cursor-pointer'>
              <img className='w-9 h-9 rounded-full object-cover border border-gray-200' src={assets.profile_pic} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-12 right-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200'>
                <div className='min-w-48 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col p-1.5'>
                  {[
                    { label: t('nav_my_profile'), path: '/my-profile' },
                    { label: t('nav_my_appointments'), path: '/my-appointment' },
                  ].map(({ label, path }) => (
                    <p
                      key={path}
                      onClick={() => navigate(path)}
                      className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg cursor-pointer transition-colors'
                    >
                      {label}
                    </p>
                  ))}
                  <hr className='my-1 border-gray-100' />
                  <p
                    onClick={logout}
                    className='px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors'
                  >
                    {t('nav_logout')}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='hidden md:block btn-primary'
            >
              {t('nav_create_account')}
            </button>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setShowMenu(true)}
            className='md:hidden p-2 rounded-lg hover:bg-gray-100'
          >
            <div className='w-6 h-0.5 bg-gray-600 mb-1'></div>
            <div className='w-6 h-0.5 bg-gray-600 mb-1'></div>
            <div className='w-4 h-0.5 bg-gray-600'></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${showMenu ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className='absolute inset-0 bg-black/20' onClick={() => setShowMenu(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex items-center justify-between px-6 py-5 border-b border-gray-100'>
            <img className='w-28' src={assets.logo} alt="" />
            <button
              onClick={() => setShowMenu(false)}
              className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500'
            >
              ✕
            </button>
          </div>
          <ul className='flex flex-col gap-1 p-4'>
            {mobileLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} onClick={() => setShowMenu(false)}>
                {({ isActive }) => (
                  <li className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {label}
                  </li>
                )}
              </NavLink>
            ))}

            <li className='mt-2'>
              <LangToggle mobile />
            </li>

            {!token && (
              <li className='mt-2'>
                <button
                  onClick={() => { navigate('/login'); setShowMenu(false) }}
                  className='w-full btn-primary'
                >
                  {t('nav_create_account')}
                </button>
              </li>
            )}
            {token && (
              <li className='mt-2'>
                <button
                  onClick={() => { logout(); setShowMenu(false) }}
                  className='w-full bg-red-500 text-white py-3 rounded-lg text-sm font-bold'
                >
                  {t('nav_logout')}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar

