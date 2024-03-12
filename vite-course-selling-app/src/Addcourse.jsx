import { Button, TextField, Card, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Addcourse() {
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [imageUrl,setImageUrl]=useState("")
    const Navigate= useNavigate()
    const addCourse = async () => {
        const admin = localStorage.getItem("token");
        if (admin) {

            const data = await fetch("http://localhost:8080/admin/courses", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' :"Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({ title,
                description,
                imageLink:imageUrl,
                published: true
                })
            })
            const response = await data.json();
            if(response.status)
            {
                alert(response.message);
            }
        }
        else{
            Navigate("/login")
        } 
    }
    return (
        <>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>

                <Typography variant={"h4"}>
                    Welcome to the Course
                </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card variant="outlined" style={{ width: 400, padding: 20 }}>
                    <TextField fullWidth={true} id="outline-basic" label="Title" variant="outlined"
                        onChange={(e) => { settitle(e.target.value) }}
                    />
                    <br />
                    <br />
                    <TextField fullWidth={true} id="outline-basic" label="Description" variant="outlined"
                        onChange={(e) => { setdescription(e.target.value) }}
                    />
                    <br />
                    <br />
                    <TextField fullWidth={true} id="outline-basic" label="imageUrl" variant="outlined"
                        onChange={(e) => { setImageUrl(e.target.value) }}
                    />
                    <br />
                    <br />
                    <Button variant="contained" size='large' onClick={addCourse}>Add course</Button>
                </Card>
            </div>
        </>
    )
}

export default Addcourse