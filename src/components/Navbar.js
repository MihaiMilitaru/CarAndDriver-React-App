import React, { Component } from 'react';
import {useHistory} from 'react-router-dom';
import { useState } from 'react';
import {useAuth} from "../contexts/AuthContext";
import './Navbar.css';

export default function Navbar(){
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }
    return (
        <div className="navbar">
            <div className="navbar-left">
                <p>CarAndDriver</p>
            </div>
            <div className="navbar-right">
                <a className={window.location.pathname === "/" ? "nav-link active" : "nav-link"} href="/">Home</a>
                <a className={window.location.pathname === "/new-vehicle" ? "nav-link active" : "nav-link"} href="/new-vehicle">Add Vehicle</a>
                <a className={window.location.pathname === "/profile" ? "nav-link active" : "nav-link"} href="/profile">Profile</a>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}