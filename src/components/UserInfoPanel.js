import React, { useContext, useEffect, useState } from "react";
import "../userinfopanel.css"
// import ProfilePic from "./newsapp_logo.png"
import profileContext from '../context/Profile/profileContext'


function UserInfoPanel(props) {
  const { user, getUser } = useContext(profileContext)

  const [showAccount_profilepic_modal, setshowAccount_profilepic_modal] = useState(false);
  const [selectedPic, setSelectedPic] = useState(null);

  const profilePicmodal = () => { setshowAccount_profilepic_modal(true); }

  const isoDate = user?.date;
  const date = new Date(isoDate);
  const bg = user?.backgroundColor?.replace("#", "") || "random";

  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <div className="userinfomainContainer">
      <div className="userSubContainer">
        <h1>User Information</h1>
        <div className="userinfos">
          <div className="userBasicInfo">
            <div className="profilepic">
              <img src={
                user?.profileImage
                  ? `${props.backendurl}${user.profileImage}` :
                  `https://ui-avatars.com/api/?name=${user?.username}&size=40&bold=true&rounded=true&background=${user.backgroundColor}`
              } alt="" onClick={profilePicmodal} />
            </div>
            <h2>{user?.username}</h2>
            <p>{user?.email}</p>
          </div>
          <div className="user_bio">
            <h5>User Bio</h5>
            <p style={{ marginBottom: "0px" }}>{user?.bio}</p>
          </div>
          <div className="account_date">
            <h5>Account Created At</h5>
            <p style={{ marginBottom: "0px" }}>{date.toDateString()}</p>
          </div>
        </div>
      </div>

      {showAccount_profilepic_modal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable custom-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Profile picture</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setshowAccount_profilepic_modal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="modalpicbody">
                  <div className="profilepicbox">
                    <img
                      src={
                        user?.profileImage
                          ? `${props.backendurl}${user.profileImage}`
                          : `https://ui-avatars.com/api/?name=${user?.username}&size=300&bold=true&rounded=true&background=${bg}`
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfoPanel;
