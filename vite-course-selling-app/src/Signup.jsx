// import React from 'react'
import {Button,TextField,Card,Typography} from '@mui/material';
function Signup(){
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
                <TextField fullWidth={true} id="outline-basic" label="Email" variant="outlined" />
                <br/>
                <br />
                <TextField  fullWidth={true} id="outline-basic" label="Password" variant="outlined" />
                <br />
                <br />
                <Button variant="contained" size='large'>SignUp</Button>
              </Card>
      </div>    
    </>
    )
}


export default Signup;