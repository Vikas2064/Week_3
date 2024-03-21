const express=require("express");
const router= express.Router();
const fs=require("fs")
const jwt = require("jsonwebtoken")
const SECRET="sdfjskddfs"
const {User,Admin,Course}=require('./Models/schemas');
const generatejwt = (user) => { 
    const payload = {username:user.username};
    return jwt.sign(payload,SECRET,{expiresIn:"24h"});
}
function userauthentication(req,res,next){
    const authHeader=req.headers.authorization;
    if(authHeader)
    {
        const token=authHeader.split(' ')[1];
        jwt.verify(token,SECRET,(err,user)=>{
            if(err){
                return res.sendStatus(403);
            }
            else
            {
                req.user=user;
                next();
            }
        })
    }
    else
    {
        return res.status(402).send("user does not exist")
    }
}
const adminauthentication = (req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader)
    {
        const token=authHeader.split(' ')[1];
        jwt.verify(token,SECRET,(err,user)=>{
            if(err){
                return res.sendStatus(403);
            }
            else
            {
                req.user=user;
                next();
            }
        })
    }
    else
    {
        return res.status(402).send("user does not exist")
    }
}
const authenticateJwt=(req,res,next)=>{
      const authHeader=req.headers.authorization;
      
      if(authHeader)
      {
         const token= authHeader.split(' ')[1];
        
         jwt.verify(token,SECRET,(err,user)=>{
            if(err)
            { 
               return  res.status(403).json({message:"there is some error"});
            }
            else
            {
                req.user=user;
                next();
            //    return  res.status(201).json({message:"user logged in successfully",status:true});
            }
         })
      }
      else
      {
        res.status(404).json({message:"invalid user",status:false})
      }
}
router.get("/admin/me",authenticateJwt,(req,res)=>{
    res.json({
        username:req.user.username
    })
})
router.post("/admin/signup",async(req,res)=>{
    console.log(req.body)
    const {username,password}=req.body;
    const newadmin= await Admin.findOne({username: username});
    if(newadmin){
        res.status(403).send({message:"admin already exist",status:false});
    }
    else
    {
        const newAdmin= new Admin({username,password});
        await newAdmin.save();
        const token = jwt.sign({username,role:"admin"},SECRET,{expiresIn:"24h"})
        res.status(201).json({message:"admin created successfully",token,status:true})
    }
}); 
router.post("/admin/login",async (req,res)=>{
     const {username,password}= req.body;
     const admin=await  Admin.findOne({username,password});
     if(admin){
        const token=jwt.sign({username,role:"admin"},SECRET,{expiresIn:"24h"});
        res.status(201).json({message:"Logged in successfully",token,status:true});
     }
     else
     {
        
        res.status(403).json({message:"Invalid username and password",status:false});
     }
})

router.post('/admin/courses',adminauthentication,async(req,res)=>{
    console.log(req.body)
    const course= new Course(req.body);
    await course.save()
    res.status(201).json({message:"courses created successfully",courseId:course.id,status:true});
})
router.put("/admin/courses/:courseId",adminauthentication,async(req,res)=>{
    // console.log(req.params.courseId)
    const course= await Course.findByIdAndUpdate(req.params.courseId,req.body,{new:true});
    // console.log(course._id) 
    if(course)
    {
        res.json({message:"Course updated successfully",status:true,course});
    }
    else
    {   
        res.status(404).json({message:"Course not found",status:false});
    }
})
router.get("/admin/courses",adminauthentication,async(req,res)=>{
    const courses= await Course.find({}); 
    if(courses)
    {
        res.json({courses});
    }
    else
    {
        res.status(404).json({message:"Course not found"});
    }
});

 router.post("/users/signup",async(req,res)=>{
    const {username,password}=req.body;
    const user= await User.findOne({username: username});
    if(user){
        res.status(403).send({message:"user already exist",status:false});
    }
    else
    {
        const newUser= new User({username,password});
        await newUser.save();
        const token = jwt.sign({username,role:"user"},SECRET,{expiresIn:"24h"})
        res.status(201).json({message:"User created successfully",token,status:true})
    }
 });
 router.post("/users/signin",async(req,res)=>{
    const {username,password}=req.body;
    const user= await User.findOne({username: username,password:password});
    if(user){
        const token = jwt.sign({username,role:"user"},SECRET,{expiresIn:"24h"})
        res.status(201).json({message:"user already exist",token});
    }
    else
    {
        res.status(404).json('Invalid username or password')
    }
 });
 router.post("/user/courses/:courseId",userauthentication,async(req,res)=>{
    const course=await Course.findById(req.params.courseId);
    if(course)
    {
        const user = await User.findOne({username:req.user.username});
        if(user)
        {
            user.purchasedCourses.push(course);
            await user.save();
            res.json({message:"course purchased successfully"});
        }
        else
        {
            res.status(403).json({message:"User not Found"});
        }
    }
    else
    {
        res.status(403).json({message:"Course not Found"});  
    }
 })
 router.get("/users/purchasedCourses",userauthentication,async(req,res)=>{
    const user= await User.findOne({username:req.user.username}).populate('purchasedCourses');
    if(user)
    {
        res.json({purchasedCourses:user.purchasedCourses||[] });
    }
    else
    {
        res.status(403).send("user not found")
    }
 })
 router.get('/admin/course/:courseId',authenticateJwt,async (req, res)=>{
    console.log("this is hello")
    const courseId=req.params.courseId;
    const course=await Course.findById(courseId);
    // console.log(course)
    res.json({course})
})
router.put('/admin/course/:courseId',authenticateJwt,async (req, res)=>{
    const courseId=req.params.courseId;
    const course=await Course.findByIdAndUpdate(courseId,req.body)
    console.log(course)
    res.send("course updated")
})
module.exports=router;    