import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { useParams } from "react-router-dom"
export default function Finished() {
    const { id } = useParams();
    const [score, setScore] = useState<number>(0);
    const [total_benar, setTotalBenar] = useState<number>(0);
    const [total_salah, setTotalSalah] = useState<number>(0);
    useEffect(() => {
        document.title = "Finished"
    }, [])

    const checkScore = async () => {
        try {
            const response = await api.post('/api/quiz/result', {
                category_id: id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setScore(response.data.score);
            setTotalBenar(response.data.total_benar);
            setTotalSalah(response.data.total_salah);
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <div>
            <p className="text-2xl font-bold">Quiz Selesai.</p>
            <p className="mt-4">Silahkan cek skor anda dengan klik tombol di bawah.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={checkScore}>Cek Skor</button>
            {score > 0 && 
            <div className="mt-4">
                <p className="text-lg">Total Benar: {total_benar}</p>
                <p className="text-lg">Total Salah: {total_salah}</p>
                <p className="text-lg font-bold">Skor Akhir: {score}</p>
            </div>
            }
        </div>
    )
}                