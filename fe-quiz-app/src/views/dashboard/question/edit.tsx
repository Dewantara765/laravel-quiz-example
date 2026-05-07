import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
export default function DashboardQuestionEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [questionText, setQuestionText] = useState("")
    const [categoryId, setCategoryId] = useState(0)
    const [categories, setCategories] = useState<Category[]>([])
    interface Category {
        id_category: number,
        name: string
    }
    useEffect(() => {
        document.title = "Dashboard - Question Edit"
        const getQuestion = async () => {
            try {
                const response = await api.get(`/api/questions/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setQuestionText(response.data.question.question)
                setCategoryId(response.data.question.category.id_category)
            } catch (error) {
                toast.error("Error fetching question")
            }
        }
        getQuestion()

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
    }, [])

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await api.put(`/api/questions/${id}`, {
                question: questionText,
                category_id: categoryId
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            toast.success("Question updated successfully")
            navigate("/dashboard/question")
        } catch (error) {
            toast.error("Error updating question")
        }
    }
    return (
        <div>
            <p className="text-2xl font-bold">Dashboard Question Edit</p>
            <form onSubmit={submit}>
                <div className="flex gap-3 m-3 p-3">
                    <label htmlFor="questionText">Question Text</label>
                    <textarea id="questionText" name="questionText" rows={5} cols={50} className="bg-gray-300 p-1 rounded" onChange={(e) => setQuestionText(e.target.value)} value={questionText}/>
                </div>
                <div className="flex gap-3 m-3 p-3">
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" className="bg-gray-300 p-1 rounded" onChange={(e) => setCategoryId(Number(e.target.value))} value={categoryId}>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id_category} value={category.id_category}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 rounded p-2 text-white">Update</button>
            </form>
        </div>
    )
}