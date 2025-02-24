
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"
import { Signin } from "./pages/Signin"
import { RedirectFromSlash } from "./pages/RedirectFromSlash"


function App() {

  return (
    <>
      <div className="bg-[url('/images/background.png')] bg-cover min-w-screen min-h-screen">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectFromSlash />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />}  />
          <Route path="/signin" element={<Signin />} />
        </Routes>
        </BrowserRouter>
        
      </div>
    </>
  )
}

export default App
