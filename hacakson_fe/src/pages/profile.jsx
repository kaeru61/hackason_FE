import ProfileInfo from "../components/profile/plofile"
import './pages.css'
import { Link } from "react-router-dom/cjs/react-router-dom"

const Profile = () => {
    return(
        <div className="AppBasic">
            <ProfileInfo/>
            <div className='ModeSelecterContainer'>     
                <div className='selectMode'>
                    <h1 className='label'>Posts</h1>
                </div>
            <Link to='/profileLikes'>
                <div className='selectMode'>
                <h1 className='label'>Likes</h1>
                </div>
            </Link>
            </div>
        </div>
    )
}

export default Profile;