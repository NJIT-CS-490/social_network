import { React, useContext, useEffect, useState } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { axiosInstance } from "../../config.js";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Divider } from "@material-ui/core";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const userAdmin = currentUser.isAdmin;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };

    fetchUser();
  }, [post.userId]);

  useEffect(async () => {
    const res = await axiosInstance.get("/posts/" + post._id + "/comments");
    setComments(res.data);
  }, []);

  const likeHandler = () => {
    try {
      axiosInstance.put("/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const blockHandler = (id, postId) => {
    const url = `/posts/${id}/${postId}/block`;
    try {
      axiosInstance.post(url, (res) => {
        res.status(200).jason("Post blocked!");
      });
    } catch (err) {}
  };

  const unblockHandler = (id, postId) => {
    const url = `/posts/${id}/${postId}/unblock`;
    try {
      axiosInstance.post(url, (res) => {
        res.status(200).jason("Post unblocked!");
      });
    } catch (err) {}
  };

  const commentHandler = async () => {
    try {
      await axiosInstance.post("/posts/" + post._id + "/comment", {
        userId: currentUser._id,
        text: commentText,
      });
      const res = await axiosInstance.get("/posts/" + post._id + "/comments");
      setComments(res.data);
    } catch (err) {}
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <div className="postUserInfo">
              <span className="postUsername">{user.username}</span>
              <div className="postDate">{format(post.createdAt)}</div>
            </div>
          </div>

          <div className="postTopRight">
            {userAdmin && !post.isBlocked && (
              <button
                className="block_btn"
                onClick={() => blockHandler(currentUser._id, post._id)}
              >
                Block
              </button>
            )}
            {userAdmin && post.isBlocked && (
              <button
                className="unblock_btn"
                onClick={() => unblockHandler(currentUser._id, post._id)}
              >
                Unblock
              </button>
            )}
          </div>
        </div>
        <div className="postCenter">
          <div className="postText">{post?.desc}</div>
          <div className="imgWrapper">
            <img
              className="postImg"
              src={post.image ? PF + post.image : ""}
              alt=""
            />
          </div>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} </span>
          </div>
        </div>
        <div className="commentWrapper">
          <input
            className="commentInput"
            placeholder="Comment"
            onChange={(event) => {
              setCommentText(event.target.value);
            }}
          ></input>
          <button
            className="commentButton"
            onClick={async () => await commentHandler()}
          >
            Send
          </button>
        </div>
        <div className="divider"></div>

        {comments.map((c, index) => {
          return (
            <div className="comment" key={index}>
              <div className="commentTop">
                <p className="commentText">{c.text}</p>
              </div>
              <div className="commentBottom">{format(c.createdAt)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
