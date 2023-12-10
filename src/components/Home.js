import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import './Home.css';
export default function Home(){

    return (
       <div className="full-width-container">
            <Navbar />
            <Dashboard />
        </div>
    );
}