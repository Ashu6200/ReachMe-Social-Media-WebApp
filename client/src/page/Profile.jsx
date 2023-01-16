import React from "react";
import CenterProfileContainer from "../components/CenterProfileContainer";
import LeftProfileConainer from "../components/LeftProfileConainer";
import Navbar from "../components/Navbar";
import RightProfileContainer from "../components/RightProfileContainer";

const Profile = () => {
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
        <LeftProfileConainer />
        <CenterProfileContainer />
        <RightProfileContainer />
      </div>
    </>
  );
};

export default Profile;
