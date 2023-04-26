import MainTable from './components/MainTable.jsx';
import React from 'react';
import Testing from './components/test.jsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from './components/Register.jsx';
import EditMainTable from './components/EditMainTable.jsx';
import Login from './components/Login.jsx';
import Lay from './components/Layout.jsx';
import EditLay from './components/EditorLayout.jsx';

function App() {
  return (
    <div className="app">
      <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Lay />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/edit" element={<EditLay />} />
        </Routes>
      </Router>
    </div>
    
    </div>
  );
}

export default App;
