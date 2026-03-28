import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader"
import ChatHistory from "./ChatHistory"
import ChatInput from "./ChatInput"

function Chat() {
  const { messages, isMessagesLoading, getMessages, selectedUser } = useChatStore()

  useEffect(() => {
    getMessages(selectedUser?._id)
  }, [getMessages, selectedUser?._id])


  return (
    <section className="bg-[url('./assets/chat-bg.png')] bg-cover flex  flex-col  ">
      <ChatHeader />
      <ChatHistory messages={messages}/>
      <ChatInput />
    </section>
  )
}

export default Chat
