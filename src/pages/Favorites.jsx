import React, { useEffect, useState } from 'react';
import db from '../Componets/Firebase'; // Import Firestore config

const Favorites = (userEmail) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('favorites').onSnapshot((snapshot) => {
      const favs = snapshot.docs.map((doc) => doc.data());
      setFavorites(favs);
    });

    return () => unsubscribe(); // Cleanup the subscription on component unmount
  }, []);

  return (
    <div>
      <h2>Your Favorite Destinations</h2>
      <div className="favorites-list">
        {favorites.map((fav, index) => (
          <div key={index} className="favorite-card">
            <h3>{fav.city}</h3>
            <p>{fav.country}</p>
            {/* Display the favorite destination info */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
