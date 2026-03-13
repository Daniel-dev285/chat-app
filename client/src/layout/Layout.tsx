import  Chat  from "../components/Chat"
import './Layout.css'

export function Layout() {
  return (
    <div className="h-screen w-screen">
        <main className=" h-screen bg-[url('./assets/chat-background.png')] bg-contain bg-center ">
            <Chat />
        </main>
    </div>
  )
}

export default Layout
