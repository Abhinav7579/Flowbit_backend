import express from "express"
import cors from "cors"
const PORT = process.env.PORT!
import mainRouter from "./routes/index"
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter);


app.listen(8000, () => {
  console.log("Server is running on port 8000");
});