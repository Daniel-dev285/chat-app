import { motion } from "framer-motion"

export const PersonaToast = ({
  message,
  visible
}: {
  message: string
  visible: boolean
}) => {
  return (
    <motion.div
      initial={{ x: 120, opacity: 0, rotate: 6, scale: 0.9 }}
      animate={
        visible
          ? { x: 0, opacity: 1, rotate: -3, scale: 1 }
          : { x: 120, opacity: 0, rotate: 6, scale: 0.9 }
      }
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      className="bg-black text-white border-4 border-white px-3 py-1.5 
                 shadow-[5px_5px_0px_#fff] skew-x-[-10deg]"
    >
      {message}
    </motion.div>
  )
}