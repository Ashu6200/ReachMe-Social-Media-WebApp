import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LikeIcon from "../Images/like.png";
import anotherlikeicon from "../Images/setLike.png";
import CommentIcon from "../Images/speech-bubble.png";
const Post = ({ post }) => {
  const userDetails = useSelector((state) => state.user);
  let users = userDetails?.user;
  const [user, setuser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/post/user/details/${post.user}`
        );
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, [post]);
  const userId = users.other._id;
  const accessToken = users.accessToken;
  const [count, setCount] = useState(post.like.length);
  const [Comments, setComments] = useState(post.comments);
  const [commentwriting, setcommentwriting] = useState("");
  const [show, setshow] = useState(false);
  const [Like, setLike] = useState([
    post.like.includes(userId) ? anotherlikeicon : LikeIcon,
  ]);
  const likeHandler = async () => {
    if (Like === LikeIcon) {
      await fetch(`http://localhost:5000/api/post/${post._id}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/Json", token: accessToken },
      });
      setLike(anotherlikeicon);
      setCount(count + 1);
    } else {
      await fetch(`http://localhost:5000/api/post/${post._id}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/Json", token: accessToken },
      });
      setLike(LikeIcon);
      if (count === 0) {
        setCount(count + 1);
        setLike(anotherlikeicon);
      }
    }
  };

  const addComment = async () => {
    const comment = {
      postid: `${post._id}`,
      username: `${users.other.username}`,
      comment: `${commentwriting}`,
      profile: `${users.other?.profile}`,
    };
    await fetch(`http://localhost:5000/api/post/comment/post`, {
      method: "PUT",
      headers: { "Content-Type": "application/Json", token: accessToken },
      body: JSON.stringify(comment),
    });
    setComments(Comments.concat(comment));
  };

  const commentHanlder = () => {
    addComment();
  };
  const handleshow = () => {
    if (show === false) {
      setshow(true);
    } else {
      setshow(false);
    }
  };
  return (
    <Wrapper key={post._id}>
      <div className="container">
        <div className="upper">
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: "none", color: "black" }}
            key={post._id}
          >
            <div className="left">
              <img src={`${user.profile}`} alt="" />
              <p>{user.username}</p>
            </div>
          </Link>
        </div>
        <div className="middle">
          <p>{post.title}</p>
          {post.image !== "" ? (
            <img src={`${post.image}`} alt="" />
          ) : post.video !== "" ? (
            <video className="PostImages" width="500" height="500" controls>
              <source src={`${post.video}`} type="video/mp4" />
            </video>
          ) : (
            ""
          )}
        </div>
        <div className="bottom">
          <div className="option">
            <img
              src={Like}
              className="iconsforPost"
              alt=""
              onClick={likeHandler}
            />
            <p style={{ marginLeft: "6px" }}>{count} Likes</p>
          </div>
          <div className="option">
            <img
              src={CommentIcon}
              className="iconsforPost"
              alt=""
              onClick={handleshow}
            />
            <p style={{ marginLeft: "6px" }}>{Comments.length} Comments</p>
          </div>
        </div>
        {show === false ? (
          <div className="hidden">
            <div className="inputarea">
              <img src={`${users.other.profile}`} alt="" />
              <input
                type="text"
                className="commentinput"
                placeholder="Write your thought on post"
                onChange={(e) => setcommentwriting(e.target.value)}
              />
              <button className="addCommentbtn" onClick={commentHanlder}>
                Add Comment
              </button>
            </div>
            {Comments.map((item) => (
              <div className="commnetlist">
                <div className="info">
                  <img src={`${item.profile}`} alt="" />
                </div>
                <div className="info2">
                  <p className="username">{item.username}</p>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </Wrapper>
  );
};

export default Post;

const Wrapper = styled.div`
  width: 100%;
  .container {
    width: 100%;
    background-color: white;
    margin-top: 20px;
    border-radius: 10px;
    .upper {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      padding-top: 20px;
      padding-right: 20px;
      padding-left: 20px;
      justify-content: space-between;
      .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
        p {
          text-align: center;
          font-size: 18px;
          font-weight: 600;
        }
      }
      .right {
        margin-right: 50px;
        button {
          width: 60px;
          height: 35px;
          border-radius: 20px;
          border: none;
          outline: none;
          color: white;
          background-color: red;
          font-weight: 600;
          font-family: Arial, Helvetica, sans-serif;
        }
      }
    }
    .middle {
      padding: 0 20px 0 20px;
      p {
        font-size: 13px;
        font-weight: 600;
      }
      img {
        width: 100%;
        height: 450px;
        object-fit: cover;
        border-radius: 10px;
      }
      video {
        width: 100%;
        height: 450px;
        object-fit: cover;
        border-radius: 10px;
      }
    }
    .bottom {
      display: flex;
      padding: 10px 20px 0 20px;
      gap: 20px;
      .option {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          object-fit: cover;
        }
        p {
          font-weight: 600;
          font-size: 13px;
        }
      }
    }
    .hidden {
      padding: 10px 20px 20px 20px;
      .inputarea {
        display: flex;
        flex-direction: row;
        gap: 10px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
        input {
          width: 470px;
          border-radius: 20px;
          border: 1px solid black;
          outline: none;
          padding-left: 10px;
        }
        button {
          border-radius: 20px;
          border: none;
          outline: none;
          color: white;
          background-color: #7A26C1;
          font-weight: 600;
          font-family: Arial, Helvetica, sans-serif;
        }
      }
      .commnetlist {
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        .info {
          display: flex;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
          }
        }
        .info2 {
          .username {
            font-size: 13px;
            font-weight: 700;
          }
          p {
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
    }
  }
`;
