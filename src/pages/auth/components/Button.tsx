import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  fullWidth?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "py-3 px-4 rounded-full font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantClasses = {
    primary: "bg-[#1DB954] hover:bg-[#1ed760] text-black focus:ring-[#1DB954]",
    secondary: "bg-white hover:bg-gray-100 text-black focus:ring-white",
    outline: "bg-transparent border border-gray-400 text-white hover:border-white focus:ring-white",
  }

  const widthClass = fullWidth ? "w-full" : ""

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button

