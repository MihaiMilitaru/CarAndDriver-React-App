import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import Navbar from './Navbar';
import EditVehicle from "./EditVehicle";

export default function EditVehicleDetails(){
    return (
        <div className="full-width-container">
            <Navbar />
            <EditVehicle />
        </div>
    );
}