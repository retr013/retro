import React, {type ButtonHTMLAttributes, memo} from "react"

type ButtonSize = "sm" | "md" | "lg" | "xlg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize
    onClick?: () => void
    disabled?: boolean
    ariaBusy?: boolean
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xlg: "px-8 py-4 text-xl",
}

function UniButton({className = "", size = "md", children, onClick, ariaBusy, disabled}: ButtonProps) {
    const sizeClass = sizeClasses[size]

    return (
        <button
            className={`
          inline-flex items-center justify-center
          font-medium transition-all
          bg-main text-white
          ease-in duration-400
          rounded-3xl
          hover:bg-main-hover
          hover:scale-105
          focus:outline-none
          disabled:opacity-50 disabled:pointer-events-none
          ${sizeClass}
          ${className}
        `} onClick={onClick}
            aria-busy={ariaBusy}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default memo(UniButton)