import React from "react"
import './profile.css'
import { Link } from "react-router-dom"
import Followbutton from "../button/followbutton"

const ProfileInfoMine = (props) => {
    return(
        <div className="profileContainer">
            <div className="ProfileuserTag">
                <h1 className="ProfileuserName">{props.userName}</h1>
                <h1 className="ProfileuserId">@{props.userId}</h1>
                {props.mine==true ? (
                    <div className='selectMode' onClick={props.HandleEdit}>
                        <h1 className='label'>Edit</h1>
                    </div>
                    ) : (
                    <Followbutton 
                    userId={props.userId}
                    CurrentUser={props.CurrentUser}
                    uid={props.uid}/>
                    )
                }
            </div>
            <div className="followsContainer">
                <div className="followsInfo" onClick={props.Handlefollowing}>
                    <h1 className="text1">{props.followings}</h1>
                    <h1 className="text2">followings</h1>
                </div>
                <div className="followsInfo" onClick={props.Handlefollower}>
                    <h1 className="text1">{props.followers}</h1>
                    <h1 className="text2">followers</h1>
                </div>
            </div>
            <div className="userBioContainer">
                <h1 className="userBio">{props.bio}</h1>
            </div>
        </div>
    )
}

export default ProfileInfoMine;