
import { useState } from "react"
import { BiSearch, BiCurrentLocation } from "react-icons/bi"

const Inputs = ({ setQuery, setUnits}) => {
const [city, setCity] =useState("");

const handleSearchClick = () => {
  if (city !== "") setQuery({ q: city});
}

const handleLocationClick = () => {
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longtude} = position.coords
      setCity({lat: latitude, lon: longtude})
    })
  }
}

  return (
    <>
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
      <div className="bg-white flex px-1 py-1 rounded-full border border-[#2b286d] overflow-hidden max-w-md mx-auto font-[sans-serif]">
  <input 
      value={city}
      onChange={(e) => setCity(e.currentTarget.value)}
      type="text" 
      placeholder="search by city..." 
      className="w-full outline-none  pl-4 text-sm  placeholder:lowercase bg-transparent text-black"
  />
  <button 
      type="button" 
      className="bg-[#2b286d] hover:bg-[#d1d9ac] transition-all text-white text-sm rounded-full px-5 py-2.5"
      onClick={handleSearchClick}
  >
      <BiSearch size={20} />
  </button>
</div>
        <BiCurrentLocation
        size={30} 
        className="cursor-pointer transition ease-out hover:scale-125"
        onClick={handleLocationClick}/>
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
    <button className="text-2xl font-medium transition ease-out 
    hover:scale-125"
    onClick={() => setUnits("metric")}>°C</button>
    <p className="text-2xl font-medium mx-1"></p>
    <button className="text-2xl font-medium transition ease-out 
    hover:scale-125"
    onClick={() => setUnits("imperial")}>°F</button>
      </div>
      </div>
    </>
  )
}

export default Inputs