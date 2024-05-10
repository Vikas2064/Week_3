import express from 'express';
const router1 = express.Router();
import mongoose from 'mongoose'
import { adminauthentication } from '../middleware/authentication.js'
import { Video, Course } from '../Models/schemas.js'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'E:/webDevelopement/Harkirat singh/Cohort1/harkirat singh/Week_3/server/files');
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now();
    cb(null, file.originalname);
  },
});


const formDataUpload = multer({
  storage,
});


router1.post("/upload/:courseId", [adminauthentication,formDataUpload.single("file")], async (req, res, next) => {
  if (req.file) {
    const filename = req.file.filename;
    const file = Video.findOne({ fileName: filename })
    if (file) {
      res.send({ msg: "This video already exist" })
    }
    else {
      const newVideoData = {
        lectureName: req.body.title,
        fileName: req.file.filename
      }
      let newVideo = new Video(newVideoData);
      newVideo = await newVideo.save();
      let courseId1 = req.params.courseId;
      let courseId = new mongoose.Types.ObjectId(courseId1)
      let course = await Course.find({ _id: courseId });
      course[0].videos.push(newVideo._id);
      await course[0].save();
      res.send({msg:"video is saved successfully"});  
    }
  }
  else {
    res.status(401).send({ msg: "please select the video" });
  }
});
export default router1;