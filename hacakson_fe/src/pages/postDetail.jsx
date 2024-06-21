import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react"
import PostDetail from "../components/post/postDetail";
import './pages.css'
import axios from 'axios';
import Reply from "../components/post/reply";

const PostDetailPage = () => {
        const [post, setPost] = useState({root:　{}, replies:[]});
        const [replies, setReplies] = useState([]);
        const [likedBy, setLikedBy] = useState(0);
        const location = useLocation();
        const postId = location.state?.postId;

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
                if (res.data.likedBy) {setLikedBy(res.data.likedBy.length)}
            } catch (err) {
                console.log(err);
            }
        }
        useEffect(() => 
        {if(postId) {FetchPosts()}}, [postId])
        return (
            <div className="AppBasic">
                <div className='timeline'>
                { post && post.root ? (
                <PostDetail 
                    userName={post.root.userName}
                    userId={post.root.userId}
                    postBody={post.root.body}
                    Likes={likedBy}
                    id={post.root.id}
                />
                ) : (
                <div>Loading post details...</div>
                )}
                </div>
                <h1>'replies'</h1>
                <div className='timeline'>
                {replies.length > 0 ? (
                    replies.map((reply) => (
                        <Reply
                        userName={reply.userName}
                        userId={reply.userId}
                        postBody={reply.body}
                        id={reply.id}
                        />
                    ))
                    ) : (
                        <div>No replies yet.</div>
                    )}
                </div>
            </div>
        );
    };

export default PostDetailPage;