

import { Timer, Scroll } from '@phosphor-icons/react'
import { NavLinks } from "./nav-link";
import { UserButton } from '@clerk/clerk-react';
export function Header() {
    return (
        <div className="flex items-center justify-between mb-10">
            <img src="/Logo.svg" width={40} height={40} alt="Logo" className="size-10" />

            <nav className="flex gap-4 items-center">
                <NavLinks to={'/'}><Timer className="size-6" /></NavLinks>
                <NavLinks to={'/history'}><Scroll className="size-6" /></NavLinks>
                <UserButton />
            </nav>
        </div>
    )
}
