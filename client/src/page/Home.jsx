import React from "react";
import CenterHomeConatiner from "../components/CenterHomeConatiner";
import LeftHomeConatiner from "../components/LeftHomeConatiner";
import Navbar from "../components/Navbar";
import RightHomeConatiner from "../components/RightHomeConatiner";

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: "#EEEEEE",
          padding: "0 50px 0 50px",
          display: "flex",
          gap: "10px",
        }}
      >
        <LeftHomeConatiner />
        <CenterHomeConatiner />
        <RightHomeConatiner />
      </div>
    </>
  );
};

export default Home;
