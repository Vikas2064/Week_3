const express=require("express");
const app= express();
const bodyParser= require("body-parser");
const courseRouter=require('./router')
app.use(bodyParser.json());
const cors=require('cors');
app.use(cors())
app.use("/",courseRouter);

let port= 8080;
app.listen(port,()=>{
    console.log(`listening at the port ${port}`)
})