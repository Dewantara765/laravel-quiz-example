import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
export default function DashboardQuestionCreate() {
    const [questionText, setQuestionText] = useState("")
    const [categoryId, setCategoryId] = useState<number | "">("")
    const [categories, setCategories] = useState<Category[]>([])
    interface Category {
        id_category: number,
        name: string
    }
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Dashboard - Question Create"
        const getCategories = async () => {
            try {
                const response = await api.get("/api/categories", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setCategories(response.data.categories)
            } catch (error) {
                console.error("Error fetching categories:", error)
            }
        }
        getCategories()
        // Initialization logic for the component
    }, [])

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await api.post("/api/questions", {
                question: questionText,
                category_id: categoryId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            toast.success(response.data.message)
            navigate("/dashboard/question")
        } catch (error) {
            console.error("Error creating question:", error)
        }
    }

    return (
        <div>
            <p className="text-2xl font-bold">Dashboard Question Create</p>
            <form onSubmit={submit}>
                <div className="flex gap-3 m-3 p-3">
                    <label htmlFor="questionText">Question Text</label>
                    <textarea id="questionText" name="questionText" rows={5} cols={50} className="bg-gray-300 p-1 rounded" onChange={(e) => setQuestionText(e.target.value)}/>
                </div>
                <div className="flex gap-3 m-3 p-3">
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" className="bg-gray-300 p-1 rounded" onChange={(e) => setCategoryId(Number(e.target.value))}>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id_category} value={category.id_category}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 rounded p-2 text-white">Create</button>
            </form>
        </div>
    )
}