import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react"
import PostDetail from "../components/post/postDetail";
import './pages.css'
import axios from 'axios';
import Reply from "../components/post/reply";
import ReplyForm from "../components/cretae/createReply";

const PostDetailPage = () => {
        const [post, setPost] = useState({root:　{}, replies:[]});
        const [replies, setReplies] = useState([]);
        const [likes, setLikes] = useState(0);
        const location = useLocation();
        const initpostId = location.state?.postId;
        const [postId, setPostId] = useState(initpostId)
        const [reply, setReply] = useState(false)
        const path = location.pathname

        const FetchPosts = async () => {
            try {
                console.log(postId)
                const res = await axios.get(`https://hackason-be1-ndzwuezdra-uc.a.run.app/post?id=${postId}`)
                if (!res){
                    throw Error(`Failed to fetch posts`);
                }
                console.log(res)
                const postData = res.data;
                setPost(postData)
                setReplies(res.data.replies || [])
                if (res.data.likedBy) {setLikes(res.data.likedBy.length)}
            } catch (err) {
                console.log(err);
            }
        }
        useEffect(() => 
        {if(postId) {FetchPosts()}}, [postId])
        const HandleClick = () => {
            if (reply==true){setReply(false)
            } else { setReply(true)}
        }
        return (
            <div className="AppBasic">
                <div className='timeline'>
                { post && post.root ? (
                <PostDetail 
                    userName={post.root.userName}
                    userId={post.root.userId}
                    postBody={post.root.body}
                    Likes={likes}
                    id={post.root.id}
                    likedBy={post.likedBy || []}
                    HandleClickReply={HandleClick}
                />
                ) : (
                <div>Loading post details...</div>
                )}
                </div>
                { reply==true ? 
                (<ReplyForm 
                parentId={post.root.id}/>
                ) : (
                null
                )}
                <h1>'replies'</h1>
                <div className='timeline'>
                {replies.length > 0 ? (
                    replies.map((reply) => (
                        <div onClick={() => setPostId(reply.id)}>
                        <Reply
                        userName={reply.userName}
                        userId={reply.userId}
                        postBody={reply.body}
                        id={reply.id}
                        path={path}
                        />
                        </div>
                    ))
                    ) : (
                        <div>No replies yet.</div>
                    )}
                </div>
            </div>
        );
    };

export default PostDetailPage;