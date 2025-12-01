import { auth } from "@/auth"
import { json } from "zod"
const Dashboard = async () => {
    const session = await auth()
    return (
        <div>
            <div>Dashboard</div>
            <div>hii {session?.user?.name}</div>
            <div>Role: {JSON.stringify(session)}</div>
        </div>
    )
}

export default Dashboard
