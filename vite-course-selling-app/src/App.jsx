
import Addcourse from './Addcourse.jsx'
import './App.css'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Appbar from './Appbar.jsx'
import Signin from './Signin.jsx'
import Signup from './Signup.jsx'
import {Route,Routes,} from 'react-router-dom'
import Courses from './Courses'
import Course from './Course.jsx'
import HandleButton from './handleButton.jsx';
function App() {

  return (
    <div style={{width:"100vw",height:"100vh",backgroundColor:"#eeeeee"}}>
        <Appbar />
        <RecoilRoot>
          <Routes>
              <Route path="/" element={<h1> this is main page</h1>}/>
              <Route path="/courses" element={<Courses/>}/>
              <Route path="/course/:courseId" element={<Course/>}/>
              <Route path="/addcourse" element={<Addcourse />}/>
              <Route path="/login" element={<Signin />}></Route>
              <Route path="/Signup" element={<Signup />}></Route>
              <Route path='/DisableButton' element={<HandleButton />}/>
          </Routes>
        </RecoilRoot>
    </div>
    
  )
}

export default App
