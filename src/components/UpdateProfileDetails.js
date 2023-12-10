import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import Navbar from './Navbar';
import UpdateProfile from './UpdateProfile';

export default function UpdateProfileDetails(){
    return (
        <div className="full-width-container">
            <Navbar />
            <UpdateProfile />
        </div>
    );
}