import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import Navbar from './Navbar';
import NewVehicle from './NewVehicle';

export default function NewVehicleDetails(){
    return (
        <div className="full-width-container">
            <Navbar />
            <NewVehicle />
        </div>
    );
}