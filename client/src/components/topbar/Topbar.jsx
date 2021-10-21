import React, { useContext } from 'react'
import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function Topbar() {

    const {user, dispatch} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">CS 490 Project</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input type="search" placeholder="Search for friend or post" className="searchInput" />
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
