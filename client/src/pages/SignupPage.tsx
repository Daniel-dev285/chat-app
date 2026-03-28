import { useState } from "react"
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { signupSchema } from "../schemas/auth.schema";
import { showError } from "../lib/toast";

interface FormFields {
  fullName: string
  email: string
  password: string
}

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState<FormFields>({
    fullName: "",
    email: "",
    password: "",
  })


  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    const result = signupSchema.safeParse(formData)

    if (!result.success) {
      const firstError = result.error.issues[0]
      showError(firstError.message)
      return null
    }

    return result.data
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = validateForm()

    if (!data) return

    signup(data)
  }

  return (
    <div className="bg-[url('./assets/p5-background.png')] bg-cover min-h-screen  flex items-center justify-center">
      {/* Card */}
      <motion.div
        initial={{ scale: 0.8, rotate: -3 }}
        animate={{ scale: 1, rotate: -3 }}
        className="bg-black border-4 border-white p-8 w-95 shadow-[8px_8px_0px_#fff]"
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-6 skew-x-[-10deg]">
          SIGN UP
        </h1>

        {/* Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            placeholder="USERNAME"
            value={formData.fullName}
            onChange={(e) => setFormData((prev) => ({
              ...prev,
              fullName: e.target.value
            }))}
            className="border-2 border-white p-3 placeholder-white focus:outline-none focus:border-red-500"
          />

          <input
            placeholder="EMAIL"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({
              ...prev,
              email: e.target.value
            }))}
            className="border-2 border-white p-3 placeholder-white focus:outline-none focus:border-red-500"
          />

          <div className="relative w-full">
            <input
              placeholder="PASSWORD"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                password: e.target.value
              }))}
              type={showPassword ? "text" : "password"}
              className="w-full border-2 appearance-none border-white p-3 placeholder-white focus:outline-none focus:border-red-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer right-0 inset-y-0 flex items-center pr-3">
              {showPassword
                ? <EyeOff />
                : <Eye />
              }
            </button>
          </div>


          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSigningUp}
            className="bg-red-600 text-white font-bold py-3 mt-4 border-2 border-white shadow-[4px_4px_0px_#fff] cursor-pointer"
          >
            {isSigningUp
              ? "TAKE YOUR TIME..."
              : "CREATE ACCOUNT"
            }

          </motion.button>
        </form>

        {/* Switch */}
        <p className="mt-6 text-sm flex gap-1">
          Already have an account?
          <span
            className="text-red-600 cursor-pointer font-bold"
          >
            <Link to={'/login'}>Login</Link>
          </span>
        </p>
      </motion.div>
    </div>)
}

export default SignupPage
