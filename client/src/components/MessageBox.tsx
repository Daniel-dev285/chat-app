import { cn } from "../lib/utils"
import { type Message } from "../types/chat.type"

interface Props {
  message: Message
  className?: string
}

function MessageBox({ message, className }: Props) {
  return (
    <div
      className={cn(
        "bg-red-600 max-w-lg border-2 border-white shadow-[4px_4px_0px_white] px-5 py-2", className)}
    >
      <p>
        {message.text}
      </p>
    </div>
  )
}

export default MessageBox
