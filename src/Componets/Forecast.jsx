
import React from 'react'

const Forecast = ({title, data}) => {
  

  return (
    <div>
      <div className='flex items-center justify-start mt-6'>
      <p className='font-medium uppercase'>{title}</p>
      </div>
      <hr className='my-1 h-4.5 '/>

      <div className='flex items-start justify-evenly'>
        {data.map((d, index) => (
          <div key={index}
          className='flex flex-col items-center justify-center'>
            <p className='font-semi-bold text-xl'>{d.title}</p>
            <img src={d.icon} alt="weather image"
            className='w-12 my-1' />
            <p className='font-medium text-xl'>{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Forecast