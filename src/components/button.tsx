import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<'button'> {
    variant?: "primary" | "secondary" | "danger" | "success";
}

const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-700",
    secondary: "bg-gray-500 hover:bg-gray-700",
    danger: "bg-red-500 hover:bg-red-700",
    success: "bg-green-500 hover:bg-green-700",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
    return (
        <button
            className={twMerge(
                "text-white flex items-center py-4 gap-2 justify-center rounded-lg font-bold w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 ease-in-out",
                variantStyles[variant],
                className
            )}
            {...props}
        />
    );
}
