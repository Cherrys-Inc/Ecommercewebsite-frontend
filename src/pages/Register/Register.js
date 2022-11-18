import React from 'react';
import {useState} from 'react';
import {auth} from '../../firebase';
import {useNavigate, Link} from 'react-router-dom';
import {createUserWithEmailAndPassword, EmailAuthProvider} from 'firebase/auth';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {setUser} from '../../features/userSlice';
import './register.css';

const Register = () => {
  const [userData, setUserData] = useState ({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });
  const [error, setError] = useState ('');

  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  const validatePassword = () => {
    let isValid = true;
    if (userData.password !== '' && userData.confirmPassword !== '') {
      if (userData.password !== userData.confirmPassword) {
        isValid = false;
        setError ('Passwords does not match');
      }
    }
    return isValid;
  };

  const register = e => {
    e.preventDefault ();
    setError ('');
    if (validatePassword ()) {
      createUserWithEmailAndPassword (auth, userData.email, userData.password)
        .then (result => {
          const user = result.user;
          localStorage.setItem (
            'user',
            JSON.stringify ({
              email: user.email,
              uid: user.uid,
            })
          );

          dispatch (setUser (JSON.parse (localStorage.getItem ('user'))));

          const object = {
            userName: userData.name,
            email: JSON.parse (localStorage.getItem ('user')).email,
            uid: JSON.parse (localStorage.getItem ('user')).uid,
            mobile: userData.mobile,
          };

          axios
            .post ('http://localhost:5000/add', object)
            .then (navigate ('/'));
        })
        .catch (err => setError (err.message));
    }
    setUserData ({
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
    });
  };

  return (
    <div className="container">
      <div className="auth">
        <h1>Register</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={register} name="registration_form">
          <input
            type="name"
            value={userData.name}
            placeholder="Enter your username"
            required
            onChange={e => setUserData ({...userData, name: e.target.value})}
          />
          <input
            type="email"
            value={userData.email}
            placeholder="Enter your email"
            required
            onChange={e => setUserData ({...userData, email: e.target.value})}
          />
          <input
            type="mobile"
            value={userData.mobile}
            placeholder="Enter your mobile no"
            required
            onChange={e => setUserData ({...userData, mobile: e.target.value})}
          />

          <input
            type="password"
            value={userData.password}
            required
            placeholder="Enter your password"
            onChange={e =>
              setUserData ({...userData, password: e.target.value})}
          />

          <input
            type="password"
            value={userData.confirmPassword}
            required
            placeholder="Confirm password"
            onChange={e =>
              setUserData ({...userData, confirmPassword: e.target.value})}
          />

          <button type="submit">Register</button>
        </form>
        <span>
          Already have an account?
          <Link to="/login">login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
