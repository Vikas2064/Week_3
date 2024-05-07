import  express  from "express";
const app= express();
import bodyParser from "body-parser";
import courseRouter from './routers/adminRouter.js';
import  videoRouter from './routers/handleVideo.js' ;
app.use(bodyParser.json());
import cors from 'cors';
app.use(cors())
app.use("/",courseRouter);
app.use('/video',videoRouter);
let port= 8080;
app.listen(port,()=>{
    console.log(`listening at the port ${port}`)
})