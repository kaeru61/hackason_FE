import React, {useState, useEffect} from "react";
import './followbutton.css'
import axios from 'axios'

const Followbutton = (props) => {
    const [followStatus, setFollowStatus] = useState();
    const CheckFollowStatus = () => {
        if ( props.CurrentUser.some(user => user.id === props.userId )){
            setFollowStatus(0);
        } else if ( props.uid === props.userId ) {
            setFollowStatus(1)
        } else {
            setFollowStatus(2)
        }
    } 

    const fetchFollows = async () => {
        const datetime = new Date().toLocaleString('sv-SE')
        try {
            const res = await axios.post("https://hackason-be1-ndzwuezdra-uc.a.run.app/follows", {
                followingUId: props.uid,
                followerUId: props.userId,
                createAt: datetime
            })
            if (!res){
                alert("Failed")
                throw Error(`Failed to fetch follows`);              
            } else {
                setFollowStatus(0);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {CheckFollowStatus()}, [props.CurrentUser, props.category])

    const HandleClick = () => {
        fetchFollows();
    }

    if(followStatus === 0 ) {
        return(
            <div className="selectMode">
                <h1 className="label">following</h1>
            </div>
        )
    }
    if(followStatus === 1) {
        return null
    }
    if (followStatus === 2) {
        return(
            <div className="selectMode2" onClick={HandleClick}>
                <h1 className="label2">follow</h1>
            </div>
        )
    }
}

export default Followbutton;