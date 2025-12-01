import { Button } from "../ui/button";
import { apiInfo } from "@/lib/data";

const ApiTest = async ({ api_key }: { api_key: string }) => {
    return (
        <Button variant={"outline"} onClick={() => apiInfo(api_key)}>Test</Button>
    )
}

export default ApiTest
