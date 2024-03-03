// const { generateKey } = require("crypto");
const express=require("express");
const router= express.Router();
const fs=require("fs")
const jwt = require("jsonwebtoken")
const secureKey="sdfjskddfs"
router.post("/signup",(req,res)=>{
    fs.readFile("admin.json","utf-8",(err,data)=>{
        if(err) 
        throw err;
        let newAdmin = {
            username:req.headers.username,
            password:req.headers.password
        }
        data = JSON.parse(data);
        data.push(newAdmin);
        const token=jwt.sign({username:req.headers.username},secureKey,{expiresIn: "10h"});
        fs.writeFile("admin.json",JSON.stringify(data),(err)=>{
            if(err) throw err;
        });
       return  res.send(`new admin added successfully ${token}`);
    });
})

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
router.post("/login",authentication,(req,res)=>{
    return res.status(201).send("logged in successfully");
})


module.exports=router;