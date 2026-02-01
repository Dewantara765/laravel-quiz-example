import { useEffect, useState } from "react"
import { api } from "../services/api"
import { Link } from "react-router-dom"

export default function Home() {
    const [categories, setCategories] = useState<Category[]>([])
    interface Category {
        id_category: number,
        name: string
    }
     useEffect(() => {
        document.title = "Home"
        const getCategories = async () => {
            try {
                const response = await api.get("/api/categories", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setCategories(response.data.categories)
            } catch (error) {
                console.log(error)
            }
        }
        getCategories()
    }, [])
    return (

        <div>
            <p className="text-2xl font-bold">Category</p>
            <div className="flex gap-4">
                {categories.map((category) => (
                    <div key={category.id_category}>
                        <p><Link to={`/category/${category.id_category}/questions`} 
                        className="text-blue-500 underline">{category.name}</Link></p>
                    </div>
                ))}
            </div>
        </div>
    )
}