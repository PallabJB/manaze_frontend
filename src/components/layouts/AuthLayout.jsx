import React from 'react'
import UI_IMG from '../../assets/images/authimg.jpg'

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <h2 className='ext-lg font-medium text-black' >Manaze</h2>
            {children}
        </div>
        <div className="hidden md:flex w-[40vw] h-screen justify-center bg-white bg-[url('/bg-img.jpg') ] bg-cover bg-no-repeat bg-center overflow-hidden p-8 ne='w-64 lg:w-[90%]' " >
            <img src={UI_IMG}  />
        </div>
    </div>
  )
}

export default AuthLayout