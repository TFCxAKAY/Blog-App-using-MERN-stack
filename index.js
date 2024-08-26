const express = require("express");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
require("./config/database");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
const PORT =process.env.PORT

app.listen(PORT,()=>{
    console.log(`server started ${PORT}`);
});


app.get('/',(req,res)=>{
    res.send("Home page")
 
 });