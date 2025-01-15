import React from 'react'
import { useState, useEffect } from 'react'
import Inputs from '../Componets/Inputs'
import TimeAndLocalion from '../Componets/TimeAndLocation'
import Temp from '../Componets/Temp'
import Forecast from '../Componets/Forecast'
import getFormattedWeatherData from '../../Backend/server'
import Activities from '../Componets/Activities'
import db from '../Componets/Firebase';

const Weather = ({userEmail}) => {
   console.log(userEmail, "userEmail1");
  
  const [query, setQuery] = useState({q: 'pietermaritzburg'});
  const [units, setUnits] = useState('metric')
  const [weather, setWeather ] = useState(null)
  
  const getWeather = async () => {
   
  await getFormattedWeatherData( { ...query, units }).then( (data) =>{
    setWeather(data);
  });
  //  console.log(data);
  };

  useEffect(() => {
    getWeather()
  }, [query, units]);

  // console.log(weather);

  return (
    <>
    <div 
       className="bg-[#46419b]   flex flex-col  justify-center text-white p-12"
     >
         <h1 className="text-4xl font-bold text-[#d1d9ac] relative">
        <span className="relative z-10">Atmostrip</span>
        <span
          className="absolute inset-0 text-purple-600 blur-md opacity-70 animate-pulse"
          aria-hidden="true"
        >
          Atmostrip
        </span>
      </h1>
    <Inputs setQuery={setQuery} setUnits={setUnits}  />
    { weather && (
     <>
      <TimeAndLocalion weather={weather}/>
    <Temp weather={weather}/>
    <Forecast title="daily forecast" data={weather.daily} />
    <h1 className='text-3xl font-bold'>Activities</h1>
    <Activities weather={weather} userEmail={userEmail}/>
     </>
    )
    }
   
    </div>
     </>
  )
}

export default Weather
