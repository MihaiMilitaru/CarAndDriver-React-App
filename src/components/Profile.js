import {Alert, Button, Card} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import React, {useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import "./ProfileCard.css"

export default function Profile() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    console.log(currentUser);

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
        <div className="center-container">
            <div className="custom-card">
                {error && <Alert variant="danger">{error}</Alert>}
                <h2 className="text_profile">Profile</h2>
                <strong>Email:</strong> {currentUser.email}
                <br></br>
                <strong>Username:</strong> {currentUser.displayName}
                <br></br>

                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </div>
    )
}
