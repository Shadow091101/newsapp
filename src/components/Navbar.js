import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import profileContext from '../context/Profile/profileContext'
import "../navbar.css"
import Logo from "./Logo.js"

function Navbar(props) {
    const { user, getUser } = useContext(profileContext)

    const [searchText, setSearchText] = useState('')

    const [drop_down_state, set_drop_down_state] = useState(false)
    useEffect(() => {
        getUser();
    }, [getUser]);

    const dropdown = () => {
        if (drop_down_state) {
            set_drop_down_state(false)
        } else {
            set_drop_down_state(true)
        }
    }

    const handleChange = (e) => {
        setSearchText(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Search Text : ', searchText);
        props.updateSearchText(searchText)
        setSearchText('');
    }

    return (
        <div>
            <nav className="navbar  navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" onClick={() => props.updateDropDownTitle("Category")}><Logo/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/" onClick={() => props.updateDropDownTitle("Category")}>Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {props.drop_down_title}
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/business" onClick={() => {
                                        props.updateSearchText("");
                                    }}>Business</Link></li>
                                    <li><Link className="dropdown-item" to="/entertainment" onClick={() => {
                                        props.updateSearchText("");
                                    }}>Entertainment</Link></li>
                                    <li><Link className="dropdown-item" to="/general" onClick={() => {
                                        props.updateSearchText("");
                                    }}>General</Link></li>
                                    <li><Link className="dropdown-item" to="/health" onClick={() => {
                                        props.updateSearchText("");
                                    }}>Health</Link></li>
                                    <li><Link className="dropdown-item" to="/science" onClick={() => {
                                        props.updateSearchText("");
                                    }}>Science</Link></li>
                                    <li><Link className="dropdown-item" to="/sports" onClick={() => {
                                        props.updateSearchText("");
                                    }}>Sports</Link></li>
                                    <li><Link className="dropdown-item" to="/technology" onClick={() => {
                                        props.updateSearchText("");
                                    }}>Technology</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <div className="d-flex align-items-lg-center align-items-start flex-lg-row flex-column gap-3 ms-lg-auto">
                            <div className="d-flex align-items-center gap-3 flex-nowrap">
                                <span className="fw-bold usernameblock text-nowrap">
                                    {user?.username ? `Hi, ${user.username}` : "Loading..."}
                                </span>

                                <div className="dropdown  nav-prof-pic">
                                    <img
                                        onClick={dropdown}
                                        src={user?.profileImage
                                            ?`http://localhost:3500${user.profileImage}` 
                                            :`https://ui-avatars.com/api/?name=${user?.username}&size=40&bold=true&rounded=true&background=${user.backgroundColor}`}
                                        alt="User Avatar"
                                        className="dropdown-toggle"
                                        style={{ cursor: "pointer" ,height:"40px",width:"40px",objectFit:'cover'}}
                                    />

                                    <ul className={`dropdown-menu ${drop_down_state ? "show" : ""}`} style={{ right: 0, left: "auto" }}>
                                        <li><Link onClick={() => { set_drop_down_state(false) }} className="dropdown-item" to="/profile"><i className="bi bi-person"></i> My Profile</Link></li>
                                        <li><Link onClick={() => { set_drop_down_state(false) }} className="dropdown-item" to="/bookmarks"><i className="bi bi-bookmark"></i> Bookmarks</Link></li>
                                        <li><Link onClick={() => { set_drop_down_state(false) }} className="dropdown-item" to="/history"><i className="bi bi-clock-history"></i> History</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}><i className="bi bi-box-arrow-right"></i> Logout</button></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Search Bar */}
                            <form className="d-flex w-lg-auto w-100" role="search" onSubmit={handleSubmit}>
                                <input
                                    className="form-control me-2 w-100"
                                    type="search"
                                    placeholder="Search"
                                    value={searchText}
                                    onChange={handleChange}
                                />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )

}

export default Navbar;
