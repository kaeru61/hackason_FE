import SideBar from '../components/sidebar/sidebar'
import Post from '../components/post/post';
import { Link } from 'react-router-dom';
import './pages.css'

const Homefollowing = () => {
    return (
        <div className="AppBasic">
            <div className='ModeSelecterContainer'>
            <Link to='/app/home'>
                <div className='selectMode'>
                    <h1 className='label'>All</h1>
                </div>
            </Link>
                <div className='selectMode'>
                    <h1 className='label'>following</h1>
                </div>
            </div>
            <div className='timeline'>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    )
}

export default Homefollowing;