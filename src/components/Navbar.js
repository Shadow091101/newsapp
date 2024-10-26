import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

const Navbar=(props)=>{

    const[searchText,setSearchText]=useState('')

    
    const handleChange=(e)=>{
        setSearchText(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log('Search Text : ',searchText);
        props.updateSearchText(searchText)
        setSearchText('');
    }

        return (
            <div>
                <nav className="navbar  navbar-expand-lg bg-body-tertiary fixed-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/" onClick={() => props.updateDropDownTitle("Category")}>NewsNerd</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/" onClick={() => props.updateDropDownTitle("Category")}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">About</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {props.drop_down_title}
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/business">Business</Link></li>
                                        <li><Link className="dropdown-item" to="/entertainment">Entertainment</Link></li>
                                        <li><Link className="dropdown-item" to="/general">General</Link></li>
                                        <li><Link className="dropdown-item" to="/health">Health</Link></li>
                                        <li><Link className="dropdown-item" to="/science">Science</Link></li>
                                        <li><Link className="dropdown-item" to="/sports">Sports</Link></li>

                                        <li><Link className="dropdown-item" to="/technology">Technology</Link></li>
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                                <input 
                                    className="form-control me-2" 
                                    type="search" 
                                    placeholder="Search" 
                                    aria-label="Search" 
                                    value={searchText}
                                    onChange={handleChange} 
                                />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        )

}

export default Navbar;
