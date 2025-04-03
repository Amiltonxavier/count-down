import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type Props = ComponentProps<'input'>

export function Input({ className, ...props }: Props) {
    return (
        <input
            className={twMerge('flex-1  font-bold text-[1.125rem] outline-none border-b-2 border-gray bg-transparent h-10 px-2 text-gray-100 focus-within:shadow-none focus-within:border-green-500', className)}
            {...props}
        />
    )
}
