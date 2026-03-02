import { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Nikhil Dixit',
    image: assets.profile_pic,
    email: 'nikhildixit525@gmail.com',
    phone: '+91 7007301900',
    gender: 'male',
    dob: '2000-01-20',
  })
  const [isEdit, setEdit] = useState(false)

  return (
    <div className='py-10 max-w-2xl mx-auto animate-fade-up'>

      {/* Profile Card */}
      <div className='bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden'>

        {/* Cover / Banner */}
        <div className='h-28 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 relative'>
          <div className='absolute inset-0 opacity-10'
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>
        </div>

        {/* Avatar + Name */}
        <div className='px-8 pb-6'>
          <div className='flex items-end gap-4 -mt-12 mb-5'>
            <div className='relative'>
              <img
                src={userData.image}
                alt='Profile'
                className='w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-xl ring-2 ring-indigo-100'
              />
              {isEdit && (
                <div className='absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center cursor-pointer animate-fade-up'>
                  <span className='text-white text-xl'>📷</span>
                </div>
              )}
            </div>
            <div className='mb-1'>
              {isEdit ? (
                <input
                  className='text-2xl font-bold bg-gray-50 border-b-2 border-indigo-500 outline-none text-gray-900 px-1'
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                />
              ) : (
                <h1 className='text-2xl font-bold text-gray-900'>{userData.name}</h1>
              )}
              <p className='text-indigo-500 text-sm font-medium mt-0.5'>Patient Account</p>
            </div>
          </div>

          {/* Info Sections */}
          <div className='flex flex-col gap-6'>

            {/* Contact */}
            <div>
              <p className='text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-3'>Contact Information</p>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                {[
                  { icon: '✉️', label: 'Email', value: userData.email, editable: false },
                  {
                    icon: '📞', label: 'Phone', value: userData.phone, editable: true,
                    onChange: (v) => setUserData(p => ({ ...p, phone: v }))
                  },
                ].map(({ icon, label, value, editable, onChange }) => (
                  <div key={label} className='flex items-center gap-3 bg-gray-50 rounded-xl p-3'>
                    <div className='w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-sm flex-shrink-0'>
                      {icon}
                    </div>
                    <div className='min-w-0'>
                      <p className='text-xs text-gray-400 font-medium'>{label}</p>
                      {isEdit && editable ? (
                        <input
                          className='bg-transparent outline-none text-sm text-gray-700 font-semibold w-full border-b border-indigo-300'
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        />
                      ) : (
                        <p className='text-sm text-gray-700 font-semibold truncate'>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Basic Info */}
            <div>
              <p className='text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-3'>Basic Information</p>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div className='flex items-center gap-3 bg-gray-50 rounded-xl p-3'>
                  <div className='w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-sm'>🧬</div>
                  <div>
                    <p className='text-xs text-gray-400 font-medium'>Gender</p>
                    {isEdit ? (
                      <select
                        className='bg-transparent outline-none text-sm text-gray-700 font-semibold'
                        value={userData.gender}
                        onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                      >
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                      </select>
                    ) : (
                      <p className='text-sm text-gray-700 font-semibold capitalize'>{userData.gender}</p>
                    )}
                  </div>
                </div>
                <div className='flex items-center gap-3 bg-gray-50 rounded-xl p-3'>
                  <div className='w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-sm'>🎂</div>
                  <div>
                    <p className='text-xs text-gray-400 font-medium'>Date of Birth</p>
                    {isEdit ? (
                      <input
                        type='date'
                        className='bg-transparent outline-none text-sm text-gray-700 font-semibold'
                        value={userData.dob}
                        onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                      />
                    ) : (
                      <p className='text-sm text-gray-700 font-semibold'>{userData.dob}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3 pt-2'>
              {isEdit ? (
                <>
                  <button
                    onClick={() => setEdit(false)}
                    className='btn-glow flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-sm shadow-lg shadow-indigo-200'
                  >
                    ✅ Save Changes
                  </button>
                  <button
                    onClick={() => setEdit(false)}
                    className='px-6 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-all duration-300'
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEdit(true)}
                  className='btn-glow flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-sm shadow-lg shadow-indigo-200'
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
