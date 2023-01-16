import React, { useEffect, useState } from "react";
import logo from "../Images/Lgo.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { signup } from "../store/ApiCalls";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdetails = useSelector((state) => state.user);
  const user = userdetails.user;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const registerHandler = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage, `userPicture/${fileName}`);
    const uploadTask = uploadBytesResumable(StorageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          signup(dispatch, {
            email,
            password,
            username,
            phonenumber,
            profile: downloadURL,
          });
          toast.success("Registered successfully");
        });
      }
    );
    navigate("/login");
  };
  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <Wrapper>
      <div style={{ position: "absolute", display: "flex" }}>
        <div className="auth-left">
          <img src={logo} alt="#" />
          <div className="auth-title">
            <h1>ReachMe</h1>
            <span>Explore the ideas throughout the world</span>
          </div>
        </div>
        <div className="auth-right">
          <p>
            Social media is not a media. The key is to listen, engage, and build
            relationships.
          </p>
          <div>
            <p>
              Welcome to <span>ReachMe</span> Register
            </p>
            <form className="formArea">
              <label className="arealabel">Username</label>
              <input
                className="area-input"
                required
                label="Name"
                type="text"
                placeholder="Enter your Username"
                style={{
                  border: "none",
                  borderRadius: "20px",
                  outline: "none",
                  paddingLeft: "20px",
                }}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="arealabel">Phone Number</label>
              <input
                className="area-input"
                required
                type="text"
                label="phone number"
                placeholder="Enter your phone number"
                style={{
                  border: "none",
                  borderRadius: "20px",
                  outline: "none",
                  paddingLeft: "20px",
                }}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
              <label className="arealabel">Email</label>
              <input
                className="area-input"
                required
                type="text"
                label="Email"
                placeholder="Enter your Email"
                style={{
                  border: "none",
                  borderRadius: "20px",
                  outline: "none",
                  paddingLeft: "20px",
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="arealabel">Password</label>
              <input
                className="area-input"
                required
                type="password"
                label="Password"
                placeholder="Enter your password"
                style={{
                  border: "none",
                  borderRadius: "20px",
                  outline: "none",
                  paddingLeft: "20px",
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="arealabel">Add Avatar</label>
              <input
                type="file"
                className="area-input"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button onClick={registerHandler}>Register</button>
            </form>
            <Link to="/login" className="link-login">
              "Already have an account? Login"
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  .bgImage {
    position: relative;
    width: 100vw;
    height: 100vh;
  }
  .auth-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 20px;
    img {
      width: 20rem;
    }
    .auth-title {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      span {
        font-weight: 700;
      }
    }
  }
  .auth-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;
    padding-left: 40px;
    p {
      width: 400px;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 20px;
      font-weight: 700;
    }
    div {
      p {
        font-weight: 700;
        span {
          color: purple;
        }
      }
      .formArea {
        display: flex;
        padding-top: 10px;
        flex-direction: column;
        .arealabel {
          display: flex;
          align-items: flex-start;
          padding-left: 10px;
        }
        .area-input {
          height: 30px;
          margin-bottom: 25px;
          outline: none;
          align-items: center;
          justify-items: center;
        }
        button {
          background-color: purple;
          font-weight: 600;
          padding: 10px;
          height: 40px;
          border-radius: 20px;
          color: white;
          outline: none;
          border: none;
          cursor: pointer;
        }
      }
      .link-login {
        text-decoration: none;
        color: black;
        margin-top: 10px;
      }
    }
  }
`;
