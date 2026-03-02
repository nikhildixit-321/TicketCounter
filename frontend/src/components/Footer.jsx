import { assets } from '../assets/assets_frontend/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='mt-24 bg-gray-950 text-white rounded-t-3xl overflow-hidden'>

            {/* Main Footer */}
            <div className='px-8 sm:px-16 md:px-20 pt-16 pb-10'>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-12'>

                    {/* Brand */}
                    <div className='sm:col-span-1'>
                        <img className='mb-5 w-36 brightness-0 invert' src={assets.logo} alt="Logo" />
                        <p className='text-gray-400 text-sm leading-7 max-w-xs'>
                            A trusted healthcare platform connecting patients with verified doctors for seamless appointment booking.
                        </p>
                        <div className='flex gap-3 mt-6'>
                            {['𝕏', 'in', 'f', '▶'].map((icon, i) => (
                                <button key={i} className='w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-xs font-bold hover:bg-indigo-600 transition-colors duration-300'>
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <p className='text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-5'>Company</p>
                        <ul className='flex flex-col gap-3'>
                            {[
                                { label: 'Home', to: '/' },
                                { label: 'About Us', to: '/about' },
                                { label: 'Contact', to: '/contact' },
                                { label: 'All Doctors', to: '/doctors' },
                            ].map(({ label, to }) => (
                                <li key={to}>
                                    <NavLink
                                        to={to}
                                        className='text-gray-400 text-sm hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group'
                                    >
                                        <span className='w-0 group-hover:w-3 h-px bg-indigo-400 transition-all duration-300'></span>
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className='text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-5'>Get in Touch</p>
                        <ul className='flex flex-col gap-4'>
                            <li className='flex items-center gap-3 text-gray-400 text-sm group cursor-pointer hover:text-white transition-colors duration-200'>
                                <span className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-base group-hover:bg-indigo-600 transition-colors duration-300'>📞</span>
                                +91 7007301900
                            </li>
                            <li className='flex items-center gap-3 text-gray-400 text-sm group cursor-pointer hover:text-white transition-colors duration-200'>
                                <span className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-base group-hover:bg-indigo-600 transition-colors duration-300'>✉️</span>
                                nikhildixit525@gmail.com
                            </li>
                            <li className='flex items-center gap-3 text-gray-400 text-sm'>
                                <span className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-base'>📍</span>
                                Mumbai, India
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className='border-t border-white/10 px-8 sm:px-16 md:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-3'>
                <p className='text-gray-500 text-xs'>
                    © 2024 TicketCounter · All rights reserved · Made with ❤️ by Nikhil
                </p>
                <div className='flex gap-5'>
                    {['Privacy Policy', 'Terms', 'Support'].map((item) => (
                        <span key={item} className='text-gray-500 text-xs hover:text-white cursor-pointer transition-colors duration-200'>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer
