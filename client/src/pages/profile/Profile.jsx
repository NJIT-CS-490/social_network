import { React, useState, useEffect } from 'react';
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";
import {axiosInstance} from "../../config.js";
import { useParams } from "react-router";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({});
    const username = useParams().username

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axiosInstance.get(`/users?username=${username}`);
          setUser(res.data);
        };
        fetchUser();
      }, [username]);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Leftbar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img 
                                className="profileCoverImg" 
                                src={
                                    user.coverPicture
                                    ? PF + user.coverPicture
                                    : PF + "person/noCover.png"
                                } 
                                alt="" 
                            />
                            <img
                                className="profileUserImg"
                                src={
                                    user.profilePicture
                                    ? PF + user.profilePicture
                                    : PF + "person/noAvatar.png"
                                }
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    );
}
