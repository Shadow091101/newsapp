import React, { useContext,useState,useEffect } from "react";
import "../editprofilepanel.css"
import profileContext from "../context/Profile/profileContext";

function SecurityPanel(props) {

  const { user, getUser } = useContext(profileContext);

  const [showAccount_change_pass_modal, setshowAccount_change_pass_modal] = useState(false);
  const [oldpass, setoldpass] = useState(null)
  const [newpass, setnewpass] = useState(null)

  const pass_modal = () => { setshowAccount_change_pass_modal(true); }

  useEffect(() => {
    console.log("Calling getuser")
    getUser();
  }, [getUser]);

  const handleChangePass = async () => {
    alert(oldpass)
    alert(newpass)
    if (!oldpass || !newpass) {
      alert("Old and new password both are required!!!");
      return;
    }

    await fetch(`${props.backendurl}/api/v1/user/newPass`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ oldpass: oldpass, newpass: newpass }),
    })
    setshowAccount_change_pass_modal(false)
    getUser();
  }

  return (
    <div className="editprofilemainContainer">
      <div className="editprofileSubContainer">
        <h1>Security Settings</h1>
        <div className="editrows">

          <div className="change_uname forgotpasswordclass" style={{ backgroundColor: "#F0F4F9", border: "0px" }} >
            <span onClick={pass_modal} style={{ color: "blue" }}>Change Password</span>
          </div>

          <div className="email Logoutclass" style={{ backgroundColor: "#F0F4F9", border: "0px" }} >
            <span style={{ color: "blue" }} onClick={() => { localStorage.removeItem('token'); window.location.href = '/login' }}>Logout</span>
          </div>
        </div>

        {showAccount_change_pass_modal && (
          <div
            className="modal show fade d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Change password</h1>
                  {/* Close button */}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setshowAccount_change_pass_modal(false)}
                  ></button>
                </div>
                <div className="modal-body" style={{ textAlign: 'left' }}>
                  <div className=" container input-group mb-3">
                    <div className="container">
                      <label for="oldpass" className="form-label">Old Password</label>
                      <input type="password" id='oldpass' className="form-control" style={{ backgroundColor: "white", color: "black" }} placeholder="" aria-label="password" aria-describedby="basic-addon1" onChange={(e) => setoldpass(e.target.value)} />
                    </div>
                    <div className="container">
                      <label for="newpass" className="form-label">New Password</label>
                      <input type="password" style={{ backgroundColor: "white", color: "black" }} id='newpass' className="form-control" placeholder="" aria-label="password" aria-describedby="basic-addon1" onChange={(e) => setnewpass(e.target.value)} />
                    </div>

                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setshowAccount_change_pass_modal(false)}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleChangePass} >Change</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}

export default SecurityPanel;
