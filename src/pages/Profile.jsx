// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../Componets/Firebase'; // Adjust the import path as necessary
import { doc, getDoc } from 'firebase/firestore';

function ProfilePage() {
  const [userInfo , setUserInfo] = useState(null);
  const user = auth.currentUser ;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-[#2B286D] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Profile</h1>
            {userInfo ? (
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p><strong>Name:</strong> {userInfo.name}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
              </div>
            ) : (
              <p>Loading user information...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;