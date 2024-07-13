const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
require("dotenv").config();
const { DBConnection }=require("./databases/db.js");
const cookieParser=require("cookie-parser");
const authRoute=require("./routes/AuthRoute");
const AdminRoutes=require('./routes/adminRoute.js')
const problemsRoute=require("./routes/problemsRoutes.js");
const contestsRoute=require("./routes/contestRoutes.js");
const userRoute=require("./routes/userRoute.js")

const {MONGO_URL}=process.env;
const PORT=process.env.PORT || 4000;
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

app.use("/",authRoute);
app.use("/users",userRoute);
app.use("/admin",AdminRoutes);
app.use("/problems",problemsRoute);
app.use("/contests",contestsRoute);


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});

