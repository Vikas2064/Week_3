import express from 'express';
const router1 = express.Router();
import mongoose from 'mongoose'
import {adminauthentication} from '../middleware/authentication.js'
import {Video,Course} from '../Models/schemas.js'
import multer from 'multer'

const storage = multer.diskStorage({
   destination: (req, file, cb) => { 
     cb(null,'E:/webDevelopement/Harkirat singh/Cohort1/harkirat singh/Week_3/server/files');
   },
   filename: (req, file, cb) => {
      // const uniqueSuffix = Date.now();
      cb(null,file.originalname);
   },
 });
 
 
 const formDataUpload = multer({
   storage,
 });
 
 
 router1.post("/upload/:courseId", formDataUpload.single("file"),async(req, res, next) => {
  //  console.log(req.file);
   if(req.file)
    {
        const filename= req.file.filename;
        const file = Video.findOne({fileName:filename})
        if(file)
          {
            res.send({msg:"This video already exist"})
          }
          const newVideoData={
            lectureName:req.body.title,
            fileName:req.file.filename
        }
        let newVideo= new Video(newVideoData);
        newVideo= await newVideo.save();
        // console.log(newVideo)
        let courseId1= req.params.courseId;
        let courseId=new mongoose.Types.ObjectId(courseId1)
        let course=await Course.find({_id:courseId});
        // console.log(course)
        course.videos.push(newVideo._id);
        await course.save();
        res.send({msg:"video is saved successfully"});  
    }
    else
    {
      res.status(401).send({msg:"please select the video"});
    }
   res.end("file uploads success");
 });
export default router1;