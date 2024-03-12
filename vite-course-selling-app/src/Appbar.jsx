import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Appbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [change, setChange] = useState(false) 
    useEffect(()=>{
       setInterval(()=>{
          const username=localStorage.getItem("username");
          if(username)
          {
            setUsername(username);
            setLoggedIn(true)
          }
       },100)
    },[])
    if (!loggedIn) {
        return (
            <>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 4
                }}>
                    <div style={{ display: "flex" }}>
                        <Typography variant={"h6"}>LearnOnline</Typography>
                    </div>
                    <div>
                        <Link to={'/login'}><Button variant={"contained"} style={{ margin: 4 }}>
                            Login
                        </Button></Link>
                        <Link to={'/Signup'}><Button variant={"contained"} style={{ margin: 4 }}>
                            Signup
                        </Button></Link>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 4
            }}>
                <div style={{ display: "flex" }}>
                    <Typography variant={"h6"}>LearnOnline</Typography>
                </div>
                <div style={{ display: "flex" }}>
                    <div>{username}</div>
                    <Link to={'/Signup'}><Button variant={"contained"} style={{ margin: 4 }}
                        onClick={() => {
                             localStorage.removeItem('token')
                             localStorage.removeItem('username');
                             setChange(!change);
                             window.location='/'
                        }}
                    >
                        Logout
                    </Button></Link>
                </div>
            </div>
        )
    }
}
export default Appbar;