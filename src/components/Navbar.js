import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import profileContext from '../context/Profile/profileContext'
import "../navbar.css"
import Logo from "./Logo.js"


// import PropTypes from 'prop-types'

function Navbar(props) {
    const { user, getUser } = useContext(profileContext)

    const [searchText, setSearchText] = useState('')

    const [drop_down_state, set_drop_down_state] = useState(false)
    useEffect(() => {
        // alert("Calling GetUser");
        getUser();
    }, [getUser]);

    //     if(!user){
    // alert("No user")
    //     }else{
    //     console.log(user);
    //     }

    const dropdown = () => {
        if (drop_down_state) {
            // alert("Dropdown is closing")
            set_drop_down_state(false)
        } else {
            // alert("Dropdown is opening")
            set_drop_down_state(true)
        }
        // alert("Hello")
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
                                        // props.updateDropDownTitle("Business");
                                        props.updateSearchText("");
                                    }}>Business</Link></li>
                                    <li><Link className="dropdown-item" to="/entertainment" onClick={() => {
                                        // props.updateDropDownTitle("Business");
                                        props.updateSearchText("");
                                    }}>Entertainment</Link></li>
                                    <li><Link className="dropdown-item" to="/general" onClick={() => {
                                        // props.updateDropDownTitle("Business");
                                        props.updateSearchText("");
                                    }}>General</Link></li>
                                    <li><Link className="dropdown-item" to="/health" onClick={() => {
                                        // props.updateDropDownTitle("Business");
                                        props.updateSearchText("");
                                    }}>Health</Link></li>
                                    <li><Link className="dropdown-item" to="/science" onClick={() => {
                                        // props.updateDropDownTitle("Business");
                                        props.updateSearchText("");
                                    }}>Science</Link></li>
                                    <li><Link className="dropdown-item" to="/sports" onClick={() => {
                                        // props.updateDropDownTitle("Business");
                                        props.updateSearchText("");
                                    }}>Sports</Link></li>

                                    <li><Link className="dropdown-item" to="/technology" onClick={() => {
                                        // props.updateDropDownTitle("Business");
                                        props.updateSearchText("");
                                    }}>Technology</Link></li>
                                </ul>
                            </li>

                            {/* <li><button className='btn btn-danger' onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button></li> */}
                        </ul>
                        {/* <div className="container d-flex flex-end">
                                    <p>{user?.username || "Loading..."}</p>
                            </div> */}
                        <div className="d-flex align-items-lg-center align-items-start flex-lg-row flex-column gap-3 ms-lg-auto">
                            {/* Username + Avatar */}
                            <div className="d-flex align-items-center gap-3">
                                <span className="fw-bold usernameblock">
                                    {user?.username ? `Hi, ${user.username}` : "Loading..."}
                                </span>

                                <div className="dropdown">
                                    <img
                                        onClick={dropdown}
                                        src={`https://ui-avatars.com/api/?name=${user?.username}&size=40&bold=true&rounded=true&background=random`}
                                        alt="User Avatar"
                                        className="dropdown-toggle"
                                        style={{ cursor: "pointer" }}
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
