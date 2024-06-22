import { useNavigate } from "react-router-dom"; 
import './post2.css'
import { AiOutlineMessage, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { fireAuth } from "../../firebase";


const PostDetail = (props) => {
    const [uid, setUid] = useState(null);
    const [likeStatus, setLikeStatus] = useState(false);
    
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

    const LinkToProfile = () =>{
        navigate("/app/profile", {
            state: { userId: props.userId }
        })
    }

    const CheckLikeStatus = () => {
        if( props.likedBy.some(user => user.id === uid )){
            setLikeStatus(true);
        } else {
            setLikeStatus(false)
        }
    }

    const fetchLike = async () => {
        const datetime = new Date().toLocaleString('sv-SE')
        try {
            const res = await axios.post("https://hackason-be1-ndzwuezdra-uc.a.run.app/like", {
                userId: uid,
                postId: props.id,
                createAt: datetime
            })
            if (!res){
                throw Error(`Failed to fetch like`);
            } else {
                setLikeStatus(true);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {CheckLikeStatus()}, [props.likedBy])
    const HandleClickF = () =>  {
        fetchLike();
    }

    return(
        <div className="postContainer">
                <div className="postBodycontainer" onClick={LinkToProfile}>
                    <h1 className="PostuserName">{props.userName}</h1>
                    <h1 className="PostuserId">@{props.userId}</h1>
                </div>
                <div className="postBodycontainer">
                    <h1 className="postBody">{props.postBody}</h1>
                </div>
            <div className="Icons">
                <div className="likeIconContainer">
                { likeStatus===false ? <AiOutlineHeart className='Icon' onClick={HandleClickF}/> : <AiFillHeart className="IconF"/>}
                <p className="likes">{props.Likes}</p>
                </div>
                <AiOutlineMessage className="Icon" onClick={props.HandleClickReply}/>
            </div>
        </div>
    )
}

export default PostDetail;