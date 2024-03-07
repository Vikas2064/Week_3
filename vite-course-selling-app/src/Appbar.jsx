import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom";

function Appbar(){
    return (
        <div style={{
            display:"flex",
            justifyContent:"space-between",
            padding:4
        }}>
        <div style={{display:"flex"}}>
            <Typography variant={"h6"}>LearnOnline</Typography>
        </div>
         <div>
                <Link to={'/login'}><Button variant={"contained"} style={{margin:4}}>
                  Login
                </Button></Link>
                <Link to={'/Signup'}><Button variant={"contained"} style={{margin:4}}>
                    Signup
                </Button></Link>
         </div>
        </div>
    )
}
export default Appbar;