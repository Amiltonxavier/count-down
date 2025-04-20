
import { CountType } from "@/types"
import { Check } from "lucide-react"

type CountTypeSelectorProps = {
    countType: CountType
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    isActive?: boolean
}

export function CountTypeSelector({ countType, onChange, isActive = false }: CountTypeSelectorProps) {

    return (
        <div className='flex flex-col items-center gap-2'>
            <div className='flex items-center gap-4'>
                {[CountType.COUNT_UP, CountType.COUNT_DOWN].map((type) => {
                    const isChecked = countType === type
                    return (
                        <label
                            key={type}
                            htmlFor={type}
                            // data-disabled={!!activeCycle && type !== countType}
                            data-check={isChecked}
                            className='data-[disabled=true]:opacity-50 flex items-center gap-2 font-bold text-lg px-3 py-1 rounded-md text-white cursor-pointer transition-colors duration-200 data-[check=true]:bg-green-500 data-[check=false]:bg-gray-700'
                        >
                            {isChecked && <Check className='size-4' />}
                            {type === CountType.COUNT_DOWN ? 'Regressiva' : 'Progressiva'}
                            <input
                                type='radio'
                                id={type}
                                // disabled={!!activeCycle && type !== countType}
                                name='type_of_count'
                                value={type}
                                onChange={onChange}
                                checked={isChecked}
                                className='sr-only'
                            />
                        </label>
                    )
                })}
            </div>
        </div>
    )
}