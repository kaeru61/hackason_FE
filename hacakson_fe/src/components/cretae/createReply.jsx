import React, { useState, useEffect } from 'react';
import './create.css'; // PostFormのスタイルを記述するCSSファイルをインポート
import axios from 'axios';
import { fireAuth } from '../../firebase';

const ReplyForm = (props) => {
    // フォームの各項目の状態を管理するためのState
    const [tweetText, setTweetText] = useState('');
    // フォームを送信するハンドラー
    const [uid, setUid] = useState(null);
    useEffect(() => {
        const unsubscribe = fireAuth.onAuthStateChanged(user => {
            if (user) {
                setUid(user.uid);
            } else {
                setUid(null); // ログアウト時の処理
            }
        });

        return () => unsubscribe();
    }, []);
    const fetchPost = async () => {
        const datetime = new Date().toLocaleString('sv-SE')
        try {
            const res = await axios.post("https://hackason-be1-ndzwuezdra-uc.a.run.app/post", {
                userId: uid,
                body: tweetText,
                parentId: props.parentId,
                createAt: datetime
            })
            if (!res){
                alert("投稿に失敗しました")
                throw Error(`Failed to fetch post`);
            }  else {
                alert("nice post!")
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleSubmit = (event) => {
        if (tweetText==""){
            console.lpg('空白は投稿できません。')
        } else{
        event.preventDefault();
        // フォームの内容を使って何かをする（ここではコンソールに出力するだけ）
        // フォームを送信後、フォームの内容をクリアする
        setTweetText('');
        fetchPost();
        }
    };

    return (
        <div className="postFormContainer">
            <div className="CreateuserTag">
                <h1 className="CreateuserId">{uid}</h1>
            </div>
            <form onSubmit={handleSubmit} className="postForm">
                <textarea
                    className="tweetTextArea"
                    placeholder="reply"
                    value={tweetText}
                    onChange={(e) => setTweetText(e.target.value)}
                    required
                />
                <button type="submit" className="tweetButton">Post</button>
            </form>
        </div>
    );
};

export default ReplyForm;