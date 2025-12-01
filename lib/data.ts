import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getApiKey = async (id?: string) => {
    const session = await auth();
    if (!session || !session?.user || session?.user.role != 'ADMIN') redirect("/dashboard")
    try {
        if (id) {
            const apiKey = await prisma.apiKey.findUnique({ where: { id } })
            return apiKey
        } else {
            const apiKeys = await prisma.apiKey.findMany()
            return apiKeys
        }
    } catch (error) {
        console.log(error);
    }
};

export const apiInfo = async (api_key: string) => {
    const session = await auth();
    if (!session || !session.user || session.user.role !== 'ADMIN') redirect("/dashboard");

    try {
        const response = await fetch(`https://rpmshare.com/api/account/info?key=${api_key}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
