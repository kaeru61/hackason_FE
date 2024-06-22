import ProfileInfoMine from "../components/profile/plofile"
import './pages.css'
import { Link } from "react-router-dom"
import {useEffect, useState} from 'react'
import axios from 'axios'
import { fireAuth } from "../firebase"
import Post from "../components/post/post"

const ProfileMine = () => {
    const [uid, setUid] = useState(null);
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState([])
    const [mode, setMode] = useState(false)
    const [followings, setFollowings] = useState(0)
    const [followers, setFollowers] = useState(0)
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

    useEffect(()=> {
        if(uid) {fetchUser()};}, [uid])

    const fetchUser = async () => {
        try {
            const res = await axios.get(`https://hackason-be1-ndzwuezdra-uc.a.run.app/user?id=${uid}`)
            if (!res){
                throw Error(`Failed to fetch posts`);
            }
            console.log(res)
            const userData = res.data;
            setPosts(userData.posts || []);
            setLikes(userData.likes || []);
            setUser(userData.user || {});
            if (userData.followings) {setFollowings(userData.followings.length)}
            if (userData.followers) {setFollowers(userData.followers.length)}
        } catch (err) {
            console.log(err);
        }
    }
    
    if (!user) {
        return <div>Loading...</div>;
    }

    if (mode===false) { return(
        <div className="AppBasic">
            <ProfileInfoMine
            userName={user.name}
            userId={user.id}
            bio={user.bio}
            followers={followers}
            followings={followings}/>
            <div className='ModeSelecterContainer'>     
                <div className='selectMode' onClick={()=>{setMode(false)}}>
                    <h1 className='label'>Posts</h1>
                </div>
                <div className='selectMode' onClick={()=>{setMode(true)}}>
                    <h1 className='label'>Likes</h1>
                </div>
            </div>
            <div className='timeline'>
            {posts.length > 0 ? (
                posts.map((post) => {
                    if (post.likedBy){return(<Post 
                    userName={post.userName}
                    userId={post.userId}
                    postBody={post.body}
                    Likes={post.length}
                    id={post.id}
                    likedBy={post.likedBy}
                    />)
                    } else {return(<Post
                        userName={post.userName}
                        userId={post.userId}
                        postBody={post.body}
                        Likes={0}
                        id={post.id}
                        likedBy={[]}/>)
                    }}
                )
            ) : (
                <div>No posts yet.</div>
            )}
            </div>
        </div>
    )} else { return (
        <div className="AppBasic">
            <ProfileInfoMine
            userName={user.name}
            userId={user.id}
            bio={user.bio}
            followers={followers}
            followings={followings}/>
            <div className='ModeSelecterContainer'>     
                <div className='selectMode' onClick={()=>{setMode(false)}}>
                    <h1 className='label'>Posts</h1>
                </div>
                <div className='selectMode' onClick={()=>{setMode(true)}}>
                    <h1 className='label'>Likes</h1>
                </div>
            </div>
            <div className='timeline'>
            {likes.length > 0 ? (
                likes.map((post) => {
                    if (post.likedBy){return(<Post 
                    userName={post.userName}
                    userId={post.userId}
                    postBody={post.body}
                    Likes={post.length}
                    id={post.id}
                    likedBy={post.likedBy}
                    />)
                    } else {return(<Post
                        userName={post.userName}
                        userId={post.userId}
                        postBody={post.body}
                        Likes={0}
                        id={post.id}
                        likedBy={[]}/>)
                    }}
                )
            ) : (
                <div>No likes yet.</div>
            )}
            </div>
        </div>
    )
    }
}

export default ProfileMine;