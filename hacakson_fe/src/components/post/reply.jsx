import React from "react";
import { useNavigate } from "react-router-dom"; 
import { AiOutlineHeart } from "react-icons/ai";
import './post.css'

const Reply = (props) => {
    const navigate = useNavigate();
    const LinkToProfile = (props) =>{
        navigate("/app/profile", {
            state: { userId: props.userId}
        })
    }
    const LinkToPostDetail = (props) => {
        navigate("/app/postDetail", {
            state: { postId: props.key}
        })
    }
    return(
        <div className="postContainer">
                <div className="postBodycontainer" onClick={LinkToProfile}>
                    <h1 className="userName">{props.userName}</h1>
                    <h1 className="userId">{props.userId}</h1>
                </div>
                <div className="postBodycontainer" onClick={LinkToPostDetail}>
                    <h1 className="postBody">{props.postBody}</h1>
                </div>
        </div>
    )
}

export default Reply;