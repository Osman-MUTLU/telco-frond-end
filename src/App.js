import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Result from './Pages/Result';
import Layout from './Layout/Layout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/result" element={<Result />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
