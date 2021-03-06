import React, { useContext } from 'react'
import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import PostData from '../../posts.json';
import UserData from '../../users.json';
import SearchBar from '../searchBar/SearchBar';


const SearchData = [...PostData, ...UserData]

export default function Topbar() {

    const {user, dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const userAdmin = user.isAdmin

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className={userAdmin ? "topbarContainerAdmin" : "topbarContainer"}>
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    {userAdmin ? <span className="logo">CS 490 Project Administrator</span> 
                    : <span className="logo">CS 490 Project</span>}
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchBar placeholder="Enter a username or post to search" data={SearchData}/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <Link to="/messenger" style={{textDecoration:"none"}}>
                        <div className="topbarIconItem">
                            <Chat />
                            <span className="topbarIconBadge">2</span>
                        </div>
                    </Link>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <Link to="/" style={{textDecoration:"none"}}>
                        <span className="topbarLink" onClick={handleLogout}>Logout</span>
                    </Link>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img 
                        src={ 
                            user.profilePicture 
                            ? PF + user.profilePicture 
                            : PF+"person/noAvatar.png"
                        } 
                        alt="" 
                        className="topbarImg" 
                    />
                </Link>
            </div>

        </div>
    )
}
