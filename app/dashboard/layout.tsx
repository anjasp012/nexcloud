import Navbar from "@/components/navbar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-4">
                {children}
            </div>
        </>
    )
}

export default DashboardLayout
