import { useState } from "react"

function SignupPage() {
  const {showPassword, setShowPassword} = useState(false)
  const {formData, setFormData} = useState({
    fullName: "",
    email: "",
    password: "",
  })

  return (
    <div>
      signuppage
    </div>
  )
}

export default SignupPage
