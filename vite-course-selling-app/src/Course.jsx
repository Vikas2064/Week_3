import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
// import { atom, useRecoilValue } from 'recoil'
import { Button, TextField, Card, Typography, LinearProgress, Grid } from "@mui/material"
function Course() {
    let { courseId } = useParams();
    let [course, setCourse] = useState();
    // const setCourses = useSetRecoilState(coursesState);
    useEffect(() => {
            fetch("http://localhost:8080/admin/course/" + courseId, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            }).then((response) => {
                response.json().then((responseData) => {
                    setCourse(responseData.course)
                })
            })
    }, [])
//    console.log(course)
    if (!course) {
        return (
            <div>
                <LinearProgress color="secondary" />
            </div>)
    }
    return (
        <div>
            <GrayTopper title={course.title} />
            <Grid container>
                <Grid item lg={8} md={12} sm={12}>
                    <UpdateCard course={course} setCourse={setCourse} />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <CourseCard course={course} />
                </Grid>
            </Grid>
        </div>
    )

}

function GrayTopper(props) {
    return (
        <div style={{ height: '250px', background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
            <div style={{ height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div>
                    <Typography variant='h2' style={{ color: 'white', fontWeight:"600", textAlign: "center" }}>{props.title}</Typography>
                </div>

            </div>
        </div>
    )
}
function UpdateCard(props) {
    const [title, settitle] = useState(props.course.title);
    const [description, setdescription] = useState(props.course.description);
    const [imageUrl, setImageUrl] = useState(props.course.imageLink)
    const [price, setPrice] = useState(props.course.price)
    // console.log(props.course)
    // console.log(title,description,imageUrl,price)
    // const [courses, setCourses] = useRecoilState(coursesState)
    if (!props.course) {
        return (
            <div>
                Loading......
            </div>
        )
    }
    return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                {/* {JSON.stringify(props.course)} */}
                <Card variant="outlined" style={{ width:450,maxWidth:600, marginTop:200,padding:20 }}>
                    <div style={{padding:20}}>

                        <Typography variant={"h4"}>
                            update course Detail
                        </Typography>
                    </div>
                    <TextField style={{marginBottom: 10}} fullWidth={true} id="outline-basic" label="Title" variant="outlined"
                        value={title} onChange={(e) => { settitle(e.target.value) }}
                    />
                    <br />
                    <br />
                    <TextField style={{marginBottom: 10}} fullWidth={true} id="outline-basic" label="Description" variant="outlined"
                        value={description} onChange={(e) => { setdescription(e.target.value) }}
                    />
                    <br />
                    <br />
                    <TextField style={{marginBottom: 10}} fullWidth={true} id="outline-basic" label="imageUrl" variant="outlined"
                        value={imageUrl} onChange={(e) => { setImageUrl(e.target.value) }}
                    />
                    <br />
                    <br />
                    <TextField style={{marginBottom: 10}} fullWidth={true} id="outline-basic" label="Price" variant="outlined"
                        value={price} onChange={(e) => { setPrice(e.target.value) }}
                    />
                    <br /><br />
                    <Button style={{marginBottom: 10}} variant="contained" size='large' onClick={async ()=>{
                        axios.put("http://localhost:8080/admin/course/"+props.course._id, {
                            title:title,
                            description:description,
                            imageLink:imageUrl,
                            published:true,
                            price
                        },
                        {
                            headers:{
                                "Content-Type":"application/json",
                                "Authorization":"Bearer "+localStorage.getItem("token")
                            }
                        });
                        let updatedCourse={
                            _id:props.course._id,
                            title:title,
                            description:description,
                            imageLink:imageUrl,
                            price:price 
                        }
                        props.setCourse(updatedCourse)
                    }}>Update course</Button>
                </Card>
            </div>
    )
}
function CourseCard(props) {
    if (!props.course) {
        return <>
            <LinearProgress color="secondary" />
        </>
    }
    return (
        <>
            <div style={{ display: 'flex', marginTop: 50, justifyContent: 'center', width:"100%" }}>
                <Card style={{
                    margin: 10,
                    width: 350,
                    minHeight: 200,
                    borderRadius: 10,
                    marginRight: 50,
                    paddingBottom: 15,
                    zIndex: 2,
                    padding:5
                }}>

                    <img src={props.course.imageLink} alt="This is image" width={"350"} height={"300"} style={{borderRadius:10}} />
                    <div>
                        <Typography  variant="h5">{props.course.title}</Typography>
                        <Typography variant='subtitle2' style={{color:"gray"}}>Price</Typography>
                        <Typography  variant='subtitle1'><b>Rs {props.course.price}</b></Typography>
                    </div>

                </Card>
            </div>
        </>
    )
}
export default Course;


// const coursesState = atom({
//     key: 'coursesState',
//     default: ''
// });