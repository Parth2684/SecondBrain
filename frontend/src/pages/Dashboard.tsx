import axios from "axios"
import { useEffect, useState } from "react"
import { AddBrain } from "../components/AddBrain";

interface BrainSchema {
    title: string;
    description: string;
}

export const Dashboard = () => {
    const [brain, setBrain] = useState<BrainSchema[]>([])
    useEffect(() => {
        async function fetchBrain () {
            const response = await axios.get("http://localhost:3000/getBrain", {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            })
            setBrain(response.data.brain)
        }
        fetchBrain()
    },[])
    return <div className="h-screen overflow-y-auto border p-4">
        <AddBrain />
        {brain.map((item, index) => (
            <div key={index} className="m-2 justify-self-center">
                <div className="text-white text-xl">
                    Title: {item.title}
                </div>
                <div className="text-white">
                    Description: {item.description}
                </div>
            </div>
            
        ))}
    </div>
}