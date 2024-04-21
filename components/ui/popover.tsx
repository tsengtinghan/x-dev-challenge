"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
  ({ className = '', ...props }, ref) => {
    const [position, setPosition] = React.useState({ top: 0, left: 0 })

    const calculatePosition = () => {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const popoverWidth = 200 // Adjust this according to your popover width
      const popoverHeight = 200 // Adjust this according to your popover height

      const left = (windowWidth - popoverWidth) / 2
      const top = (windowHeight - popoverHeight) / 2

      setPosition({ left, top })
    }

    React.useEffect(() => {
      calculatePosition()
      window.addEventListener("resize", calculatePosition)
      return () => window.removeEventListener("resize", calculatePosition)
    }, [])

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          style={{ top: position.top, left: position.left }}
          className={cn(
            "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Portal>
    )
  }
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }

