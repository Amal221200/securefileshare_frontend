import * as z from "zod";

export const nameUpdateSchema = z.object({
    name: z.string().min(1, { message: "Name is required!" }),
    email: z.string()
})

export const passwordChangeSchema = z.object({
    old_password: z.string().min(6, { message: "Password should be alteast 6 characters" }),
    new_password: z.string().min(6, { message: "Password should be alteast 6 characters" }),
    new_password_confirm: z.string().min(1, { message: "Password confirmation is required" }),
}).refine((data) => data.new_password === data.new_password_confirm, {
    message: "Password does not match",
    path: ["new_password_confirm"]
})