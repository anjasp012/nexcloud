import { getApiKey } from "@/lib/data"
import FormEdit from "@/components/apiKey/form-edit"

const EditApiKey = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const apiKey = await getApiKey(id);
    console.log('ini adalah:', apiKey);
    return (
        <>
            <FormEdit apiKey={apiKey} />
        </>
    )
}

export default EditApiKey
