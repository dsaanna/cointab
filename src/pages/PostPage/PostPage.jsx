import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../components/styles.css'
import * as XLSX from 'xlsx';


const PostPage = () => {
  const { id } = useParams();
//   console.log(id)
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showDownloadInExcel, setshowDownloadInExcel] = useState(false); 
  const baseURL = 'https://sleepy-sari-duck.cyclic.app';

  useEffect(() => {
    // Fetch user data
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });

    // Fetch posts for the specific userId
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, [id]);

  const handleBulkAddClick = async () => {
    setshowDownloadInExcel(true)
    // Implement your logic for bulk adding posts here
    const response = await axios.post(`${baseURL}/bulk/posts`, posts );
    // console.log(response)
    alert(response.data.message)
    
  };

  const handleDownloadExcelClick = async () => {
    // Logic for Download In Excel button click
    console.log('Download In Excel clicked');
    // Assuming jsonData is your JSON data
    const jsonData = posts
    // Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert workbook to Blob
    const workbookBlob = new Blob([s2ab(XLSX.write(workbook, { type: 'binary' }))], { type: "application/octet-stream" });

    // Function to convert string to ArrayBuffer
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    }

    // Create a URL for the Blob
    const url = URL.createObjectURL(workbookBlob);

    // Create a download link
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xlsx'; // Set the filename
    a.style.display = 'none';

    // Append the download link to the document body
    document.body.appendChild(a);

    // Click the download link to trigger the download
    a.click();

    // Remove the download link from the document body
    document.body.removeChild(a);

    // Revoke the URL to release the resources
    URL.revokeObjectURL(url);
  };

  return (
    <div className='postpagecontainer'>
      {user && (
        <div>
          <h2>User Information:</h2>
          <p>Name: {user.name}</p>
          <p>Company: {user.company.name}</p>
        </div>
      )}
         {/* Buttons section */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleBulkAddClick}>Bulk Add</button>
        {showDownloadInExcel && (
            <button onClick={handleDownloadExcelClick}>Download In Excel</button>
        )}
      </div>

      <h2>Posts:</h2>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
