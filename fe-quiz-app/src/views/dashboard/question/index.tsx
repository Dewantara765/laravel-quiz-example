import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify/unstyled";
export default function DashboardQuestionIndex() {
    const [questions, setQuestions] = useState<Question[]>([])
    const [error, setError] = useState<string>("")
    interface Question {
        id_question: number,
        question: string,
        category: {
            id_category: number,
            name: string
        }
    }
    useEffect(() => {
        document.title = "Dashboard - Question"
        const getQuestions = async () => {
            try {
                const response = await api.get("/api/questions", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setQuestions(response.data.questions)
            } catch (error) {
                if(error instanceof Error){
                    setError(error.message)
                }
            }
        }
        getQuestions()
    }, [])

    const deleteQuestion = async (id_question: number) => {
            try {
                const response =await api.delete(`/api/questions/${id_question}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setQuestions(questions.filter((question) => question.id_question !== id_question))
                toast.success(response.data.message)
            } catch (error) {
                console.log(error)
            }
        }
    return (
        <div>
            <p className="text-2xl font-bold">Dashboard Question</p>
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left w-1/12">No</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Question</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
            
            <tbody>
                {questions && questions.map((question, index) => {
                return (
                    <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2 w-1/12">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">{question.question}</td>
                        <td className="border border-gray-300 px-4 py-2">{question.category.name}</td>
                        <td className="border border-gray-300 px-4 py-2"><button className="bg-yellow-400 p-2 m-2 rounded hover:bg-yellow-500">
                            <Link to={`/dashboard/question/edit/${question.id_question}`}>Edit</Link>
                        </button>
                        <button onClick={() => deleteQuestion(question.id_question)}  className="bg-red-500 text-white p-2 rounded hover:bg-red-400">Delete</button></td>

                    </tr>
                )
            })}
            </tbody>
            </table>
        </div>
    )
}