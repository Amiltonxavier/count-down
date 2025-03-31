import type { ComponentProps } from "react"

type Props = ComponentProps<'span'>
export function Accountants({ ...props }: Props) {
    return (
        <span className='px-4 py-8 bg-grey-700 text-gray-100 rounded-lg font-bold font-heading' {...props} />
    )
}
