import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/zod"
import { compareSync } from "bcrypt-ts"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const validatedFields = signInSchema.safeParse(credentials)
                if (!validatedFields.success) {
                    return null
                }
                const { email, password } = validatedFields.data
                const user = await prisma.user.findUnique({
                    where: { email },
                })
                if (!user || !user.password) {
                    throw new Error("No user found");
                }
                const passwordMatch = compareSync(password, user.password)
                if (!passwordMatch) {
                    throw new Error("Invalid password");
                }
                return user
            },
        }),
    ],
    // callbacks
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedin = !!auth?.user;
            const authenticatedRoutes = ["/dashboard"];
            const adminRoutes = ["/dashboard/users", "/dashboard/api-key"];
            const guestRoutes = ["/login", "/register"];

            if (
                !isLoggedin &&
                authenticatedRoutes.some(route => nextUrl.pathname.startsWith(route))
            ) {
                return Response.redirect(new URL("/login", nextUrl), 307);
            }

            if (
                isLoggedin &&
                guestRoutes.some(route => nextUrl.pathname.startsWith(route))
            ) {
                return Response.redirect(new URL("/dashboard", nextUrl), 307);
            }


            if (
                isLoggedin &&
                auth?.user?.role !== "ADMIN" &&
                adminRoutes.some(route => nextUrl.pathname.startsWith(route))
            ) {
                return Response.redirect(new URL("/dashboard", nextUrl), 307);
            }

            return true;
        },
        jwt({ token, user }) {
            if (user) token.role = user.role;
            return token
        },
        session({ session, token }) {
            session.user.id = token.sub;
            session.user.role = token.role;
            return session
        }
    },
})
