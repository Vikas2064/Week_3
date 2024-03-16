import { Button, Typography,LinearProgress } from "@mui/material"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Appbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
       setInterval(()=>{
          const username=localStorage.getItem("username");
          if(username)
          {
            setUsername(username);
            setLoggedIn(true)
          }
          setLoading(false)
       },300)
    },[])
    if(loggedIn==false && loading)
    {
        return <div>
            <LinearProgress color="secondary" />
        </div>
    }
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
                             window.location='/'
                             setLoggedIn(false)
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