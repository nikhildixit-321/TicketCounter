import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
  
   <div className='md:mx-10'>
   <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr]  gap-14 my-10 mt-40 text-sm'>

{/* ......left..... */}

<div>
<img className=' mb-5 w-40 ' src={assets.logo} alt="" />
<p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, unde provident! Inventore vitae rerum sunt maiores delectus fugiat, voluptate porro tempora saepe, eum molestias. Veritatis quisquam optio laborum eveniet voluptatem.</p>
</div>

{/* ......centre..... */}
<div>
<p className='text-xl font-medium mb-5 '>COMPANY</p>
<ul className='flex flex-col gap-2 text-gray-500'>
    <li>HOME</li>
    <li>ABOUT</li>
    <li>CONTACTUS</li>
    <li>Privacy pilicy</li>
</ul>
</div>
{/* ......right...... */}


<div>
<p className=' text-xl font-medium mb-5'>GET IN TOUCH</p>
<ul>
    <li>+91 7007301900</li>
    <li>nikhildixit525@gamil.com </li>
</ul>
</div>
</div>
{/* ....copy right.... */}

<div>

    <hr/>
    <p className='py-5 text-sm text-center '>Copyright 2024@ Prescripto -All right Reserved.</p>
</div>
   </div>
  
  

    
  )
}

export default Footer
