// src/components/ui/link.tsx
import * as React from "react"
import { cn } from "@/lib/utils" // optional: if you use shadcn's cn utility

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Makes the link open in a new tab with proper accessibility */
  external?: boolean
  /** Optional: add active state styling when using with React Router or similar */
  activeClassName?: string
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { 
      href = "#", 
      children, 
      className, 
      external = false, 
      target, 
      rel, 
      ...props 
    },
    ref
  ) => {
    const isExternal = external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")

    const targetProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : { target, rel }

    return (
      <a
        ref={ref}
        href={href}
        className={cn("transition-colors hover:text-foreground/80", className)}
        {...targetProps}
        {...props}
      >
        {children}
      </a>
    )
  }
)

Link.displayName = "Link"

export { Link }