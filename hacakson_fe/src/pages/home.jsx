import SideBar from '../components/sidebar/sidebar'
import Post from '../components/post/post';
import { Link } from 'react-router-dom';
import './pages.css'
import { useEffect, useState } from 'react';
import axios from 'axios';


const Home = () => {
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            const res = await axios.get("https://hackason-be1-ndzwuezdra-uc.a.run.app/post")
            if (!res){
                throw Error(`Failed to fetch posts`);
            }
            console.log(res)
            const postData = res.data
            setPosts(postData)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {fetchPosts()}, [])
    return (
        <div className="AppBasic">
            <div className='ModeSelecterContainer'>
                <div className='selectMode'>
                    <h1 className='label'>All</h1>
                </div>
                <div className='selectMode'>
                    <h1 className='label'>following(comingsoon?)</h1>
                </div>
            </div>
            <div className='timeline'>
            {posts.map((post) => {
            if (post.likedBy){return(<Post 
            userName={post.root.userName}
            userId={post.root.userId}
            postBody={post.root.body}
            Likes={post.likedBy.length}
            id={post.root.id}
            likedBy={post.likedBy}
            />)
            } else {return(<Post
                userName={post.root.userName}
                userId={post.root.userId}
                postBody={post.root.body}
                Likes={0}
                id={post.root.id}
                likedBy={[]}/>)
            }})}
            </div>
        </div>
    )
}

export default Home;