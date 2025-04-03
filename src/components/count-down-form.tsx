import { Play } from 'lucide-react'
import { Separator } from './separator'
import { Accountants } from './accountants'
import { useForm } from 'react-hook-form'
import { TaskCreateSchema, type TaskDTO } from '../schema/task'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { HandPalm } from '@phosphor-icons/react'
import { Button } from './button'
import type { CycleProps } from '../interfaces'
import { useHistoryContext } from '../context/history-context'


export function CountDownForm() {

    const [cycles, setCycles] = useState<CycleProps[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const { setHistory } = useHistoryContext();
    //const [isRunning, setIsRunning] = useState<boolean>(false);

    const { register, handleSubmit, watch, reset, formState: { isLoading, errors } } = useForm<TaskDTO>({
        resolver: zodResolver(TaskCreateSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const handleCreateNewCycle = ({ minutesAmount, task }: TaskDTO) => {
        const id = String(new Date().getTime());
        const newCycle: CycleProps = {
            id,
            task,
            minutesAmount,
        }

        setCycles((prev) => [...prev, newCycle]);
        setHistory((prev) => [...prev, newCycle]);
        setActiveCycleId(id);
        reset();
    }

    const task = watch('task');
    const isSubmitDisabled = !task || isLoading;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;
    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');


    useEffect(() => {
        if (activeCycle && currentSeconds > 0) {
            const interval = setInterval(() => {
                setAmountSecondsPassed((prev) => prev + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [activeCycle, currentSeconds]);

    const handleInterruptCycle = () => {
        setCycles((prev) => prev.filter((cycle) => cycle.id !== activeCycleId));
        setActiveCycleId(null);
        setAmountSecondsPassed(0);
    }


    return (
        <form onSubmit={handleSubmit(handleCreateNewCycle)} className="flex flex-col gap-4 items-center space-y-14">
            <div className='flex items-center gap-2 flex-wrap'>
                <label htmlFor="taskinput" className='font-bold text-lg'>Vou trabalhar em</label>
                <input type="text" id="taskinput"
                    {...register('task', { required: true })}
                    placeholder='Dê um nome para o seu projeto'
                    list="taskinputlist"
                    autoComplete='off'
                    className='flex-1  font-bold text-[1.125rem] outline-none border-b-2 border-gray bg-transparent h-10 px-2 text-gray-100 focus-within:shadow-none focus-within:border-gray-500' />

                <datalist id="taskinputlist" className='bg-gray-800 w-full'>
                    <option value="Projeto 1" />
                    <option value="Projeto 2" />
                    <option value="Projeto 3" />
                    <option value="Projeto 4" />
                    <option value="Projeto 5" />
                </datalist>

                <label htmlFor="minutesAmount" className='font-bold text-lg'>durante</label>
                <input
                    type="number"
                    {...register('minutesAmount', { valueAsNumber: true })}
                    step={5}
                    min={5}
                    max={60}
                    placeholder='00' className='tex-center placeholder:text-center w-16 flex-1  font-bold text-[1.125rem] outline-none border-b-2 border-gray bg-transparent h-10 px-2 text-gray-100 focus-within:shadow-none focus-within:border-gray-500' />
                <label htmlFor="" className='font-bold text-lg'>minutos</label>
            </div>

            <div className='flex items-center gap-2 flex-wrap text-[10rem] font-bold space-x-0.5'>
                <Accountants>{minutes[0]}</Accountants>
                <Accountants>{minutes[1]}</Accountants>
                <Separator>:</Separator>
                <Accountants>{seconds[0]}</Accountants>
                <Accountants>{seconds[1]}</Accountants>
            </div>

            {!activeCycleId && <Button
                type='submit'
                disabled={isSubmitDisabled}
                variant='success'
            >
                <Play className='size-5' />
                Começar
            </Button>}

            {activeCycleId &&
                <Button
                    type='button'
                    variant='danger'
                    onClick={handleInterruptCycle}
                >
                    <HandPalm className='size-5' />
                    Interromper
                </Button>}

        </form>
    )
}
