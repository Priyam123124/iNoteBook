import './App.css';
import React from 'react';
import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import NotesState from './Context/notes/NotesState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
function App() {
 
  return (
    <>
    <NotesState>
    <BrowserRouter>
    <Navbar/>
      <Alert/>
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/about' element={<About/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
      <Route exact path='/signup' element={<SignUp/>}></Route>
    </Routes>
    </BrowserRouter>
    </NotesState>
    </>
  );
}

export default App;
