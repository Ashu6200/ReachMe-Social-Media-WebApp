import React from "react";
import styled from "styled-components";
import Coverimage from "../Images/logo.jpg";
import logo from "../Images/Lgo.png";

const BlankScreen = () => {
  return (
    <Wrapper>
      <img src={`${Coverimage}`} alt="" className="bg" />
      <div className="conatiner">
        <img src={logo} alt="" />
        <p>Please select any user to Chat </p>
      </div>
    </Wrapper>
  );
};

export default BlankScreen;
const Wrapper = styled.div`
  width: 75vw;
  .bg {
    width: 74.5vw;
    height: 90vh;
    position: absolute;
    object-fit: cover;
  }
  .conatiner {
    display: flex;
    flex-direction: column;
    width: 74.5vw;
    height: 89.5vh;
    position: relative;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    img {
      width: 400px;
    }
    p {
      font-size: 30px;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 600;
      color: white;
    }
  }
`;
