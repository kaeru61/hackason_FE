import SideBar from '../components/sidebar/sidebar'
import Post from '../components/post/post';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import './pages.css'

const Home = () => {
    return (
        <div className="AppBasic">
            <div className='ModeSelecterContainer'>
                <div className='selectMode'>
                    <h1 className='label'>All</h1>
                </div>
            <Link to='/homefollowing'>
                <div className='selectMode'>
                    <h1 className='label'>following</h1>
                </div>
            </Link>
            </div>
            <div className='timeline'>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    )
}

export default Home;