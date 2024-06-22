import React from "react";
import { useNavigate } from "react-router-dom"; 
import { AiOutlineHeart } from "react-icons/ai";
import './post2.css'

const Reply = (props) => {
    
    return(
        <div className="postContainer">
                <div className="postBodycontainer" >
                    <h1 className="userName">{props.userName}</h1>
                    <h1 className="PostuserId">{props.userId}</h1>
                </div>
                <div className="postBodycontainer" >
                    <h1 className="postBody">{props.postBody}</h1>
                </div>
        </div>
    )
}

export default Reply;