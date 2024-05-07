import express from 'express';
const router1 = express.Router();

import {adminauthentication} from '../middleware/authentication.js'
import {Video} from '../Models/schemas.js'
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
 
 
 router1.post("/upload/:courseId", formDataUpload.single("file"), (req, res, next) => {
   console.log(req.file);
   if(req.file)
    {

    }
    else
    {
      res.status(401).send({msg:"please select the video"});
    }
   res.end("file uploads success");
 });
export default router1;