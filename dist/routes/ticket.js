"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticketRouter = express_1.default.Router();
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../db");
const middleware_1 = require("../middleware");
const shared_secret = process.env.N8N_SECRET;
ticketRouter.post("/generate", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, description } = req.body;
    const ticket = yield db_1.ticketModel.create({
        CustomerId: req.id,
        subject: subject,
        description: description,
        status: "open",
        createdAt: new Date(),
        updatedAt: null
    });
    try {
        const response = yield axios_1.default.post("https://codea3.app.n8n.cloud/webhook/69463940-7cbb-42b6-b63c-ce9bf8819bdf", {
            ticketId: ticket._id,
            customer: req.id
        }, {
            headers: {
                "secretheader": process.env.N8N_SECRET
            }
        });
        res.status(201).json({
            message: "Ticket created",
            ticketId: ticket._id
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create ticket" });
    }
}));
ticketRouter.post("/webhook/ticket-done", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Webhook hit");
    const secret = req.headers["x-secret"];
    if (secret !== shared_secret) {
        return res.status(403).json({
            error: "Forbidden"
        });
    }
    try {
        const { ticketId } = req.body;
        yield db_1.ticketModel.updateOne({ _id: ticketId }, { $set: { status: "done", updatedAt: new Date() } });
        res.json({
            message: "Ticket status updated"
        });
    }
    catch (err) {
        res.status(500).json({
            error: "Failed to update ticket"
        });
    }
}));
ticketRouter.get("/status", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.id;
    try {
        const ticket = yield db_1.ticketModel.findOne({
            CustomerId: customer
        });
        if (!ticket) {
            return res.status(404).json({ message: "No ticket found" });
        }
        res.json({
            status: ticket.status
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}));
exports.default = ticketRouter;
