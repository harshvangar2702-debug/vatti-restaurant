import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';

function AdminApp() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default AdminApp;
