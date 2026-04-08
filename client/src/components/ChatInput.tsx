import { useState } from "react"
import { useChatStore } from "../store/useChatStore"

const ChatInput = () => {
  const [input, setInput] = useState("")
  const { sendMessages } = useChatStore()

  const handleSendMessage = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await sendMessages({
        text: input.trim(),
      })
      setInput("")
    } catch (error) {
      console.log("Failed to send message", error)
    }

  }

  return (
    <div className="px-8 ">
      <form onSubmit={handleSendMessage} className="flex items-center bg-black shadow-[8px_8px_0px_white] p-3 border-2 -rotate-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full outline-none text-lg p-2 "
          placeholder="TYPE YOUR INTEL..."
          type="text" />
        <button
          className="cursor-pointer"
          type="submit">
          SEND
        </button>
      </form>
    </div>
  )
}

export default ChatInput
