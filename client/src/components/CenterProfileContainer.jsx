import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContentPost from "../Fragments/ContentPost";
import Coverimage from "../Images/logo.jpg";
import ProfilePost from "./ProfilePost";
import axios from "axios";
import { useLocation } from "react-router-dom";
const CenterProfileContainer = () => {
  const [post, setPost] = useState([]);
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/get/post/${id}`
        );
        setPost(res.data);
      } catch (error) {
        console.log("error occured");
      }
    };
    getPost();
  }, [id]);
  return (
    <Wrapper>
      <div>
        <img src={`${Coverimage}`} className="profileCoverimage" alt="" />
        <h2
          style={{
            marginTop: -43,
            color: "white",
            textAlign: "start",
            marginLeft: "34px",
          }}
        >
          Your Profile
        </h2>
      </div>
      <ContentPost />
      {post.map((item) => (
        <ProfilePost detail={item} key={item._id} />
      ))}
    </Wrapper>
  );
};

export default CenterProfileContainer;
const Wrapper = styled.div`
  width: 50%;
  .profileCoverimage {
    width: 100%;
    border-radius: 10px;
    height: 20vh;
    object-fit: cover;
    margin-top: 20px;
  }
`;
