import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const LeftHomeConatiner = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`http://localhost:5000/api/post/all`);
      setPost(res.data);
    };
    getPost();
  }, []);
  return (
    <Wrapper>
      <div className="explorearea">
        <div className="header">
          <p>Explore</p>
          <p style={{ color: "#aaa", marginLeft: "40px" }}>See all</p>
        </div>
        <div className="exploreimagearea">
          {post.map((item) => [
            item.image === "" ? (
              ""
            ) : (
              <img
                src={`${item.image}`}
                className="exploreimage"
                alt=""
                key={item._id}
              />
            ),
          ])}
        </div>
      </div>
    </Wrapper>
  );
};

export default LeftHomeConatiner;

const Wrapper = styled.div`
  width: 25%;
  .explorearea {
    display: flex;
    flex-direction: column;
    height: 60vh;
    margin-top: 20px;
    border-radius: 20px;
    overflow: hidden;
    overflow-y: scroll;
    background-color: white;
    ::-webkit-scrollbar {
      width: 1px;
    }
    .header {
      width: 100%;
      display: flex;
      justify-content: space-around;
      font-size: 15px;
      font-weight: 600;
      position: sticky;
      top: 0;
      z-index: 10;
      background-color: white;
    }
    .exploreimagearea {
      background-color: white;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 100%;
      padding: 0 10px;
      .exploreimage {
        width: 100px;
        margin-left: 6px;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
        margin-top: 6px;
      }
    }
  }
`;
