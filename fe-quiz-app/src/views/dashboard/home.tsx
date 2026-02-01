import { useEffect } from "react"
export default function DashboardHome() {
    useEffect(() => {
        document.title = "Dashboard"
    })
    return (
        <div>
            <p className="text-2xl font-bold">Dashboard Home</p>
        </div>
    )
}