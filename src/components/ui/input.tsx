"use client"
import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  enablePasswordToggle?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, enablePasswordToggle, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const currentType = enablePasswordToggle ? (showPassword ? "text" : "password") : type;

    const handleTogglePassword = React.useCallback(() => {
      setShowPassword((prev) => !prev)
    }, [])
    return (
      <div className="relative w-full">
        <input
          type={currentType}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {
          enablePasswordToggle && (
            <button type="button" onClick={handleTogglePassword} className="absolute right-2 top-1/2 -translate-y-1/2 focus:outline-none">
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )
        }
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
