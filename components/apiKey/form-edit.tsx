"use client"

import { updateApiKey } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ApiKeyType {
    id: string;
    api_key: string;
}

const FormEdit = ({ apiKey }: { apiKey: ApiKeyType }) => {
    const [state, formAction] = useFormState(updateApiKey, null);
    const { pending } = useFormStatus();
    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Ubah Api Key</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <div className="grid gap-4">
                            {state?.message && (
                                <div className="bg-red-100 text-red-800 p-4 rounded">{state?.message}</div>
                            )}
                            <Input id="id" name="id" type="hidden" value={apiKey.id} />
                            <div className="grid gap-2">
                                <Label htmlFor="api_key">Api Key</Label>
                                <Input id="api_key" name="api_key" type="text" placeholder="Api key" defaultValue={apiKey.api_key} />
                                {state?.error?.api_key && (
                                    <div aria-live="polite" aria-atomic="true">
                                        <span className="text-red-500 text-sm">{state?.error?.api_key}</span>
                                    </div>
                                )}
                            </div>
                            <Button type="submit" disabled={pending}>
                                {pending ? 'Updating...' : 'Update'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default FormEdit
