import React, { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import './userUpdateForm.css'
import { fireAuth } from "../../firebase"
import axios from 'axios'


const UserUpdateForm = (props) => {
    
    const fetchUser = async () => {
        try {
            const res = await axios.put("https://hackason-be1-ndzwuezdra-uc.a.run.app/user", {
                id: props.id,
                name: userName,
                age: age,
                bio: bio
            })
            if (!res){
                throw Error(`Failed to fetch User`);
            } 
        } catch (err) {
            console.log(err);
        }
    }
    const [userName, setUserName] = useState(props.userName);
    const [bio, setBio] = useState(props.bio)
    const [age, setAge] = useState(props.age)
    const handleSubmit = (event) => {
        if (userName==props.userName && bio==props.bio && age==props.age){
            event.preventDefault();
            alert('変更してください')
            console.log('変更してください')
        } else {
        event.preventDefault();
        // フォームの内容を使って何かをする（ここではコンソールに出力するだけ）
        // フォームを送信後、フォームの内容をクリアする
        fetchUser() ;
        props.HandleEdit()
        }
    };

    return(
        <div className="userUpdateContainer">
            <div className="userTag">
                <h1 className="userId">@userID: {props.id}</h1>
            </div>
            <form onSubmit={handleSubmit} className="userRegisterForm">
                <textarea
                    className="userNameArea"
                    placeholder="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    className="userNameArea"
                    type="number"
                    placeholder="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                <textarea
                    className="bioArea"
                    placeholder="About you"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                />
                <button type="submit" className="registerButton">Edit</button>
            </form>
            <div>
                <button type="cancel" className="cancelButton" onClick={props.HandleEdit}>cancel</button>
            </div>
        </div>
    )
}

export default UserUpdateForm;