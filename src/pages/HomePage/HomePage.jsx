import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../../components/UserCard';
import '../../components/styles.css';

function HomePage() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [dbUserData, setDbUserData] = useState([]); // State to store dbUserData
  const baseURL = 'https://sleepy-sari-duck.cyclic.app';

  const fetchUsers = async () => {
    try {
      // Fetch users' data from JSONPlaceholder API
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
      setShowUsers(true); // Set showUsers to true to display users
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDbUserData = async () => {
    try {
      // Fetch dbUserData from baseURL
      const response = await axios.get(`${baseURL}/users`);
      setDbUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDbUserData(); // Fetch dbUserData on component mount
  }, [baseURL]); // Include baseURL in dependency array to fetch dbUserData whenever baseURL changes

  return (
    <div>
      <div className='header'>
        <h2>Cointab SE-ASSIGNMENT</h2>
        <button onClick={fetchUsers}>All Users</button>
      </div>
      {showUsers && (
        <div className="user-card-container">
          {users.map(user => (
            <UserCard key={user.id} user={user} dbUserData={dbUserData} setDbUserData={setDbUserData} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
