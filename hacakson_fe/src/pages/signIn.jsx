import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"
import { fireAuth } from "../firebase";
import './signIn.css'

const SignIn = () => {
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
      const userCredential = await signInWithEmailAndPassword(
      fireAuth,
      email,
      password
      );
      if (userCredential.user) {
      navigate("/app/home");
      }
    } catch (error) {
    console.log(error);
    }
  };

  const onSignUp = () => {
    navigate("/signup")
  }

  return (
    <div className="body">
    <div className="signInContainer">
      <p>SignIn</p>
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
      <button type="button" onClick={onSignUp} className="signUpButton">
      SignUp
      </button>
    </div>
    </div>
  );
}

export default SignIn;