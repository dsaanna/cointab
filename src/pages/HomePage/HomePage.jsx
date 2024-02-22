import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../../components/UserCard';
import '../../components/styles.css'

function HomePage() {
  const [users, setUsers] = useState([]);
  const [dbUserData, setDbUserData] = useState([]); // State to store dbUserData
  const baseURL = 'https://sleepy-sari-duck.cyclic.app';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch users' data from JSONPlaceholder API
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDbUserData = async () => {
      try {
        // Fetch dbUserData from baseURL
        const response = await axios.get(`${baseURL}/users`);
        // console.log(response.data)
        setDbUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers(); // Fetch users' data
    fetchDbUserData(); // Fetch dbUserData
  }, [baseURL]); // Include baseURL in dependency array to fetch dbUserData whenever baseURL changes

  return (
    <div>
      <h2 >Cointab SE-ASSIGNMENT</h2>
      <div className="user-card-container">
      {users.map(user => (
        <UserCard key={user.id} user={user} dbUserData={dbUserData} setDbUserData={setDbUserData}/>
      ))}
      </div>
    </div>
  );
};

export default HomePage;
