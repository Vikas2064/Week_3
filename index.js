const express=require("express");
const app= express();
const bodyParser= require("body-parser");
const admin=require('./router')
app.use(bodyParser.json());
app.use("/",admin);
let port= 8080
const {User,Admin,Course}=require('./Models/schemas');
// app.get('/',(req,res) => {
//     res.send("called successfully");
// })
app.listen(port,()=>{
    console.log(`listening at the port ${port}`)
})