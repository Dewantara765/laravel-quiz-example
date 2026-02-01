import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"
export default function Login(){
    useEffect(() => {
        document.title = "Login"
    })

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const navigate = useNavigate()

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await api.post("/api/login", {
                email: email,
                password: password
            })
            const token = response.data.data.token
            const role = response.data.data.role
            if(token && role){
                
                localStorage.setItem("token", token)
                localStorage.setItem("role", role)
                navigate("/")
            }
           
        } catch (error) {
            setError("Invalid email or password");
        }

    }
    return (
        <div className="p-4 bg-sky-300 w-xl">
            <p className="text-2xl font-bold flex justify-center">Login</p>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={submit}>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="border border-black p-1 bg-gray-100" 
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="border border-black p-1 bg-gray-100" 
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md m-4">Login</button>
                </div>
            </form>
        </div>
    )
}