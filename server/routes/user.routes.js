import express, { Router } from "express"
import { getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";

let userRouter = express.Router();

userRouter.get("/currentUser", isAuth ,getCurrentUser)

export default userRouter