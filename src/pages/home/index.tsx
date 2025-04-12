import React from "react";
import { CountDownForm } from "./partials/count-down-form";
import { CountTypeSelector } from "./partials/count-type-Selector";
import { CountUpForm } from "./partials/count-up-form";
import { useCountTypeContext } from "@/context/type-count-context";
import { CountType } from "@/types";


export default function HomePage() {
    const { countType, setCountType } = useCountTypeContext()
    const handleCountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedType = event.target.value as CountType;
        setCountType(selectedType);
    };
    return (
        <div className="flex flex-col gap-4 items-center">
            <CountTypeSelector countType={countType} onChange={handleCountTypeChange} />
            {countType === CountType.COUNT_UP ? <CountUpForm /> : <CountDownForm />}
        </div>
    )
}
