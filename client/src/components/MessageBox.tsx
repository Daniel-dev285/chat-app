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
        "max-w-lg px-5 py-3", className)}
    >
      <p className="">
        {message.text}
      </p>
    </div>
  )
}

export default MessageBox
