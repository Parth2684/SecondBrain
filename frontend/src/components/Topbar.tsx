import { useNavigate } from "react-router-dom"
import { Button } from "./Button"


export const Topbar = ({isSigned}: {isSigned: boolean}) => {
    const navigate = useNavigate()
    return <div className="min-w-screen min-h-14 opacity-50 bg-blue-300">
        <div className="text-4xl min-w-screen text-indigo-950 opacity-100 text-center font-bold">
            <div className="min-w-screen flex">
                <div className="self-center justify-center ml-122">
                Second Brain
                </div>
                <div className="justify-end self-end ml-100">
                    <div >
                    {isSigned === true ?  <div className="min">
                <Button label="Logout" onClick={() => {
                    localStorage.removeItem("token")
                    navigate("/signup")
                }}/>
            </div> : <div></div>}
        
                    </div>
            
                </div>
            
            </div>
        
        
        </div>
        
    </div>
}