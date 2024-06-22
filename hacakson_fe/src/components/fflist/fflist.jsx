import React from "react"
import './fflist.css'
import Followbutton from "../button/followbutton";
import { Link } from "react-router-dom";

const Fflist = (props) => {
    return (
        <div className="ffContainer">
                    { props.category === 'following' ? (
                    <div className="categoryContainer">
                        <div className="categoryNow" >followings</div>
                        <div className="categoryTheOther" onClick={props.HandleFF}>followers</div>
                    </div>) : (
                    <div className="categoryContainer">
                        <div className="categoryTheOther" onClick={props.HandleFF}>followings</div>
                        <div className="categoryNow" >followers</div>
                    </div>    
                    )}
                    <div className="userList">
                    {props.dataSet.length > 0 ? (
                        (props.dataSet.map((data) => (
                        <Link to='/app/profile' state={{userId: data.id}}>
                        <div className="ffDatacontainer">
                            <h1 className="ffName">{data.name}</h1>
                            <h1 className="ffData">{data.id}</h1>
                            <Followbutton
                            userId={data.id}
                            CurrentUser={props.CurrentUser}
                            uid={props.uid}
                            category={props.category}
                            />
                        </div>
                        </Link>
                    )))) : (
                        <div>no {props.category}s</div>
                    )}
                    </div>
        </div>
    )
} 

export default Fflist;