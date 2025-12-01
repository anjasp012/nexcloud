"use server"
import { signUpSchema, signInSchema, storeApiKeySchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const signUpCredenials = async (
    prevState: unknown,
    formData: FormData) => {
    const validatedFields = signUpSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }
    const { name, email, password } = validatedFields.data
    const hashedPassword = hashSync(password, 10)
    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })
    } catch (error) {
        return { message: "Failed to create user" }
    }
    redirect("/login")
}

export const signInCredentials = async (prevState: unknown, formData: FormData) => {
    const validatedFields = signInSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }
    const { email, password } = validatedFields.data

    try {
        await signIn("credentials", { email, password, redirectTo: "/dashboard" })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CallbackRouteError":
                    return { message: "Invalid credentials" }
                default:
                    return { message: "Something went wrong" }
            }
        }
        throw error
    }
}

// apikey
export const storeApiKey = async (
    prevState: unknown,
    formData: FormData) => {
    const validatedFields = storeApiKeySchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }
    const { api_key } = validatedFields.data
    try {
        await prisma.apiKey.create({
            data: {
                api_key,
            },
        })
    } catch (error) {
        return { message: "Failed to add api key" }
    }
    redirect("/dashboard/api-key")
}

export const updateApiKey = async (
    prevState: unknown,
    formData: FormData) => {
    const validatedFields = storeApiKeySchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }
    const { api_key } = validatedFields.data
    try {
        await prisma.apiKey.update({
            where: {
                id: formData.get("id") as string,
            },
            data: {
                api_key,
            },
        })
    } catch (error) {
        return { message: "Failed to update api key" }
    }
    redirect("/dashboard/api-key")
}

export const deleteApiKey = async (prevState: unknown, formData: FormData) => {
    try {
        await prisma.apiKey.delete({
            where: { id: formData.get("id") as string }
        })
    } catch (error) {
        return { message: "Failed to delete api key" }
    }

    redirect("/dashboard/api-key")
}

export const apiTest = async (prevState: unknown, formData: FormData) => {
    try {
        const response = await fetch(`https://rpmshare.com/api/account/info?key=${formData.get("api_key")}`, {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await response.json()
        return { data }
    } catch (error) {
        return { error: "Failed to test api key" }
    }
}
