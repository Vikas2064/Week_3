import { Card,  Typography, TextField, Button } from "@mui/material";
import {useState} from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config.js";

export function AddVideo() {
    const [video, setVideo] = useState();
    const [lectureName,setLactureName]=useState("")
    let { courseId } = useParams();
    async function uploadVideo() {
        console.log(lectureName,typeof video);
    //     const result = await axios.post(`${BASE_URL}/admin/courses/video/${courseId}`, 
    //         {
    //             lectureName:lectureName,
    //             video:video
    //         },
    //         {
    //             headers:{
    //                "Authorization":"Bearer "+localStorage.getItem('token'),
    //                Accept: 'video/mp4;charset=UTF-8'
    //             }
    //         }
    //     )
    // console.log(result);
}
return (
    <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ maxWidth: 350, marginTop: 200 }}>
            <div style={{ padding: 20, width: 310 }}>
                <Typography style={{ marginBottom: 10 }}>Upload Video</Typography>
                <TextField
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setLactureName(e.target.value)
                    }}
                    fullWidth={true}
                    label="Lacture-Name"
                    variant="outlined"
                />
                <TextField
                    type="file"
                    name="video"
                    multiple
                    accept=".mp4, .mkv"
                    onChange={(e) => {
                        setVideo(e.target.files);
                    }}
                    fullWidth={true}
                    variant="outlined"
                />
                <Button style={{ marginTop: '10px' }} variant="contained" onClick={uploadVideo} >Upload</Button>
            </div>
        </Card>
    </div>
)
}