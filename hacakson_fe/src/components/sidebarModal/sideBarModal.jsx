import React, {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import "./sideBarModal.css"
import { fireAuth } from "../../firebase"

const SideBarModal = (props) => {
    const [uid, setUid] = useState(null);
    useEffect(() => {
        const unsubscribe = fireAuth.onAuthStateChanged(user => {
            if (user) {
                setUid(user.uid);
            } else {
                setUid(null); // ログアウト時の処理
            }
        });

        return () => unsubscribe();
    }, []);
    const navigate = useNavigate();
    const onLogOut = () => {
            fireAuth.signOut();
            navigate("/");
          };
    return (
        <div className="sidebarmodal">
            <h1 className="AppLogo">Logo</h1>
            <Link to='/app/home' >
                <div className="button" onClick={props.HandleClick}>
                    <h1 className="buttonLabel">Home</h1>
                </div>
            </Link>
            <Link to='/app/profile' state={{userId: uid}} >
                <div className="button" onClick={props.HandleClick}>
                    <h1 className="buttonLabel">Profile</h1>
                </div>
            </Link>
            <Link to='/app/explore' >
                <div className="button" onClick={props.HandleClick}>
                    <h1 className="buttonLabel">Explore</h1>
                </div>
            </Link>
            <Link to='/app/create'>
                <div className="createButton" onClick={props.HandleClick}>
                    <h1 className="createButtonLabel">Post</h1>
                </div>
            </Link>
            <div className="button" onClick={onLogOut}>
                    <h1 className="buttonLabel">Logout</h1>
            </div>
        </div>
    )
}

export default SideBarModal