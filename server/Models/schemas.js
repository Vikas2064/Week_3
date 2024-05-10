import  mongoose from  "mongoose";
mongoose.connect("mongodb+srv://vikask200202:Mongodb123@cluster0.grsr6ry.mongodb.net/courses");
const userSchema=new mongoose.Schema({
    username: {type:String},
    password: {type:String},
    purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'Courses'}]
});
const adminSchema = new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
});

const coursesSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    publisher:Boolean,
    videos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"videos"
    }]
})

const videoSchema=mongoose.Schema(
    {
        lectureName:String,
        fileName:String,
        videoUrl:{
            type:String
        }
        
    }
)

export const Video= mongoose.model('videos',videoSchema);
export const User = mongoose.model('user',userSchema);
export const Admin = mongoose.model('admin',adminSchema);
export const Course= mongoose.model('course',coursesSchema);

