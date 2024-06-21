import ProfileInfo from "../components/profile/plofile"
import './pages.css'
import { Link } from "react-router-dom"

const ProfileMineLikes = () => {
    return(
        <div className="AppBasic">
            <ProfileInfo/>
            <div className='ModeSelecterContainer'>
                <Link to='/profile'>
                <div className='selectMode'>
                    <h1 className='label'>Posts</h1>
                </div>
                </Link>
                <div className='selectMode'>
                    <h1 className='label'>Likes</h1>
                </div>
            </div>
        </div>
    )
}

export default ProfileMineLikes;