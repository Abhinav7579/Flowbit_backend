import express from "express";
import userRouter from "./user";
import ticketRouter from "./ticket";
const router = express.Router();

router.use("/user", userRouter);
router.use("/user/ticket", ticketRouter);
export default router;