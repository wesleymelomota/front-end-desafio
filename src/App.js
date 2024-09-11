import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListDetails from './pages/ListDetails';
import ItemForm from './components/ItemForm';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lists/:id" element={<ListDetails />} />
      <Route path="/lists/alterar/:id" element={<ItemForm />} />
    </Routes>
  </Router>
  );
}

export default App;
