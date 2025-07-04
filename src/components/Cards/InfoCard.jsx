import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div>
      <div className={`w-2 md:w-2 h-3 md:h-5 ${color} rounded-full`}/>
      <div className="text-xs md:text-[14px] text-gray-600">
        <span className='text-sm md:text-[15px] text-black font-semibold' >{value}</span>{label}
      </div>
    </div>
  )
}

export default InfoCard