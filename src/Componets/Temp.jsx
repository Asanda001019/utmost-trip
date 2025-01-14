import { FaThermometerEmpty } from "react-icons/fa"
import { BiSolidDropletHalf } from "react-icons/bi"
import { FiWind } from "react-icons/fi"
import { GiSunrise, GiSunset } from "react-icons/gi"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"

const Temp = ({ weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
}}) => {
    const verticalDetails = [
        {
            id:1,
            Icon: FaThermometerEmpty,
            title : "Real Feel",
            value: `${feels_like.toFixed()}°`,
        },
        {
            id:2,
            Icon: BiSolidDropletHalf,
            title : "Humidity",
            value: `${humidity.toFixed()}°`,
        },
        {
            id:3,
            Icon: FiWind,
            title : "Wind",
            value: `${speed.toFixed()} km/h`
        },
    ]

    const horizontalDetails = [
        {
            id:1,
            Icon: GiSunrise,
            title : "Sunrise",
            value: sunrise,
        },
        {
            id:2,
            Icon: GiSunset,
            title : "Sunset",
            value: sunset,
        },
        {
            id:3,
            Icon: MdKeyboardArrowUp,
            title : "High",
            value: `${temp_max.toFixed()}°`,
        },
        {
            id:4,
            Icon: MdKeyboardArrowDown,
            title : "Low",
            value: `${temp_min.toFixed()}°`,
        },
    ]

  return (
   <>
<div className="flex justify-center items-center py-6 text-4xl text-[#d1d9ac]">
<p className="amatic-sc-bold ">{details}</p>
</div>
<div className="flex flex-row items-center justify-around py-3">
    <img src={icon} alt="image"
    className="w-20" />
    <p className="text-5xl m-6">{`${temp.toFixed()}°`}</p>

    <div className="flex flex-col space-y-5 items-start">

        {verticalDetails.map(({id, Icon, title, value}) => (
             <div key={id} className="flex font-light text-xl items-center justify-center">
             <Icon size={25} className="mr-1"/>
           <p>
           {`${title}:`}<span className="font-medium ml-1">{value}</span>
           </p>
             </div>
        ))}
    </div>
</div>
<div className="flex flex-row items-center justify-around py-3">

        {
            horizontalDetails.map(({id, Icon, title, value}) => (
                <div key={id} className="flex flex-row items-center justify-center">
            <Icon size={30}/>
            <p className="font-light ml-1">
            {`${title}:`}<span className="font-medium ml-1">{value}</span>
            </p>
            </div>
            ))
        }


</div>
   </>
  )
}

export default Temp