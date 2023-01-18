import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NewNote from './components/NewNote'

function App() {
  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<h1>Hi</h1>}>Home</Route>
        <Route path='/new' element={<NewNote />}>New</Route>

        <Route path='/:id' element={<h1>Hi</h1>}>
          <Route index element={<h1>Show</h1>} />
          <Route path='edit' element={<h1>Edit</h1>} />
        </Route>

        <Route path='*' element={<Navigate to='/'></Navigate>}>New</Route>
      </Routes>
    </Container>
    
  );
}

export default App;
