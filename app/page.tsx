import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Login Or Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <Link className={buttonVariants({ variant: "default" })} href="/login">Login</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/register">Register</Link>
                </CardContent>
            </Card>
        </div>
    );
}
