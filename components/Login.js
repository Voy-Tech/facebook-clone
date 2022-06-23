import Image from 'next/image'
import React from 'react'
import { signIn } from 'next-auth/react'

const Login = () => {
  return (
    <div className='grid place-items-center'>
      <Image  
      src='https://links.papareact.com/t4i'
      height={400}
      width={400}
      objectFit='contain'
      />
      <div className='space-y-3'>
        <p className="font-xs italic">
          This is not a REAL app, it is built for educational purposes only
        </p>
        <h1 onClick={signIn} className='p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer'>Sign In</h1>
      </div>
    </div>
  )
}

export default Login
