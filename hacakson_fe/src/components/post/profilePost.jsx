import React from "react";
import { useNavigate } from "react-router-dom"; 
import { AiOutlineHeart } from "react-icons/ai";
import './post2.css'

const ProfilePost = (props) => {
    const navigate = useNavigate()
    const LinkToPostDetail = () => {
        navigate("/app/postDetail", {
            state: { postId: props.id }
        })
    }
    return(
        <div className="postContainer" onClick={LinkToPostDetail}>
                <div className="postBodycontainer" >
                    <h1 className="PostuserName">{props.userName}</h1>
                    <h1 className="PostuserId">{props.userId}</h1>
                </div>
                <div className="postBodycontainer" >
                    <h1 className="postBody">{props.postBody}</h1>
                </div>
        </div>
    )
}

export default ProfilePost;