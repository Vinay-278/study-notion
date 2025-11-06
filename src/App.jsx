import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router'
import Home from './Pages/Home'
import "./index.css";

function App() {
  
  return (
    <div className="w-screen min-h-screen bg-[#000814] flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App
