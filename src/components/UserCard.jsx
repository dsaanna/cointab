import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './styles.css'
function UserCard({ user, dbUserData, setDbUserData }) {
    const navigate = useNavigate();
    
    const baseURL = 'https://sleepy-sari-duck.cyclic.app';
    
    // Check if the user exists in dbUserData
    const isUserPresent = dbUserData.some(dbUser => dbUser.id === user.id);

    // Define the button text based on whether the user is present in dbUserData
    const buttonText = isUserPresent ? "Open" : "Add";

    // Handle button click based on whether the user is present in dbUserData
    const handleClick = async () => {

        if (isUserPresent) {
            // Handle action for existing user
            navigate(`/post/${user.id}`); 
        } else {
            // Handle action for new user
            console.log("Add user:", user.name);
            try {
                // Send POST request to add user to the database
                await axios.post(`${baseURL}/users`, user);
                
                // Fetch updated dbUserData from the backend
                const response = await axios.get(`${baseURL}/users`);
                const updatedDbUserData = response.data;
                
                // Update dbUserData state with the new data
                setDbUserData(updatedDbUserData);
                
                // Log success message
                console.log("User added successfully:", user.name);
            } catch (error) {
                // Log error message if any
                console.error("Error adding user:", error);
            }
        }
    };

    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            <p>City: {user.address.city}</p>
            <p>Company: {user.company.name}</p>
            <button className={buttonText === 'Open' ? 'open-button' : ''} key={user.id} onClick={handleClick}>{buttonText}</button>
        </div>
    );
}

export default UserCard;
