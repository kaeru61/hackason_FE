import { useState } from "react";
import { fireAuth } from "../firebase";
import { useNavigate } from "react-router-dom"; // 追加1
import { onAuthStateChanged } from "firebase/auth";
import './signIn.css'

const Main = () => {
    const navigate = useNavigate(); // 追加2
    const [loginUser, setLoginUser] = useState(fireAuth.currentUser);
  
  // ログイン状態を監視して、stateをリアルタイムで更新する
    onAuthStateChanged(fireAuth, user => {
      setLoginUser(user);
    });
    
    // 追加3
    const onLogout = () => {
      fireAuth.signOut();
      navigate("/signout");
    };
    const onSignIn = () => {
      navigate("/signin")
    }
    const onSignUp = () => {
      navigate("/signup")
    }

    if (loginUser) {
      navigate("/home")
    } else {
        return (
          <div className='body'>
            <div className="signInContainer">
                <p>Welcome to App</p>
                <button type="button" onClick={onSignIn} className="signUpButton">
                SignIn
                </button>
                <button type="button" onClick={onSignUp} className="signUpButton">
                SignUp
                </button>
            </div>
          </div>
    );
  }
}

export default Main;