// 
import { NavLink, type NavLinkProps } from "react-router";

type Props = NavLinkProps & {
    children?: React.ReactNode;
}

export function NavLinks(props: Props) {
    return <NavLink
        className={({ isActive }) =>
            `border-b-2 pb-1 border-transparent hover:border-green-500 hover:text-green-500 ${isActive ? "border-green-500 text-green-500" : ""
            }`
        }
        {...props}
    >
        {props.children}
    </NavLink>
}
