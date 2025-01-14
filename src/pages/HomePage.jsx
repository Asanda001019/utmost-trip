import React from 'react';
import Sunny from '../assets/sunny.png';

function HomePage() {
  return (
    <div className="bg-[#2B286D] min-h-screen flex flex-col items-center justify-center p-4">
      
      <div className="relative w-48 h-48 rounded-full shadow-2xl shadow-orange-400/50">
        <img
          src={Sunny}
          alt="Weather Icon"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full"
        />
      </div>
      <h1 className="text-white text-2xl mt-4">Welcome to UTMOST TRIP</h1>
      <p className="text-white text-lg text-center mt-2 font-roboto">
        Our app provides you with real-time weather updates <br />
        and personalized activity suggestions based on current conditions.<br />
        Whether it's sunny, rainy, or snowy, we have the perfect activities lined up for you.<br />
        Explore the great outdoors, plan a cozy day inside, or find the best spots to enjoy the weather.<br />
      </p>
      <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mt-4">
        Get Started
      </button>
    </div>
  );
}

export default HomePage;