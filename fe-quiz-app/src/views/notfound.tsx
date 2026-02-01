import { useEffect } from "react"
export default function NotFound() {
    useEffect(() => {
        document.title = "Not Found"
    })
    return (
        <div>
            <p className="flex items-center">
                <span className="text-4xl font-bold">404 |</span> Not Found
            </p>
        </div>
    )
}