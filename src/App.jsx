import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Weather from './pages/Weather';
import Favorites from './pages/Favorites';
import NoPage from './pages/NoPage';
import ProfilePage from './pages/Profile';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="weather" element={<Weather />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="*" element={<NoPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;