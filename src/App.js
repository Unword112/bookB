import './App.css';
import React , { useState } from 'react';

import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

import Profiles from './pages/Profiles';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import { logout } from './firebase/firebase';

function App() {
  const [ isAuth, setIsAuth ] = useState(localStorage.getItem('isAuth'));

  return (
    <div className="App">
      <Router>
        <Link to="/">Home</Link>

        {!isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
          <Link to="/register">Register</Link>
          <Link to='profiles'>Profiles</Link>
          <button onClick={logout}>Sign Out</button>
          </>
        )}
        <Routes>
          <Route path='/' element={<Home isAuth={isAuth} />} />
          <Route path='/login' element={<Login isAuth={setIsAuth} />} />
          <Route path='/register' element={<Register isAuth={setIsAuth} />} />
          <Route path='/profiles' element={<Profiles isAuth={isAuth} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
