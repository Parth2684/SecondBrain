import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { MouseEvent, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Heading } from "../components/Heading"
import { Topbar } from "../components/Topbar"

export const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleSubmit (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setError("")
        if(!(email && password)){
            setError("All fields are required")
        }else{
            const response = await axios.post("http://localhost:3000/signin", {
                email,
                password
            })
            const token = response.data.token
            localStorage.setItem("token", token)
            navigate("/dashboard")
        }
    }

    return <div>
        <Topbar isSigned={false}/>
            <div className="max-w-screen flex justify-center ">
                <div className="flex flex-col h-screen justify-self-center w-[35%]">
                    <Heading title="Sign in" />
                    <InputBox type="email" placeholder="Enter your email here" label="Email" onChange={(e => setEmail(e.target.value))} />
                    <InputBox type="password" placeholder="Enter your password here" label="Password" onChange={(e => setPassword(e.target.value))} />
                    
                    {error && <p className="text-red-600">{error}</p>}
                    <div className="self-center mt-2">
                        <Button label="Submit" onClick={handleSubmit}/>
                    </div>    
                </div>
                
            </div>
        </div>
}