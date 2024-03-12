import { useEffect, useState } from "react";
import {Card, Typography} from "@mui/material"
const Courses =()=>{
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
    return (
        <div style={{display: 'flex',flexWrap:"wrap"}}> 
          {courses.map((course,i)=>{
            return (<Course course={course} key={i}/>)
          })}
        </div>
    )
}

function Course(props){
    return (
        <Card style={{
                margin:"10",
                padding:"10",
                width:300,
                minHeight:200
            }} >
            <Typography textAlign={"center"} variant="h6">{props.course.title}</Typography>
            <Typography textAlign={"center"}>{props.course.description}</Typography>   
            <img style={{margin:"20",padding:"20"}} src={props.course.imageLink} alt="This is image" width="294" height={"150"} ></img>
        </Card>
    )
}

export default Courses