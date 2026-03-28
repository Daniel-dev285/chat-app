import z from "zod"

export const signupSchema = z.object({
    fullName: z
        .string()
        .min(2, "Full name must be at least 2 characters"),
    email: z
        .email("Invalid email format"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
})
    .strict()

export const loginSchema = z.object({
    email: z
        .string(),
    password: z
        .string()
}).strict()