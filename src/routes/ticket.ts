import express from "express";
const ticketRouter = express.Router();
import axios from "axios"
import { ticketModel } from "../db";
import { middleware } from "../middleware";
const shared_secret=process.env.N8N_SECRET!

ticketRouter.post("/generate",middleware,async(req,res)=>{
    const{subject,description}=req.body;
    
    const ticket=await ticketModel.create({
        CustomerId:req.id,
        subject:subject,
        description:description,
        status: "open",
        createdAt: new Date(),
        updatedAt:null
    })
    try{
    const response = await axios.post(
    "https://codea3.app.n8n.cloud/webhook/69463940-7cbb-42b6-b63c-ce9bf8819bdf",
    {
      ticketId:ticket._id,
      customer:req.id
    },
     {
    headers: {
       "secretheader": process.env.N8N_SECRET
    }
  }
  );
  res.status(201).json({
     message: "Ticket created",
      ticketId: ticket._id
     });
}
catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
  
})

ticketRouter.post("/webhook/ticket-done",async(req,res)=>{
   console.log("Webhook hit");
  const secret=req.headers["x-secret"];
    if (secret !== shared_secret) {
    return res.status(403).json({
      error: "Forbidden" 
    });
  }
  try{
    const {ticketId}=req.body;
    await ticketModel.updateOne(
      {_id:ticketId},
      { $set: { status:"done",updatedAt: new Date() }}
    )

     res.json({ 
      message: "Ticket status updated"
     });

  }
   catch (err) {
    res.status(500).json({
      error: "Failed to update ticket" 
    });
  }

})

ticketRouter.get("/status", middleware, async (req, res) => {
  const customer = req.id;

  try {
    const ticket = await ticketModel.findOne({
      CustomerId: customer
    });

    if (!ticket) {
      return res.status(404).json({ message: "No ticket found" });
    }

    res.json({
      status: ticket.status
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


export default ticketRouter;