import { assets } from '../assets/assets_frontend/assets'
import { useState } from 'react'

const Contact = () => {
  const [focused, setFocused] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className='py-12 px-4'>

      {/* Page Title */}
      <div className='text-center animate-fade-in mb-14'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900'>
          Contact Us
        </h1>
        <p className='text-gray-500 text-sm mt-3 max-w-md mx-auto'>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      {/* Main Grid */}
      <div className='flex flex-col md:flex-row gap-10 items-start mb-20'>

        {/* Left - Image + Info */}
        <div className='md:w-1/2 flex flex-col gap-8 animate-fade-in'>
          <div className='bg-gray-50 p-4 rounded-2xl'>
            <img
              src={assets.contact_image}
              alt="Contact"
              className='w-full rounded-xl object-cover shadow-sm'
            />
          </div>

          {/* Contact Info Cards */}
          <div className='grid grid-cols-1 gap-4'>
            {[
              { icon: '📍', title: 'Our Office', info: 'Saket Nagar, Deoria\nBhatwallia Nath Nagar Choraha' },
              { icon: '📞', title: 'Phone', info: '+91 7007301900' },
              { icon: '✉️', title: 'Email', info: 'nikhildixit525@gmail.com' },
            ].map(({ icon, title, info }) => (
              <div key={title} className='flex items-start gap-4 p-5 simple-card'>
                <div className='w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xl'>
                  {icon}
                </div>
                <div>
                  <p className='text-xs font-bold text-gray-400 uppercase tracking-widest'>{title}</p>
                  <p className='text-gray-900 text-sm font-bold mt-1 whitespace-pre-line leading-relaxed'>{info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className='md:w-1/2 animate-fade-in'>
          <div className='bg-white border border-gray-200 rounded-2xl p-8 shadow-xl'>
            <h2 className='text-xl font-bold text-gray-900 mb-8'>Send a Message 💬</h2>

            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
              {[
                { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Nikhil Dixit' },
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2'>
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-sm focus:border-primary focus:bg-white outline-none transition-all'
                    required
                  />
                </div>
              ))}

              <div>
                <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2'>
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder='Write your message here...'
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-sm focus:border-primary focus:bg-white outline-none resize-none transition-all'
                  required
                />
              </div>

              <button
                type='submit'
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all
                  ${sent
                    ? 'bg-green-500 text-white'
                    : 'btn-primary'
                  }`}
              >
                {sent ? '✅ Message Sent!' : '🚀 Send Message'}
              </button>
            </form>
          </div>

          {/* Careers Card */}
          <div className='mt-8 bg-primary rounded-2xl p-8 text-white relative overflow-hidden'>
            <h3 className='font-bold text-xl mb-2'>Careers at TicketCounter</h3>
            <p className='text-white/80 text-sm mb-6'>Learn more about our teams and job openings.</p>
            <button className='bg-white text-primary font-bold px-8 py-3 rounded-xl text-sm hover:bg-gray-50 transition-all'>
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
