import type { ComponentProps } from "react"

type Props = ComponentProps<'input'>

export function input(props: Props) {
    return (
        <input
            className='bg-gray-900 text-white rounded-md p-2 border-2 border-gray-700 focus:outline-none focus:border-[#00875F] focus:ring-[#00875F] focus:ring-1'
            {...props}
        />
    )
}
