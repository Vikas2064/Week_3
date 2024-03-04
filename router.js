const express=require("express");
const router= express.Router();
const fs=require("fs")
const jwt = require("jsonwebtoken")
const SECRET="sdfjskddfs"
const {User,Admin,Course}=require('./Models/schemas');
router.post("/admin/signup",async(req,res)=>{
    const {username,password}=req.body;
    const admin= await Admin.findOne({username: username});
    if(admin){
        res.status(403).send("admin already exist");
    }
    else
    {
        const newAdmin= new Admin({username,password});
        await newAdmin.save();
        const token = jwt.sign({username,role:"admin"},SECRET,{expiresIn:"1h"})
        res.status(201).json({message:"User created successfully",token})
    }
    // fs.readFile("admin.json","utf-8",(err,data)=>{
    //     if(err) 
    //     throw err;
    //     let newAdmin = {
    //         username:req.headers.username,
    //         password:req.headers.password
    //     }
    //     data = JSON.parse(data);
    //     data.push(newAdmin);
    //     const token=jwt.sign({username:req.headers.username},secureKey,{expiresIn: "10h"});
    //     fs.writeFile("admin.json",JSON.stringify(data),(err)=>{
    //         if(err) throw err;
    //     });
    //    return  res.send(`new admin added successfully ${token}`);
    // });
}); 

function authentication(req,res,next){
    fs.readFile("admin.json","utf-8",(err,data)=>{
        if(err) 
        throw err;
        data=JSON.parse(data);
        let newAdmin = {
            username:req.headers.username,
            password:req.headers.password
        }
        function find(data, newdata)
        {
            for(let i=0;i<data.length;i+=1)
            {
                if(data[i].username===newdata.username && data[i].password===newdata.password)
                {
                    return true;
                }   
            }
            return false;
        }
        if(find(data,newAdmin)===true)
        {
             next();
             return ;
        }
        return res.status(401).send("unathrised user");
    });
}
router.post("/admin/login",(req,res)=>{
     const {username,password}= req.body;
     const admin= Admin.findOne(username,password);
     if(admin){
        const token=jwt.sign({username,role:"admin"},SECRET,{expiresIn:"1h"});
        res.status(201).json({message:"Logged in successfully",token});
     }
     else
     {
        res.status(403).json("Invalid username and password");
     }
})
router.get('/admin/courses',async(req,res)=>{
    const course= new Course(req,body);
    await course.save()
    res.status(201).json({message:"courses created successfully",courseId:course.id});
})
router.put("/admin/courses/:courseId",async(req,res)=>{
    const course= await Course.findByIdAndUpdate(req.params.courseId,req.body,{new:true}); 
    if(course)
    {
        res.json({message:"Course updated successfully"});
    }
    else
    {
        res.status(404).json({message:"Course not found"});
    }
})
router.get("/admin/courses",async(req,res)=>{
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
        res.status(403).send("user already exist");
    }
    else
    {
        const newUser= new User({username,password});
        await newUser.save();
        const token = jwt.sign({username,role:"user"},SECRET,{expiresIn:"1h"})
        res.status(201).json({message:"User created successfully",token})
    }
 });
 router.post("/users/signup",async(req,res)=>{
    const {username,password}=req.body;
    const user= await User.findOne({username: username,password:password});
    if(user){
        const token = jwt.sign({username,role:"user"},SECRET,{expiresIn:"1h"})
        res.status(201).json({message:"user already exist",token});
    }
    else
    {
        res.status(404).json('Invalid username or password')
    }
 });
 router.post("/user/courses/:courseId",async(req,res)=>{
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
 router.get("/users/purchasedCourses",async(req,res)=>{
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

module.exports=router;