"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { signInCredentials } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom"

const Login = () => {
    const [state, formAction] = useFormState(signInCredentials, null);
    const { pending } = useFormStatus();

    console.log(pending);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter your profile information below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                    <div className="grid gap-4">
                        {state?.message && (
                            <div className="bg-red-100 text-red-800 p-4 rounded">{state?.message}</div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="Email" />
                            <div aria-live="polite" aria-atomic="true">
                                <span className="text-red-500 text-sm">{state?.error?.email}</span>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="Password" />
                            <div aria-live="polite" aria-atomic="true">
                                <span className="text-red-500 text-sm">{state?.error?.password}</span>
                            </div>
                        </div>
                        <Button type="submit" disabled={pending}>
                            {pending ? 'Logging in...' : 'Login'}
                        </Button>

                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default Login
