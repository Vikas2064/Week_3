// import { useState } from 'react'
import './App.css'
import Appbar from './Appbar.jsx'
import Signin from './Signin.jsx'
import Signup from './Signup.jsx'
import {Route,Routes,} from 'react-router-dom'

function App() {

  return (
    <>
      <Appbar />
        <Routes>
            <Route path="/" element={<>this is home page</>}/>
            <Route path="/login" element={<Signin />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
        </Routes>
       
    </>
    
  )
}

export default App
