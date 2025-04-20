import React from "react";
import { CountDownForm } from "./partials/count-down-form";
import { CountTypeSelector } from "./partials/count-type-Selector";
import { CountUpForm } from "./partials/count-up-form";
import { CountType } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/types";


export default function HomePage() {
    const dispatch = useDispatch();
    const countType = useSelector((state: RootState) => state.countType);

    const handleCountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedType = event.target.value as CountType;
        dispatch(setCountType(selectedType)); // agora usando o tipo selecionado dinamicamente
    };
    return (
        <div className="flex flex-col gap-4 items-center">
            <CountTypeSelector countType={countType} onChange={handleCountTypeChange} />
            {countType === CountType.COUNT_UP ? <CountUpForm /> : <CountDownForm />}
        </div>
    )
}
