import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, { message: "Email is required!" }).email({ message: "Invalid email!" }),
    password: z.string().min(6, { message: "Password should be alteast 6 characters" }),
});

export const registerSchema = z.object({
    email: z.string().min(1, { message: "Email is required!" }).email({ message: "Invalid email!" }),
    name: z.string().min(1, { message: "Name is required!" }),
    password: z.string().min(6, { message: "Password should be alteast 6 characters" }),
    passwordConfirm: z.string().min(1, { message: "Password confirmation is required" }),
}).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'], message: 'Password does not match'
})