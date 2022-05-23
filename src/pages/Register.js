import React, { useState } from 'react'

import { registerWithEmailAndPassword } from '../firebase/firebase';

import { useNavigate } from 'react-router-dom';

function Register({ setIsAuth  }) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ name, setName ] = useState('');
  const [ phonenumber, setPhonenumber ] = useState('');

  const navigator = useNavigate();

  const onClickRegister = () => {
    registerWithEmailAndPassword(email, password, name, phonenumber);
    navigator('/');
  }

  return (
    <div>
      <div>
        <input
          type="text"
          className="register-textbox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input 
          type="password"
          className="register-textbox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input 
          type="text"
          className="register-textbox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input 
          type="text"
          className="register-textbox"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          placeholder="Phonenumber"
        />
        <button
          className="signup-btn"
          onClick={onClickRegister}
        >Sign Up</button>
      </div>
    </div>
  )
}

export default Register