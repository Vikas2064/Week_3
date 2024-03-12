
import Addcourse from './Addcourse.jsx'
import './App.css'
import Appbar from './Appbar.jsx'
import Signin from './Signin.jsx'
import Signup from './Signup.jsx'
import {Route,Routes,} from 'react-router-dom'
import Courses from './Courses'
function App() {

  return (
    <>
      <Appbar />
        <Routes>
            <Route path="/" element={<h1> this is main page</h1>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/addcourse" element={<Addcourse />}/>
            <Route path="/login" element={<Signin />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
        </Routes>
       
    </>
    
  )
}

export default App
