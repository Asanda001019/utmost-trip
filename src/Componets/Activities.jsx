import { useEffect, useState } from 'react';
import db,  {doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove} from '../Componets/Firebase';
import { useNavigate } from 'react-router-dom';

const Activities = ({ weather, userEmail }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Ensure user is logged in
//   useEffect(() => {
//     if (!userEmail) {
//       navigate('/login');
//     }
//   }, [userEmail, navigate]);

  // Fetch user's favorites on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userEmail) return;

      try {
        const querySnapshot = await getDocs(collection(db, 'favorites', userEmail, 'activities'));
        const userFavorites = querySnapshot.docs.map((doc) => doc.id);
        setFavorites(userFavorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [userEmail]);

  // Check if an activity is a favorite
  const isFavorite = (activity) => favorites.includes(activity);

  // Toggle favorite activity
  const toggleFavorite = async (activity) => {
    try {
      // Ensure weather data is available
      const city = weather?.city || 'Unknown City'; // Default if undefined
      const country = weather?.country || 'Unknown Country'; // Default if undefined
      const icon = weather?.icon || ''; // Default empty string if undefined
  
      const activityRef = doc(db, 'favorites', userEmail, activity);
      console.log(`Document Reference Path: favorites/${userEmail}/${activity}`);
  
      if (isFavorite(activity)) {
        // Remove favorite
        setFavorites(favorites.filter((item) => item !== activity));
        console.log(`Removing activity: ${activity}`);
        await deleteDoc(activityRef);
      } else {
        // Add favorite
        setFavorites([...favorites, activity]);
        console.log(`Adding activity: ${activity}`);
        await setDoc(activityRef, {
          city: city,
          country: country,
          icon: icon,
        });
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };
  
  

  // Suggest activities based on weather
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

    let tempCategory = 'warm';
    if (temp >= 30) tempCategory = 'hot';
    else if (temp >= 20) tempCategory = 'warm';
    else if (temp >= 10) tempCategory = 'cool';
    else tempCategory = 'cold';

    const weatherActivities = activitiesByWeather[details] || ['Explore local attractions'];
    const tempActivities = activitiesByTemperature[tempCategory];

    return Array.from(new Set([...weatherActivities, ...tempActivities]));
  };

  // Get activity image
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

  // Extract weather details
  const { details = 'Clear', temp = 25, name = 'Unknown Location', icon } = weather || {};

  // Get suggested activities
  const suggestedActivities = getActivities(details, temp);

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

            {/* Activity Image */}
            <img
              src={getActivityImage(activity)}
              alt={activity}
              className="z-20 w-full h-3/4 object-cover"
            />
            <div className="z-20 flex items-center space-x-2 mt-2">
              <p className="text-xl font-medium text-gray-700">{activity}</p>
              <button onClick={() => toggleFavorite(activity)} className="favorite-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isFavorite(activity) ? 'red' : 'gray'}
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
