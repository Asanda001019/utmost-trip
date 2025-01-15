import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../Componets/Firebase'; // Import Firestore config

const Favorites = ({ userEmail }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userEmail) {
        console.warn('No user email provided');
        setLoading(false);
        return;
      }

      try {
        const favoritesRef = collection(db, 'favorites', userEmail, 'activities');
        const querySnapshot = await getDocs(favoritesRef);

        const favs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFavorites(favs);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userEmail]);

  if (loading) {
    return <p>Loading...</p>;
  }
 console.log(favorites);
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-[#46419b] mb-4">Your Favorite Activities</h2>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <div key={fav.id} className="favorite-card bg-[#d1d9ac] p-4 mb-4 rounded-md shadow-sm">
              <h3 className="text-2xl font-bold text-[#46419b]">{fav.id}</h3>
              <h3 className="text-lg font-semibold text-[#46419b]">{fav.city}</h3>
              <p className="text-gray-700">{fav.country}</p>
              {/* Add more details as needed */}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No favorites found.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
