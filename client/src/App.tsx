import { Navigate, Route, Routes } from "react-router-dom"

import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"

import { LoaderCircle } from "lucide-react"

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <LoaderCircle className="size-10 animate-spin"/>
    </div>
  )

  return (
    <div className="">
      <Routes>
        <Route 
        path="/" 
        element={authUser ? <HomePage /> : <Navigate to={"/login"}/>}></Route>
        <Route 
        path="/signup" 
        element={!authUser ? <SignupPage /> : <Navigate to={"/"}/>}></Route>
        <Route 
        path="/login" 
        element={!authUser ? <LoginPage /> :  <Navigate to={"/"}/>}></Route>
        <Route 
        path="/profile" 
        element={authUser ? <ProfilePage /> : <Navigate to={"/login"}/> }></Route>
      </Routes>
    </div>
  )
}

export default App
