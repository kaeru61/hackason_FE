import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"; 
import { AiOutlineHeart } from "react-icons/ai";
import './post.css'
import { fireAuth } from '../../firebase'
import axios from 'axios'




const Post = (props) => {
    const [uid, setUid] = useState(null);
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
    const [likeStatus, setLikeStatus] = useState(false);
    const LinkToProfile = (props) =>{
        navigate("/profile", {
            state: { userId: props.userId}
        })
    }
    const LinkToPostDetail = () => {
        navigate("/postDetail", {
            state: { postId: props.id }
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
                    <h1 className="userName">{props.userName}</h1>
                    <h1 className="userId">@{props.userId}</h1>
                </div>
                <div className="postBodycontainer" onClick={LinkToPostDetail}>
                    <h1 className="postBody">{props.postBody}</h1>
                </div>
            <div className="Icons">
                { likeStatus===false ? <AiOutlineHeart className='Icon' onClick={HandleClickF}/> : <AiOutlineHeart className="Icon"/>}
                <p className="likes">{props.Likes}</p>
            </div>
        </div>
    )
}

export default Post;