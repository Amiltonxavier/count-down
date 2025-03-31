import { ComponentProps } from "react"

type Props = ComponentProps<'span'>

export function Separator(props: Props) {
    return (
        <span className='text-[#00875F]'  {...props} />
    )
}
