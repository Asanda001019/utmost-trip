import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Weather from './pages/Weather'
import Favorites from './pages/Favorites'
import NoPage from './pages/NoPage' 
import Profile from './pages/Profile'
import getFormattedWeatherData  from '../Backend/server'

import './App.css'

function App() {

  const [userEmail, setUserEmail] = useState('');

  console.log(userEmail);
 

  return (
    <>
    <BrowserRouter>
    <Routes>
          <Route path='/' element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage setUserEmail={setUserEmail} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/weather" element={<Weather userEmail={userEmail} />} />
          <Route path="/favorites" element={<Favorites userEmail={userEmail} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App