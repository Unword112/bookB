import React, { useState, useEffect } from 'react'

import { auth, loginWithEmailAndPassword } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useNavigate } from 'react-router-dom';

function Login({ setIsAuth }) {
  const [ email, setEmail ] = useState('');
  const [ password , setPassword ] = useState('');
  const [ user ] = useAuthState(auth);

  const navigator = useNavigate();

  useEffect(() => {
      if(user) navigator('/')
  }, [user])

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
                type="text"
                className="login-textbox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className='login-btn' onClick={() => loginWithEmailAndPassword(email,password)}>Sign In</button>
        </div>
    </div>
  )
}

export default Login