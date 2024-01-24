import { useState, useRef , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Route, Routes} from 'react-router-dom'
import './App.css'

import TodoCar from './Components/Todocar';
import Home from './Components/Home';

function App() {
  return (
    <>
  
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </>
  )
  }

export default App
