import { useAuthStore } from "../store/useAuthStore"
import { motion } from "framer-motion"
import { Camera } from "lucide-react"


function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    
  }

  return (
    <div className="bg-[url('./assets/chat-bg.png')] bg-cover h-screen flex items-center justify-center">
      {/* Card */}
      <motion.div
        initial={{ scale: 0.8, rotate: -3 }}
        animate={{ scale: 1, rotate: -3 }}
        className="bg-black border-4 border-white p-8 w-95 shadow-[8px_8px_0px_#fff]"
      >
        {/* Title */}
        <h1 className="text-2xl text-center font-extrabold mb-6  skew-x-[-10deg]">
          PROFILE
        </h1>

        {/* Avatar */}
        <div className=" flex items-center justify-center">
          <div className="relative group flex">
            <img 
            className="size-32 object-cover border-4 group-hover:opacity-50 transition-opacity " src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" 
            alt="Profile" />
            <div 
            className="absolute bottom-0 right-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity bg-opacity-50 p-2 rounded-full cursor-pointer">
              <Camera className="size-8" />
              <input 
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
              />
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  )
}

export default ProfilePage
