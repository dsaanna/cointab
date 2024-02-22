// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PostPage from './pages/PostPage/PostPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path='/' element= {<HomePage />}/>
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
