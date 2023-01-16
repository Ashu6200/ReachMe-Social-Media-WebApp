import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ContentPost from "../Fragments/ContentPost";
import Post from "./Post";

const CenterHomeConatiner = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user?.other?._id;
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/flw/${id}`,
          {}
        );
        setPost(res.data);
      } catch (error) {}
    };
    getPost();
  });
  return (
    <Wrapper>
      <ContentPost />
      {post.map((item) => (
        <Post post={item} key={post._id} />
      ))}
    </Wrapper>
  );
};

export default CenterHomeConatiner;
const Wrapper = styled.div`
  width: 50%;
`;
