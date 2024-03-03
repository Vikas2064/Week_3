const express=require("express");
const app= express();
const bodyParser= require("body-parser");
const admin=require('./router')
app.use(bodyParser.json());
app.use("/admin",admin);
let port= 8080
app.get('/',(req,res) => {
    res.send("called successfully");
})
app.listen(port,()=>{
    console.log(`listening at the port ${port}`)
})