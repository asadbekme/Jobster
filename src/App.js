import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Landing, Error, Register, Dashboard } from './pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='landing' element={<Landing />} />
      <Route path='register' element={<Register />} />
      <Route path='*' element={<Error />} /> 
    </Routes>
  );
}

export default App;
