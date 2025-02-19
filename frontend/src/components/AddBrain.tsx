import axios from "axios"
import { Button } from "./Button"
import { InputBox } from "./InputBox"
import { MouseEvent, useState } from "react"



export const AddBrain = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    async function handleSubmit (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setError("")
        if(!title) {
            setError("Atleast title should be provided")
        }else{try{
            await axios.post("http://localhost:3000/createBrain",{
                title,
                description
            },{
                headers: {
                    Authorization:`${localStorage.getItem("token")}`
                }
            })
        }catch(e){
            console.error(e)
            setError("There was a error saving the note")
        }
                    }
    }
    return <div className="flex min-w-screen justify-center">
        <div className="w-[50%] ">
            <InputBox type="text" label="Title" placeholder="Enter title here" onChange={(e) => setTitle(e.target.value)} />
            <InputBox type="text" label="Description" placeholder="Enter description here" onChange={(e) => setDescription(e.target.value)} />
            {error && <p className="text-red-600">{error}</p>}
            <Button label="Save" onClick={handleSubmit} />
        </div>
    </div>
     
}