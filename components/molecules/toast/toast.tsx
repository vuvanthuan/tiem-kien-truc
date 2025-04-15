"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"

import { cn } from "@/lib/utils/tw-merge"

import { Button } from "@/components/atoms/button"

const Toast = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
>(({ className, ...props }, ref) => {
    return (
        <ToastPrimitives.Root
            ref={ref}
            className={cn(
                "bg-background border shadow-sm rounded-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:fade-in-80 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-100 grid gap-1.5 p-4",
                className,
            )}
            {...props}
        >
            <div className="grid gap-1">
                <ToastPrimitives.Title className="text-sm font-semibold">{props.title}</ToastPrimitives.Title>
            </div>
            <ToastPrimitives.Action asChild altText="Close">
                <Button variant="ghost" className="w-8 h-8 p-0 rounded-md opacity-70 hover:opacity-100">
                    Close
                </Button>
            </ToastPrimitives.Action>
        </ToastPrimitives.Root>
    )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastViewport = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Viewport>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => {
    return (
        <ToastPrimitives.Viewport
            ref={ref}
            className={cn(
                "fixed bottom-0 right-0 z-[100] flex flex-col gap-y-2 m-6 w-[380px] list-none pointer-events-none",
                className,
            )}
            {...props}
        />
    )
})
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

type ToastProps = {
    title: string
    description: string
    variant?: "default" | "destructive"
}

const useToast = () => {
    const toast = ({ title, description, variant }: ToastProps) => {
        alert(`${title}: ${description} (Variant: ${variant || "default"})`)
    }

    return { toast }
}

const { toast } = useToast()

export { Toast, ToastViewport, toast }
