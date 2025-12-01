import { object, string } from "zod"

export const signUpSchema = object({
    name: string().min(1, "Name must be at least 3 characters long"),
    email: string().email("Invalid email"),
    password: string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})
export const signInSchema = object({
    email: string().email("Invalid email"),
    password: string().min(8, "Password must be at least 8 characters long"),
})
export const storeApiKeySchema = object({
    api_key: string().min(1, "Api key must be at least 1 characters long"),
})
