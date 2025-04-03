import type { ComponentProps } from "react"

type Props = ComponentProps<'span'>
export function Accountants({ ...props }: Props) {
    return (
        <span className='px-5 bg-grey-700 text-gray-100 rounded-lg font-bold font-heading bg-gray-700' {...props} />
    )
}
