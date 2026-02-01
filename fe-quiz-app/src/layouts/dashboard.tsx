import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"
export default function DashboardLayout() {
    return (
        <div className="grid grid-cols-[1fr_9fr]">
            <div className="bg-slate-500 p-3 h-screen text-white">
                <h1>Dashboard</h1>
                <div><NavLink to="/dashboard/" end>Home</NavLink></div> 
                <div><NavLink to="/dashboard/category">Category</NavLink></div>           
            </div>
            <div className="p-3">
                <Outlet />
            </div>
        </div>
    )
}