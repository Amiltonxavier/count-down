import { Play } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm } from '@phosphor-icons/react'
//import { useUser } from '@clerk/clerk-react'
import { useForm } from 'react-hook-form'
import { TaskCreateSchema, type TaskDTO } from '@/schema/task'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { useCyclesContext } from '@/context/cycles-context'
import { useCountDownContext } from '@/context/count-down-context'
import { CountdownDisplay } from './count-down-display'
import { useState } from 'react'
import { CountUp } from './count-up'


export function CountDownForm() {
    const { activeCycle, handleCreateNewCycle, handleInterruptCycle } = useCountDownContext();
    const { activeCycleId } = useCyclesContext();
    const [countType, setCountType] = useState<'countdown' | 'countup'>('countdown');

    const form = useForm<TaskDTO>({
        resolver: zodResolver(TaskCreateSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const task = form.watch('task');
    const isSubmitDisabled = !task || form.formState.isLoading;

    const onSubmit = (data: TaskDTO) => {
        handleCreateNewCycle(data);
        // form.reset();
    };

    const handleCountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountType(event.target.value as 'countdown' | 'countup');
    };

    return (
        <div className='flex flex-col gap-4 items-center justify-center'>
            <div className="space-y-2 flex items-center flex-col">
                <span>Tipo de contagem</span>
                <div className='flex items-center gap-5'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="countdown">Regressiva</label>
                        <input
                            type='radio'
                            name='type_of_count'
                            id='countdown'
                            value='countdown'
                            onChange={handleCountTypeChange}
                            checked={countType === 'countdown'}
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="countup">Progressivo</label>
                        <input
                            type='radio'
                            name='type_of_count'
                            id='countup'
                            value='countup'
                            onChange={handleCountTypeChange}
                            checked={countType === 'countup'}
                        />
                    </div>
                </div>
            </div>

            {countType === 'countdown' ? (
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center">
                    <div className='flex items-center gap-2 flex-wrap'>
                        <label htmlFor="taskinput" className="font-bold text-lg">
                            {activeCycle ? "Estou trabalhando em" : "Vou trabalhar em"}
                        </label>
                        <Input
                            type="text"
                            id="taskinput"
                            {...form.register('task', { required: true })}
                            placeholder='Dê um nome para o seu projeto'
                            autoComplete='off'
                            defaultValue={activeCycle?.task}
                            disabled={!!activeCycle}
                        />

                        <label htmlFor="minutesAmount" className="font-bold text-lg">
                            {activeCycle ? "por" : "durante"}
                        </label>

                        <Input
                            type="number"
                            {...form.register('minutesAmount', { valueAsNumber: true })}
                            placeholder='Tempo em minutos'
                            step={5}
                            min={1}
                            max={60}
                            disabled={!!activeCycle}
                        />

                        <label className='font-bold text-lg'>minutos</label>
                    </div>

                    <CountdownDisplay />

                    {activeCycleId ? (
                        <Button
                            type='button'
                            variant='danger'
                            onClick={handleInterruptCycle}
                        >
                            <HandPalm className='size-5' />
                            Interromper
                        </Button>
                    ) : (
                        <Button
                            type='submit'
                            disabled={isSubmitDisabled}
                            variant='success'
                        >
                            <Play className='size-5' />
                            Começar
                        </Button>
                    )}
                </form>
            ) : (
                <CountUp />
            )}
        </div>
    );
}

