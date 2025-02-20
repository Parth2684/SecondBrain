import { MouseEvent, useState } from "react"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Heading } from "../components/Heading"
import { Topbar } from "../components/Topbar"


export const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setError("");
        if(password !== confirmPassword){
            setError("Passwords do not match")
        }
        if(!(firstName && lastName && email && password)){
            setError("All fields are necessary")
        }
        else{
            const response = await axios.post("http://localhost:3000/signup", {
            firstName,
            lastName,
            email,
            password
        })
            const token = response.data.token;
            localStorage.setItem("token", token)
            navigate("/dashboard")
        }
        
        
    }

    return<div>
        <Topbar isSigned={false} />
            <div className="max-w-screen flex justify-center min-h-screen">
        <div className="flex flex-col h-screen w-[35%]">
            <Heading title="Signup" />
            <InputBox type="text" placeholder="Enter your first name here" label="First Name" onChange={(e => setFirstName(e.target.value))} />
            <InputBox type="text" placeholder="Enter your last name here" label="Last Name" onChange={(e => setLastName(e.target.value))} />
            <InputBox type="email" placeholder="Enter your email here" label="Email" onChange={(e => setEmail(e.target.value))} />
            <InputBox type="password" placeholder="Enter your password here" label="Password" onChange={(e => setPassword(e.target.value))} />
            <InputBox type="password" placeholder="Enter your confirm password here" label="Confirm Password" onChange={(e => setConfirmPassword(e.target.value))} />

            {error && <p className="text-red-600">{error}</p>}
            <div className="self-center mt-2">
                <Button label="Submit" onClick={handleSubmit}/>
            </div>    
        </div>
        
    </div>
    </div> 
    
}