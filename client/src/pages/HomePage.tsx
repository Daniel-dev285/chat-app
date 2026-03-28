import Chat  from "../components/Chat"
import EmptyChat from "../components/EmptyChat"
import Sidebar from "../components/Sidebar"
import { useChatStore } from "../store/useChatStore"

function HomePage() {
  const { selectedUser } = useChatStore()
  
  return (
    <div className="h-screen grid grid-cols-1 sm:grid-cols-[400px_1fr] ">
      <Sidebar />

      {!selectedUser ? <EmptyChat /> : <Chat />}
    </div>
  )
}

export default HomePage
