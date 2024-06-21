import React, { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import './userRegisterForm.css'
import { fireAuth } from "../../firebase"
import axios from 'axios'


const UserRegisterForm = () => {
    const [uid, setUid] = useState(null);
    useEffect(() => {
        const unsubscribe = fireAuth.onAuthStateChanged(user => {
            if (user) {
                setUid(user.uid);
            } else {
                setUid(null); // ログアウト時の処理
            }

            return () => unsubscribe();
        });
    })
    const fetchUser = async () => {
        try {
            const res = await axios.post("https://hackason-be1-ndzwuezdra-uc.a.run.app/user", {
                id: uid,
                name: userName,
                age: age,
                bio: bio
            })
            if (!res){
                throw Error(`Failed to fetch user`);
            } else {
                navigate('/app/home')
            }
        } catch (err) {
            console.log(err);
        }
    } 
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('')
    const [age, setAge] = useState(20)
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        if (userName=="" | bio==""){
            console.lpg('空白は投稿できません。')
        } else{
        event.preventDefault();
        // フォームの内容を使って何かをする（ここではコンソールに出力するだけ）
        // フォームを送信後、フォームの内容をクリアする
        setUserName('');
        setBio('')
        setAge(20)
        fetchUser();
        }
    };

    return(
        <div className="userRegisterContainer">
            <div className="userTag">
                <h1 className="userId">@userID: {uid}</h1>
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
                <button type="submit" className="registerButton">register start App</button>
            </form>
        </div>
    )
}

export default UserRegisterForm;