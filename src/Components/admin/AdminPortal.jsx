import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Sidebar from './Sidebar';
import NewArticle from './NewArticle';
import ManageArticles from './ManageArticles';
import Settings from './Settings';

const AdminPortal = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <Header />
        <h3>welcome</h3>
       <p>whats the vision for today?</p>
      </div>
    </div>
  );
};

export default AdminPortal;