const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
require("dotenv").config();
const { DBConnection }=require("./databases/db.js");
const cookieParser=require("cookie-parser");

const submissionRoute=require('./routes/submissionRoutes.js')
const {MONGO_URL}=process.env;

// DBConnection();
const PORT=process.env.SUBMISSION_PORT || 8000;
DBConnection();
app.use(
    cors({
    origin:"http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());


app.use("/submissions",submissionRoute);

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});