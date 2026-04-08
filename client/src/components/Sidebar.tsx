import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore"
import SidebarSkeleton from "../components/skeletons/SidebarSkeleton"
import { useAuthStore } from "../store/useAuthStore"
import { User, LogOut } from "lucide-react"
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"


function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
  const { logout, onlineUsers } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const handleClick = () => {
    logout()
    setSelectedUser(null)
  }

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside
      className="h-screen w-full border-r-2 border-[#0a0a0a]
        flex flex-col transition-all duration-200"
    >
      {/* Header */}
      <div className="flex justify-between border-b-2 border-[#0a0a0a] w-full p-5">
        <motion.button
          whileHover={{ scale: 1.05, rotate: -2}}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2  hover:text-red-600 cursor-pointer">
          <User className="w-6 h-6" />
          <span>My Profile</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 hover:text-red-600 cursor-pointer " onClick={handleClick}>
          <LogOut className="size-5" />
          <span className="">
            Logout
          </span>
        </motion.button>
      </div>

      {/* Contacts */}
      <div className="overflow-y-auto w-full py-3 px-2 space-y-4">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            className={`
              ${selectedUser?._id === user._id && "bg-red-600"}
              ${selectedUser?._id !== user._id && "hover:bg-[#161616]"} 
            `}
            onClick={() => setSelectedUser(user)}
            onlineUsers={onlineUsers}
          />
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
