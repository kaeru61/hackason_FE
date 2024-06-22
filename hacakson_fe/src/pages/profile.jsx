import ProfileInfoMine from "../components/profile/plofile"
import './pages.css'
import { useLocation } from "react-router-dom"
import {useEffect, useState} from 'react'
import axios from 'axios'
import { fireAuth } from "../firebase"
import ProfilePost from "../components/post/profilePost"
import  ReactModal  from 'react-modal'
import UserUpdateForm from "../components/userRegister/userUpdateForm"
import Fflist from "../components/fflist/fflist"

const Profile = () => {
    const [uid, setUid] = useState(null);
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState([])
    const [mode, setMode] = useState(false);
    const [followings, setFollowings] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [follower, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);
    const [currentUserF, setCurrentUserF] = useState([]);
    const location = useLocation();
    const userId = location.state?.userId;
    console.log(userId)
    const [mine, setMine] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalffIsOpen, setModalffIsOpen] = useState(false);
    const [category, setCategory] = useState();
    
    useEffect(() => {
        const unsubscribe = fireAuth.onAuthStateChanged(user => {
            if (user) {
                setUid(user.uid);
                if (uid===userId) {setMine(true)
                } else { setMine(false) }
            } else {
                setUid(null); // ログアウト時の処理
            }
        });
        return () => unsubscribe();
    });

    useEffect(()=> {
        if(userId) {
            fetchUser();
            setModalffIsOpen(false)
        };}, [userId])

    useEffect(() => {
        if(uid) {
            fetchCurrentUser() 
        };}, [uid])

    const fetchUser = async () => {
        try {
            const res = await axios.get(`https://hackason-be1-ndzwuezdra-uc.a.run.app/user?id=${userId}`)
            if (!res){
                throw Error(`Failed to fetch user`);
            }
            console.log(res)
            const userData = res.data;
            setPosts(userData.posts || []);
            setLikes(userData.likes || []);
            setUser(userData.user || {});
            setFollower(userData.followers || []);
            setFollowing(userData.followings || []);
            if (userData.followings) {setFollowings(userData.followings.length)}
            if (userData.followers) {setFollowers(userData.followers.length)}
        } catch (err) {
            console.log(err);
        }
    }

    const fetchCurrentUser = async () => {
        try {
            const res2 = await axios.get(`https://hackason-be1-ndzwuezdra-uc.a.run.app/user?id=${uid}`)
            if (!res2){
                throw Error(`Failed to fetch user`);
            }
            console.log(res2)
            const currentUserFData = res2.data.followings;
            if (currentUserFData !== null ) {setCurrentUserF(currentUserFData)}
        } catch (err) {
            console.log(err);
        }
    }

    const CloseModal = () => {
        setModalIsOpen(false)
    }

    const OpenModal = () => {
        setModalIsOpen(true)
    }

    const Handlefollower = () => {
        setModalffIsOpen(true)
        setCategory('follower')
    }

    const Handlefollowing = () => {
        setModalffIsOpen(true)
        setCategory('following')
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return(
        <div className="AppBasic">
            <ProfileInfoMine
            userName={user.name}
            userId={user.id}
            bio={user.bio}
            followers={followers}
            followings={followings}
            mine={mine}
            uid={uid}
            HandleEdit={OpenModal}
            Handlefollower={Handlefollower}
            Handlefollowing={Handlefollowing}
            CurrentUser={currentUserF}/>
            <ReactModal isOpen={modalffIsOpen} onRequestClose={() => setModalffIsOpen(false)} className="modal2" overlayClassName="overlay">
                { category == 'follower' ? (
                <Fflist dataSet={follower} 
                HandleFF={Handlefollowing}
                category={category}
                uid={uid}
                CurrentUser={currentUserF}
                />
                ) : (
                <Fflist dataSet={following}
                HandleFF={Handlefollower}
                category={category}
                uid={uid}
                CurrentUser={currentUserF}
                />
                )}
            </ReactModal>
            <ReactModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className='modal' overlayClassName="overlay">
                <UserUpdateForm
                userName={user.name}
                id={user.id}
                bio={user.bio}
                age={user.age}
                HandleEdit={CloseModal}
                />
            </ReactModal>
            <div className='ModeSelecterContainer'>     
                <div className='selectMode' onClick={()=>{setMode(false)}}>
                    <h1 className='label'>Posts</h1>
                </div>
                <div className='selectMode' onClick={()=>{setMode(true)}}>
                    <h1 className='label'>Likes</h1>
                </div>
            </div>
            { mode === false ? (
            <div className='timeline'>
            {posts.length > 0 ? (
                posts.map((post) => {
                    if (post.likedBy){return(<ProfilePost
                    userName={post.userName}
                    userId={post.userId}
                    postBody={post.body}
                    Likes={post.likedBy.length}
                    id={post.id}
                    likedBy={post.likedBy}
                    />)
                    } else {return(<ProfilePost
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
            </div>) : (
                <div className='timeline'>
                {likes.length > 0 ? (
                    likes.map((post) => {
                        if (post.likedBy){return(<ProfilePost
                        userName={post.userName}
                        userId={post.userId}
                        postBody={post.body}
                        Likes={post.likedBy.length}
                        id={post.id}
                        likedBy={post.likedBy}
                        />)
                        } else {return(<ProfilePost
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
            )}
            
        </div>
    )
}

export default Profile;