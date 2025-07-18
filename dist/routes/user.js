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
const userRouter = express_1.default.Router();
const path_1 = __importDefault(require("path"));
const zod_1 = require("../zod");
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs = require('fs');
const middleware_1 = require("../middleware");
const JWT_PASS = process.env.JWT_PASS;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = zod_1.userRequiredBody.safeParse(req.body);
    if (!parsed.success) {
        res.json({
            success: false,
            message: "incorect credentials"
        });
        return;
    }
    const { name, email, password } = parsed.data;
    const findUser = yield db_1.userModel.findOne({
        email: email
    });
    if (findUser) {
        res.status(403).json({
            success: false,
            message: "user already exist"
        });
    }
    const hashPassord = yield bcrypt_1.default.hash(password, 5);
    try {
        yield db_1.userModel.create({
            name: name,
            email: email,
            password: hashPassord
        });
        res.status(200).json({
            success: true,
            message: "user successfully created"
        });
    }
    catch (e) {
        res.status(403).json({
            success: false,
            message: "error in creating a user " + e
        });
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = zod_1.SigninRequiredbody.safeParse(req.body);
    if (!parsed.success) {
        res.status(403).json({
            success: false,
            message: "incorect credentials"
        });
        return;
    }
    const { email, password } = parsed.data;
    const user = yield db_1.userModel.findOne({
        email: email
    });
    if (!user) {
        res.status(403).json({
            success: false,
            message: "email does not exist"
        });
        return;
    }
    const passCompare = yield bcrypt_1.default.compare(password, user.password);
    if (passCompare) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_PASS);
        res.status(200).json({
            success: true,
            token: token
        });
    }
    else {
        res.status(403).json({
            success: false,
            message: "Incorrect credentials"
        });
    }
}));
userRouter.get("/me/screens", middleware_1.middleware, (req, res) => {
    const tenant = req.id;
    console.log(tenant);
    const registryPath = path_1.default.resolve(process.cwd(), "registory.json");
    fs.readFile(registryPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({
                error: "Unable to read registry"
            });
        }
        try {
            const registry = JSON.parse(data);
            const screens = registry.filter(r => r.tenant === tenant);
            res.json(screens);
        }
        catch (e) {
            res.status(500).json({
                error: "Invalid registry data"
            });
        }
    });
});
userRouter;
exports.default = userRouter;
