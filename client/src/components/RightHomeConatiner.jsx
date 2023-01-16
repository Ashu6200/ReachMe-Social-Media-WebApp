import React, { useEffect, useState } from "react";
import styled from "styled-components";
import a1 from "../Images/ADS1.jpg";
import a2 from "../Images/ADS2.jpg";
import Follow from "../Fragments/Follow";
import { useSelector } from "react-redux";
import axios from "axios";

const RightHomeConatiner = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  const id = user?.other?._id;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/all/user/${id}`
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
        <h3>Advertisement</h3>
        <div className="adsContainer">
          <img src={`${a2}`} className="adsimg" alt="" />
          <div>
            <p
              style={{ textAlign: "start", marginLeft: "10px", marginTop: -20 }}
            >
              One Piece
            </p>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-16px",
              }}
            >
              New One piece movie is coming One Piece Film: Red
            </p>
          </div>
        </div>
        <div className="adsContainer">
          <img src={`${a1}`} className="adsimg" alt="" />
          <div>
            <p
              style={{ textAlign: "start", marginLeft: "10px", marginTop: -20 }}
            >
              Ferrari
            </p>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-16px",
              }}
            >
              New Car of Ferrari , Ferrari F8 2020
            </p>
          </div>
        </div>
      </div>
      <div className="bottom">
        <h3>Suggested User of ReachMe</h3>
        {users.map((item) => (
          <Follow userdetails={item} key={item._id} />
        ))}
      </div>
    </Wrapper>
  );
};

export default RightHomeConatiner;
const Wrapper = styled.div`
  width: 25%;
  h3{
    padding-top: 20px;
    margin-left: 20px;
  }
  .upper {
    width: 100%;
    height: 40vh;
    background-color: white;
    margin-top: 20px;
    border-radius: 15px;
    .adsContainer {
      display: flex;
      align-items: center;
      margin-left: 10px;
      padding: 10px;
      .adsimg {
        width: 130px;
        height: 80px;
        object-fit: cover;
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
