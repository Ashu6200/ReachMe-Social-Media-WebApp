import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ChatLeftContainer from "./ChatLeftContainer";
import BlankScreen from "../Fragments/BlankScreen";

const ChatRightContainer = () => {
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  let id = user.other._id;
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/following/${id}`,
          {}
        );
        setUsers(res.data);
      } catch (error) {}
    };
    getUser();
  }, [id]);
  const handleUser = (e) => {
    setCurrentUser(e);
  };
  return (
    <Wrapper>
      <div className="container">
        <div className="lower">
          {users.map((item) => (
            <>
              {item?._id !== id ? (
                <div className="user" onClick={(e) => handleUser(item)}>
                  <img src={item?.profile} alt="" />
                  <div className="info">
                    <h5>{item?.username}</h5>
                    <p>Open Your Meassage</p>
                  </div>
                </div>
              ) : null}
            </>
          ))}
        </div>
      </div>
      {currentUser !== "" ? (
        <ChatLeftContainer currentUser={currentUser} />
      ) : (
        <BlankScreen />
      )}
    </Wrapper>
  );
};

export default ChatRightContainer;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  gap: 10px;
  .container {
    width: 25vw;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    gap: 10px;

    .upper {
      position: sticky;
      top: 10px;
      z-index: 10;
      margin: 10px 0 0 10px;

      input {
        width: 23vw;
        height: 5vh;
        border-radius: 15px;
        border: none;
      }
    }
    .lower {
      margin: 10px 0 0 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      .user {
        display: flex;
        margin-left: 12px;
        border-radius: 15px;
        padding: 5px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 16px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(0.8px);
        cursor: pointer;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
        .info {
          margin-left: 10px;
          h5 {
            text-align: start;
            margin-top: 0;
            font-size: 13px;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: 600;
          }
          p {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: 500;
            text-align: start;
            margin-top: -10px;
            font-size: 12px;
          }
        }
      }
    }
  }
`;
