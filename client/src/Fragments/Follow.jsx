import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import addFriends from "../Images/add-user.png";
import UserToFollow from "../Images/afterFollowImg.png";
import { toast } from "react-toastify";

const Follow = ({ userdetails }) => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  let id = user?.other?._id;
  const accessToken = user?.accessToken;
  const [Follow, setFollow] = useState(addFriends);
  const handleFollow = async (e) => {
    await fetch(`http://localhost:5000/api/user/following/${userdetails._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/JSON", token: accessToken },
      body: JSON.stringify({ user: `${id}` }),
    });
    setFollow(UserToFollow);
    toast.success(`You have successfully ${userdetails.username}`);
  };
  return (
    <Wrapper>
      <div className="container">
        <Link
          to={`/profile/${userdetails._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="info">
            <img src={`${userdetails.profile}`} alt="" />
            <div>
              <p>{userdetails.username}</p>
              <p
                style={{
                  marginTop: "-16px",
                  fontSize: "11px",
                  color: "#aaa",
                }}
              >
                Suggested for you
              </p>
            </div>
          </div>
        </Link>
        <div className="action" onClick={(e) => handleFollow(userdetails._id)}>
          <img src={`${Follow}`} alt="" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Follow;

const Wrapper = styled.div`
  padding: 0 10px 0 10px;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
      p {
        font-weight: 600;
        margin-left: 10px;
        text-align: start;
      }
    }
    .action {
      background-color: #7a26c1;
      padding: 10px;
      cursor: pointer;
      border-radius: 50%;
      margin-right: 13px;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
