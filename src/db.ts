import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGO_URI!;
mongoose.connect(uri)
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const ticketSchema=new Schema({
    CustomerId:{ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    subject:{ type: String, required: true },
    description:{ type: String, required: true },
    status:String,
    createdAt:Date,
    updatedAt:Date
})


export const userModel = model("user", userSchema);
export const ticketModel=model("ticket",ticketSchema);
