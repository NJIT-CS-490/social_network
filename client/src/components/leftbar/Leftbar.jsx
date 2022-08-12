// This code was written and maintained by several members of the team
// Jefferson worked on create new user link

import React, { useContext, useEffect, useState } from "react";
import "./leftbar.css";
import {
  RssFeed,
  Message,
  PlayCircleFilled,
  Group,
  Bookmark,
  HelpOutline,
  Work,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config.js";

export default function Leftbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const { user: currentUser } = useContext(AuthContext);
  const userAdmin = currentUser.isAdmin;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userList = await axiosInstance.get("/users/allusers/");
        setUsers(userList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [user]);

  // Jefferson added the code for the Create new user link
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <Link
            to={`/profile/${user.username}`}
            style={{ textDecoration: "none" }}
          >
            <li className="leftbarListItem">
              <RssFeed className="leftbarIcon" />
              <span className="leftbarListItemText">Feed</span>
            </li>
          </Link>

          <Link to="/messenger" style={{ textDecoration: "none" }}>
            <li className="leftbarListItem">
              <Message className="leftbarIcon" />
              <span className="leftbarListItemText">Chats</span>
            </li>
          </Link>

          {userAdmin && (
            <Link to="/createUser" style={{ textDecoration: "none" }}>
              <li className="leftbarListItem">
                <span className="leftbarListItemText">Create New User</span>
              </li>
            </Link>
          )}
        </ul>
        <hr className="leftbarHr" />
        <ul className="leftbarFriendList">
          {users.map((user, index) => (
            <Link
              to={"/profile/" + user.username}
              style={{ textDecoration: "none" }}
              key={index}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{user.username}</span>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
