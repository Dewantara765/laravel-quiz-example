import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
export default function DashboardCategoryCreate() {
    const [name, setName] = useState<string>("")
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "Category Create"
    })

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await api.post("/api/categories", {
                name: name
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            toast.success(response.data.message)
            navigate("/dashboard/category")
            
        } catch (error) {
            if (error instanceof Error) {
            toast.error(error.message)
        }
        }
    }
    return (
        <div>
            <p className="text-2xl font-bold">Category Create</p>
            <form onSubmit={submit}>
                <div className="flex gap-3 m-3 p-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" className="bg-gray-300 p-1 rounded" onChange={(e) => setName(e.target.value)}/>
                </div>
                <button type="submit" className="bg-blue-500 rounded p-2 text-white">Create</button>
            </form>
        </div>
    )
}