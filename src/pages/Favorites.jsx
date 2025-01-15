import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../Componets/Firebase'; // Import Firestore config

const Favorites = ({ userEmail }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userEmail) return;

      try {
        const favoritesRef = collection(db, 'favorites', userEmail, 'activities');
        const q = query(favoritesRef); // No need to filter further if we're just pulling all activities

        const querySnapshot = await getDocs(q);
        const favs = querySnapshot.docs.map((doc) => doc.data());
        setFavorites(favs);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [userEmail]);

  return (
    <div>
      <h2>Your Favorite Destinations</h2>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((fav, index) => (
            <div key={index} className="favorite-card">
              <h3>{fav.city}</h3>
              <p>{fav.country}</p>
              {/* Display other details of the favorite destination */}
            </div>
          ))
        ) : (
          <p>No favorites found.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
