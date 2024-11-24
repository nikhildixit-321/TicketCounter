import React, { useState } from 'react'

const Login = () => {
  const [state,setState]= useState("sign up")
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [name,setName]= useState("")
  const onSummitHandler = async (event)=>{
        event.preventDefault()


  }
    return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm-shadow-lg'>
        <p className='text-2xl font-semibold '>{state === 'Sign up'? "create account": "login"}</p>
        <p>please {state === 'Sign up'? "create account": "log in to "} to book appointment</p>
        {
          state === "Sign up" &&  <div className='w-full '>
          <p>full name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'
          type='text' onChange={(e)=>{setName(e.target.value)}} value={name} required/>
        </div> 
        }
       
        <div className='w-full'>
          <p>email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'
          type='email' onChange={(e)=>{setEmail(e.target.value)}} value={email} required/>
        </div>
        <div className='w-full'>
          <p>password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'
          type='password' onChange={(e)=>{setPassword(e.target.value)}} value={password}  required/>
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign up'? "create account": "login"}</button>
        {
          state==="Sign up"
          ? <p >already have an account?<span onClick={()=>{setState('Login')}} className='text-primary underline cursor-pointer'>login here</span> </p>:
          <p>create an new account?<span onClick={()=>{setState('Sign up')}} className='text-primary underline cursor-pointer'>click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
