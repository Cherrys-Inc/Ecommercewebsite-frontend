import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../features/userSlice";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((result) => {
        const user = result.user;
        axios
          .get("http://localhost:5000/getdata", {
            params: {
              uid: user.uid,
            },
          })
          .then((response) => {
            setUserDetails(response.data);
          });

        dispatch(setUser(localStorage.getItem("user")));
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: userData.email,
            uid: user.uid,
          })
        );
        if (userData.mobile === null && userData.email === null) {
          navigate("/update");
        } else {
          navigate("/");
        }
      })
      .catch((err) => setError(err.message));
  };
  function googleSignin() {
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            uid: user.uid,
          })
        );

        navigate("/");

        
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <div className="container">
      <div className="auth">
        <h1>Log in</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={loginUser} name="login_form">
          <input
            type="email"
            value={userData.email}
            required
            placeholder="Enter your email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />

          <input
            type="password"
            value={userData.password}
            required
            placeholder="Enter your password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />

          <button className="button" type="submit">
            Login
          </button>
        </form>
        <button className="button" onClick={googleSignin}>
          Login with google
        </button>
        <p>
          Don't have and account?
          <Link to="/register">Create one here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
