const express = require("express");
const {  getAllUser , signUp ,logIn } = require("../controllers/user-contoller");
const userRouter = express.Router();


userRouter.get("/",getAllUser);
userRouter.post("/signup", signUp);
userRouter.post("/login" , logIn);

module.exports =  userRouter;