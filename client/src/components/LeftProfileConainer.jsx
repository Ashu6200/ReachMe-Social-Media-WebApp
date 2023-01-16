import React, { useEffect, useState } from "react";
import styled from "styled-components";
import image from "../Images/logo.jpg";
import axios from "axios";
import { logout } from "../store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LeftProfileConainer = () => {
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Follow, setUnFollow] = useState([
    user.other.Following.includes(id) ? "UnFollow" : "Follow",
  ]);
  const accessToken = user.accessToken;
  const [users, setuser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/post/user/details/${id}`
        );
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, [id]);
  let followersCounter = users?.Followers?.length;
  let followingCounter = users?.Following?.length;

  const [Followinguser, setFollowinguser] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/following/${id}`
        );
        setFollowinguser(res.data);
      } catch (error) {
        console.log("Error");
      }
    };
    getFollowing();
  }, [id]);
  const followerHandler = async () => {
    if (Follow === "Follow") {
      await fetch(`http://localhost:5000/api/user/following/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/JSON", token: accessToken },
        body: JSON.stringify({ user: `${user.other._id}` }),
      });
      toast.success(`You have successfully Followed ${id.username}`);
      setUnFollow("UnFollow");
    } else {
      await fetch(`http://localhost:5000/api/user/following/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/JSON", token: accessToken },
        body: JSON.stringify({ user: `${user.other._id}` }),
      });
      toast.success(`You have successfully Unfollowed ${id.username}`);
      setUnFollow("Follow");
    }
  };
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("You have logged out");
  };
  return (
    <Wrapper>
      <div className="upper">
        <img src={`${image}`} className="ProfilepageCover" alt="" />
        <div className="info">
          <img src={`${users.profile}`} className="Profilepageimage" alt="" />
          <div className="inner">
            <p>{users.username}</p>
            <p style={{ marginTop: -16, fontSize: 11 }}>Software Developre</p>
          </div>
        </div>
        <div className="following">
          <p>Followings</p>
          <p
            style={{
              color: "black",
              marginRight: 20,
              fontSize: "12px",
              marginTop: 17,
            }}
          >
            {followingCounter}
          </p>
          <p>Followers</p>
          <p
            style={{
              color: "black",
              marginRight: 20,
              fontSize: "12px",
              marginTop: 17,
            }}
          >
            {followersCounter}
          </p>
        </div>
        <div style={{ marginTop: -20 }}>
          <h5
            style={{
              color: "black",
              marginLeft: 10,
              fontSize: "14px",
              marginRight: 30,
              marginTop: 30,
              textAlign: "start",
            }}
          >
            User bio
          </h5>
          <p
            style={{
              color: "black",
              fontSize: "12px",
              marginTop: -20,
              textAlign: "start",
              marginLeft: "10px",
            }}
          >
            I would rather be despised of who I am, rather than loved by who I
            am not.
          </p>
        </div>
        {user.other._id !== id ? (
          <>
            <div>
              <button
                style={{
                  width: "100%",
                  paddingTop: 7,
                  paddingBottom: 7,
                  border: "none",
                  backgroundColor: "green",
                  color: "white",
                  cursor: "pointer",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
              >
                Message
              </button>
            </div>
            <div onClick={followerHandler}>
              <button
                style={{
                  width: "100%",
                  paddingTop: 7,
                  paddingBottom: 7,
                  border: "none",
                  backgroundColor: "#7A26C1",
                  color: "white",
                  cursor: "pointer",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
              >
                {Follow}
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <button
                style={{
                  width: "100%",
                  paddingTop: 7,
                  paddingBottom: 7,
                  border: "none",
                  backgroundColor: "#7A26C1",
                  color: "white",
                  cursor: "pointer",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
              >
                Edit Bio
              </button>
            </div>
            <div>
              <button
                style={{
                  width: "100%",
                  paddingTop: 7,
                  paddingBottom: 7,
                  border: "none",
                  backgroundColor: "red",
                  color: "white",
                  cursor: "pointer",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
      <div className="bottom">
        <h3>Followings</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ marginLeft: 10 }}>Friends</p>
          <p style={{ marginRight: 10, color: "#aaa" }}>See all</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", marginLeft: 5 }}>
          {Followinguser.map((item) => (
            <Link
              to={`/profile/${item._id}`}
              style={{ textDecoration: "none", color: "black" }}
              key={item._id}
            >
              <div style={{ marginLeft: 4, cursor: "pointer" }} key={item._id}>
                <img src={`${item.profile}`} className="friendimage" alt="" />
                <p style={{ marginTop: -2 }}>{item.username}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default LeftProfileConainer;

const Wrapper = styled.div`
  width: 25%;
  .upper {
    width: 100%;
    height: 52vh;
    background-color: white;
    margin-top: 20px;
    border-radius: 20px;
    overflow: hidden;
    overflow-y: scroll;
    img {
      width: 100%;
      height: 100px;
      object-fit: cover;
    }
    .info {
      display: flex;
      align-items: center;
      margin-top: -30;
      gap: 10px;
      img {
        width: 60px;
        border-radius: 50%;
        height: 60px;
        object-fit: cover;
        margin-left: 10px;
      }
      .inner {
        p {
          margin-left: 6;
          margin-top: 20;
          color: black;
          text-align: start;
        }
      }
    }
    .following {
      display: flex;
      justify-content: space-between;
      padding-left: 10px;
      text-align: center;
      align-items: center;
      p {
        margin-left: 20;
        color: black;
        text-align: start;
        font-weight: 600;
      }
    }
  }
  .bottom {
    height: 50vh;
    padding: 10px;
    background-color: white;
    margin-top: 20px;
    border-radius: 20px;
    overflow: hidden;
    overflow-y: scroll;
    .friendimage {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 10px;
    }
  }
`;
