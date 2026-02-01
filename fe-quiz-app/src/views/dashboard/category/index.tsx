import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
export default function DashboardCategoryIndex() {
    const [categories, setCategories] = useState<Category[]>([])
    const [error, setError] = useState<string>("")
    interface Category {
        id_category: number,
        name: string
    }

    useEffect(() => {
        document.title = "Category Index"

        const getCategories = async () => {
            try {
                const response = await api.get("/api/categories", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setCategories(response.data.categories)
            } catch (error) {
                if(error instanceof Error){
                    setError(error.message)
                }
                
            }
        }
        getCategories()
    }, [])

    const deleteCategory = async (id_category: number) => {
        try {
            const response =await api.delete(`/api/categories/${id_category}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setCategories(categories.filter((category) => category.id_category !== id_category))
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <p className="text-2xl font-bold mb-3">Category</p>
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <button className="bg-slate-500 text-white p-2 rounded mb-3">
                <Link to="/dashboard/category/create">Add Category</Link>
            </button>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left w-1/12">No</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
            
            <tbody>
                {categories && categories.map((category, index) => {
                return (
                    <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2 w-1/12">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                        <td className="border border-gray-300 px-4 py-2"><button className="bg-yellow-400 p-2 m-2 rounded hover:bg-yellow-500">
                            <Link to={`/dashboard/category/edit/${category.id_category}`}>Edit</Link>
                        </button>
                         <button onClick={() => deleteCategory(category.id_category)}  className="bg-red-500 text-white p-2 rounded hover:bg-red-400">Delete</button></td>

                    </tr>
                )
            })}
            </tbody>
            </table>
            
        </div>
    )
}