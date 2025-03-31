import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

// Definição de tipos específicos para cada elemento da tabela
interface TableProps extends ComponentProps<"table"> { }
interface TableSectionProps extends ComponentProps<"thead"> { }
interface TableBodyProps extends ComponentProps<"tbody"> { }
interface TableRowProps extends ComponentProps<"tr"> { }
interface TableCellProps extends ComponentProps<"td"> { }
interface TableHeaderCellProps extends ComponentProps<"th"> { }
interface TableFooterProps extends ComponentProps<"tfoot"> { }
interface TableCaptionProps extends ComponentProps<"caption"> { }

export function Table({ className, ...props }: TableProps) {
    return <table className={twMerge('w-full table-auto border-collapse min-w-[600px]', className)}  {...props} />;
}

export function TableHead({ className, ...props }: TableSectionProps) {
    return <thead className={twMerge('', className)} {...props} />;
}

export function TableBody({ className, ...props }: TableBodyProps) {
    return <tbody className={twMerge('', className)} {...props} />;
}

export function TableRow({ className, ...props }: TableRowProps) {
    return <tr className={twMerge('bg-[#29292E] text-gray-100', className)} {...props} />;
}

export function TableCell({ className, ...props }: TableCellProps) {
    return <td className={twMerge('text-[0.875rem] leading-[1.6] bg-gray-700 border-t-2 border-gray-800 p-4', className)} {...props} />;
}

export function TableHeaderCell({ className, ...props }: TableHeaderCellProps) {
    return <th className={twMerge('bg-gray-600 leading-[1.6] p-4 text-left text-[0.875rem]', className)} {...props} />;
}

export function TableFooter({ className, ...props }: TableFooterProps) {
    return <tfoot {...props} />;
}

export function TableCaption({ className, ...props }: TableCaptionProps) {
    return <caption {...props} />;
}
