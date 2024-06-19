import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom"; 
import { AiOutlineHeart } from "react-icons/ai";
import './post.css'

const Post = () => {
    return(
        <div className="postContainer">
            <Link to='/profile'>
                <div className="userTag">
                    <h1 className="userName">usertName</h1>
                    <h1 className="userId">userId</h1>
                </div>
            </Link>
            <Link to='/postDetail'>
                <div className="postBodycontainer">
                    <h1 className="postBody">postBody</h1>
                </div>
            </Link>
            <div className="Icons">
                <AiOutlineHeart className='Icon'/>
                <p className="likes">13</p>
            </div>
        </div>
    )
}

export default Post;