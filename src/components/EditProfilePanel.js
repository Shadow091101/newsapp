import React, { useContext, useEffect, useState } from "react";
import "../editprofilepanel.css"
import profileContext from "../context/Profile/profileContext";
import { useRef } from "react";
import ImageCropModal from "./ImageCropModal";
import { ChromePicker } from "react-color";
function EditProfilePanel() {

  const { user, getUser } = useContext(profileContext)

  const [showAccount_profilepic_modal, setshowAccount_profilepic_modal] = useState(false);
  const [selectedPic, setSelectedPic] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

  const [showAccount_username_modal, setshowAccount_username_modal] = useState(false);
  const [newuname, setuname] = useState(null);

  const [showAccount_email_modal, setshowAccount_email_modal] = useState(false);

  const [showAccount_bio_modal, setshowAccount_bio_modal] = useState(false);
  const [newbio, setbio] = useState(null);

  const [showCamera, setShowCamera] = useState(false);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const fileInputRef = useRef(null);

  const uname_modal = () => { setshowAccount_username_modal(true); }
  const email_modal = () => { setshowAccount_email_modal(true) }
  const bio_modal = () => {
    setbio(user?.bio || "");
    setshowAccount_bio_modal(true)
  }

  const handleBrowseClick = () => {
    fileInputRef.current.click(); // opens file picker
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedPic(file); // store selected image
  };

  // const isoDate = user?.date;
  // const date = new Date(isoDate);
  const bg = user?.backgroundColor?.replace("#", "") || "random";

  const profilePicmodal = () => { setshowAccount_profilepic_modal(true); }

  const handleProfilePicSubmit = async () => {
    if (!selectedPic) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("profilepic", selectedPic);
    await fetch("http://localhost:3500/api/v1/user/profilepic", {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
      body: formData
    });
    setshowAccount_profilepic_modal(false);
    getUser();
  }

  const openCamera = async () => {
    setShowCamera(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) return;

      const imageUrl = URL.createObjectURL(blob);

      // 🔥 Send image to crop modal
      setSelectedImage(imageUrl);
      setShowCrop(true);

      stopCamera();
      setShowCamera(false);
    }, "image/jpeg");
  };


  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleChangeUsername = async () => {
    alert(newuname)
    if (!newuname) {
      alert("Please select a new username!");
      return;
    }
    if (newuname === user.username) {
      alert("Username is same as current");
      return;
    }

    const res = await fetch("http://localhost:3500/api/v1/user/newuname", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ username: newuname }),
    })

    const data = await res.json();

    if (!res.ok || !data.success) {
      alert("Username update failed");
      return;
    }

    setshowAccount_username_modal(false);
    getUser();
  }

  const handleChangeBio = async () => {
    if (newbio === null) {
      alert("Please write a bio");
      return;
    }

    if (newbio.trim() === "") {
      alert("Bio cannot be empty");
      return;
    }

    if (newbio === user.bio) {
      alert("Bio is same as current");
      return;
    }

    const res = await fetch("http://localhost:3500/api/v1/user/newbio", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ bio: newbio }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      alert("Bio update failed");
      return;
    }

    setshowAccount_bio_modal(false);
    getUser();
  }

  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <div className="editprofilemainContainer">
      <div className="editprofileSubContainer">
        <h1>Edit Profile</h1>
        <div className="userinfos">
          <div className="userBasicInfo">
            <div className="profilepic">
              <img src={
                user?.profileImage
                  ? `http://localhost:3500${user.profileImage}` :
                  `https://ui-avatars.com/api/?name=${user?.username}&size=40&bold=true&rounded=true&background=${bg}`
              } alt="" onClick={profilePicmodal} />
            </div>
            <h2>{user?.username}</h2>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="editrows">
          <div className="change_uname" onClick={uname_modal}>
            <div className="change_uname_left_side">
              <i className="bi bi-person-square"></i>
            </div>
            <div className="change_uname_right_side">
              <span className="username1">Username</span>
              <span className="username2">{user?.username}</span>
            </div>
          </div>

          <div className="email" onClick={email_modal}>
            <div className="email_left_side">
              <i className="bi bi-envelope"></i>
            </div>
            <div className="email_right_side">
              <span className="email1">Email</span>
              <span className="email2">{user?.email}</span>
            </div>
          </div>
          <div className="bio" onClick={bio_modal}>
            <div className="bio_left"><i className="bi bi-file-person"></i></div>
            <div className="bio_right">
              <span className="bio1">Change Bio</span>
            </div>
          </div>
        </div>
      </div>

      {showAccount_profilepic_modal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Change profile picture</h1>
                {/* Close button */}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setshowAccount_profilepic_modal(false)}
                ></button>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
              <input
                type="file"
                accept="image/*"
                hidden
                id="fileInput"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setSelectedImage(URL.createObjectURL(file));
                  setShowCrop(true);
                }}
              />

              <div className="modal-body">
                <div className="modalpicbody">
                  <div className="edit_profilepicbox">
                    <img src={
                      user?.profileImage
                        ? `http://localhost:3500${user.profileImage}` :
                        `https://ui-avatars.com/api/?name=${user?.username}&size=40&bold=true&rounded=true&background=${bg}`
                    } alt="" />
                  </div>
                  <div className="pic_sources">
                    <div className="browsepic " onClick={() => document.getElementById("fileInput").click()}>
                      <div className="browsepic_icon">
                        <i className="bi bi-image-fill"></i>
                      </div>
                      <p>Upload from device</p>
                    </div>
                    <div className="takepic" onClick={openCamera}>
                      <div className="takepic_icon">
                        <i className="bi bi-camera-fill"></i>
                      </div>
                      <p>Take a picture</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setshowAccount_profilepic_modal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCrop && (
        <ImageCropModal
          imageSrc={selectedImage}
          onClose={() => {
            setShowCrop(false)
            setSelectedImage(null);
          }}
          onCropDone={async (croppedBlob) => {
            const formData = new FormData();
            formData.append("profilepic", croppedBlob, "profile.jpg");

            await fetch("http://localhost:3500/api/v1/user/profilepic", {
              method: "POST",
              headers: {
                "auth-token": localStorage.getItem("token"),
              },
              body: formData,
            });

            setShowCrop(false);
            getUser();
          }}
        />
      )}

      {showCamera && (
        <div className="modal show fade d-block" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5>Take Picture</h5>
                <button className="btn-close" onClick={() => setShowCamera(false)} />
              </div>

              <div className="modal-body text-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{ width: "100%", borderRadius: "10px" }}
                />

                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary" onClick={capturePhoto}>
                  Capture
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {showAccount_username_modal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Change username</h1>
                {/* Close button */}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setshowAccount_username_modal(false)}
                ></button>
              </div>
              <div className="modal-body" style={{ textAlign: 'left' }}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">@</span>
                  <input type="text" defaultValue={user?.username} className="form-control" placeholder="New Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setuname(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setshowAccount_username_modal(false)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleChangeUsername} >Change</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAccount_email_modal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Email</h1>
                {/* Close button */}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setshowAccount_email_modal(false)}
                ></button>
              </div>
              <div className="modal-body" style={{ textAlign: 'left' }}>
                <div className="email">
                  <div className="email_left_side">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div className="email_right_side">
                    <span className="email1">Email</span>
                    <span className="email2">{user?.email}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setshowAccount_email_modal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAccount_bio_modal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Change Bio</h1>
                {/* Close button */}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setshowAccount_bio_modal(false)}
                ></button>
              </div>
              <div className="modal-body" style={{ textAlign: 'left' }}>
                <div className="mb-3">
                  <label for="exampleFormControlTextarea1" className="form-label">Bio</label>
                  <textarea className="form-control" value={newbio ?? user?.bio ?? ""} id="exampleFormControlTextarea1" rows="3" onChange={(e) => setbio(e.target.value)}></textarea>
                </div>
                {/* <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">@</span>
                  <input type="text" className="form-control" placeholder="New Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setuname(e.target.value)} />
                </div> */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setshowAccount_bio_modal(false)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleChangeBio} >Change</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfilePanel;
