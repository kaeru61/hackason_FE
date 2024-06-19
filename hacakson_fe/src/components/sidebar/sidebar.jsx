import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom"
import "./sidebar.css"

const SideBar = () => {
    return (
        <div className="sidebar">
            <h1 className="AppLogo">Logo</h1>
            <Link to='/home' >
                <div className="button">
                    <h1 className="buttonLabel">Home</h1>
                </div>
            </Link>
            <Link to='/home' >
                <div className="button">
                    <h1 className="buttonLabel">List</h1>
                </div>
            </Link>
            <Link to='/profile' >
                <div className="button">
                    <h1 className="buttonLabel">Profile</h1>
                </div>
            </Link>
            <Link to='/home' >
                <div className="button">
                    <h1 className="buttonLabel">Explore</h1>
                </div>
            </Link>
        </div>
    )
}

export default SideBar