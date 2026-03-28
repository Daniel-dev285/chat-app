import z from "zod"

export const signupSchema = z.object({
    fullName: z
        .string()
        .trim() 
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters"),
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email format")
    ,
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
})
    .strict()

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required"),
    password: z
        .string()
        .trim()
        .min(1, "Password is required")
}).strict()