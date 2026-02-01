import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../../services/api";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
export default function DashboardCategoryEdit() {
    const { id } = useParams();
    const [name, setName] = useState<string>("")
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Category Edit"
        const getCategory = async () => {
            try {
                const response = await api.get(`/api/categories/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setName(response.data.category.name)
            } catch (error) {
                console.log(error)
            }
        }
        getCategory()
    },[id])

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await api.put(`/api/categories/${id}`, {
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
            <p className="text-2xl font-bold">Category Edit</p>
            <form onSubmit={submit}>
                <div className="flex gap-3 m-3 p-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" className="bg-gray-300 p-1 rounded" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <button type="submit" className="bg-blue-500 rounded p-2 text-white">Save</button>
            </form>
            
        </div>
    )
}