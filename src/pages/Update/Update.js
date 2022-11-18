import React, {useState} from 'react';
import axios from 'axios';
import './update.css';
import {useNavigate} from 'react-router-dom';

const Update = () => {
  const navigate = useNavigate ();
  const [userData, setUserData] = useState ({
    userName: '',
    email: '',
    mobile: '',
  });
  function updateUser () {
    const object = {
      userName: userData.userName,
      uid: JSON.parse (localStorage.getItem ('user')).uid,
      email: userData.email,
      mobile: userData.mobile,
    };

    axios.post ('http://localhost:5000/add', object).then (navigate ('/'));
  }
  return (
    <div className="container">
      <div className="update">
      <form onSubmit={updateUser} name="update_form">
        <input
          type="name"
          value={userData.userName}
          required
          placeholder="Enter your username"
          onChange={e => setUserData ({...userData, userName: e.target.value})}
        />
        <input
          type="email"
          value={userData.email}
          required
          placeholder="Enter your email"
          onChange={e => setUserData ({...userData, email: e.target.value})}
        />

        <input
          value={userData.mobile}
          required
          placeholder="Enter your mobile no"
          onChange={e => setUserData ({...userData, mobile: e.target.value})}
        />

        <button className="button" type="submit">Update</button>
      </form>
      </div>
    </div>
  );
};

export default Update;
