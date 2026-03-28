import toast from "react-hot-toast"
import { PersonaToast } from "../components/PersonaToast"

export const showError = (message: string) => {
  toast.custom((t) => (
    <PersonaToast
      message={message}
      visible={t.visible}
    />
  ), {
    id: "form-error"
  })
}

export const showSuccess = (message: string) => {
  toast.dismiss()
  toast.custom((t) => (
    <PersonaToast
      message={message}
      visible={t.visible}
    />
  ),)
}