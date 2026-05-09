import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

interface Category {
    id_category: number
    name: string
}

export default function DashboardQuestionEdit() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [questionText, setQuestionText] = useState("")
    const [categoryId, setCategoryId] = useState<number | "">("")
    const [categories, setCategories] = useState<Category[]>([])

useEffect(() => {
    document.title = "Dashboard - Question Edit"

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token")

            const [questionRes, categoriesRes] = await Promise.all([
            api.get(`/api/questions/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
        api.get("/api/categories", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }),
        ])

        setQuestionText(questionRes.data.question.question)
        setCategoryId(questionRes.data.question.category.id_category)
        setCategories(categoriesRes.data.categories)
    } catch (error) {
        toast.error("Failed to fetch data")
    }
    }

    if (id) fetchData()
}, [id])

const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!categoryId) {
    toast.error("Please select a category")
    return
    }

    try {
    await api.put(
        `/api/questions/${id}`,
        {
        question: questionText,
        category_id: categoryId,
        },
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        }
    )

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
        <textarea
            id="questionText"
            rows={5}
            cols={50}
            className="bg-gray-300 p-1 rounded"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
        />
        </div>

        <div className="flex gap-3 m-3 p-3">
        <label htmlFor="category">Category</label>
        <select
            id="category"
            className="bg-gray-300 p-1 rounded"
            value={categoryId}
            onChange={(e) =>
            setCategoryId(
                e.target.value === "" ? "" : Number(e.target.value)
            )
            }
        >
            <option value="">Select a category</option>

            {categories.map((category) => (
            <option
                key={category.id_category}
                value={category.id_category}
            >
                {category.name}
            </option>
            ))}
        </select>
        </div>

        <button
        type="submit"
        className="bg-blue-500 rounded p-2 text-white"
        >
        Update
        </button>
    </form>
    </div>
)
}