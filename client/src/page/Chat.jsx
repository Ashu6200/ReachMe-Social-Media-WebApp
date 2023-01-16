import React from "react";
import styled from "styled-components";
import ChatRightContainer from "../components/ChatRightContainer";
import Navbar from "../components/Navbar";

const Chat = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <ChatRightContainer />
      </Wrapper>
    </>
  );
};

export default Chat;

const Wrapper = styled.div`
`;
