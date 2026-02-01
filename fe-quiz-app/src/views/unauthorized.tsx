import { useEffect } from "react"
export default function Unauthorized() {
    useEffect(() => {
        document.title = "Unauthorized"
    })
    return (
        <div>
            <h1>Unauthorized</h1>
        </div>
    )
}