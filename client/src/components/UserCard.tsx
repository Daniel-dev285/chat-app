import { cn } from "../lib/utils"
import { type authUser } from "../types/auth.type"
import { motion } from "framer-motion";

interface Props {
    user: authUser
    onClick?: () => void
    className?: string
    onlineUsers: string[]
}

function UserCard({ user, onClick, className, onlineUsers }: Props) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0.8, rotate: -1 }}
            animate={{ scale: 1, rotate: -1 }}
            onClick={onClick}
            key={user._id}
            className={cn(
                `
                w-full bg-[#0a0a0a] cursor-pointer p-3 flex items-center gap-5`, className)}>
            {/* Avatar */}
            <div>
                <img
                    src={user.profilePic || "/avatar.png"}
                    alt=""
                    className="size-12 object-cover border-2"
                />
            </div>

            {/* User info*/}
            <div className="flex flex-col">
                <div className="flex">
                    <span className="">{user.fullName}</span>
                </div>
                <div className="flex">
                    <span className="text-sm">
                        {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

export default UserCard
