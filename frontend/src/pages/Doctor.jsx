import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const Doctor = () => {
  const navigate = useNavigate();

  const {speciality}=useParams()
  const [filterDoc,setFilterDoc]=useState([])
 const {doctors}= useContext(AppContext)
 const applyFilter = ()=>{
  if(speciality){
    setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
  }else{
    setFilterDoc(doctors)
  }
 }
 useEffect(()=>{
   applyFilter()
 },[doctors,speciality])
  return (
    <div className='flex flec-col '>
      <p className='text-center '>Browser through the doctors specialities.</p>
      <div>
        <div>
          <p>general physician </p>
          <p>gynecologist</p>
          <p> dermatologist</p>
          <p>pediatrician</p>
          <p>neurologist</p>
          <p>gastroenterologist</p>
        </div>
        {
          filterDoc.map((item,index)=>(
            <div onClick={()=>{navigate(`/appointment/${item._id}`)}} className='border-blue-200 round-xl overflow-hidden cursor-pointer hover:translate-y-[-1opx] transition-all duration-500' key={index}>
                <img className='bg-blue-50 ' src={item.image} alt="" />
                <div className='p-4 '>
                    <div className='flex  items-center gap-2 text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'> </p>
                        <p>Available</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
               
            </div>
        )

        )}
        
      </div>
    </div>
  )
}

export default Doctor




