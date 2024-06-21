import React from "react";
import { useNavigate } from "react-router-dom"; 
import { AiOutlineHeart } from "react-icons/ai";
import './post.css'


const PostDetail = (props) => {
    const navigate = useNavigate();
    const LinkToProfile = (props) =>{
        navigate("/profile", {
            state: { userId: props.userId}
        })
    }

    return(
        <div className="postContainer">
                <div className="postBodycontainer" onClick={LinkToProfile}>
                    <h1 className="userName">{props.userName}</h1>
                    <h1 className="userId">{props.userId}</h1>
                </div>
                <div className="postBodycontainer">
                    <h1 className="postBody">{props.postBody}</h1>
                </div>
            <div className="Icons">
                <AiOutlineHeart className='Icon' onClick={props.HandleClick}/>
                <p className="likes">{props.Likes}</p>
            </div>
        </div>
    )
}

export default PostDetail;