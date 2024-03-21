// import React from 'react'
import {Button,TextField,Card,Typography} from '@mui/material';
import axios from "axios";
import { useState } from 'react';
function Signup(){
    const [username,setUsername] =useState("");
    const [password,setPassword] =useState("");
    const signUp=async ()=>{
        // let data=await  fetch("http://localhost:8080/admin/signup",{
        //   method: "POST",
        //   headers: {
        //     'Content-Type': 'application/json'
        // },
        //   body: JSON.stringify({username,password})
        // })
        const response= await axios.post("http://localhost:8080/admin/signup",{
          username:username,
          password:password
        })
        if(response.data.status)
        {
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("username",username)
          alert(response.data.message);
        }
        else
        {
          alert(response.data.message)
        }
    }
    return (
    <>
        <div style={{
         paddingTop:150,
          marginBottom:10,
          display:"flex",
          justifyContent:"center"
        }}>
         
          <Typography variant={"h4"}> 
                Welcome to the Course
          </Typography>
        </div>
      <div style={{display: "flex" ,justifyContent:"center"}}>
             <Card variant="outlined" style={{width:400,padding:20}}>
                <TextField fullWidth={true} id="outline-basic" label="Email" variant="outlined"
                onChange={(e)=>{setUsername(e.target.value)}}
                />
                <br/>
                <br />
                <TextField  fullWidth={true} id="outline-basic" label="Password" variant="outlined" 
                onChange={(e)=>{setPassword(e.target.value)}}
                />
                <br />
                <br />
                <Button variant="contained" size='large' onClick={signUp}>SignUp</Button>
              </Card>
      </div>    
    </>
    )
}


export default Signup;