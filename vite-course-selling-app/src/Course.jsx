import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { Button, TextField,Card, Typography,LinearProgress} from "@mui/material"
function Course()
{
    let {courseId}=useParams();
    const [courses,setCourses]=useState([])
    useEffect(()=>{
        fetch("http://localhost:8080/admin/courses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then((response) => {
            response.json().then((responseData) => {
                setCourses(responseData.courses)
            })
        })
    },[])
    let course; 
    for(let i=0;i<courses.length;i++) {
        if(courses[i]._id===courseId)
        {
            course=courses[i];
        }
    }
    if(!course){
        return <>
        <LinearProgress color="secondary" />
        </>
    }
    return (
        <>
               <CourseCard course={course} />
               <UpdateCard course={course} />
        </>
    )
}
function UpdateCard(props){
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [imageUrl,setImageUrl]=useState("")
    const addCourse = async () => {
        const admin = localStorage.getItem("token");
        if (admin) {
            
            const data = await fetch("http://localhost:8080/admin/courses/"+props.course._id, {
                method: "PUT",
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
            console.log("login to update the courses")
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
                    <Button variant="contained" size='large' onClick={addCourse}>Update course</Button>
                </Card>
            </div>
        </>
    )
}
function CourseCard(props){
    return (
        <>
                <Card style={{margin:10,
                width:300,
                minHeight:200}}>
                        <Typography textAlign={"center"} variant="h5">{props.course.title}</Typography>
                        <br></br>
                        <Typography textAlign={"center"} variant='h5'>{props.course.description}</Typography>
                        <br></br>
                        <img src={props.course.imageLink} alt="This is image" width={"300"} height={"300"} />
                </Card>
        </>
    )
}
export default Course;