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
import { differenceInSeconds } from 'date-fns'
import { Input } from './input'
import { createNewTask, updateDocument } from '../lib/appwirte'
import { useUser } from '@clerk/clerk-react'
import { ID } from 'appwrite'


export function CountDownForm() {
    const { user } = useUser();

    if (!user) return
    const [cycles, setCycles] = useState<CycleProps[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const { setHistory } = useHistoryContext();

    const { register, handleSubmit, watch, reset, formState: { isLoading } } = useForm<TaskDTO>({
        resolver: zodResolver(TaskCreateSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const handleCreateNewCycle = ({ minutesAmount, task }: TaskDTO) => {
        const id = ID.unique();
        const newCycle: CycleProps = {
            id,
            task,
            minutesAmount,
            startDate: new Date(),
        }

        setCycles((prev) => [...prev, newCycle]);
        setHistory((prev) => [...prev, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);
        reset();

        createNewTask({ id: id, task: newCycle.task, minutesAmount: newCycle.minutesAmount, startDate: newCycle.startDate, userId: user.id })
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
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

                if (secondsDifference >= totalSeconds) {
                    setCycles((state) => state.map(cycle => {
                        if (cycle.id === activeCycleId) {
                            return {
                                ...cycle, finishedDate: new Date
                            }
                        }
                        return cycle;
                    }));
                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                    setActiveCycleId(null);
                } else {
                    setAmountSecondsPassed(secondsDifference);
                }

            }, 1000);

            return () => clearInterval(interval);
        }
    }, [activeCycle, totalSeconds, activeCycleId]);

    useEffect(() => {
        if (activeCycle) document.title = `${minutes}:${seconds}`
    }, [minutes, seconds, activeCycle])

    const handleInterruptCycle = () => {
        setCycles((state) => {
            const updatedCycles = state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    const updatedCycle = { ...cycle, interruptedDate: new Date() };
                    updateDocument(activeCycleId, updatedCycle);
                    return updatedCycle;
                }
                return cycle;
            });

            return updatedCycles;
        });

        setActiveCycleId(null);
        setAmountSecondsPassed(0);
    };

    return (
        <form onSubmit={handleSubmit(handleCreateNewCycle)} className="flex flex-col gap-4 items-center space-y-4">
            <div className='flex items-center gap-2 flex-wrap'>
                <label htmlFor="taskinput" className="font-bold text-lg">
                    {activeCycle ? "Estou trabalhando em" : "Vou trabalhar em"}
                </label>
                <Input
                    type="text" id="taskinput"
                    {...register('task', { required: true })}
                    placeholder='Dê um nome para o seu projeto'
                    list="taskinputlist"
                    autoComplete='off'
                    defaultValue={activeCycle?.task}
                    disabled={!!activeCycle}
                />
                {/*    <input type="text" id="taskinput"
                    {...register('task', { required: true })}
                    placeholder='Dê um nome para o seu projeto'
                    list="taskinputlist"
                    autoComplete='off'
                    disabled={!!activeCycle}
                    className='flex-1  font-bold text-[1.125rem] outline-none border-b-2 border-gray bg-transparent h-10 px-2 text-gray-100 focus-within:shadow-none focus-within:border-green-500' />
 */}
                <datalist id="taskinputlist" className='bg-gray-800 w-full'>
                    <option value="Projeto 1" />
                    <option value="Projeto 2" />
                    <option value="Projeto 3" />
                    <option value="Projeto 4" />
                    <option value="Projeto 5" />
                </datalist>

                <label htmlFor="minutesAmount" className="font-bold text-lg">
                    {activeCycle ? "por" : "durante"}
                </label>
                <input
                    type="number"
                    {...register('minutesAmount', { valueAsNumber: true })}
                    step={5}
                    min={5}
                    max={60}
                    //defaultValue={activeCycle?.minutesAmount}
                    disabled={!!activeCycle}
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

            {activeCycleId ?
                <Button
                    type='button'
                    variant='danger'
                    onClick={handleInterruptCycle}
                >
                    <HandPalm className='size-5' />
                    Interromper
                </Button>
                :
                <Button
                    type='submit'
                    disabled={isSubmitDisabled}
                    variant='success'
                >
                    <Play className='size-5' />
                    Começar
                </Button>

            }


        </form>
    )
}
