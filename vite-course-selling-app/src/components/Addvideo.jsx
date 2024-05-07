import { Card, Typography, TextField, Button } from "@mui/material";
import { useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config.js";

export function AddVideo() {
    const [file, setVideo] = useState();
    const [title, setLactureName] = useState("")
    let { courseId } = useParams();
    async function uploadVideo() {
        const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
        `${BASE_URL}/video/upload/${courseId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data",'Authorization':'Bearer '+localStorage.getItem('token') },
      }
    );
    console.log(result);
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
                            setVideo(e.target.files[0]);
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