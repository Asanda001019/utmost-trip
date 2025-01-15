import React from 'react';

const Activities = ({ weather }) => {
    // Function to suggest activities based on weather conditions
    const getActivities = (details, temp) => {
        const activitiesByWeather = {
            Clear: ['Hiking', 'Picnic', 'Stargazing', 'Beach visit'],
            Rain: ['Museum visits', 'Indoor games', 'Spa day', 'Movie marathon'],
            Snow: ['Skiing', 'Snowball fights', 'Hot chocolate at a cafe'],
            Clouds: ['Photography', 'Park walks', 'Exploring local markets'],
        };

        const activitiesByTemperature = {
            hot: ['Swimming', 'Water park', 'Ice cream outing'],
            warm: ['Outdoor dining', 'Biking', 'Zoo visit'],
            cool: ['Hiking', 'Coffee shop hopping', 'Library visit'],
            cold: ['Indoor board games', 'Cozy reading', 'Hot springs'],
        };

        // Determine temperature category
        let tempCategory = 'warm';
        if (temp >= 30) tempCategory = 'hot';
        else if (temp >= 20) tempCategory = 'warm';
        else if (temp >= 10) tempCategory = 'cool';
        else tempCategory = 'cold';

        // Get activities based on weather and temperature
        const weatherActivities = activitiesByWeather[details] || ['Explore local attractions'];
        const tempActivities = activitiesByTemperature[tempCategory];

        // Combine and return unique activities
        return Array.from(new Set([...weatherActivities, ...tempActivities]));
    };

    // Function to get activity image
    const getActivityImage = (activity) => {
        const activityImages = {
            Hiking: require('../assets/hiking.webp'),
            Picnic: require('../assets/picnic.jpg'),
            Stargazing: require('../assets/stargazing.jpg'),
            'Beach visit': require('../assets/beach.jpg'),
            Swimming: require('../assets/swimming.webp'),
            'Water park': require('../assets/water-park.jpg'),
            'Ice cream outing': require('../assets/icecream.jpeg'),
            'Museum visits': require('../assets/museum.avif'),
            'Indoor games': require('../assets/games.jpg'),
            'Spa day': require('../assets/hotel-Spar.jpg'),
            'Movie marathon': require('../assets/movie.jpeg'),
            Photography: require('../assets/PhotoConcepts-HERO.webp'),
            'Park walks': require('../assets/walk-in-park.jpg'),
            'Exploring local markets': require('../assets/Local-markets.jpg'),
            'Hot chocolate at a cafe': require('../assets/hot-choco.jpeg'),
            'Snowball fights': require('../assets/snowball.avif'),
            Skiing: require('../assets/skiing.jpeg'),
        };
    
        return activityImages[activity] || require('../assets/hotel-Spar.jpg');
    };
    

    // Destructure weather data
    const { details = 'Clear', temp = 25, name = 'Unknown Location', icon } = weather || {};

    // Get suggested activities
    const suggestedActivities = getActivities(details, temp);

    // Pick one activity randomly
    const selectedActivity = suggestedActivities[Math.floor(Math.random() * suggestedActivities.length)];

    // Get image for the selected activity
    const activityImage = getActivityImage(selectedActivity);

    return (
        <div className="flex flex-col items-center justify-center">
        {/* Weather Details */}
        <div className="mb-6 text-center">
            <img src={icon} alt={`${details} icon`} className="z-20 w-12 h-12 mx-auto" />
            <h3 className="z-20 text-lg font-semibold">{details}</h3>
            <p className="z-20 text-sm text-gray-500">{name}</p>
            <p className="z-20 text-sm text-gray-500">Temp: {temp}°C</p>
        </div>
    
        {/* Activities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {suggestedActivities.slice(0, 4).map((activity, index) => (
                <div
                    key={index}
                    className="relative w-52 h-64 rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-center bg-white p-2"
                >
                    {/* Blurred Background */}
                    <div className="absolute top-1 left-1 w-[190px] h-[240px] bg-white/95 backdrop-blur-xl rounded-lg outline outline-2 outline-white z-10"></div>
    
                    {/* Animated Blob */}
                    <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-red-500 rounded-full opacity-80 blur-lg animate-blob"></div>
    
                    {/* Activity Image */}
                    <img
                        src={getActivityImage(activity)}
                        alt={activity}
                        className="z-20 w-full h-3/4 object-cover"
                    />
      <div className="z-20 flex items-center space-x-2 mt-2">
                    <p className="text-xl font-medium text-gray-700">{activity}</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-red-500"
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.58 5 20 6.42 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
                </div>
            ))}
        </div>
    </div>
    
    );
};

export default Activities;
