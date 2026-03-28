import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore"
import SidebarSkeleton from "../components/skeletons/SidebarSkeleton"
import { useAuthStore } from "../store/useAuthStore"
import { Users } from "lucide-react";
import UserCard from "./UserCard";
import { LogOut } from "lucide-react";

const rotations = [
  "skew-y-[-1deg]",
  "skew-y-[1deg]",
]

function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
  const { logout, onlineUsers } = useAuthStore()

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const handleClick = () => {
    logout()
  }

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside
      className="h-screen w-full border-r-2 border-[#0a0a0a]
        flex flex-col transition-all duration-200"
    >
      {/* Header */}
      <div className="flex justify-between border-b-2 border-[#0a0a0a] w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span>Contacts</span>
        </div>
        <button className="flex items-center gap-2  hover:text-red-600  hover:-rotate-4 transition-all cursor-pointer " onClick={handleClick}>
          <LogOut className="size-5" />
          <span className="">
            Logout
          </span>
        </button>
      </div>

      {/* Contacts */}
      <div className="overflow-y-auto w-full py-3 px-2 space-y-4">
        {users.map((user, idx) => (
          <UserCard
            key={user._id}
            user={user}
            className={`
              ${selectedUser?._id === user._id && "bg-red-600"}
              ${rotations[idx % rotations.length]}
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
