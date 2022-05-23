import React, { useState, useEffect } from 'react'

import { auth,  loginWithEmailAndPassword } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuth }) {
  const [ email, setEmail ] = useState('');
  const [ password , setPassword ] = useState('');

  const navigator = useNavigate();

  const loginWithEmailAndPassword = async ( email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('isAuth', true);
        setIsAuth(true);
    } catch (err) {
        console.error(err);
        alert(err.message)
    }
  }

  return (
    <div>
        <div>
            <input
                type="text"
                className="login-textbox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input 
                type="password"
                className="login-textbox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className='login-btn' onClick={() => loginWithEmailAndPassword(email, password)}>Sign In</button>
        </div>
    </div>
  )
}

export default Login