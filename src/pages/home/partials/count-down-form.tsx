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


export function CountDownForm() {
    const { activeCycle, handleCreateNewCycle, handleInterruptCycle, } = useCountDownContext();
    const { activeCycleId } = useCyclesContext();
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
        //  form.reset();
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center space-y-4">
            <div className='flex items-center gap-2 flex-wrap'>
                <label htmlFor="taskinput" className="font-bold text-lg">
                    {activeCycle ? "Estou trabalhando em" : "Vou trabalhar em"}
                </label>
                <Input
                    type="text" id="taskinput"
                    {...form.register('task', { required: true })}
                    placeholder='Dê um nome para o seu projeto'
                    list="taskinputlist"
                    autoComplete='off'
                    defaultValue={activeCycle?.task}
                    disabled={!!activeCycle}
                />

                {/*  <datalist id="taskinputlist">
                    {cycles.map((cycle) => (
                        <option key={cycle.id} value={cycle.task} />
                    ))}, */}

                <label htmlFor="minutesAmount" className="font-bold text-lg">
                    {activeCycle ? "por" : "durante"}
                </label>

                <Input
                    type="number"
                    {...form.register('minutesAmount', { valueAsNumber: true })}
                    placeholder='Dê um nome para o seu projeto'
                    step={5}
                    min={1}
                    max={60}
                    disabled={!!activeCycle}
                />

                <label htmlFor="" className='font-bold text-lg'>minutos</label>
            </div>

            <CountdownDisplay />

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
