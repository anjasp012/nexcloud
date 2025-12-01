import Link from "next/link"
import { auth, signOut } from "@/auth"
import { Button } from "./ui/button"

const Navbar = async () => {
    const session = await auth()
    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="text-2xl font-bold">NexCloud</div>
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard">Dashboard</Link>
                        {!session ? (
                            <div>
                                <Link href="/login">Login</Link>
                                <Link href="/register">Register</Link>
                            </div>
                        )
                            :
                            (
                                <>
                                    <Link href="/dashboard/api-key">Api Key</Link>
                                    {session?.user?.role === "ADMIN" && (
                                        <Link href="/dashboard/users">Kelola User</Link>
                                    )}
                                    <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }) }}>
                                        <Button variant={"destructive"} type="submit">Logout</Button>
                                    </form>
                                </>
                            )

                        }
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar
