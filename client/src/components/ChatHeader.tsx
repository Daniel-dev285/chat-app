import { useChatStore } from "../store/useChatStore"
import { motion } from "framer-motion"

const rotations = [
  "rotate-[-6deg]",
  "rotate-[4deg]",
  "rotate-[-2deg]",
  "rotate-[5deg]",
  "rotate-[-4deg]",
]

function ChatHeader() {
    const { selectedUser } = useChatStore()

    return (
        <motion.header
        key={selectedUser?._id}
        initial={{scale: 0.5, rotate: -2}}
        animate={{ scale: 0.9, rotate: -2 }}
        className="p-6 flex justify-center items-center">
            <div className="bg-red-600 px-8 py-4 shadow-[8px_8px_0px_white] flex items-center gap-2">
                {selectedUser?.fullName.split("").map((char, idx) => {
                    const isSpace = char === " "
                    const isWhite = idx % 2 === 0

                    return (
                        <span
                            key={idx}
                            className={`
                                ${isSpace ? "w-3" : ""}
                                ${isWhite ? "bg-white text-black" : "bg-black text-white"}
                                ${rotations[idx % rotations.length]}
                                
                                px-2 py-1 font-extrabold text-xl flex
                            `}
                        >
                            {char.toUpperCase()}
                        </span>
                    )
                })}
            </div>
        </motion.header>
    )
}

export default ChatHeader
