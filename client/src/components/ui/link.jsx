import * as React from "react"
import { Link as RouterLink } from "react-router-dom"
import { cn } from "../../lib/utils"

const Link = React.forwardRef(
  ({ href, className, children, ...props }, ref) => {
    return (
      <RouterLink
        to={href}
        ref={ref}
        className={cn(
          "text-primary underline-offset-4 hover:underline",
          className
        )}
        {...props}
      >
        {children}
      </RouterLink>
    )
  }
)

Link.displayName = "Link"

export { Link }