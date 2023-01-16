import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Follow from "../Fragments/Follow";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const RightProfileContainer = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  let idforSuggest = user?.other?._id;
  const [Followinguser, setFollowinguser] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/followers/${id}`
        );
        setFollowinguser(res.data);
      } catch (error) {
        console.log("Error");
      }
    };
    getFollowing();
  }, [id]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/all/user/${idforSuggest}`
        );
        setUsers(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  });
  return (
    <Wrapper>
      <div className="upper">
        <h3>Followers</h3>
        <div>
          {Followinguser.map((item) => (
            <Link
              to={`/profile/${item._id}`}
              style={{ textDecoration: "none", color: "black" }}
              key={item._id}
            >
              <div className="info">
                <div className="box">
                  <img src={`${item.profile}`} alt="" />
                  <p>{item.username}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="bottom">
        <h3>Suggested for you</h3>
        {users.map((item) => (
          <Follow userdetails={item} key={item._id} />
        ))}
      </div>
    </Wrapper>
  );
};

export default RightProfileContainer;

const Wrapper = styled.div`
  width: 25%;
  .upper {
    padding: 10px;
    height: 34vh;
    background-color: white;
    margin-top: 20px;
    border-radius: 15px;
    overflow: hidden;
    overflow-y: scroll;
    .info {
      margin-top: 10px;
      .box {
        display: flex;
        align-items: center;
        margin-left: 10;
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 50%;
        }
        p {
          text-align: start;
          margin-left: 10px;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 60vh;
    background-color: white;
    margin-top: 20px;
    border-radius: 15px;
    overflow: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 1px;
    }
    h3 {
      text-align: start;
      margin-left: 10px;
    }
  }
`;
