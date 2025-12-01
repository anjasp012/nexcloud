"use client"

import { deleteApiKey } from "@/lib/actions"
import { useFormState } from "react-dom"
import { Button } from "../ui/button"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog"
import { AlertDialogAction } from "@radix-ui/react-alert-dialog"

const FormDelete = ({ id }: { id: string }) => {
    const [state, formAction] = useFormState(deleteApiKey, null)

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this API key.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    {/* Form server action di tombol Continue */}
                    <form action={formAction}>
                        <input type="hidden" name="id" value={id} />
                        <AlertDialogAction asChild>
                            <Button
                                type="submit"
                                variant="destructive"
                            >
                                Continue
                            </Button>
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default FormDelete
