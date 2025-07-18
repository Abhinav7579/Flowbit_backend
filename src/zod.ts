import { z} from "zod";

export const userRequiredBody=z.object({
    name:z.string(),
    email:z.string().email(),
    password: z.string().min(4, { message: "Password must be at least 4 characters" }).max(10, { message: "Password must be at most 10 characters" })
})
 export const SigninRequiredbody = z.object({
        email: z.string().email(),
        password: z.string().min(4, { message: "Password must be at least 4 characters" }).max(10, { message: "Password must be at most 10 characters" })
    });
    