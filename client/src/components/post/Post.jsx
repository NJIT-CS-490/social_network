import { React, useContext, useEffect, useState } from 'react';
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import {axiosInstance} from "../../config.js";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import Button from '@material-ui/core/Button';


export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);    
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);
    const userAdmin = currentUser.isAdmin;

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    useEffect(()=> {
        const fetchUser = async () => {
        const res = await axiosInstance.get(`/users?userId=${post.userId}`);
        setUser(res.data)
        };

    fetchUser();
    }, [post.userId]);

    useEffect(async ()=> {
        const res = await axiosInstance.get("/posts/"+post._id+"/comments")
<<<<<<< HEAD
        setComments(res.data)
    }, [])
=======
        setCommentText(res.data)
    }, [comments])
>>>>>>> 2649e282f06d12d6e45d493fed40cfa62a4945da

    const likeHandler = ()=>{
        try{
            axiosInstance.put("/posts/"+post._id+"/like",{ userId:currentUser._id })
        }
        catch(err){}
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
    }

<<<<<<< HEAD
    const commentHandler = async () => {
        try {
            await axiosInstance.post("/posts/"+post._id+"/comment",{ userId:currentUser._id, text: commentText})
            const res = await axiosInstance.get("/posts/"+post._id+"/comments")
            setComments(res.data)
        } catch(err){}
    }
=======
    const blockHandler = (id, postId)=>{
        const url = `/posts/${id}/${postId}/block`
        try{
            axiosInstance.post(url, (res) => {
                res.status(200).jason("Post blocked!")
            })
        }
        catch(err){}
        
    }

    const unblockHandler = (id, postId)=>{
        const url = `/posts/${id}/${postId}/unblock`
        try{
            axiosInstance.post(url, (res) => {
                res.status(200).jason("Post unblocked!")
            })
        }
        catch(err){}
        
    }
    const commentHandler = () => {
        try {
            axiosInstance.post("/posts/"+post._id+"/comment",{ userId:currentUser._id, text: commentText})
        } catch(err){}
    }

>>>>>>> 2649e282f06d12d6e45d493fed40cfa62a4945da

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                        <img 
                            className="postProfileImg" 
                            src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"}
                            alt="" 
                        />
                        </Link>
                        <span className="postUsername">
                            {user.username}
                        </span>
                        <span className="postDate">
                            {format(post.createdAt)}
                        </span>
                    </div>
                    <div className="postTopRight">
                        {userAdmin && !post.isBlocked && <Button
                            onClick={() => blockHandler(currentUser._id, post._id)}
                            >Block
                        </Button>}
                        {userAdmin && post.isBlocked && <Button
                            onClick={() => unblockHandler(currentUser._id, post._id)}
                            >Unblock
                        </Button>}
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post?.desc}
                    </span>
                    <img className="postImg" src={
                        post.image
                        ? PF + post.image
                        : ""
                    } 
                    alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                        <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">
                            {like}
                        </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">
                            {post.comment} comments
                        </span>
                    </div>
                </div>
                <div className="commentWrapper">
                    <input placeholder="Comment" onChange={(event) => { setCommentText(event.target.value); }}></input>
<<<<<<< HEAD
                    <button onClick={async () => await commentHandler() }>Send</button>
                </div>
                {comments.map(c=> {
                    return <div>
                        <div className="commentTop">
                            <p className="commentText">{c.text}</p>
                        </div>
                        <div className="commentBottom">{format(c.createdAt)}</div>
                    </div>
                    })}
=======
                    <button onClick={() => commentHandler() }>Send</button>
                </div>
                {comments.map((item, indx) => <p>{JSON.stringify(item)}</p>)}
>>>>>>> 2649e282f06d12d6e45d493fed40cfa62a4945da
            </div>
        </div>
    )
}