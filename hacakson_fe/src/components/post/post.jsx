import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"; 
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import './post2.css'
import { fireAuth } from '../../firebase'
import axios from 'axios'
import ReplyForm from "../cretae/createReply";


const Post = (props) => {
    const [uid, setUid] = useState(null);
    const [ reply, setReply] = useState(false)
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
    
    const LinkToProfile = () =>{
        navigate("/app/profile", {
            state: { userId: props.userId}
        })
    }
    const LinkToPostDetail = () => {
        navigate("/app/postDetail", {
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

    const HandleReply = () => {
        if (reply==true){
            setReply(false)
        } else (setReply(true))
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
                <div className="likeIconContainer">
                { likeStatus===false ? <AiOutlineHeart className='Icon' onClick={HandleClickF}/> : <AiFillHeart className="IconF"/>}
                <p className="likes">{props.Likes}</p>
                </div>
                <AiOutlineMessage className="Icon" onClick={HandleReply}/>
            </div>
            { reply==true ? 
                (<ReplyForm 
                parentId={props.id}/>
                ) : (
                null
                )
            }
        </div>
    )
}

export default Post;