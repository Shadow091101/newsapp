import React, { useState } from 'react';
import "../profile.css";
import { useNavigate } from 'react-router-dom';
import UserInfoPanel from './UserInfoPanel';
import EditProfilePanel from "./EditProfilePanel";
import StatsPanel from "./StatsPanel";
import SecurityPanel from "./SecurityPanel";


function Profile(props) {
    console.log("Profile rendered");

    const [activeTab, setActiveTab] = useState("userinfo");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="mainContainer d-flex gap-3" style={{ marginTop: "67px" }}>
            {!menuOpen && (
                <button className="menu-toggle" onClick={() => setMenuOpen(true)}>
                    ☰
                </button>
            )}
            <div className={`sidepanel ${menuOpen ? "open" : ""}`}>
                <ul>
                    <li>
                        <button className={activeTab === "userinfo" ? "active-btn" : ""} onClick={() => { setActiveTab("userinfo"); setMenuOpen(false) }}>
                            <i className="bi bi-info-circle" ></i>
                            <span>User Info</span>
                        </button>
                    </li>
                    <li><button className={activeTab === "edit" ? "active-btn" : ""} onClick={() => { setActiveTab("edit"); setMenuOpen(false) }}><i class="bi bi-person-circle"></i> <span>Edit Profile</span></button></li>
                    <li><button className={activeTab === "stats" ? "active-btn" : ""} onClick={() => { setActiveTab("stats"); setMenuOpen(false) }}><i class="bi bi-graph-up"></i><span>Statistics</span></button></li>
                    <li><button onClick={() => { navigate('/bookmarks'); setMenuOpen(false) }}><i className="bi bi-bookmark"></i><span>View Bookmarks</span> </button></li>
                    <li><button onClick={() => { navigate('/history'); setMenuOpen(false) }}><i className="bi bi-clock-history"></i><span>View History</span></button></li>
                    <li><button onClick={() => { setActiveTab("security"); setMenuOpen(false) }} className={activeTab === "security" ? "active-btn" : ""}> <i class="bi bi-shield-check"></i> <span>Security</span></button></li>
                    <li><button
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                            setMenuOpen(false);
                        }}
                    ><i className="bi bi-box-arrow-right" onClick={() => setMenuOpen(false)}></i><span>Logout</span></button>
                    </li>
                </ul>
            </div>

            {/* Main Panel */}
            <div className="panel ">
                {activeTab === "userinfo" && <UserInfoPanel backendurl={props.backendurl} />}
                {activeTab === "edit" && <EditProfilePanel />}
                {activeTab === "stats" && <StatsPanel />}
                {activeTab === "bookmarks" && <h3>Bookmarks</h3>}
                {activeTab === "history" && <h3>History</h3>}
                {activeTab === "security" && <SecurityPanel backendurl={props.backendurl} />}
            </div>

        </div>
    );
}

export default Profile;
