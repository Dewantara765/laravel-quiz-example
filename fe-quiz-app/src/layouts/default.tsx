import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
export default function DefaultLayout() {
    interface User {
            id_user: number,
            name: string,
            email: string,
        }
            
        
    const [user, setUser] = useState<User[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        
        const getUser = async () => {
            try {
                const response = await api.get("/api/user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setUser(response.data.user)
               
            } catch (error) {
                console.log(error)
            }
            
        }
        getUser()
    }, [])

    const logout = () => {
        try {
             api.post("/api/logout", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            localStorage.removeItem("token")
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='bg-sky-500 p-4 flex text-white flex justify-between'>
                <div>
                    <div><NavLink to="/">Home</NavLink></div>
                </div>
                <div className="flex gap-2 items-center">
                    <div>{user.name}</div>
                    <div onClick={logout}><button className="p-2 rounded bg-red-500">Logout</button></div>
                </div>
                
            </div>
            <div className="p-4">
                <Outlet />
            </div>
            
        </div>
       
    )
}