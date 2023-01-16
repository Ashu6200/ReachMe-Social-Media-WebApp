import React from "react";
import styled from "styled-components";
import { AiFillMessage, AiOutlineSearch } from "react-icons/ai";
import { IoNotificationsSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userReducer";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  let id = user?.other?._id;
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("You have logged out");
  };
  return (
    <Wrapper>
      <>
        <div className="left">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <h2>ReachMe</h2>
          </Link>
        </div>
        <div className="middle">
          <div className="search">
            <input
              type="text"
              className="searchInput"
              placeholder="Search your friends"
              name=""
              id=""
            />
            <AiOutlineSearch className="icons" />
          </div>
        </div>
        <div className="right">
          <IoNotificationsSharp className="icons" />
          <Link to="/chat" style={{ textDecoration: "none", color: "white" }}>
            <AiFillMessage className="icons" />
          </Link>
          <Link
            to={`/profile/${id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="pimage">
              <img
                src={`${user?.other?.profile}`}
                className="ProfileImage"
                alt=""
              />
              <span>{user?.other?.username}</span>
            </div>
          </Link>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #7A26C1;
  justify-content: space-between;
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;
  padding: 0 50px 0 50px;
  position: sticky;
  top: 0;
  z-index: 1000;
  .left {
    color: white;
  }
  .middle {
    width: 60%;
    .search {
      width: 100%;
      display: flex;
      align-items: center;
      flex: 4;
      margin-top: 9px;
      padding: 5px;
      border-radius: 10px;
      .icons {
        font-size: 25px;
        background-color: #787a91;
        height: 32px;
        color: white;
        padding: 0 5px 0 5px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
      .searchInput {
        width: 100%;
        height: 32px;
        outline: none;
        border: none;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        padding: 0 20px 0 20px;
        font-family: Arial;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
    .icons {
      font-size: 25px;
      color: white;
    }
    .pimage {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      .ProfileImage {
        width: 30px;
        height: 30px;
        border-radius: 50px;
        object-fit: cover;
      }
    }
    button {
      background-color: red;
      border: none;
      outline: none;
      padding: 5px 10px;
      border-radius: 20px;
      color: white;
      cursor: pointer;
      font-weight: 600;
    }
  }
`;
