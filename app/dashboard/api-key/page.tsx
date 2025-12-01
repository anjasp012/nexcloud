import ApiTest from "@/components/apiKey/api-test"
import FormDelete from "@/components/apiKey/form-delete"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { deleteApiKey } from "@/lib/actions"
import { getApiKey } from "@/lib/data"
import Link from "next/link"

interface ApiKey {
    id: string;
    api_key: string;
    createdAt: Date;
    updatedAt: Date | null;
}

const ApiKey = async () => {
    const apiKeys: ApiKey[] = await getApiKey();
    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Api Key</CardTitle>
                        <Link className={buttonVariants({ variant: "default" })} href="/dashboard/api-key/create">Tambah Api Key</Link>
                    </div>
                </CardHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead>Api key</TableHead>
                            <TableHead className="text-center">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {apiKeys.map((api, index) => (
                            <TableRow key={api.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell className="font-medium">{api.api_key}</TableCell>
                                <TableCell className="text-center">
                                    <div className="flex gap-1 justify-center">
                                        <Link href={`/dashboard/api-key/edit/${api.id}`} className={buttonVariants({ variant: "secondary" })}>Edit</Link>
                                        <FormDelete id={api.id} />
                                        {/* <ApiTest api_key={api.api_key} /> */}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card >
        </>
    )
}

export default ApiKey
