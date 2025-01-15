import React from 'react';
import Sunny from '../assets/sunny.png';
import Home from '../assets/home.png';
import Typewriter from '../Componets/TypeWriter';
const background = require('../assets/Back.png');
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-[#46419b] min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div className="relative w-48 h-48 rounded-full shadow-2xl shadow-orange-400/50 mb-6">
        <img
          src={Sunny}
          alt="Weather Icon"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full"
        />
      </div>
      <img
        src={Home}
        alt="Home"
        className="absolute top-2/4  right-3/4 transform -translate-x-1/2 -translate-y-1/2 w-50 h-40 rotate-12"
      />

<img
        src={background}
        alt="Home"
        className="absolute top-2/4 right-0 transform -translate-x-1/2 -translate-y-1/2 w-50 h-40 rotate-12"
      />
      <Typewriter />
      <p className="text-white text-lg text-center mt-2 font-roboto max-w-md mr-4">
        Our app provides you with real-time weather updates and personalized activity suggestions based on current conditions.
        Whether it's sunny, rainy, or snowy, we have the perfect activities lined up for you.
        Explore the great outdoors, plan a cozy day inside, or find the best spots to enjoy the weather.
      </p>
    <Link to="/weather" ><button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded mt-6 transition duration-300 ease-in-out transform hover:scale-105">
        Get Started
      </button></Link>
    </div>
  );
}

export default HomePage;