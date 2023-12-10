import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import Navbar from './Navbar';
import Profile from './Profile';
import Dashboard from "./Dashboard";

export default function ProfileDetails(){
    return (
        <div className="full-width-container">
            <Navbar />
            <Profile />
        </div>
    );
}