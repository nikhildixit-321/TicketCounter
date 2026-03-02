import { assets } from '../assets/assets_frontend/assets'

const stats = [
  { value: '10k+', label: 'Patients Served' },
  { value: '100+', label: 'Expert Doctors' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '24/7', label: 'Support' },
]

const values = [
  { icon: '🎯', title: 'Our Mission', desc: 'To make quality healthcare accessible to everyone through seamless technology.' },
  { icon: '👁️', title: 'Our Vision', desc: 'Bridge the gap between patients and providers, making healthcare effortless.' },
  { icon: '💡', title: 'Innovation', desc: 'Continuously evolving our platform with latest advancements in health tech.' },
]

const About = () => {
  return (
    <div className='py-12'>

      {/* Page Title */}
      <div className='text-center animate-fade-in mb-14'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900'>
          About Us
        </h1>
        <p className='text-gray-500 text-sm mt-3 max-w-md mx-auto'>
          Your trusted partner in managing your healthcare needs conveniently and efficiently.
        </p>
      </div>

      {/* Image + Text */}
      <div className='flex flex-col md:flex-row gap-12 items-center mb-20 animate-fade-in'>
        <div className='md:w-1/2'>
          <img
            src={assets.about_image}
            alt="About"
            className='w-full rounded-2xl object-cover shadow-lg'
          />
        </div>

        <div className='md:w-1/2 flex flex-col gap-6'>
          <h2 className='text-2xl font-bold text-gray-900'>Healthcare Made Simple</h2>
          <p className='text-gray-500 text-sm leading-7'>
            Welcome to TicketCounter, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing health records.
          </p>
          <p className='text-gray-500 text-sm leading-7'>
            We are committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
          </p>

          <div className='flex flex-wrap gap-3 mt-2'>
            {['Verified Doctors', 'Secure Records', 'Easy Booking', 'Fast Support'].map((tag) => (
              <span key={tag} className='px-4 py-2 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg border border-gray-200'>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-20'>
        {stats.map(({ value, label }) => (
          <div key={label} className='bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm'>
            <p className='text-3xl font-bold text-primary'>{value}</p>
            <p className='text-gray-500 text-xs mt-1 font-bold uppercase tracking-widest'>{label}</p>
          </div>
        ))}
      </div>

      {/* Vision / Mission cards */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 text-center mb-8'>Our Core Values</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {values.map(({ icon, title, desc }) => (
            <div
              key={title}
              className='simple-card p-8'
            >
              <div className='w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl mb-6'>
                {icon}
              </div>
              <h3 className='font-bold text-gray-900 mb-2'>{title}</h3>
              <p className='text-gray-500 text-sm leading-6'>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
