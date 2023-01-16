import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Coverimage from "../Images/logo.jpg";
import { io } from "socket.io-client";

const ChatLeftContainer = ({ currentUser }) => {
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  let id = user.other._id;
  const ref = useRef();
  const socket = useRef();
  const accessToken = user.accessToken;
  const [message, setMessage] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/chat/get/chat/msg/${id}/${currentUser._id}`,
          {}
        );
        setMessage(res.data);
      } catch (error) {}
    };
    getMessage();
  }, [currentUser._id, id]);

  const messageHandler = () => {
    setSendMessage("");
    const messages = {
      myself: true,
      message: sendMessage,
    };
    socket.current.emit("send-msg", {
      to: currentUser._id,
      from: id,
      message: sendMessage,
    });
    fetch(`http://localhost:5000/api/chat/msg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: accessToken,
      },
      body: JSON.stringify({
        from: id,
        to: currentUser._id,
        message: sendMessage,
      }),
    });
    setMessage(message.concat(messages));
  };
  useEffect(() => {
    ref.user?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  useEffect(() => {
    if (currentUser !== null) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("addUser", id);
    }
  }, [currentUser, id]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-received", (msg) => {
        setArrivalMessage({ myself: false, message: msg });
      });
    }
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage && setArrivalMessage((pre) => [...pre, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <Wrapper>
      <img src={`${Coverimage}`} alt="" className="bg" />
      <div className="conatiner">
        <div className="upper">
          <img src={currentUser?.profile} alt="" className="userimg" />
          <span>{currentUser?.username}</span>
        </div>
        <div className="middle">
          {message.map((item) => (
            <>
              {item.myself === false ? (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="message">
                    <img src={currentUser?.profile} alt="" className="imgMsg" />
                    <p>{item?.message}</p>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <div className="message">
                    <p>{item?.message}</p>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
        <div className="bottom">
          <textarea
            placeholder="Write a your message..."
            onChange={(e) => setSendMessage(e.target.value)}
          />
          <button onClick={messageHandler}>Send</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ChatLeftContainer;

const Wrapper = styled.div`
  width: 75vw;
  .bg {
    width: 75vw;
    height: 90vh;
    position: absolute;
    object-fit: cover;
  }
  .conatiner {
    width: 75vw;
    height: 90vh;
    position: relative;
    align-items: center;
    justify-content: center;
    .upper {
      padding: 20px;
      display: flex;
      gap: 10px;
      .userimg {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
      span {
        font-size: 20px;
        font-weight: 600;
        color: white;
      }
    }
    .middle {
      overflow: hidden;
      overflow-y: scroll;
      height: calc(100% - 150px);
      .message {
        display: flex;
        align-items: center;
        justify-content: start;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(8.9px);
        -webkit-backdrop-filter: blur(8.9px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        width: auto;
        max-width: 70%;
        gap: 10px;
        margin-left: 10px;
        margin-top: 5px;
        padding: 5px;
        .imgMsg {
          margin-left: 10px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
        p {
          text-align: start;
          font-size: 15px;
          color: white;
          font-weight: 600;
        }
      }
    }
    .bottom {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 10px 10px 0 10px;
      textarea {
        width: 90%;
        resize: none;
        outline: none;
        height: 35px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        padding-left: 10px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 500;
      }
      button {
        background-color: #7A26C1;
        color: white;
        font-weight: 600;
        width: 70px;
        height: 44px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        cursor: pointer;
      }
    }
  }
`;
