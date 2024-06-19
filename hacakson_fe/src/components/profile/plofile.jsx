import React from "react"
import './profile.css'

const ProfileInfo = () => {
    return(
        <div className="profileContainer">
            <div className="userTag">
                <h1 className="usrName">UserName</h1>
                <h1 className="userId">UserId</h1>
            </div>
            <div className="followsContainer">
                <div className="followsInfo">
                    <h1 className="text1">91</h1>
                    <h1 className="text2">followings</h1>
                </div>
                <div className="followsInfo">
                    <h1 className="text1">100</h1>
                    <h1 className="text2">followers</h1>
                </div>
            </div>
            <div className="userBioContainer">
                <h1 className="userBio">これはダミーの紹介文です。</h1>
            </div>
        </div>
    )
}

export default ProfileInfo;