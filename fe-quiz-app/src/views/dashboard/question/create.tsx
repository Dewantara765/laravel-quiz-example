import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
export default function DashboardQuestionCreate() {
    const [questionText, setQuestionText] = useState("")
    const [categoryId, setCategoryId] = useState<number | "">("")
    const [categories, setCategories] = useState<Category[]>([])
    const [options, setOptions] = useState([
        { option_text: "", isCorrect: false },
        { option_text: "", isCorrect: false },
        { option_text: "", isCorrect: false },
        { option_text: "", isCorrect: false }
    ])


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
                category_id: categoryId,
                options: options.map((option) => ({
                    option_text: option.option_text,
                    is_correct: option.isCorrect
                }))
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
                
                {options.map((option, index) => (
                    <div className="flex gap-3 m-3 p-3" key={index}>
                        <input
                            type="text"
                            id={`optionText-${index}`}
                            name={`optionText-${index}`}
                            className="bg-gray-300 p-1 rounded"
                            value={option.option_text}
                            onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[index].option_text = e.target.value;
                                setOptions(newOptions);
                            }}
                        placeholder={`Option ${index + 1}`} />

                        <input type="checkbox" name={`isCorrect-${index}`} className="bg-gray-300 p-1 rounded" checked={option.isCorrect} onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index].isCorrect = e.target.checked;
                            setOptions(newOptions);
                        }}/>
                    </div>
                ))}
                {/* <div className="flex gap-3 m-3 p-3">
                    <label htmlFor="isCorrect">Is Correct</label>
                    <input type="radio" id="isCorrect" name="isCorrect" className="bg-gray-300 p-1 rounded" onChange={(e) => setOptions([...options, { option_text: options[options.length - 1].option_text, isCorrect: e.target.checked }])}/>
                </div> */}
                <button type="submit" className="bg-blue-500 rounded p-2 text-white">Create</button>
            </form>
        </div>
    )
}