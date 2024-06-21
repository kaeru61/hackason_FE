import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./sidebar.css"
import { fireAuth } from "../../firebase"

const SideBar = () => {
const navigate = useNavigate();
    const onLogOut = () => {
            fireAuth.signOut();
            navigate("/");
          };
    return (
        <div className="sidebar">
            <h1 className="AppLogo">Logo</h1>
            <Link to='/app/home' >
                <div className="button">
                    <h1 className="buttonLabel">Home</h1>
                </div>
            </Link>
            <Link to='/app/profile' >
                <div className="button">
                    <h1 className="buttonLabel">Profile</h1>
                </div>
            </Link>
            <Link to='/app/home' >
                <div className="button">
                    <h1 className="buttonLabel">Explore</h1>
                </div>
            </Link>
            <Link to='/app/create'>
                <div className="createButton">
                    <h1 className="createButtonLabel">Post</h1>
                </div>
            </Link>
            <div className="button" onClick={onLogOut}>
                    <h1 className="buttonLabel">Logout</h1>
            </div>
        </div>
    )
}

export default SideBar