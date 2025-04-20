import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { HandPalm, Play } from '@phosphor-icons/react';
import { Display } from './count-display';
import { useDispatch, useSelector } from 'react-redux';
import { CountType } from '@/types';
import { ID } from 'appwrite';
import type { RootState } from '@/redux/types';
import { finishCycle, interruptCycle } from '@/redux/slices/cyclesSlice';
import { createAction } from '@reduxjs/toolkit';
import { useCountUpTimer } from '@/hooks/useCountUpTimer';
import { Check, CheckCheck } from 'lucide-react';

const countUpSchema = z.object({
    task: z.string().min(1, 'Informe o nome do projeto'),
});

type CountUpFormData = z.infer<typeof countUpSchema>;

export function CountUpForm() {
    const dispatch = useDispatch();
    const activeCycleId = useSelector((state: RootState) => state.cycles.activeCycleId.countUp);

    const activeCycle = useSelector((state: RootState) =>
        state.cycles.cycles.find(cycle => cycle.id === activeCycleId)
    ) ?? null;
    const { minutes, seconds, finishCycle } = useCountUpTimer({
        activeCycle,
        onFinishCycle: (cycle) => {
            dispatch(interruptCycle({ id: cycle.id, type: CountType.COUNT_UP }));
        },
    });

    const form = useForm<CountUpFormData>({
        resolver: zodResolver(countUpSchema),
        defaultValues: {
            task: '',
        },
    });

    const onSubmit = ({ task }: CountUpFormData) => {
        dispatch(
            addCycle({
                id: ID.unique(),
                task,
                minutesAmount: 0,
                startDate: new Date(),
                type: CountType.COUNT_UP,
            })
        );
    };

    const handleFinishedCycle = () => {
        if (activeCycleId) {
            finishCycle()
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-center"
        >
            <div className='flex items-center gap-2 flex-wrap'>
                <label htmlFor="taskinput" className="font-bold text-lg">
                    {activeCycle ? "Estou trabalhando em" : "Vou trabalhar em"}
                </label>
                <Input
                    type="text"
                    id="taskinput"
                    {...form.register('task')}
                    placeholder='Dê um nome para o seu projeto'
                    autoComplete='off'
                    className='flex-1'
                    defaultValue={activeCycle?.task}
                    disabled={!!activeCycle}
                />
            </div>

            <Display minutes={minutes} seconds={seconds} />

            {activeCycle ? (
                <div className='w-full flex flex-col lg:flex-row  items-center gap-4'>
                    <Button
                        type='button'
                        variant='success'
                        onClick={handleFinishedCycle}
                        className='flex-1 w-full'
                    >
                        <CheckCheck className='size-5' />
                        Finalizei
                    </Button>
                    <Button
                        type='button'
                        variant='danger'
                        onClick={() => dispatch(interruptCycle({ id: { id: activeCycle.id }, type: CountType.COUNT_UP }))}
                        className='lg:w-[140px]'
                    >
                        <HandPalm className='size-5' />
                        Interromper
                    </Button>
                </div>

            ) : (
                <Button type='submit' variant='success'>
                    <Play className='size-5' />
                    Começar
                </Button>
            )}
        </form>
    );
}
const addCycle = createAction<{
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    type: CountType;
}>('cycles/addCycle');

export { addCycle };

