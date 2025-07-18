"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninRequiredbody = exports.userRequiredBody = void 0;
const zod_1 = require("zod");
exports.userRequiredBody = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4, { message: "Password must be at least 4 characters" }).max(10, { message: "Password must be at most 10 characters" })
});
exports.SigninRequiredbody = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4, { message: "Password must be at least 4 characters" }).max(10, { message: "Password must be at most 10 characters" })
});
