import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import app from "../firebase";
import imageIcon from "../Images/gallery.png";
import VideoIcon from "../Images/video.png";

const ContentPost = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [imagePre, setImagePre] = useState(null);
  const [VideoPre, setVideoPre] = useState(null);
  const accessToken = user.accessToken;
  const postHandler = (e) => {
    e.preventDefault();
    if (file !== null) {
      const fileName = new Date().getTime() + file?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, `image/${fileName}`);
      const uploadTask = uploadBytesResumable(StorageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // switch (snapshot.state) {
          //   case "paused":
          //     console.log("Upload is paused");
          //     break;
          //   case "running":
          //     console.log("Upload is running");
          //     break;
          // }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            fetch(`http://localhost:5000/api/post/user/post`, {
              method: "POST",
              headers: {
                "Content-Type": "application/JSON",
                token: accessToken,
              },
              body: JSON.stringify({
                title: title,
                image: downloadURL,
                video: "",
              }),
            }).then((data) => {
              toast.success("Your Post was upload successfully");
              window.location.reload(true);
            });
          });
        }
      );
    } else if (file2 !== null) {
      const fileName = new Date().getTime() + file2?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(StorageRef, file2);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // switch (snapshot.state) {
          //   case "paused":
          //     console.log("Upload is paused");
          //     break;
          //   case "running":
          //     console.log("Upload is running");
          //     break;
          // }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            fetch(`http://localhost:5000/api/post/user/post`, {
              method: "POST",
              headers: {
                "Content-Type": "application/JSON",
                token: accessToken,
              },
              body: JSON.stringify({
                title: title,
                video: downloadURL,
                image: "",
              }),
            }).then((data) => {
              toast.success("Your Post was upload successfully");
              window.location.reload(true);
            });
          });
        }
      );
    } else {
      fetch(`http://localhost:5000/api/post/user/post`, {
        method: "POST",
        headers: { "Content-Type": "application/JSON", token: accessToken },
        body: JSON.stringify({ title: title, video: "", image: "" }),
      }).then((data) => {
        toast.success("Your Post was upload successfully");
        window.location.reload(true);
      });
    }
  };

  const contentHandler = () => {
    if (imagePre !== null) {
      setImagePre(null);
    }
    if (VideoPre !== null) {
      setVideoPre(null);
    }
  };
  return (
    <Wrapper>
      <div className="ContentUploadContainer">
        <div className="upper">
          <img
            src={`${user?.other?.profile}`}
            className="profileimage"
            alt=""
          />
          <textarea
            type="text"
            className="contentWritingpart"
            placeholder="Write your real thought....."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="bottom">
          <div className="upper">
            {imagePre !== null ? (
              <>
                <img
                  src={imagePre}
                  style={{
                    width: "90%",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                  alt=""
                />
                <button onClick={contentHandler}>Remove</button>
              </>
            ) : VideoPre !== null ? (
              <>
                <video className="PostImages" width="95%" height="250" controls>
                  <source src={VideoPre} type="video/mp4" />
                </video>
                <button onClick={contentHandler}>Remove</button>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="input">
            <div className="inside">
              <label htmlFor="file">
                <img src={imageIcon} className="icons" alt="" />
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => [
                    setFile(e.target.files[0]),
                    setImagePre(URL.createObjectURL(e.target.files[0])),
                  ]}
                />
                <p>Image</p>
              </label>
              <label htmlFor="file2">
                <img src={VideoIcon} className="icons" alt="" />
                <input
                  type="file"
                  name="file2"
                  id="file2"
                  onChange={(e) => [
                    setFile2(e.target.files[0]),
                    setVideoPre(URL.createObjectURL(e.target.files[0])),
                  ]}
                />
                <p>Video</p>
              </label>
            </div>
            <button onClick={postHandler}>Post</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ContentPost;

const Wrapper = styled.div`
  width: 100%;
  .ContentUploadContainer {
    background-color: white;
    width: 100%;
    margin: auto;
    margin-top: 20px;
    border-radius: 10px;
    .upper {
      display: flex;
      align-items: center;
      padding: 20px 20px 0 20px;
      gap: 10px;
      .profileimage {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
      textarea {
        width: 100%;
        height: 40px;
        resize: none;
        outline: none;
        font-size: 14px;
        border-radius: 20px;
        font-family: Arial, Helvetica, sans-serif;
        padding: 5px 10px 0 10px;
      }
    }
    .bottom {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 10px;
      align-items: center;
      padding-bottom: 20px;
      padding-right: 20px;
      justify-content: space-between;
      .upper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
        padding: 10px 0;
        border-radius: 10px;
        button {
          height: 30px;
          padding-left: 20px;
          padding-right: 20px;
          padding-top: 6;
          padding-bottom: 6;
          border: none;
          border-radius: 5px;
          color: white;
          cursor: pointer;
          font-weight: 600;
          background-color: red;
        }
      }
      .input {
        width: 89%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .inside {
          display: flex;
          flex-direction: row;
          gap: 20px;
          label {
            display: flex;
            flex-direction: row;
            align-items: center;
            .icons {
              width: 24px;
              height: 24px;
            }
            input {
              display: none;
            }
            p {
              padding-left: 10px;
            }
          }
        }
      }
      button {
        height: 30px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 6;
        padding-bottom: 6;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        font-weight: 600;
        background-color: #7a26c1;
      }
    }
  }
`;
