import { React, useEffect, useState, useContext } from 'react';
import "./feed.css";
import Share from '../share/Share';
import Post from '../post/Post';
import { AuthContext } from "../../context/AuthContext";
import {axiosInstance} from "../../config.js";




export default function Feed( {username} ) {
    const [posts,setPosts] = useState([]);
    const {user} = useContext(AuthContext)

    useEffect(()=> {
        const fetchPosts = async () => {
            const res = username 
                ? await axiosInstance.get("/posts/profile/" + username)
                : await axiosInstance.get("/posts/timeline/" + user._id);
                setPosts(
                    res.data.sort((p1, p2) => {
                      return new Date(p2.createdAt) - new Date(p1.createdAt);
                    })
                );
        };
        fetchPosts();
    }, [username, user._id]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {posts.map(p=>(
                    !p.isBlocked && !user.isAdmin && <Post key={p._id} post={p} /> ||
                    user.isAdmin && <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    )
}
