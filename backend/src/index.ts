import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
import MyRestaurantRoute from "./routes/MyRestaurantRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=> console.log("Connected to database"))

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string, 
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string
})

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response)=> {
    res.send({message: "Health OK!"})
})

app.use("/api/my/user", MyUserRoute);
app.use("/api/my/restaurant", MyRestaurantRoute);

app.listen(7000, ()=> {
    console.log("server started on localhost:7000")
})