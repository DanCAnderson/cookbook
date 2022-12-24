import React, {useEffect, useState} from 'react'
import Home from './pages/home.js';
import Recipes from './pages/recipes.js';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </div>
  );
}

export default App