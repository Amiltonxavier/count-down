import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from 'lucide-react';
import { HandPalm } from '@phosphor-icons/react';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Display } from './count-display';
import { TaskCreateSchema, type TaskDTO } from '@/schema/task';
import { useDispatch, useSelector } from 'react-redux';
import { addCycle, interruptCycle } from '@/redux/slices/cyclesSlice';
import { CountType } from '@/types';
import type { RootState } from '@/redux/types';
import { useCountDownTimer } from '@/hooks/useCountDownTimer';

export function CountDownForm() {
    const dispatch = useDispatch();
    const activeCycleId = useSelector(
        (state: RootState) => state.cycles.activeCycleId.countDown
    );
    const activeCycle = useSelector((state: RootState) =>
        state.cycles.cycles.find(cycle => cycle.id === activeCycleId)
    ) ?? null;
    const { minutes, seconds } = useCountDownTimer({
        activeCycle,
        onFinishCycle: (finishedCycle) => {
            dispatch(interruptCycle({ id: finishedCycle.id, type: CountType.COUNT_DOWN }));
        },
    });

    const form = useForm<TaskDTO>({
        resolver: zodResolver(TaskCreateSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        },
    });

    const task = form.watch('task');
    const isSubmitDisabled = !task || form.formState.isSubmitting;

    const onSubmit = (data: TaskDTO) => {
        dispatch(
            addCycle({
                id: crypto.randomUUID(),
                task: data.task,
                minutesAmount: data.minutesAmount,
                startDate: new Date(),
                type: CountType.COUNT_DOWN,
            })
        );
    };

    const handleInterruptCycle = () => {
        if (activeCycleId) {
            dispatch(interruptCycle({ id: activeCycleId, type: CountType.COUNT_DOWN }));
        }
    };

    return (
        <div className="flex flex-col gap-6 items-center">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center">
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <label htmlFor="taskinput" className="font-bold text-lg">
                        {activeCycle ? 'Estou trabalhando em' : 'Vou trabalhar em'}
                    </label>
                    <Input
                        id="taskinput"
                        placeholder="Dê um nome para o seu projeto"
                        autoComplete="off"
                        {...form.register('task')}
                        defaultValue={activeCycle?.task}
                        disabled={!!activeCycle}
                    />

                    <label htmlFor="minutesAmount" className="font-bold text-lg">
                        {activeCycle ? 'por' : 'durante'}
                    </label>
                    <Input
                        type="number"
                        step={5}
                        min={1}
                        max={60}
                        id="minutesAmount"
                        placeholder="Tempo em minutos"
                        {...form.register('minutesAmount', { valueAsNumber: true })}
                        disabled={!!activeCycle}
                    />

                    <span className="font-bold text-lg">minutos</span>
                </div>

                <Display minutes={minutes} seconds={seconds} /> {/* Substitua com base na lógica de contagem */}

                {activeCycleId ? (
                    <Button type="button" variant="danger" onClick={handleInterruptCycle}>
                        <HandPalm className="size-5" />
                        Interromper
                    </Button>
                ) : (
                    <Button type="submit" variant="success" disabled={isSubmitDisabled}>
                        <Play className="size-5" />
                        Começar
                    </Button>
                )}
            </form>
        </div>
    );
}
