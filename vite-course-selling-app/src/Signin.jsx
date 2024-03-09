// import React from 'react'
import {Button,TextField,Card,Typography} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Signin(){
  const [username,setUsername] =useState("");
  const [password,setPassword] =useState("");
  const navigate = useNavigate();
  const admin = localStorage.getItem("token");
  if(admin)
  {
     navigate("/Addcourse")
  }
    const signin=async ()=>{
       const data=await  fetch("http://localhost:8080/admin/login",{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Authorization" :"Bearer " + localStorage.getItem("token")
        },
          body: JSON.stringify({username,password})
        })
        const response=await data.json();
        if(response.status)
        {
          localStorage.setItem("token",response.token)
          alert(response.message);
        }
        else
        {
          alert(response.message)
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
              <Button variant="contained" size='large' onClick={signin}>Signin</Button>
            </Card>
    </div>    
  </>
  )
}


export default Signin;