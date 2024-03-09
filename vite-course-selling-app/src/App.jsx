// import { useState } from 'react'
import Addcourse from './Addcourse.jsx'
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
            <Route path="/addcourse" element={<Addcourse />}/>
            <Route path="/login" element={<Signin />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
        </Routes>
       
    </>
    
  )
}

export default App
