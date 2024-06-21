import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
updateProfile,
createUserWithEmailAndPassword,
} from "firebase/auth";
import { fireAuth } from "../firebase";
import './signIn.css'

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
      setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      });
  };

  const onSubmit = async (e) => {
      e.preventDefault();
      try {
        const userCredential = await createUserWithEmailAndPassword(
          fireAuth,
          email,
          password
          );
        updateProfile(fireAuth.currentUser, {displayName: email});
        navigate("/app/register");
      } catch (error) {
      console.log(error);
      }
  };

  const onSignIn = () => {
    navigate("/signin")
  }

  return (
    <div className="body">
    <div className="signInContainer">
      <p>create account</p>
      <form onSubmit={onSubmit}>
        <input
        type="email"
        placeholder="Email"
        id="email"
        value={email}
        required
        onChange={onChange}
        />
        <input
        type="password"
        placeholder="Password"
        id="password"
        value={password}
        required
        onChange={onChange}
        />
        <button type="submit">
        Submit
        </button>
      </form>
      <button type="button" onClick={onSignIn} className="signUpButton">
      SignIn
      </button>
    </div>
    </div>
);
}

export default SignUp;