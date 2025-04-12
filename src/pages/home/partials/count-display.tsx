import { Accountants } from "@/components/accountants";
import { Separator } from "@/components/separator";

type DisplayProps = {
    minutes: string;
    seconds: string;
};

export function Display({ minutes, seconds }: DisplayProps) {
    return (
        <div className='flex items-center gap-2 flex-wrap text-[10rem] font-bold space-x-0.5'>
            <Accountants>{minutes[0]}</Accountants>
            <Accountants>{minutes[1]}</Accountants>
            <Separator>:</Separator>
            <Accountants>{seconds[0]}</Accountants>
            <Accountants>{seconds[1]}</Accountants>
        </div>
    );
}